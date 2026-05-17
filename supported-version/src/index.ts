import * as core from '@actions/core';
import { validateKind } from './kind/validate-kinds';
import { getMatrixForKind } from './matrix/get-matrix-for-kind';
import { validateProject } from "./project/validate-projects";
import { buildServicesForEntry } from "./services/build-services";
import { parseServicePreferences, validatePreferencesAgainstMatrix } from "./services/preferences";


export async function run(): Promise<void> {
  try {
    const kind = core.getInput("kind");
    const customVersions = core.getInput("custom_versions");
    const project = core.getInput("project");
    const recent_time_frame = core.getInput("recent_time_frame");
    const include_services = core.getInput("include_services") === "true";
    const service_preferences_raw = core.getInput("service_preferences");

    validateProject(<any>project)

    validateKind(<any>kind, customVersions ? customVersions.split(',') : undefined);

    const preferences = parseServicePreferences(service_preferences_raw);
    const hasPreferences = Object.keys(preferences).length > 0;

    if (!include_services && hasPreferences) {
      throw new Error(
        'service_preferences cannot be combined with include_services: false. Set include_services: true or clear service_preferences.'
      );
    }

    let matrix = getMatrixForKind(kind, project, customVersions, recent_time_frame);

    if (include_services) {
      if (hasPreferences) {
        validatePreferencesAgainstMatrix(preferences, matrix.include);
      }
      const workspace = process.env.GITHUB_WORKSPACE || '';
      matrix = {
        magento: matrix.magento,
        include: matrix.include.map((entry) => ({
          ...entry,
          services: buildServicesForEntry(entry, preferences, workspace)
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
