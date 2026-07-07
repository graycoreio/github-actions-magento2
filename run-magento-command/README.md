# Run Magento Command

Runs `php bin/magento` inside the configured PHP container.

## Inputs

- container_id
- path
- command

## Example

```yaml
- uses: graycoreio/github-actions-magento2/run-magento-command@main
  with:
    container_id: ...
    path: ...
    command: cache:flush