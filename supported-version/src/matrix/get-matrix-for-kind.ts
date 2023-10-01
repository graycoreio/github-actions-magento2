import { getMatrixForVersions } from "./get-matrix-for-versions";
import { getIndividualVersionsForProject } from "../versions/get-versions-for-project";
import latestJson from '../kind/special-versions/latest.json';
import nightlyJson from '../kind/special-versions/nightly.json';
import { getDayBefore } from '../nightly/get-day-before';
import { getCurrentlySupportedVersions } from "../kind/get-currently-supported";
import { amendMatrixForNext } from "../nightly/amend-matrix-for-next";

export const getMatrixForKind = (kind: string, project: string, versions = "") => {
    
    switch(kind){
        case 'latest': 
          return getMatrixForVersions(project, latestJson[project]);
        case 'currently-supported':
          return getMatrixForVersions(project, getCurrentlySupportedVersions(project, new Date()));
        case 'nightly':
          return amendMatrixForNext(getMatrixForVersions(project, nightlyJson[project]), 'https://upstream-nightly.mage-os.org', getDayBefore());
        case 'all':
          return getMatrixForVersions(project, Object.keys(getIndividualVersionsForProject(project)));
        case 'custom':
          return getMatrixForVersions(project, versions.split(","))
        default:
          throw new Error(`Unreachable kind: ${kind} discovered, please report to the maintainers.`);
      }
}