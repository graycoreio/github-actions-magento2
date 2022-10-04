import { GithubActionsMatrix } from "../matrix/matrix-type";

export type Repository = "https://upstream-mirror.mage-os.org" | "https://repo.magento.com";

/**
 * A placeholder value use to refer to the next version of Magento.
 * This value is just a placeholder, there is no "next" version (as of authoring).
 */
export const nextVersionPlaceHolder = "magento/project-community-edition:next";

/**
 * Get the next version of Magento, as determined by the repository.
 */
export const getNextVersion = (repository: Repository, date: Date) => {
    switch(repository){
        case "https://upstream-mirror.mage-os.org":
            // See: https://github.com/mage-os/generate-mirror-repo-js/blob/bbbdf1708ea0bf8fc845aad8240d00f37632b4a7/src/release-branch-build-tools.js#L71
            return `*`;
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

export const amendMatrixForNext = (matrix: GithubActionsMatrix, repository: Repository = "https://upstream-mirror.mage-os.org", date: Date = new Date()): GithubActionsMatrix => {
    matrix.magento = matrix.magento.map((item) => item === nextVersionPlaceHolder ? computeNextPackage(nextVersionPlaceHolder, repository, date) : item);
    matrix.include = matrix.include.map((item) => {
        return item.magento === nextVersionPlaceHolder 
            ? {
                ...item,
                magento: computeNextPackage(nextVersionPlaceHolder, repository, date),
            }
            : item;
    });
    return matrix;
}