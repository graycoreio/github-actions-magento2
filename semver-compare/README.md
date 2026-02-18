# "Semver Compare" Action

A Github Action that semantically compares two versions, like 2.1.1 and 2.3.0 giving information about whether or the version is "higher" or "lower" than another version. The action exposes an output called `result` which will match the return type of the PHP [version_compare](https://www.php.net/manual/en/function.version-compare.php) function.

Currently, this action compares `version` against `compare_against` and returns:

- `-1` - if `version` is lower than `compare_against`
- `0` - if `version` is equal to `compare_against`
- `1` - if `version` is greater than `compare_against`

## Inputs

See the [action.yml](./action.yml)

## Usage

```yml
name: Semver Compare

on:
  push:
    branches:
    - main
  pull_request:
    branches:
    - main

jobs:
  version:
    runs-on: ubuntu-latest
    name: A job to semantically compare two versions
    steps:
      - uses: actions/checkout@v6
      - uses: graycoreio/github-actions-magento2/semver-compare@main
        with:
          version: 2.1.0
          compare_against: 2.2.3
          id: semver-compare
      - run: echo version ${{ steps.semver-compare.outputs.result }}
        shell: bash
```
