import { getNextVersion } from "./get-next-version";
import { Repository } from "./repository";

/**
 * Unify the next package name for the "nightly" version of a given repository and package name.
 * 
 * Internally, we call this "next". 
 * - MageOS calls this "alpha". 
 * - Adobe calls this "beta". 
 * 
 * Someone else may call it something else. This may even differ per package repository 
 * (Packagist vs. MageOS Mirror vs. Some other mirror).
 * 
 * If the version isn't a "next" version, unifyNextPackageName will ignore it 
 * and return the original package name.
 */
export const unifyNextPackageName = (packageName: string, repository: Repository, date: Date): string => {
    return packageName.replace(/(?!:)next$/, getNextVersion(repository, date));
}