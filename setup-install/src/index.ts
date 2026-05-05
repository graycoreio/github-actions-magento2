import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { buildInstallArgs, buildMysqlPrepArgs, Services } from './build-command';

export async function run(): Promise<void> {
    try {
        const servicesInput = core.getInput('services');
        const path = core.getInput('path') || '.';
        const extraArgs = core.getInput('extra_args').trim();

        let services: Services | null = null;
        if (servicesInput && servicesInput !== 'null') {
            services = JSON.parse(servicesInput) as Services;
        }

        // setup:install creates MySQL triggers, which requires log_bin_trust_function_creators=1
        // when binary logging is enabled.
        if (services?.mysql) {
            await exec.exec('mysql', buildMysqlPrepArgs(services.mysql));
        }

        const args = buildInstallArgs(services);

        if (extraArgs) {
            args.push(...extraArgs.split(/\s+/));
        }

        core.setOutput('command', `php bin/magento setup:install ${args.join(' ')}`);

        await exec.exec('php', ['bin/magento', 'setup:install', ...args], { cwd: path });
    } catch (error) {
        core.setFailed((error as Error).message);
    }
}

run();