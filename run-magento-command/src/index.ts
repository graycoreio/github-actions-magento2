import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run(): Promise<void> {
    const containerId = core.getInput('container_id', {
        required: true
    });

    const containerPath = core.getInput('path') || '/var/www/html';

    const args = core
        .getInput('arguments')
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    await exec.exec('docker', [
        'exec',
        '-w',
        containerPath,
        containerId,
        'php',
        'bin/magento',
        ...args
    ]);
}

run().catch(error => core.setFailed(String(error)));