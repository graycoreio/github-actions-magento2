# Configure Service Nginx

A GitHub Action that pushes a Magento-aware nginx configuration into an **already-running nginx service container**, reloads it, and waits for the container's healthcheck to pass.

The action does **not** start nginx. It assumes the calling workflow declared nginx as a `services:` container (typically alongside `php-fpm`, and other mandatory Magento services).

The shipped `default.conf` is a thin outer wrapper that defines a `fastcgi_backend` upstream pointing at `php-fpm:9000`, sets `$MAGE_ROOT`, and includes Magento's own `nginx.conf.sample` from your own Magento install. All real routing rules come from Magento's bundled file.

## When to use this

Use this action when you have a workflow that:

1. Boots nginx as `services:` containers with the workspace bind-mounted at `/var/www/html`, and
2. Wants those containers to actually serve a Magento store you've already installed into the workspace (e.g. for end-to-end smoke tests, integration tests, or any HTTP-driven check).

You do **not** need this action if:

- You're not running nginx at all (unit tests, coding standards, static analysis).
- nginx is started by something other than a GitHub Actions `services:` block
- You've already configured nginx some other way and don't need a Magento-ready outer config.

## Prerequisites

- An nginx service container is running on the same Docker host as the runner, with an image matching the `image` input.
- A `php-fpm` container, the included `default.conf` will set up a fast-cgi backend to `php-fpm:9000`.
- The runner's workspace (`$GITHUB_WORKSPACE`) is bind-mounted into the nginx container at `/var/www/html`.
- A Magento install exists at `${{ inputs.magento_path }}` relative to the workspace, with `nginx.conf.sample` present (it ships with Magento by default after `composer install`).

## Inputs

| Input                    | Required | Default | Description                                                                                                                                          |
| ------------------------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `container_id`           | Yes      | —       | The ID of the running nginx service container. Pass `${{ job.services.nginx.id }}` (replace `nginx` with whatever you named the service).            |
| `magento_path`           | No       | `.`     | Path to the Magento store, relative to the GitHub workspace. Combined with the `/var/www/html` mount prefix to compute the in-container `MAGE_ROOT`. |
| `health_timeout_seconds` | No       | `10`    | How long to wait for nginx to report `healthy` after the config is pushed and the container restarts.                                                |

## Usage

```yml
jobs:
  smoke-test:
    runs-on: ubuntu-latest
    services:
      ## There are other service requirements for Magento, but this is just for the explanation of this service
      nginx:
        image: nginx:1.27-alpine
        ports: ["80:80"]
        volumes:
          - ${{ github.workspace }}:/var/www/html
        options: --health-cmd "nginx -t" --health-interval=10s --health-retries=3
    steps:
      - uses: actions/checkout@v6
      - uses: graycoreio/github-actions-magento2/setup-magento@main
        id: setup-magento
        with:
          mode: store
      - run: composer install
        working-directory: ${{ steps.setup-magento.outputs.path }}
      - uses: graycoreio/github-actions-magento2/setup-install@main
        with:
          services: ${{ toJSON(matrix.services) }}
          path: ${{ steps.setup-magento.outputs.path }}
          container_id: ${{ job.services['php-fpm'].id }}
      - uses: graycoreio/github-actions-magento2/configure-service-nginx@main
        with:
          container_id: ${{ job.services.nginx.id }}
          magento_path: ${{ inputs.path }}
      - uses: graycoreio/github-actions-magento2/smoke-test@main
        with:
          kind: page
```
