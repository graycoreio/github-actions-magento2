export interface ServiceConfig {
    image: string;
    env?: Record<string, string>;
    ports?: string[];
    options?: string;
    volumes?: string[];
}

export interface Services {
    mysql?: ServiceConfig;
    opensearch?: ServiceConfig;
    elasticsearch?: ServiceConfig;
    rabbitmq?: ServiceConfig;
    redis?: ServiceConfig;
    valkey?: ServiceConfig;
    'php-fpm'?: ServiceConfig;
}

const BASE_ARGS = [
    '--base-url=http://localhost/',
    '--admin-user=admin',
    '--admin-password=admin123',
    '--admin-email=admin@example.com',
    '--admin-firstname=Admin',
    '--admin-lastname=User',
    '--backend-frontname=admin',
    '--no-interaction',
];

const parsePort = (svc: ServiceConfig | undefined, index: 0 | 1, fallback: string): string => {
    return svc?.ports?.[0]?.split(':')[index] ?? fallback;
};

export const buildMysqlPrepArgs = (mysql: ServiceConfig): string[] => {
    const rootPassword = mysql.env?.MYSQL_ROOT_PASSWORD ?? 'rootpassword';
    const port = parsePort(mysql, 0, '3306');
    return ['-h127.0.0.1', `--port=${port}`, '-uroot', `-p${rootPassword}`, '-e', 'SET GLOBAL log_bin_trust_function_creators = 1;'];
};

export const buildInstallArgs = (services: Services | null, containerMode = false): string[] => {
    const args = [...BASE_ARGS];

    if (!services) return args;

    const portIdx: 0 | 1 = containerMode ? 1 : 0;
    const hostFor = (alias: string): string => containerMode ? alias : 'localhost';

    if (services.mysql) {
        const dbPort = parsePort(services.mysql, portIdx, '3306');
        const dbHost = containerMode ? `mysql:${dbPort}` : `127.0.0.1:${dbPort}`;
        args.push(
            `--db-host=${dbHost}`,
            `--db-name=${services.mysql.env?.MYSQL_DATABASE ?? 'magento'}`,
            `--db-user=${services.mysql.env?.MYSQL_USER ?? 'magento'}`,
            `--db-password=${services.mysql.env?.MYSQL_PASSWORD ?? 'magento'}`,
        );
    }

    if (services.opensearch) {
        const port = parsePort(services.opensearch, portIdx, '9200');
        args.push(
            '--search-engine=opensearch',
            `--opensearch-host=${hostFor('opensearch')}`,
            `--opensearch-port=${port}`,
        );
    } else if (services.elasticsearch) {
        const majorVersion = services.elasticsearch.image.split(':')[1]?.split('.')[0];
        const port = parsePort(services.elasticsearch, portIdx, '9200');
        args.push(
            `--search-engine=elasticsearch${majorVersion}`,
            `--elasticsearch-host=${hostFor('elasticsearch')}`,
            `--elasticsearch-port=${port}`,
        );
    }

    if (services.rabbitmq) {
        const port = parsePort(services.rabbitmq, portIdx, '5672');
        args.push(
            `--amqp-host=${hostFor('rabbitmq')}`,
            `--amqp-port=${port}`,
            '--amqp-user=guest',
            '--amqp-password=guest',
        );
    }

    if (services.valkey || services.redis) {
        const cacheKey: 'valkey' | 'redis' = services.valkey ? 'valkey' : 'redis';
        const cache = services[cacheKey]!;
        const port = parsePort(cache, portIdx, '6379');
        const host = hostFor(cacheKey);
        args.push(
            '--session-save=redis',
            `--session-save-redis-host=${host}`,
            `--session-save-redis-port=${port}`,
            '--cache-backend=redis',
            `--cache-backend-redis-server=${host}`,
            `--cache-backend-redis-port=${port}`,
        );
    }

    return args;
};
