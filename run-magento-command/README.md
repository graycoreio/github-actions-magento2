# Run Magento Command

Runs `php bin/magento <command>` on the runner, or inside a PHP service container when `container_id` is set.

## Inputs

See [action.yml](./action.yml).

## Example

```yaml
- uses: graycoreio/github-actions-magento2/run-magento-command@main
  with:
    path: ${{ steps.setup-magento.outputs.path }}
    command: cache:flush
```

```yaml
- uses: graycoreio/github-actions-magento2/run-magento-command@main
  with:
    container_id: ${{ job.services['php-fpm'].id }}
    path: ${{ steps.setup-magento.outputs.path }}
    command: cache:flush
```
