import * as core from '@actions/core';
import { validateOrError } from './kind/compute-kind';
import { getMatrixForKind } from './matrix/get-matrix-for-kind';


export async function run(): Promise<void> {
  try { 
    const kind = core.getInput("kind");
    validateOrError(kind);

    const customVersions = core.getInput("custom_versions");

    core.setOutput('matrix', getMatrixForKind(kind, customVersions));
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()