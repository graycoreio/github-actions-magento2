# "Resolve Check Config" Action

Reads `.github/check-<kind>.json` (or a path you specify), validates job names against the known list for the selected workflow kind, and emits a per-job filtered version of the `supported-version` matrix. Each job in the output carries an `enabled` flag and its own `matrix`, where every entry's `services` map has been narrowed to the tiers that job actually needs. Consumers gate each job with `fromJSON(...)['<job>'].enabled != false` and feed `fromJSON(...)['<job>'].matrix` into `strategy.matrix`.

A missing config file is fine — every known job is emitted with its default tier list.

## Schemas

Reference the published JSON Schema from your config's `$schema` key for autocompletion and inline validation in editors that support it:

- [`check-store.schema.json`](./check-store.schema.json) — config for the [MageCheck Store](../docs/workflows/check-store.md) workflow
- [`check-extension.schema.json`](./check-extension.schema.json) — config for the [MageCheck Extension](../docs/workflows/check-extension.md) workflow 

## Inputs

| Input         | Description                                                                                                                                            | Required | Default                       |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|----------|-------------------------------|
| `kind`        | Which reusable workflow this config belongs to: `store` or `extension`. Selects the default `config_path`, the known-job list, and the per-job tier defaults. | true     |                               |
| `matrix`      | The matrix JSON emitted by the `supported-version` action. Each entry's `services` map is filtered per-job based on the resolved tier list.            | true     |                               |
| `config_path` | Path to the check-config JSON file, relative to the runner workspace.                                                                                  | false    | `.github/check-<kind>.json`   |

## Usage

```yml
jobs:
  compute_matrix:
    runs-on: ubuntu-latest
    outputs:
      resolved: ${{ steps.resolve.outputs.resolved }}
    steps:
      - uses: graycoreio/github-actions-magento2/supported-version@v8.8.0 # x-release-please-version
        id: supported-version
        with:
          kind: currently-supported

      - uses: graycoreio/github-actions-magento2/resolve-check-config@v8.8.0 # x-release-please-version
        id: resolve
        with:
          kind: store
          matrix: ${{ steps.supported-version.outputs.matrix }}

  smoke-test:
    runs-on: ${{ matrix.os }}
    needs: compute_matrix
    if: ${{ fromJSON(needs.compute_matrix.outputs.resolved)['smoke-test'].enabled != false }}
    services: ${{ matrix.services }}
    strategy:
      matrix: ${{ fromJSON(needs.compute_matrix.outputs.resolved)['smoke-test'].matrix }}
    steps:
      - run: echo "running with ${{ toJSON(matrix.services) }}"
```

Example `.github/check-store.json` for opting out of a specific job:

```json
{
  "$schema": "https://raw.githubusercontent.com/graycoreio/github-actions-magento2/main/resolve-check-config/check-store.schema.json",
  "jobs": {
    "coding-standard": false
  }
}
```
