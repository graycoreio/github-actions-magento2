import { PackageMatrixVersion } from '../matrix/matrix-type';
import { getIndividualVersionsForProject } from "../versions/get-versions-for-project";
import semver from 'semver';

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

            return true;
        })
        .map(([key, value]) => key);
}