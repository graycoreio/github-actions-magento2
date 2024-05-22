import { PackageMatrixVersion } from '../matrix/matrix-type';
import { getIndividualVersionsForProject } from "../versions/get-versions-for-project";

export const getCurrentlySupportedVersions = (project: string, date: Date): string[] => {
    const allVersions = getIndividualVersionsForProject(project)
    return Object.entries(<Record<string,PackageMatrixVersion>>allVersions)
        .filter(([key, value]) => {
            const dayOfRelease = new Date(value.release);
            dayOfRelease.setSeconds(dayOfRelease.getSeconds() + 1);
            return date >= dayOfRelease && new Date(value.eol) >= date;
        })
        .map(([key, value]) => key);
}