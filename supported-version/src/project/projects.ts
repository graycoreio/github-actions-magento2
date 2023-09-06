/**
 * Acceptable arguments for version `project`
 */
export const KNOWN_PROJECTS = {
    "mage-os": true,
    "magento-open-source": true,
}

export type Project = keyof typeof KNOWN_PROJECTS;
