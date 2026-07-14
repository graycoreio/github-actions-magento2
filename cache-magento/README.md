# Cache Magento Action

A Github Action that creates a composer cache for a Magento extension or store.

## Inputs

See the [action.yml](./action.yml)

| Input                | Description                                                                            | Required | Default    |
| -------------------- | -------------------------------------------------------------------------------------- | -------- | ---------- |
| `composer_cache_key` | A key to version the composer cache. Can be incremented if you need to bust the cache. | false    | `__mageos` |
| `working-directory`  | The directory where Magento is installed (location of `vendor/` and `composer.lock`).  | false    | `.`        |
| `stamp`              | Cache the `vendor/` directory in addition to the Composer download cache.              | false    | `false`    |

## Cache keys

The download cache key has the format:

```
composer | v5.8 | <os> | <composer_cache_key> | <composer-version> | <php-version>
```

When `stamp: true`, the `vendor/` cache key has the format:

```
composer | stamp | v5.8 | <os> | <composer_cache_key> | <composer-version> | <php-version> | <composer.lock-hash>
```

The `composer.lock` hash is derived from `working-directory/composer.lock` using `hashFiles`. The download key also gains the hash suffix when a Magento product package is detected at `working-directory`.

## Usage

### Extension (download cache only)

```yml
- uses: graycoreio/github-actions-magento2/cache-magento@v8.8.0 # x-release-please-version
  with:
    composer_cache_key: ${{ inputs.composer_cache_key }}
```

### Extension or store (download + vendor stamp cache)

```yml
- uses: graycoreio/github-actions-magento2/setup-magento@v8.8.0 # x-release-please-version
  id: setup-magento
  with:
    mode: extension # or store
    # ...

- uses: graycoreio/github-actions-magento2/cache-magento@v8.8.0 # x-release-please-version
  with:
    composer_cache_key: ${{ inputs.composer_cache_key }}
    working-directory: ${{ steps.setup-magento.outputs.path }}
    stamp: true

- run: composer install
  working-directory: ${{ steps.setup-magento.outputs.path }}
```

### Stamp Mode

On a warm cache hit, `composer install` completes in ~0s because `vendor/` is already present — Composer sees everything installed and exits immediately. For a full Magento install this saves 2–5 minutes of package extraction per job.

The trade-off is size. The `vendor/` directory for a Magento project runs 300–600 MB, so a frequent cache miss means you are consistently paying the upload cost without recouping it on the next run.

As such, use `stamp: true` when `composer.lock` is stable across most runs — a store on a release branch, or extension CI against a pinned Magento version. Skip it when the lock changes often or when runner storage is constrained.

> [!WARNING]
> **Dependabot / Renovate:** Each time a Dependabot or Renovate PR is merged, the remaining open PRs rebase and each produces a new `composer.lock`. This cascades into a large number of unique cache entries, inflating storage costs without delivering proportional compute savings — because automated PRs are not waiting on fast feedback. The fix is to disable stamp caching for automated dependency PRs entirely:
>
> ```yml
> - uses: graycoreio/github-actions-magento2/cache-magento@v8.8.0 # x-release-please-version
>   with:
>     stamp: ${{ github.actor != 'dependabot[bot]' }}
> ```
>
> If you use Renovate, check its bot account name and adjust the condition accordingly. Dependabot PRs will pay full `composer install` time on every run, which is acceptable — nobody is waiting on them.
