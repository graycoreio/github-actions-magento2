import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as nodePath from 'path';
import { buildInstallArgs, buildMysqlPrepArgs, Services } from './build-command';

const resolveContainerPath = (runnerPath: string): string => {
    const workspace = process.env.GITHUB_WORKSPACE || '';
    const absolute = nodePath.resolve(workspace, runnerPath);
    const relative = nodePath.relative(workspace, absolute);
    if (relative.startsWith('..')) {
        throw new Error(`container_id: path ${runnerPath} resolves outside GITHUB_WORKSPACE (${workspace})`);
    }
    return relative ? `/var/www/html/${relative}` : '/var/www/html';
};

export async function run(): Promise<void> {
    try {
        const servicesInput = core.getInput('services');
        const path = core.getInput('path') || '.';
        const extraArgs = core.getInput('extra_args').trim();
        const containerId = core.getInput('container_id').trim();
        const containerMode = containerId !== '';

        let services: Services | null = null;
        if (servicesInput && servicesInput !== 'null') {
            services = JSON.parse(servicesInput) as Services;
        }

        // setup:install creates MySQL triggers, which requires log_bin_trust_function_creators=1
        // when binary logging is enabled. The prep always runs runner-side against the published port.
        if (services?.mysql) {
            await exec.exec('mysql', buildMysqlPrepArgs(services.mysql));
        }

        const args = buildInstallArgs(services, containerMode);

        if (extraArgs) {
            args.push(...extraArgs.split(/\s+/));
        }

        if (containerMode) {
            const containerPath = resolveContainerPath(path);

            const command = `docker exec -w ${containerPath} ${containerId} php bin/magento setup:install ${args.join(' ')}`;
            core.setOutput('command', command);

            await exec.exec('docker', [
                'exec',
                '-w', containerPath,
                containerId,
                'php', 'bin/magento', 'setup:install',
                ...args,
            ]);

            // setup:install runs as root inside the container, but php-fpm workers
            // serve requests as `www-data`. Hand ownership of the Magento writable
            // dirs to www-data so request-time cache/log writes succeed.
            await exec.exec('docker', [
                'exec', containerId, 'sh', '-c',
                `for d in var generated pub/static pub/media; do [ -d "${containerPath}/$d" ] && chown -R www-data:www-data "${containerPath}/$d"; done`,
            ]);
        } else {
            core.setOutput('command', `php bin/magento setup:install ${args.join(' ')}`);
            await exec.exec('php', ['bin/magento', 'setup:install', ...args], { cwd: path });
        }
    } catch (error) {
        core.setFailed((error as Error).message);
    }
}

run();
