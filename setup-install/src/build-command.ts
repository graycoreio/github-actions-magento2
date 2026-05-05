export interface ServiceConfig {
    image: string;
    env?: Record<string, string>;
    ports?: string[];
    options?: string;
}

export interface Services {
    mysql?: ServiceConfig;
    opensearch?: ServiceConfig;
    elasticsearch?: ServiceConfig;
    rabbitmq?: ServiceConfig;
    redis?: ServiceConfig;
    valkey?: ServiceConfig;
}

const BASE_ARGS = [
    '--base-url=http://localhost/',
    '--admin-user=admin',
    '--admin-password=admin123',
    '--admin-email=admin@example.com',
    '--admin-firstname=Admin',
    '--admin-lastname=User',
    '--backend-frontname=admin',
];

export const buildMysqlPrepArgs = (mysql: ServiceConfig): string[] => {
    const rootPassword = mysql.env?.MYSQL_ROOT_PASSWORD ?? 'rootpassword';
    const port = mysql.ports?.[0]?.split(':')[0] ?? '3306';
    return ['-h127.0.0.1', `--port=${port}`, '-uroot', `-p${rootPassword}`, '-e', 'SET GLOBAL log_bin_trust_function_creators = 1;'];
};

export const buildInstallArgs = (services: Services | null): string[] => {
    const args = [...BASE_ARGS];

    if (!services) return args;

    if (services.mysql) {
        const dbPort = services.mysql.ports?.[0]?.split(':')[0] ?? '3306';
        args.push(
            `--db-host=127.0.0.1:${dbPort}`,
            `--db-name=${services.mysql.env?.MYSQL_DATABASE ?? 'magento'}`,
            `--db-user=${services.mysql.env?.MYSQL_USER ?? 'magento'}`,
            `--db-password=${services.mysql.env?.MYSQL_PASSWORD ?? 'magento'}`,
        );
    }

    if (services.opensearch) {
        args.push(
            '--search-engine=opensearch',
            '--opensearch-host=localhost',
            '--opensearch-port=9200',
        );
    } else if (services.elasticsearch) {
        const majorVersion = services.elasticsearch.image.split(':')[1]?.split('.')[0];
        args.push(
            `--search-engine=elasticsearch${majorVersion}`,
            '--elasticsearch-host=localhost',
            '--elasticsearch-port=9200',
        );
    }

    if (services.rabbitmq) {
        args.push(
            '--amqp-host=localhost',
            '--amqp-port=5672',
            '--amqp-user=guest',
            '--amqp-password=guest',
        );
    }

    if (services.valkey || services.redis) {
        args.push(
            '--session-save=redis',
            '--session-save-redis-host=localhost',
            '--session-save-redis-port=6379',
            '--cache-backend=redis',
            '--cache-backend-redis-server=localhost',
            '--cache-backend-redis-port=6379',
        );
    }

    return args;
};