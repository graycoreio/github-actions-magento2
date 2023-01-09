import { getMatrixForVersions } from "./get-matrix-for-versions";

import latestJson from '../kind/latest.json';
import allVersions from '../versions/individual.json';
import nightly from '../kind/nightly.json';
import { amendMatrixForNext } from "../nightly/get-next-version";
import { getDayBefore } from '../nightly/get-day-before';
import { getCurrentlySupportedVersions } from "../kind/get-currently-supported";

export const getMatrixForKind = (kind: string, versions = "") => {
    switch(kind){
        case 'latest': 
          return getMatrixForVersions(latestJson);
        case 'currently-supported':
          return getMatrixForVersions(getCurrentlySupportedVersions(new Date()));
        case 'nightly':
          return amendMatrixForNext(getMatrixForVersions(nightly), 'https://upstream-mirror.mage-os.org', getDayBefore());
        case 'all':
          return getMatrixForVersions(Object.keys(allVersions));
        case 'custom':
          return getMatrixForVersions(versions.split(","))
        default:
          throw new Error(`Unreachable kind: ${kind} discovered, please report to the maintainers.`);
      }
}