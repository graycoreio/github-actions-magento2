# Fix Magento Install Action

A Github Action caches Magento-y things in order to make CI faster. 

## Inputs


See the [action.yml](./action.yml)

| Input              | Description                                                                                                                                                                                           | Required | Default      |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------ |
| composer_cache_key | A key to version the composer cache. Can be incremented if you need to bust the cache.                                                                                                                | false    | '__graycore' |
| snapshot           | A boolean indicating whether or not to use a moment in time cache of Magento exactly as output by composer install. This will make installs faster, but will skip composer plugins. Use with caution. | false    | 'false'      |
| mode               | "The mode for setup, one of: `extension` or `store`."                                                                                                                                                 | true     | N/A          |
| magento_directory  | The Magento directory for the action to run against.                                                                                                                                                  | true     | N/A          |

### Modes and Snapshots

When snapshot is `false` the modes `extension` and `store` exactly the same and cache the `files-dir` of compose. 

However:

- When `snapshot` is `'true'` the `extension` mode will cache the entire `magento_directory` (assumed to be the the Magento store). 
- When `snapshot` is `'true'` the `store` mode will cache the `vendor` folder of the `magento_directory` (assumed to be the the Magento store). 

### Usage

```yml
name: Showcase Magento Cache

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
    - uses: graycoreio/github-actions-magento2/cache-magento@main
      with:
        magento_directory: $GITHUB_WORKSPACE 
        mode: 'store'
      id: cache-magento

    - run: composer install
      shell: bash
      name: Composer install
      if:  steps.cache-magento.outputs.cache-hit != 'true'
```