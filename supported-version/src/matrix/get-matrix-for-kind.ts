import { getMatrixForVersions } from "./get-matrix-for-versions";

import latestJson from '../kind/latest.json';
import currentlySupportedJson from '../kind/currently-supported.json';
import allVersions from '../versions/individual.json';
import nightlyNow from '../kind/nightly-now.json';
import nightly from '../kind/nightly.json';
import { amendMatrixForNext } from "../nightly/get-next-version";
import { getDayBefore } from '../nightly/get-day-before';

export const getMatrixForKind = (kind: string, versions: string = "") => {
    switch(kind){
        case 'latest': 
          return getMatrixForVersions(latestJson);
        case 'currently-supported':
          return getMatrixForVersions(currentlySupportedJson);
        case 'nightly':
          return amendMatrixForNext(getMatrixForVersions(nightly), 'https://upstream-mirror.mage-os.org', getDayBefore());
        case 'nightly-now':
          return amendMatrixForNext(getMatrixForVersions(nightlyNow), 'https://upstream-mirror.mage-os.org', new Date());
        case 'all':
          return getMatrixForVersions(Object.keys(allVersions));
        case 'custom':
          return getMatrixForVersions(versions.split(","))
        default:
          throw new Error(`Unreachable kind: ${kind} discovered, please report to the maintainers.`);
      }
}