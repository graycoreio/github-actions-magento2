import { GithubActionsMatrix } from "../matrix/matrix-type";
import { Repository } from "./repository";
import { unifyNextPackageName } from "./unify-next-package-name";

/**
 * A placeholder value use to refer to the next version of Magento.
 * This value is just a placeholder, there is no "next" version (as of authoring).
 */
export const nextVersionPlaceHolder = "next";

export const amendMatrixForNext = (matrix: GithubActionsMatrix, repository: Repository, date: Date = new Date()): GithubActionsMatrix => {
    const nextVersionRegExp = new RegExp(nextVersionPlaceHolder + '$');
    matrix.magento = matrix.magento.map((item) => item.match(nextVersionRegExp) ? unifyNextPackageName(item, repository, date) : item);
    matrix.include = matrix.include.map((item) => {
        return item.magento.match(nextVersionRegExp)
            ? {
                ...item,
                magento: unifyNextPackageName(item.magento, repository, date),
            }
            : item;
    });
    return matrix;
}