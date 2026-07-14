# MageCheck Extension

A Github Workflow that runs various kinds of quality checks for a Magento Extension.

## Inputs

See the [check-extension.yaml](../../.github/workflows/check-extension.yaml)

| Input              | Description                                                                                                                                     | Required | Default                     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------- |
| matrix             | JSON string of [version matrix for Magento](./#matrix-format)                                                                                   | true     | NULL                        |
| fail-fast          | Same as Github's [fail-fast](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategyfail-fast) | false    | true                        |
| path               | The folder of the Magento store or extension that you are testing                                                                               | false    | .                           |
| magento_repository | Where to install Magento from                                                                                                                   | false    | https://mirror.mage-os.org/ |
| composer_cache_key | A key to version the composer cache. Can be incremented if you need to bust the cache.                                                          | false    | \_mageos                    |

### Matrix Format

The Magento matrix format outlined by the [supported versions action.](https://github.com/graycoreio/github-actions-magento2/tree/main/supported-version/supported.json)

## Configuration

Each check can be toggled on/off through an optional `.github/check-extension.json` file in the repo that calls this workflow. 

You can learn more about this file here in the [`resolve-check-config` action.](../../resolve-check-config/README.md): 

Reference the published JSON Schema with `$schema` to get autocompletion and inline validation in editors that support it — see [`check-extension.schema.json`](../../resolve-check-config/check-extension.schema.json):

```json
{
  "$schema": "https://raw.githubusercontent.com/graycoreio/github-actions-magento2/main/resolve-check-config/check-extension.schema.json",
  "jobs": {
    "integration_test": false
  }
}
```

## Usage

```yml
name: Unit Test

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  compute_matrix:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.supported-version.outputs.matrix }}
    steps:
      - uses: actions/checkout@v6
      - uses: graycoreio/github-actions-magento2/supported-version@v8.8.0 # x-release-please-version
        id: supported-version
      - run: echo ${{ steps.supported-version.outputs.matrix }}
  check-extension:
    needs: compute_matrix
    uses: graycoreio/github-actions-magento2/.github/workflows/check-extension.yaml@v8.8.0 # x-release-please-version
    with:
      matrix: ${{ needs.compute_matrix.outputs.matrix }}
```
