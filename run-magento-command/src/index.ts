import * as core from '@actions/core';
import * as exec from '@actions/exec';
import { buildCommandArgs } from './build-command.ts'

async function run(): Promise<void> {
    const containerId = core.getInput('container_id', {
        required: true
    });

    const containerPath = core.getInput('path') || '/var/www/html';

    const command = core.getInput('command', {
        required: true
    });

    const args = buildCommandArgs(
        containerId,
        containerPath,
        command
    );

    await exec.exec('docker', args);
}

run().catch(error => core.setFailed(String(error)));