# MageCheck Store

A Github Workflow that runs various kinds of quality checks for a Magento Store.

Unlike [MageCheck Extension](./check-extension.md), this workflow automatically detects the Magento version from your store's `composer.lock` — no matrix computation required in the calling workflow.

## Inputs

See the [check-store.yaml](../../.github/workflows/check-store.yaml)

| Input               | Description                                                                            | Required | Default   |
| ------------------- | -------------------------------------------------------------------------------------- | -------- | --------- |
| path                | The folder of the Magento store that you are testing                                   | false    | .         |
| composer_cache_key  | A key to version the composer cache. Can be incremented if you need to bust the cache. | false    | \_mageos  |
| store_artifact_name | If provided, download store files from this artifact instead of using actions/checkout | false    | ""        |

## Secrets

| Input         | Description                                                                                                                             | Required | Default |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| composer_auth | Your composer credentials (typically a stringified json object of the contents of your auth.json)                                       | false    | NULL    |

## Checks Run

- **Unit Tests** — runs PHPUnit against custom code in `app/code`. Skipped automatically if no test files are found.
- **Coding Standard** — runs the Magento Coding Standard against `app/code`. Uses your `phpcs.xml` (or `.phpcs.xml`, `phpcs.xml.dist`, `.phpcs.xml.dist`) if one exists, otherwise a sensible default is generated.

## Usage

```yml
name: Check Store

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  check-store:
    uses: graycoreio/github-actions-magento8/.github/workflows/check-store.yaml@v7 # x-release-please-major
    secrets:
      composer_auth: ${{ secrets.COMPOSER_AUTH }}
```

### Usage with a store artifact

If your pipeline builds or prepares the store in a prior job and uploads it as an artifact, you can pass the artifact name instead of relying on `actions/checkout`:

```yml
jobs:
  check-store:
    uses: graycoreio/github-actions-magento8/.github/workflows/check-store.yaml@v7 # x-release-please-major
    secrets:
      composer_auth: ${{ secrets.COMPOSER_AUTH }}
```
