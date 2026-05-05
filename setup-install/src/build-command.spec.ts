import { buildInstallArgs, buildMysqlPrepArgs, Services } from './build-command';

const BASE_ARGS = [
    '--base-url=http://localhost/',
    '--admin-user=admin',
    '--admin-password=admin123',
    '--admin-email=admin@example.com',
    '--admin-firstname=Admin',
    '--admin-lastname=User',
    '--backend-frontname=admin',
];

const MYSQL_SERVICE = {
    image: 'mysql:8.4',
    env: {
        MYSQL_DATABASE: 'magento_integration_tests',
        MYSQL_USER: 'user',
        MYSQL_PASSWORD: 'password',
        MYSQL_ROOT_PASSWORD: 'rootpassword',
    },
    ports: ['3306:3306'],
    options: '--health-cmd="mysqladmin ping" --health-interval=10s --health-timeout=5s --health-retries=3',
};

const MYSQL_ARGS = [
    '--db-host=127.0.0.1:3306',
    '--db-name=magento_integration_tests',
    '--db-user=user',
    '--db-password=password',
];

const OPENSEARCH_ARGS = [
    '--search-engine=opensearch',
    '--opensearch-host=localhost',
    '--opensearch-port=9200',
];

const RABBITMQ_ARGS = [
    '--amqp-host=localhost',
    '--amqp-port=5672',
    '--amqp-user=guest',
    '--amqp-password=guest',
];

const CACHE_ARGS = [
    '--session-save=redis',
    '--session-save-redis-host=localhost',
    '--session-save-redis-port=6379',
    '--cache-backend=redis',
    '--cache-backend-redis-server=localhost',
    '--cache-backend-redis-port=6379',
];

describe('buildInstallArgs', () => {
    describe('base args', () => {
        it('returns only base args when services is null', () => {
            expect(buildInstallArgs(null)).toEqual(BASE_ARGS);
        });

        it('returns only base args when services is empty', () => {
            expect(buildInstallArgs({})).toEqual(BASE_ARGS);
        });
    });

    describe('mysql', () => {
        it('adds db flags when mysql service is present', () => {
            const services: Services = { mysql: MYSQL_SERVICE };
            expect(buildInstallArgs(services)).toEqual([...BASE_ARGS, ...MYSQL_ARGS]);
        });
    });

    describe('search engine', () => {
        it('adds opensearch flags when opensearch service is present', () => {
            const services: Services = { opensearch: { image: 'opensearchproject/opensearch:2.19.1' } };
            expect(buildInstallArgs(services)).toEqual([...BASE_ARGS, ...OPENSEARCH_ARGS]);
        });

        it('adds elasticsearch7 flags for an elasticsearch 7.x image', () => {
            const services: Services = { elasticsearch: { image: 'elasticsearch:7.17.0' } };
            expect(buildInstallArgs(services)).toEqual([
                ...BASE_ARGS,
                '--search-engine=elasticsearch7',
                '--elasticsearch-host=localhost',
                '--elasticsearch-port=9200',
            ]);
        });

        it('adds elasticsearch8 flags for an elasticsearch 8.x image', () => {
            const services: Services = { elasticsearch: { image: 'elasticsearch:8.11.4' } };
            expect(buildInstallArgs(services)).toEqual([
                ...BASE_ARGS,
                '--search-engine=elasticsearch8',
                '--elasticsearch-host=localhost',
                '--elasticsearch-port=9200',
            ]);
        });

        it('prefers opensearch over elasticsearch when both are present', () => {
            const services: Services = {
                opensearch: { image: 'opensearchproject/opensearch:2.19.1' },
                elasticsearch: { image: 'elasticsearch:8.11.4' },
            };
            const args = buildInstallArgs(services);
            expect(args).toContain('--search-engine=opensearch');
            expect(args.some(a => a.startsWith('--search-engine=elasticsearch'))).toBe(false);
        });
    });

    describe('rabbitmq', () => {
        it('adds amqp flags when rabbitmq service is present', () => {
            const services: Services = { rabbitmq: { image: 'rabbitmq:4.0-management' } };
            expect(buildInstallArgs(services)).toEqual([...BASE_ARGS, ...RABBITMQ_ARGS]);
        });
    });

    describe('cache / session', () => {
        it('adds redis cache flags when redis service is present', () => {
            const services: Services = { redis: { image: 'redis:7.2' } };
            expect(buildInstallArgs(services)).toEqual([...BASE_ARGS, ...CACHE_ARGS]);
        });

        it('adds redis cache flags when valkey service is present', () => {
            const services: Services = { valkey: { image: 'valkey:8.0' } };
            expect(buildInstallArgs(services)).toEqual([...BASE_ARGS, ...CACHE_ARGS]);
        });

        it('adds cache flags once when both valkey and redis are present', () => {
            const services: Services = {
                valkey: { image: 'valkey:8.0' },
                redis: { image: 'redis:7.2' },
            };
            const args = buildInstallArgs(services);
            expect(args.filter(a => a === '--session-save=redis')).toHaveLength(1);
        });
    });

    describe('buildMysqlPrepArgs', () => {
        it('uses root password and port from service config', () => {
            expect(buildMysqlPrepArgs(MYSQL_SERVICE)).toEqual([
                '-h127.0.0.1',
                '--port=3306',
                '-uroot',
                '-prootpassword',
                '-e', 'SET GLOBAL log_bin_trust_function_creators = 1;',
            ]);
        });

        it('falls back to default port when ports is absent', () => {
            const args = buildMysqlPrepArgs({ image: 'mysql:8.4' });
            expect(args).toContain('--port=3306');
        });

        it('falls back to default root password when env is absent', () => {
            const args = buildMysqlPrepArgs({ image: 'mysql:8.4' });
            expect(args).toContain('-prootpassword');
        });
    });

    describe('all services', () => {
        it('adds all flags when all services are present', () => {
            const services: Services = {
                mysql: MYSQL_SERVICE,
                opensearch: { image: 'opensearchproject/opensearch:2.19.1' },
                rabbitmq: { image: 'rabbitmq:4.0-management' },
                valkey: { image: 'valkey:8.0' },
            };
            expect(buildInstallArgs(services)).toEqual([
                ...BASE_ARGS,
                ...MYSQL_ARGS,
                ...OPENSEARCH_ARGS,
                ...RABBITMQ_ARGS,
                ...CACHE_ARGS,
            ]);
        });
    });
});