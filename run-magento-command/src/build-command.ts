export const buildCommandArgs = (
    containerId: string,
    containerPath: string,
    command: string
): string[] => {
    const args = command.trim().split(/\s+/).filter(Boolean);

    if (args.length === 0) {
        throw new Error('Magento command cannot be empty');
    }

    return [
        'exec',
        '-w',
        containerPath,
        containerId,
        'php',
        'bin/magento',
        ...args,
    ];
};