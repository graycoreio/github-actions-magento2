# Magento 2 GitHub Actions

<div align="center">

![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/graycoreio/github-actions-magento2)
[![Unit Test](https://github.com/graycoreio/github-actions-magento2/actions/workflows/_internal-unit.yaml/badge.svg)](https://github.com/graycoreio/github-actions-magento2/actions/workflows/_internal-unit.yaml)
[![Integration Test](https://github.com/graycoreio/github-actions-magento2/actions/workflows/_internal-integration.yaml/badge.svg)](https://github.com/graycoreio/github-actions-magento2/actions/workflows/_internal-integration.yaml)
[![Installation Test](https://github.com/graycoreio/github-actions-magento2/actions/workflows/_internal-install.yaml/badge.svg)](https://github.com/graycoreio/github-actions-magento2/actions/workflows/_internal-install.yaml)

</div>

Opinionated Github Actions and Workflows to make building, testing, and maintaining Magento 2 Modules easier.

* [README if you are new to Github Actions.](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions#the-components-of-github-actions)
* [What is a workflow?](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions#workflows)
* [What is an action?](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions#actions)

## Workflows

| Workflow Name                                                 | Description                                                            |
| ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [Integration Test](./.github/workflows/integration-README.md) | A Github Workflow that runs the Integration Tests of a Magento Package |

## Actions

| Action Name                                            | Description                                                                               |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| [Unit Test](./unit-test/README.md)                     | A Github Action that runs the Unit Tests a Magento Package                                |
| [Fix Magento Install](./fix-magento-install/README.md) | A Github Action that fixes Magento before `composer install`                              |
| [Get Magento Version](./get-magento-version/README.md) | A Github Action that computes the installed Magento version.                              |
| [Installation Test](./installation-test/README.md)     | A Github Action that tests the installability of a Magento Package                        |
| [Supported Version](./supported-version/README.md)     | A Github Action that computes the currently supported Github Actions Matrix for Magento 2 |