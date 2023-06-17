# Cache Magento Action

A Github Action that creates a composer cache for a Magento extension or store.

## Inputs


See the [action.yml](./action.yml)

| Input              | Description                                                                            | Required | Default      |
| ------------------ | -------------------------------------------------------------------------------------- | -------- | ------------ |
| composer_cache_key | A key to version the composer cache. Can be incremented if you need to bust the cache. | false    | '__mageos' |
| mode               | "The mode for setup, one of: `extension` or `store`."                                  | true     | N/A          |
| magento_directory  | The Magento directory for the action to run against.                                   | true     | N/A          |

### Usage

```yml
name: Magento Cache

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

jobs:
  showcase_cache:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: mage-os/github-actions/cache-magento@main
      with:
        magento_directory: $GITHUB_WORKSPACE 
        mode: 'store'
      id: cache-magento

    - run: composer install
      shell: bash
      name: Composer install
```
