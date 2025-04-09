import { PackageMatrixVersion } from '../matrix/matrix-type';
import { getIndividualVersionsForProject } from "../versions/get-versions-for-project";

export const getRecentVersions = (project: string, date: Date, durationStr: string): string[] => {
    const regex = /(?:(\d+)\s*y)?\s*(?:(\d+)\s*m)?\s*(?:(\d+)\s*d)?/i;
    const match = durationStr.match(regex);

    if (!match) {
        throw new Error(`Invalid duration string: ${durationStr}`);
    }

    const years = parseInt(match[1] || "0", 10);
    const months = parseInt(match[2] || "0", 10);
    const days = parseInt(match[3] || "0", 10);

    const allVersions = getIndividualVersionsForProject(project)
    return Object.entries(<Record<string,PackageMatrixVersion>>allVersions)
        .filter(([key, value]) => {
            const dayOfRelease = new Date(value.release);
            dayOfRelease.setSeconds(dayOfRelease.getSeconds() + 1);
            const dateAfterRelease = new Date(value.release);
            
            dateAfterRelease.setFullYear(dateAfterRelease.getFullYear() + years);
            dateAfterRelease.setMonth(dateAfterRelease.getMonth() + months);
            dateAfterRelease.setDate(dateAfterRelease.getDate() + days);
          

            return date >= dayOfRelease && date <= dateAfterRelease;
        })
        .map(([key, value]) => key);
}