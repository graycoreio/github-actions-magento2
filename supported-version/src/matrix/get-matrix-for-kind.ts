import { getMatrixForVersions } from "./get-matrix-for-versions";

import latestJson from '../kind/latest.json';
import currentlySupportedJson from '../kind/currently-supported.json';

export const getMatrixForKind = (kind: string, versions: string = "") => {
    switch(kind){
        case 'latest': 
          return getMatrixForVersions(latestJson);
        case 'currently-supported':
          return getMatrixForVersions(currentlySupportedJson);
        case 'custom':
          return getMatrixForVersions(versions.split(","))
        default:
          throw new Error(`Unreachable kind: ${kind} discovered, please report to the maintainers.`);
      }
}