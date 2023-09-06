import { PackageMatrixVersion } from '../matrix/matrix-type';
import { getIndividualVersionsForProject } from "../versions/get-versions-for-project";

export const getCurrentlySupportedVersions = (project: string, date: Date): string[] => {
    const allVersions = getIndividualVersionsForProject(project)
    return Object.entries(<Record<string,PackageMatrixVersion>>allVersions)
        .filter(([key, value]) => {
            const dayAfterRelease = new Date(value.release);
            dayAfterRelease.setDate(dayAfterRelease.getDate() + 1);
            return date >= dayAfterRelease && new Date(value.eol) >= date;
        })
        .map(([key, value]) => key);
}