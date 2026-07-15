# Magento 2 Supported Versions

A GitHub Action that computes the currently supported GitHub Actions Matrix for Magento 2 Versions

All data comes from:

- [v2.3](https://github.com/magento/devdocs/blob/master/src/_data/codebase/v2_3/system-requirements.yml)
- [v2.4](https://github.com/magento/devdocs/blob/master/src/_data/codebase/v2_4/system-requirements.yml)

## Inputs

See the [action.yml](./action.yml)

| Input           | Description                                                                                                                                                  | Required | Default               |
|-----------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |-----------------------|
| kind            | The "kind" of support you're targeting for your package. See [Kinds](#kinds).                                                                                | false    | 'currently-supported' |
| project         | The project to return the supported versions for. Allowed values are `mage-os`, `mage-os-minimal`, and `magento-open-source`                 | false    | 'magento-open-source' |
| custom_versions | The versions you want to support, as a comma-separated string, i.e. 'magento/project-community-edition:2.3.7-p3, magento/project-community-edition:2.4.2-p2' | false    | ''                    |
| recent_time_frame | The time frame (from today) used when `kind` is `recent`. Combination of years (y), months (m), and days (d), e.g. `2y 2m 2d`.                               | false    | '2y'                  |
| include_services | Whether to include a `services` key in each matrix entry with GitHub Actions service container configurations for MySQL, search engine, RabbitMQ, and cache.  | false    | 'true'                |
| service_preferences | Comma-separated list of service implementations to prefer (e.g. `elasticsearch,valkey`). See [Service preferences](#service-preferences).                  | false    | ''                    |

## Kinds
- `currently-supported` - The currently supported Magento Open Source versions by Adobe.
- `latest` - The latest version of Magento only.
- `custom` - A custom subset of the versions, as specified by you. Requires `custom_versions` sibling key.
- `usable` - All versions of Magento, minus any that can no longer be installed or used under normal circumstances.
- `nightly` - The nightly version of Magento (only available via `https://upstream-nightly.mage-os.org`)
- `recent` - Versions released within a configurable time window from today (see `recent_time_frame`).
- `all` - All versions of Magento (including patched/unpatched versions).

## Projects
- `mage-os`
- `mage-os-minimal`
- `magento-open-source` (default)

## Service preferences

When `include_services: true` (the default), each matrix entry is enriched with a `services` map. Some tiers of services (for example, search) have more than one valid implementation across the supported Magento versions:

- **search**: `opensearch` or `elasticsearch`
- **cache**: `valkey` or `redis`

By default the action picks `opensearch` over `elasticsearch` and `valkey` over `redis` wherever both are available for the matrix entry's Magento version. `service_preferences` lets the caller override that default pick by naming the implementation they want.

Tiers without a preference fall back to the per-version default pick. Your preferences are **selective**, not **exclusive**.

### Format

A comma-separated list of service implementation names. Whitespace around names is tolerated.

```yml
with:
  service_preferences: elasticsearch,valkey
```

### Accepted names

| Name             | Tier   |
|------------------|--------|
| `mysql`          | db     |
| `elasticsearch`  | search |
| `opensearch`     | search |
| `rabbitmq`       | queue  |
| `redis`          | cache  |
| `valkey`         | cache  |

### Example

```yml
- uses: graycoreio/github-actions-magento2/supported-version@v8.9.0 # x-release-please-version
  id: supported-version
  with:
    kind: currently-supported
    service_preferences: opensearch,valkey
```

## Usage

```yml
name: Use Supported Versions

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
      - uses: graycoreio/github-actions-magento2/supported-version@v8.9.0 # x-release-please-version
        id: supported-version
      - run: echo ${{ steps.supported-version.outputs.matrix }}
```
