# Integration Tests for a Magento Package

A Github Workflow that runs the Integration Tests of a Magento Package

## Inputs

See the [integration.yaml](./integration.yaml)

| Input              | Description                                                   | Required | Default                       |
| ------------------ | ------------------------------------------------------------- | -------- | ----------------------------- |
| matrix             | JSON string of [version matrix for Magento](./#matrix-format) | true     | NULL                          |
| package_name       | The name of the package                                       | true     | NULL                          |
| source_folder      | The source folder of the package                              | false    | $GITHUB_WORKSPACE             |
| magento_directory  | The folder where Magento will be installed                    | false    | ../magento2                   |
| magento_repository | Where to install Magento from                                 | false    | https://mirror.mage-os.org/   |
| test_command       | The integration test command to run                           | false    | "../../../vendor/bin/phpunit" |

## Secrets
| Input         | Description                                                                                                                             | Required | Default |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- |
| composer_auth | JSON string of [composer credentials]([#./matrix-format](https://devdocs.magento.com/guides/v2.4/install-gde/prereq/connect-auth.html)) | true     | NULL    |

###  Matrix Format

The Magento matrix format outlined by the [supported versions action.](https://github.com/graycoreio/github-actions-magento2/tree/main/supported-version/supported.json) 


## Usage

```yml
name: Integration Test

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
        - uses: actions/checkout@v2
        - uses: graycoreio/github-actions-magento2/supported-version@main
          id: supported-version
        - run: echo ${{ steps.supported-version.outputs.matrix }}
  integration-workflow:
    needs: compute_matrix
    uses: graycoreio/github-actions-magento2/.github/workflows/integration.yaml@main
    with:
      package_name: my-vendor/package
      matrix: ${{ needs.compute_matrix.outputs.matrix }}
      test_command: ../../../vendor/bin/phpunit ../../../vendor/my-vendor/package/Test/Integration
    secrets:
      composer_auth: ${{ secrets.COMPOSER_AUTH }}
```
