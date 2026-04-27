# Magento 2 GitHub Actions

<div align="center">

![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/graycoreio/github-actions-magento2)
[![Integration Test](https://github.com/graycoreio/github-actions-magento2/actions/workflows/_internal-integration.yaml/badge.svg)](https://github.com/graycoreio/github-actions-magento2/actions/workflows/_internal-integration.yaml)

</div>

Opinionated Github Actions and Workflows to make building, testing, and maintaining Magento 2 Modules easier.

- [README if you are new to Github Actions.](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions#the-components-of-github-actions)
- [What is a workflow?](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions#workflows)
- [What is an action?](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions#actions)

## Workflows

| Workflow Name                                                        | Description                                                                          |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [Integration Test](./.github/workflows/integration-README.md)        | A Github Workflow that runs the Integration Tests of a Magento Package               |
| [MageCheck Extension](./.github/workflows/check-extension-README.md) | A Github Workflow that runs various kinds of quality checks for a Magento Extension. |

## Actions

| Action Name                                                  | Description                                                                               |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| [Fix Magento Install](./fix-magento-install/README.md)       | A Github Action that fixes Magento before `composer install`                              |
| [Cache Magento](./cache-magento/README.md)                   | A Github Action that creates a composer cache for a Magento extension or store.           |
| [Setup Magento](./setup-magento/README.md)                   | A Github Action that sets up Magento before `composer install` for an extension or store. |
| [Get Magento Version](./get-magento-version/README.md)       | A Github Action that computes the installed Magento version.                              |
| [Get Composer Version](./get-composer-version/README.md)     | A Github Action that computes an installed Composer version.                              |
| [Coding Standard](./coding-standard/README.md)               | A Github Action that runs the Magento Coding Standard.                                    |
| [Semver Compare](./semver-compare/README.md)                 | A Github Action that semantically compares two versions                                   |
| [Supported Version](./supported-version/README.md)           | A Github Action that computes the currently supported Github Actions Matrix for Magento 2 |
