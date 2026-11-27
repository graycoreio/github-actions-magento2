import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { buildMagentoArgs, resolveContainerPath } from './build-command';

const run = async (): Promise<void> => {
    const containerId = core.getInput('container_id').trim();
    const path = core.getInput('path') || '.';
    const args = buildMagentoArgs(core.getInput('command', { required: true }));

    if (containerId) {
        const containerPath = resolveContainerPath(path, process.env.GITHUB_WORKSPACE || '');
        await exec.exec('docker', ['exec', '-w', containerPath, containerId, 'php', ...args]);
    } else {
        await exec.exec('php', args, { cwd: path });
    }
};

run().catch(error => core.setFailed((error as Error).message));
