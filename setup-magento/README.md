# Setup Magento

A GitHub Action that prepares a Magento 2 environment for testing. It handles PHP setup and Magento project creation, stopping just before `composer install` so you can add custom repositories or packages.

## Modes

The action operates in two modes:

- **`extension`** (default): Creates a fresh Magento project in `../magento2` for testing your extension against. Use this when your repository contains a Magento module/extension.
- **`store`**: Uses your existing Magento project in the working directory. Use this when your repository is a full Magento store.

## Inputs

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `php-version` | Yes | `8.4` | PHP version to install |
| `mode` | Yes | `extension` | Either `extension` or `store` |
| `magento_version` | No | `magento/project-community-edition:2.4.8-p3` | Magento version to install (extension mode only) |
| `magento_repository` | No | `https://mirror.mage-os.org/` | Composer repository URL for Magento packages |
| `tools` | No | - | PHP tools to install globally (e.g., `composer:v2`) |
| `extensions` | No | - | Additional PHP extensions to install |
| `coverage` | No | - | Code coverage driver (e.g., `xdebug`, `pcov`) |
| `working-directory` | No | `.` | Working directory for the action |
| `apply_fixes` | No | `false` | Apply Magento installation fixes (always applied in extension mode) |
| `composer_auth` | No | - | Composer authentication credentials JSON |

## Outputs

| Output | Description |
|--------|-------------|
| `path` | Absolute path to the Magento installation directory |

## Usage

### Testing an Extension

Use `mode: extension` when your repository contains a Magento module. The action creates a fresh Magento instance and you can then require your extension into it.

```yml
name: Test Extension

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: graycoreio/github-actions-magento/setup-magento@main
        id: setup-magento
        with:
          php-version: "8.3"
          tools: composer:v2
          mode: extension
          magento_version: "magento/project-community-edition:2.4.8-p3"

      - name: Add local repository
        working-directory: ${{ steps.setup-magento.outputs.path }}
        run: composer config repositories.local path $GITHUB_WORKSPACE

      - name: Require extension
        working-directory: ${{ steps.setup-magento.outputs.path }}
        run: composer require vendor/my-extension "@dev"
        env:
          COMPOSER_AUTH: ${{ secrets.COMPOSER_AUTH }}
```

### Testing a Magento Store

Use `mode: store` when your repository is a complete Magento project.

```yml
name: Test Store

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: graycoreio/github-actions-magento/setup-magento@main
        id: setup-magento
        with:
          php-version: "8.3"
          tools: composer:v2
          mode: store

      - name: Install dependencies
        working-directory: ${{ steps.setup-magento.outputs.path }}
        run: composer install
        env:
          COMPOSER_AUTH: ${{ secrets.COMPOSER_AUTH }}
```

## Notes

- The action uses [shivammathur/setup-php](https://github.com/shivammathur/setup-php) for PHP installation
- By default, Magento packages are fetched from the [Mage-OS mirror](https://mirror.mage-os.org/) which doesn't require authentication
- For Adobe Commerce or private packages, provide `composer_auth` with your credentials