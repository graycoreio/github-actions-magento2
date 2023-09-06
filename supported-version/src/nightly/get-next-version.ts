import { GithubActionsMatrix } from "../matrix/matrix-type";

const KNOWN_REPOSITORIES = {
    "https://repo.mage-os.org": true,
    "https://nightly.mage-os.org": true,
    "https://upstream-mirror.mage-os.org": true,
    "https://upstream-nightly.mage-os.org": true,
    "https://repo.magento.com": true,
}

export type Repository = keyof typeof KNOWN_REPOSITORIES;

/**
 * A placeholder value use to refer to the next version of Magento.
 * This value is just a placeholder, there is no "next" version (as of authoring).
 */
export const nextVersionPlaceHolder = "project-community-edition:next";

/**
 * Get the next version of Magento, as determined by the repository.
 */
export const getNextVersion = (repository: Repository, date: Date) => {
    switch(repository){
        case "https://nightly.mage-os.org":
        case "https://upstream-nightly.mage-os.org":
            // See: https://github.com/mage-os/generate-mirror-repo-js/blob/bbbdf1708ea0bf8fc845aad8240d00f37632b4a7/src/release-branch-build-tools.js#L71
            return "@alpha";
        default:
            return "";
    }
}


export const replaceNextPlaceHolderWithVersion = (packageName: string, nextVersion: string) => {
    return packageName.replace(/(?!:)next$/, nextVersion);
}

export const computeNextPackage = (packageName: string, repository: Repository, date: Date): string => {
    return replaceNextPlaceHolderWithVersion(packageName, getNextVersion(repository, date));
}

export const amendMatrixForNext = (matrix: GithubActionsMatrix, repository: Repository, date: Date = new Date()): GithubActionsMatrix => {
    const nextVersionRegExp = new RegExp(nextVersionPlaceHolder + '$');
    matrix.magento = matrix.magento.map((item) => item.match(nextVersionRegExp) ? computeNextPackage(item, repository, date) : item);
    matrix.include = matrix.include.map((item) => {
        return item.magento.match(nextVersionRegExp)
            ? {
                ...item,
                magento: computeNextPackage(item.magento, repository, date),
            }
            : item;
    });
    return matrix;
}