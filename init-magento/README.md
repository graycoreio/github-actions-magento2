# Init Magento

A Github Action that initializes a Magento project up until `composer install`.  This is extremely useful for getting Magento installations to a "common" point for further operations like Unit Tests, Installation Tests, and Integration Tests. 

This action will:

- Apply "CI" hotfixes which interfere with common CI pipeline operations.
- Create, store, and pull a common composer cache for re-use across other actions.

## Inputs

See the [action.yml](./action.yml)


### Usage for an extension

```yml
name: Do Something with Magento

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

env:
    magento_directory: ../magento2

jobs:
  compute_matrix:
    runs-on: ubuntu-latest
    steps:
      steps:
    - name: Set PHP Version
      uses: shivammathur/setup-php@v2
      with:
        php-version: 8.1
        tools: composer:v2

    - run: composer create-project --repository-url="https://repo.magento.com" "v2.4.5-p1" ${{ env.magento_directory }} --no-install
      shell: bash
      env:
        COMPOSER_AUTH: ${{ env.COMPOSER_AUTH }}
      name: Create Magento Project 

    - uses: graycoreio/github-actions-magento2/init-magento@main
      name: "Initialize Magento"
      with: 
        magento_directory: ${{ env.magento_directory }}

    - run: composer config repositories.local path $GITHUB_WORKSPACE
      name: Add Github Repo for Testing
      working-directory:  ${{ env.magento_directory }}
      shell: bash
    
    - run: composer require my/package "@dev" --no-update && composer install
      name: Require and attempt install
      working-directory:  ${{ env.magento_directory }}
      shell: bash
      env:
        COMPOSER_AUTH: ${{ env.COMPOSER_AUTH }}
```

### Usage for a Magento 2 Project

```yml
name: Do Something with Magento

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

env:
    magento_directory: ./

jobs:
  compute_matrix:
    runs-on: ubuntu-latest
    steps:
      steps:
    - name: Set PHP Version
      uses: shivammathur/setup-php@v2
      with:
        php-version: 8.1
        tools: composer:v2

    - uses: graycoreio/github-actions-magento2/init-magento@main
      name: "Initialize Magento"
      with: 
        magento_directory: ${{ env.magento_directory }}
    
    - run: composer install
      working-directory:  ${{ env.magento_directory }}
      shell: bash
      env:
        COMPOSER_AUTH: ${{ env.COMPOSER_AUTH }}
```

