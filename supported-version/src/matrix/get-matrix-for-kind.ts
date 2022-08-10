import { getMatrixForVersions } from "./get-matrix-for-versions";

import latestJson from '../kind/latest.json';
import currentlySupportedJson from '../kind/currently-supported.json';
import allVersions from '../versions/individual.json';

export const getMatrixForKind = (kind: string, versions: string = "") => {
    switch(kind){
        case 'latest': 
          return getMatrixForVersions(latestJson);
        case 'currently-supported':
          return getMatrixForVersions(currentlySupportedJson);
        case 'all':
          return getMatrixForVersions(Object.keys(allVersions));
        case 'custom':
          return getMatrixForVersions(versions.split(","))
        default:
          throw new Error(`Unreachable kind: ${kind} discovered, please report to the maintainers.`);
      }
}