import * as core from '@actions/core';
import * as fs from 'fs';
import * as nodePath from 'path';
import { assertKind } from './kind';
import { parseMatrixInput, parseRawConfig } from './parse';
import { resolveConfig } from './resolve';

export const run = async (): Promise<void> => {
  try {
    const kind = assertKind(core.getInput('kind', { required: true }));
    const matrix = parseMatrixInput(core.getInput('matrix', { required: true }));
    const configPath = core.getInput('config_path') || `.github/check-${kind}.json`;
    const workspace = process.env.GITHUB_WORKSPACE || process.cwd();
    const absolute = nodePath.resolve(workspace, configPath);

    let raw = {};
    if (fs.existsSync(absolute)) {
      const text = fs.readFileSync(absolute, 'utf-8');
      raw = parseRawConfig(text);
      core.info(`resolve-check-config: read ${absolute}`);
    } else {
      core.info(`resolve-check-config: ${absolute} not found — emitting defaults for every known job`);
    }

    const resolved = resolveConfig(raw, kind, matrix);

    core.setOutput('resolved', JSON.stringify(resolved));
  } catch (error) {
    core.setFailed((error as Error).message);
  }
}

run();
