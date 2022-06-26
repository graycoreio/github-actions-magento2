# Deploy Angular Universal to Vercel GitHub Actions

A Github Action that tests the installability of a Magento Package

## Inputs

See the [action.yml](./action.yml)

## Usage

```yml
name: Installation Test

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

jobs:
  install-test:
    strategy:
      matrix:
        magento:
          - magento/project-community-edition:>=2.3 <2.4
          - magento/project-community-edition:>=2.4.0 <2.4.1
          - magento/project-community-edition:>=2.4.1 <2.4.2
          - magento/project-community-edition:>=2.4.2 <2.4.3
          - magento/project-community-edition:>=2.4.3 <2.4.4
          - magento/project-community-edition:>=2.4.4 <2.4.5
          - magento/project-community-edition
        include:
          
          - magento: magento/project-community-edition:>=2.3 <2.4
            php_version: 7.4
            composer_version: 1
          
          - magento: magento/project-community-edition:>=2.4.0 <2.4.1
            php_version: 7.4
            composer_version: 1
          
          - magento: magento/project-community-edition:>=2.4.1 <2.4.2
            php_version: 7.4
            composer_version: 1

          - magento: magento/project-community-edition:>=2.4.2 <2.4.3
            php_version: 7.4
            composer_version: 2

          - magento: magento/project-community-edition:>=2.4.3 <2.4.4
            php_version: 7.4
            composer_version: 2

          - magento: magento/project-community-edition:>=2.4.4 <2.4.5
            php_version: 8.1
            composer_version: 2

          - magento: magento/project-community-edition 
            composer_version: 2
            php_version: 8.1

    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: graycoreio/github-actions-magento2/installation-test@main
      with:
        composer_version: ${{ matrix.composer_version }}
        php_version: ${{ matrix.php_version }}
        magento_version: ${{ matrix.magento }}
        composer_auth: ${{ secrets.COMPOSER_AUTH }}
        package_name: YOUR_PACKAGE_NAME
        source_folder: $GITHUB_WORKSPACE
```
