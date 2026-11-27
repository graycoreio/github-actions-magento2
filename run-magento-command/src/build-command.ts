import * as nodePath from 'path';

export const buildMagentoArgs = (command: string): string[] => {
    const args = command.trim().split(/\s+/).filter(Boolean);

    if (args.length === 0) {
        throw new Error('Magento command cannot be empty');
    }

    return ['bin/magento', ...args];
};

export const resolveContainerPath = (runnerPath: string, workspace: string): string => {
    const absolute = nodePath.resolve(workspace, runnerPath);
    const relative = nodePath.relative(workspace, absolute);
    if (relative.startsWith('..')) {
        throw new Error(`container_id: path ${runnerPath} resolves outside GITHUB_WORKSPACE (${workspace})`);
    }
    return relative ? `/var/www/html/${relative}` : '/var/www/html';
};
