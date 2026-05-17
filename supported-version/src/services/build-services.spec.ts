import { buildServicesForEntry } from './build-services';
import { PackageMatrixVersion } from '../matrix/matrix-type';

const createTestEntry = (overrides: Partial<PackageMatrixVersion> = {}): PackageMatrixVersion => ({
  magento: 'magento/project-community-edition:2.4.7',
  version: '2.4.7',
  php: '8.3',
  composer: '2.7.4',
  mysql: 'mysql:8.4',
  elasticsearch: 'elasticsearch:8.11.4',
  opensearch: 'opensearchproject/opensearch:2.19.1',
  rabbitmq: 'rabbitmq:4.0-management',
  redis: 'redis:7.2',
  varnish: 'varnish:7.5',
  valkey: 'valkey:8.0',
  nginx: 'nginx:1.26',
  os: 'ubuntu-latest',
  release: '2024-04-09T00:00:00+0000',
  eol: '2027-04-09T00:00:00+0000',
  ...overrides
});

describe('buildServicesForEntry', () => {
  describe('search engine selection', () => {
    it('should prefer opensearch when both are available', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry);

      expect(services.opensearch).toBeDefined();
      expect(services.opensearch.image).toBe('opensearchproject/opensearch:2.19.1');
      expect(services.elasticsearch).toBeUndefined();
    });

    it('should fall back to elasticsearch when opensearch is empty', () => {
      const entry = createTestEntry({ opensearch: '' });
      const services = buildServicesForEntry(entry);

      expect(services.elasticsearch).toBeDefined();
      expect(services.elasticsearch.image).toBe('elasticsearch:8.11.4');
      expect(services.opensearch).toBeUndefined();
    });

    it('should not include search engine when neither is available', () => {
      const entry = createTestEntry({ opensearch: '', elasticsearch: '' });
      const services = buildServicesForEntry(entry);

      expect(services.opensearch).toBeUndefined();
      expect(services.elasticsearch).toBeUndefined();
    });
  });

  describe('cache selection', () => {
    it('should prefer valkey when both are available', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry);

      expect(services.valkey).toBeDefined();
      expect(services.valkey.image).toBe('valkey:8.0');
      expect(services.redis).toBeUndefined();
    });

    it('should fall back to redis when valkey is empty', () => {
      const entry = createTestEntry({ valkey: '' });
      const services = buildServicesForEntry(entry);

      expect(services.redis).toBeDefined();
      expect(services.redis.image).toBe('redis:7.2');
      expect(services.valkey).toBeUndefined();
    });

    it('should not include cache when neither is available', () => {
      const entry = createTestEntry({ valkey: '', redis: '' });
      const services = buildServicesForEntry(entry);

      expect(services.valkey).toBeUndefined();
      expect(services.redis).toBeUndefined();
    });
  });

  describe('mysql configuration', () => {
    it('should include mysql when available', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry);

      expect(services.mysql).toBeDefined();
      expect(services.mysql.image).toBe('mysql:8.4');
    });

    it('should not include mysql when empty', () => {
      const entry = createTestEntry({ mysql: '' });
      const services = buildServicesForEntry(entry);

      expect(services.mysql).toBeUndefined();
    });

    it('should include correct mysql env configuration', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry);

      expect(services.mysql.env).toEqual({
        MYSQL_DATABASE: 'magento_integration_tests',
        MYSQL_USER: 'user',
        MYSQL_PASSWORD: 'password',
        MYSQL_ROOT_PASSWORD: 'rootpassword'
      });
    });

    it('should include correct mysql ports', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry);

      expect(services.mysql.ports).toEqual(['3306:3306']);
    });

    it('should include mysql health check options', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry);

      expect(services.mysql.options).toContain('--health-cmd');
      expect(services.mysql.options).toContain('mysqladmin ping');
    });
  });

  describe('rabbitmq configuration', () => {
    it('should include rabbitmq when available', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry);

      expect(services.rabbitmq).toBeDefined();
      expect(services.rabbitmq.image).toBe('rabbitmq:4.0-management');
    });

    it('should not include rabbitmq when empty', () => {
      const entry = createTestEntry({ rabbitmq: '' });
      const services = buildServicesForEntry(entry);

      expect(services.rabbitmq).toBeUndefined();
    });

    it('should include correct rabbitmq env configuration', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry);

      expect(services.rabbitmq.env).toEqual({
        RABBITMQ_DEFAULT_USER: 'guest',
        RABBITMQ_DEFAULT_PASS: 'guest'
      });
    });

    it('should include correct rabbitmq ports', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry);

      expect(services.rabbitmq.ports).toEqual(['5672:5672']);
    });
  });

  describe('opensearch configuration', () => {
    it('should include correct opensearch env configuration', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry);

      expect(services.opensearch.env).toEqual({
        'discovery.type': 'single-node',
        'DISABLE_INSTALL_DEMO_CONFIG': 'true',
        'DISABLE_SECURITY_PLUGIN': 'true'
      });
    });

    it('should include correct opensearch ports', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry);

      expect(services.opensearch.ports).toEqual(['9200:9200']);
    });

    it('should include opensearch health check options', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry);

      expect(services.opensearch.options).toContain('--health-cmd');
      expect(services.opensearch.options).toContain('curl');
    });
  });

  describe('elasticsearch configuration', () => {
    it('should include correct elasticsearch env configuration', () => {
      const entry = createTestEntry({ opensearch: '' });
      const services = buildServicesForEntry(entry);

      expect(services.elasticsearch.env).toEqual({
        'discovery.type': 'single-node',
        'xpack.security.enabled': 'false',
        'xpack.security.http.ssl.enabled': 'false',
        'xpack.security.transport.ssl.enabled': 'false'
      });
    });

    it('should include correct elasticsearch ports', () => {
      const entry = createTestEntry({ opensearch: '' });
      const services = buildServicesForEntry(entry);

      expect(services.elasticsearch.ports).toEqual(['9200:9200']);
    });
  });

  describe('cache configuration', () => {
    it('should include correct valkey ports', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry);

      expect(services.valkey.ports).toEqual(['6379:6379']);
    });

    it('should include correct redis ports', () => {
      const entry = createTestEntry({ valkey: '' });
      const services = buildServicesForEntry(entry);

      expect(services.redis.ports).toEqual(['6379:6379']);
    });
  });

  describe('complete service output', () => {
    it('should build all services when all are available', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry, {}, '/runner/ws');

      expect(Object.keys(services).sort()).toEqual(
        ['mysql', 'nginx', 'opensearch', 'php-fpm', 'rabbitmq', 'valkey']
      );
      expect(services.mysql).toBeDefined();
      expect(services.opensearch).toBeDefined();
      expect(services.rabbitmq).toBeDefined();
      expect(services.valkey).toBeDefined();
      expect(services.nginx).toBeDefined();
      expect(services['php-fpm']).toBeDefined();
    });

    it('should handle entry with minimal services', () => {
      const entry = createTestEntry({
        mysql: '',
        elasticsearch: '',
        opensearch: '',
        rabbitmq: '',
        redis: '',
        valkey: '',
        nginx: '',
        php: ''
      });
      const services = buildServicesForEntry(entry);

      expect(Object.keys(services)).toHaveLength(0);
    });
  });

  describe('web tier (nginx + php-fpm)', () => {
    it('emits both nginx and php-fpm when both data points are present', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry, {}, '/runner/ws');

      expect(services.nginx).toBeDefined();
      expect(services['php-fpm']).toBeDefined();
    });

    it('uses the entry.nginx image for nginx', () => {
      const entry = createTestEntry({ nginx: 'nginx:1.27-alpine' });
      const services = buildServicesForEntry(entry, {}, '/runner/ws');

      expect(services.nginx.image).toBe('nginx:1.27-alpine');
    });

    it('composes the php-fpm image from entry.php using mappia', () => {
      const entry = createTestEntry({ php: '8.2' });
      const services = buildServicesForEntry(entry, {}, '/runner/ws');

      expect(services['php-fpm'].image).toBe('mappia/magento-php:fpm-alpine8.2');
    });

    it('mounts the runner workspace at /var/www/html on both services', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry, {}, '/home/runner/work/foo/foo');

      expect(services.nginx.volumes).toEqual(['/home/runner/work/foo/foo:/var/www/html']);
      expect(services['php-fpm'].volumes).toEqual(['/home/runner/work/foo/foo:/var/www/html']);
    });

    it('exposes port 80 on nginx with the nginx -t healthcheck', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry, {}, '/runner/ws');

      expect(services.nginx.ports).toEqual(['80:80']);
      expect(services.nginx.options).toContain('nginx -t');
    });

    it('skips both when entry.nginx is empty (they emit together or not at all)', () => {
      const entry = createTestEntry({ nginx: '' });
      const services = buildServicesForEntry(entry, {}, '/runner/ws');

      expect(services.nginx).toBeUndefined();
      expect(services['php-fpm']).toBeUndefined();
    });

    it('skips both when entry.php is empty (they emit together or not at all)', () => {
      const entry = createTestEntry({ php: '' });
      const services = buildServicesForEntry(entry, {}, '/runner/ws');

      expect(services.nginx).toBeUndefined();
      expect(services['php-fpm']).toBeUndefined();
    });
  });

  describe('with service preferences', () => {
    it('uses elasticsearch when search preference is elasticsearch, even if opensearch is available', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry, { search: 'elasticsearch' });

      expect(services.elasticsearch).toBeDefined();
      expect(services.elasticsearch.image).toBe('elasticsearch:8.11.4');
      expect(services.opensearch).toBeUndefined();
    });

    it('uses opensearch when search preference is opensearch (matches default)', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry, { search: 'opensearch' });

      expect(services.opensearch).toBeDefined();
      expect(services.elasticsearch).toBeUndefined();
    });

    it('uses redis when cache preference is redis, even if valkey is available', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry, { cache: 'redis' });

      expect(services.redis).toBeDefined();
      expect(services.redis.image).toBe('redis:7.2');
      expect(services.valkey).toBeUndefined();
    });

    it('applies preferences across multiple tiers independently', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry, { search: 'elasticsearch', cache: 'redis' });

      expect(services.elasticsearch).toBeDefined();
      expect(services.redis).toBeDefined();
      expect(services.opensearch).toBeUndefined();
      expect(services.valkey).toBeUndefined();
    });

    it('falls back to default-pick for tiers without a preference', () => {
      const entry = createTestEntry();
      const services = buildServicesForEntry(entry, { search: 'elasticsearch' });

      expect(services.elasticsearch).toBeDefined();
      expect(services.valkey).toBeDefined();
    });

    it('treats single-implementation-tier preferences as no-ops', () => {
      const entry = createTestEntry();
      const withPref = buildServicesForEntry(entry, { db: 'mysql', queue: 'rabbitmq' });
      const withoutPref = buildServicesForEntry(entry);

      expect(withPref).toEqual(withoutPref);
    });
  });
});
