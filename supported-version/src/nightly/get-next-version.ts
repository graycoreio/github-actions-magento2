import { Repository } from "./repository";

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
            return "next";
    }
}