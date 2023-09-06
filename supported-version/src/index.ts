import * as core from '@actions/core';
import { validateKind } from './kind/validate-kinds';
import { getMatrixForKind } from './matrix/get-matrix-for-kind';
import { validateProject } from "./project/validate-projects";


export async function run(): Promise<void> {
  try { 
    const kind = core.getInput("kind");
    const customVersions = core.getInput("custom_versions");
    const project = core.getInput("project");
    
    validateProject(<any>project)

    validateKind(<any>kind, customVersions ? customVersions.split(',') : undefined);

    core.setOutput('matrix', getMatrixForKind(kind, project, customVersions));
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()