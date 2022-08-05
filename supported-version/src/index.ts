import * as core from '@actions/core';
import { validateOrError } from './kind/compute-kind';
import { getMatrixForVersions } from './matrix/get-matrix-for-versions';
import { GithubActionsMatrix } from './matrix/matrix-type';

import latestJson from './kind/latest.json';
import currentlySupportedJson from './kind/currently-supported.json';

export async function run(): Promise<void> {
  try { 
    const kind = core.getInput("kind");
    validateOrError(kind);

    let matrix: GithubActionsMatrix;

    switch(kind){
      case 'latest': 
        matrix = getMatrixForVersions(latestJson);
        break;
      case 'currently-supported':
        matrix = getMatrixForVersions(currentlySupportedJson);
        break;
      case 'custom':
        matrix = getMatrixForVersions(core.getInput("custom_versions").split(","))
      default:
        throw new Error("Unreachable kind discovered, please report to the maintainers.");
    }

    core.setOutput('matrix', matrix);
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()