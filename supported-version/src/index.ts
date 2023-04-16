import * as core from '@actions/core';
import { validateKind } from './kind/validate-kinds';
import { getMatrixForKind } from './matrix/get-matrix-for-kind';


export async function run(): Promise<void> {
  try { 
    const kind = core.getInput("kind");
    const customVersions = core.getInput("custom_versions");

    validateKind(<any>kind, customVersions.split(','));

    core.setOutput('matrix', getMatrixForKind(kind, customVersions));
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()