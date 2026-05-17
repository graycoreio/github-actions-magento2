import { ServiceConfig } from '../matrix/matrix-type';

export interface ServiceTemplate {
  getConfig(image: string): ServiceConfig;
}

export const mysqlConfig: ServiceTemplate = {
  getConfig(image: string): ServiceConfig {
    return {
      image,
      env: {
        MYSQL_DATABASE: 'magento_integration_tests',
        MYSQL_USER: 'user',
        MYSQL_PASSWORD: 'password',
        MYSQL_ROOT_PASSWORD: 'rootpassword'
      },
      ports: ['3306:3306'],
      options: '--health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3'
    };
  }
};

export const elasticsearchConfig: ServiceTemplate = {
  getConfig(image: string): ServiceConfig {
    return {
      image,
      env: {
        'discovery.type': 'single-node',
        'xpack.security.enabled': 'false',
        'xpack.security.http.ssl.enabled': 'false',
        'xpack.security.transport.ssl.enabled': 'false'
      },
      ports: ['9200:9200'],
      options: '--health-cmd "curl http://localhost:9200/_cluster/health" --health-interval 10s --health-timeout 5s --health-retries 10'
    };
  }
};

export const opensearchConfig: ServiceTemplate = {
  getConfig(image: string): ServiceConfig {
    return {
      image,
      env: {
        'discovery.type': 'single-node',
        'DISABLE_INSTALL_DEMO_CONFIG': 'true',
        'DISABLE_SECURITY_PLUGIN': 'true'
      },
      ports: ['9200:9200'],
      options: '--health-cmd "curl http://localhost:9200/_cluster/health" --health-interval 10s --health-timeout 5s --health-retries 10'
    };
  }
};

export const rabbitmqConfig: ServiceTemplate = {
  getConfig(image: string): ServiceConfig {
    return {
      image,
      env: {
        RABBITMQ_DEFAULT_USER: 'guest',
        RABBITMQ_DEFAULT_PASS: 'guest'
      },
      ports: ['5672:5672']
    };
  }
};

export const redisConfig: ServiceTemplate = {
  getConfig(image: string): ServiceConfig {
    return {
      image,
      ports: ['6379:6379']
    };
  }
};

export const valkeyConfig: ServiceTemplate = {
  getConfig(image: string): ServiceConfig {
    return {
      image,
      ports: ['6379:6379']
    };
  }
};

/**
 * Builds the nginx service config for the web tier. Takes the image
 * (sourced from the matrix entry's `nginx` field) and the runner
 * workspace path so the volume mount lands the Magento install at
 * `/var/www/html` inside the container. Pairs with `buildPhpFpmConfig`
 * — they're emitted together as the web tier.
 */
export const buildNginxConfig = (image: string, workspace: string): ServiceConfig => ({
  image,
  ports: ['80:80'],
  volumes: [`${workspace}:/var/www/html`],
  options: '--health-cmd "nginx -t" --health-interval=10s --health-retries=3 --health-timeout=5s --health-start-period=5s'
});

/**
 * Builds the php-fpm service config for the web tier. Composes the
 * image from the matrix entry's `php` version (the mappia magento-php
 * image stream is the only widely-used Magento-aware php-fpm image).
 * Pairs with `buildNginxConfig`.
 */
export const buildPhpFpmConfig = (phpVersion: string, workspace: string): ServiceConfig => ({
  image: `mappia/magento-php:fpm-alpine${phpVersion}`,
  volumes: [`${workspace}:/var/www/html`]
});
