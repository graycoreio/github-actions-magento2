import { MagentoMatrixVersion } from '../matrix/matrix-type';
import allVersions from '../versions/individual.json';

export const getCurrentlySupportedVersions = (date: Date): string[] => 
        Object.entries(<Record<string,MagentoMatrixVersion>>allVersions)
                .filter(([key, value]) => new Date(value.eol) >= date)
                .map(([key, value]) => key);