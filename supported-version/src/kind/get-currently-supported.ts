import { MagentoMatrixVersion } from '../matrix/matrix-type';
import allVersions from '../versions/individual.json';

export const getCurrentlySupportedVersions = (date: Date): string[] => 
        Object.entries(<Record<string,MagentoMatrixVersion>>allVersions)
                .filter(([key, value]) => {
                        const dayAfterRelease = new Date(value.release);
                        dayAfterRelease.setDate(dayAfterRelease.getDate() + 1);
                        return date >= dayAfterRelease && new Date(value.eol) >= date;
                })
                .map(([key, value]) => key);