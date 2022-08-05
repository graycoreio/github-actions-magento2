import { GithubActionsMatrix, MagentoMatrixVersion } from "./matrix-type";
import compositeVersionJson from '../versions/composite.json';
import individualVersionJson from '../versions/individual.json';

const knownVersions : Record<string, MagentoMatrixVersion> = {...individualVersionJson, ...compositeVersionJson };

/**
 * Computes the Github Actions Matrix for given versions of Magento
 */
export const getMatrixForVersions = (versions: string[]): GithubActionsMatrix => {
    return versions.reduce((acc, current): GithubActionsMatrix => {
        if(knownVersions[current] === undefined){
            throw new Error("Unknown version while computing matrix");
        }

        return {
            magento: [...acc.magento, current],
            include: [...acc.include, knownVersions[current]]
        }
    }, {magento: [], include: []});
}