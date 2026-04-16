import { PackageMatrixVersion } from '../matrix/matrix-type';
import { getIndividualVersionsForProject } from "../versions/get-versions-for-project";
import semver from 'semver';

/**
 * Versions that are known to be uninstallable and should be excluded from the usable set.
 * Each entry includes a reason for documentation purposes.
 */
const uninstallableVersions: Record<string, string> = {
    // magento/composer-root-update-plugin ~1.1 requires composer/composer <=2.1,
    // but all composer versions <=2.1 are insecure and cannot be used.
    'magento/project-community-edition:2.4.2': 'requires insecure composer <=2.1',
    'magento/project-community-edition:2.4.2-p1': 'requires insecure composer <=2.1',
    'magento/project-community-edition:2.4.2-p2': 'requires insecure composer <=2.1',
    'magento/project-community-edition:2.4.3': 'requires insecure composer <=2.1',
    'magento/project-community-edition:2.4.3-p1': 'requires insecure composer <=2.1',
    'magento/project-community-edition:2.4.3-p2': 'requires insecure composer <=2.1',
    'magento/project-community-edition:2.4.3-p3': 'requires insecure composer <=2.1',
    // Security advisory in webonyx/graphql-php prevents installation.
    'mage-os/project-community-edition:2.2.1': 'uninstallable due to webonyx/graphql-php security advisory',
};

export const getUsableVersions = (project: string): string[] => {
    const allVersions = getIndividualVersionsForProject(project)
    return Object.entries(<Record<string,PackageMatrixVersion>>allVersions)
        .filter(([key, value]) => {
            /**
             * Filter out any versions that are not 'usable', and cannot be successfully installed
             * anymore for modern systems or other reasons outside our control.
             */

            // Packagist retired support for Composer 1 on 2025-09-01.
            const composerVersion = semver.coerce(value.composer.toString());
            if (composerVersion && semver.lt(composerVersion, '2.0.0')) {
                return false;
            }

            // Exclude versions known to be uninstallable.
            if (key in uninstallableVersions) {
                return false;
            }

            return true;
        })
        .map(([key, value]) => key);
}