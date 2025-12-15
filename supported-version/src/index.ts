import * as core from '@actions/core';
import { validateKind } from './kind/validate-kinds';
import { getMatrixForKind } from './matrix/get-matrix-for-kind';
import { validateProject } from "./project/validate-projects";
import { buildServicesForEntry } from "./services/build-services";


export async function run(): Promise<void> {
  try {
    const kind = core.getInput("kind");
    const customVersions = core.getInput("custom_versions");
    const project = core.getInput("project");
    const recent_time_frame = core.getInput("recent_time_frame");
    const include_services = core.getInput("include_services") === "true";

    validateProject(<any>project)

    validateKind(<any>kind, customVersions ? customVersions.split(',') : undefined);

    let matrix = getMatrixForKind(kind, project, customVersions, recent_time_frame);

    if (include_services) {
      matrix = {
        magento: matrix.magento,
        include: matrix.include.map((entry) => ({
          ...entry,
          services: buildServicesForEntry(entry)
        }))
      };
    }

    core.setOutput('matrix', matrix);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()