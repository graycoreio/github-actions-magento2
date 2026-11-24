import { PackageMatrixVersion, Services } from '../matrix/matrix-type';
import {
  mariadbConfig,
  mysqlConfig,
  elasticsearchConfig,
  opensearchConfig,
  rabbitmqConfig,
  redisConfig,
  valkeyConfig,
  buildNginxConfig,
  buildPhpFpmConfig
} from './service-config';
import { ServicePreferences } from './preferences';

interface DatabaseChoice {
  type: 'mariadb' | 'mysql';
  image: string;
}

interface SearchEngineChoice {
  type: 'opensearch' | 'elasticsearch';
  image: string;
}

interface CacheChoice {
  type: 'valkey' | 'redis';
  image: string;
}

/**
 * Picks the database for a matrix entry. Honors caller's `service_preferences`
 * when set; otherwise prefers mariadb over mysql.
 */
const getDatabaseChoice = (entry: PackageMatrixVersion, preference?: string): DatabaseChoice | null => {
  if (preference === 'mariadb') {
    if (entry.mariadb && entry.mariadb.trim() !== '') {
      return { type: 'mariadb', image: entry.mariadb };
    }
    return null;
  }
  if (preference === 'mysql') {
    if (entry.mysql && entry.mysql.trim() !== '') {
      return { type: 'mysql', image: entry.mysql };
    }
    return null;
  }
  if (entry.mariadb && entry.mariadb.trim() !== '') {
    return { type: 'mariadb', image: entry.mariadb };
  }
  if (entry.mysql && entry.mysql.trim() !== '') {
    return { type: 'mysql', image: entry.mysql };
  }
  return null;
}

/**
 * Picks the search engine for a matrix entry. Honors caller's `service_preferences`
 * when set; otherwise prefers opensearch over elasticsearch.
 */
const getSearchEngineChoice = (entry: PackageMatrixVersion, preference?: string): SearchEngineChoice | null => {
  if (preference === 'opensearch') {
    if (entry.opensearch && entry.opensearch.trim() !== '') {
      return { type: 'opensearch', image: entry.opensearch };
    }
    return null;
  }
  if (preference === 'elasticsearch') {
    if (entry.elasticsearch && entry.elasticsearch.trim() !== '') {
      return { type: 'elasticsearch', image: entry.elasticsearch };
    }
    return null;
  }
  if (entry.opensearch && entry.opensearch.trim() !== '') {
    return { type: 'opensearch', image: entry.opensearch };
  }
  if (entry.elasticsearch && entry.elasticsearch.trim() !== '') {
    return { type: 'elasticsearch', image: entry.elasticsearch };
  }
  return null;
}

/**
 * Picks the cache for a matrix entry. Honors caller's `service_preferences`
 * when set; otherwise prefers valkey over redis.
 */
const getCacheChoice = (entry: PackageMatrixVersion, preference?: string): CacheChoice | null => {
  if (preference === 'valkey') {
    if (entry.valkey && entry.valkey.trim() !== '') {
      return { type: 'valkey', image: entry.valkey };
    }
    return null;
  }
  if (preference === 'redis') {
    if (entry.redis && entry.redis.trim() !== '') {
      return { type: 'redis', image: entry.redis };
    }
    return null;
  }
  if (entry.valkey && entry.valkey.trim() !== '') {
    return { type: 'valkey', image: entry.valkey };
  }
  if (entry.redis && entry.redis.trim() !== '') {
    return { type: 'redis', image: entry.redis };
  }
  return null;
}

/**
 * Builds the services object for a single matrix entry. Emits every
 * tier the entry has data for: db (mariadb/mysql), search (opensearch/elasticsearch),
 * queue (rabbitmq), cache (valkey/redis), and web (nginx + php-fpm
 * together). The web tier requires `workspace` so the volume mount
 * has a real path; if the entry lacks either nginx or php data the
 * web tier is skipped entirely (they're coupled — emit both or neither).
 */
export const buildServicesForEntry = (
  entry: PackageMatrixVersion,
  preferences: ServicePreferences = {},
  workspace: string = ''
): Services => {
  const services: Services = {};

  const database = getDatabaseChoice(entry, preferences.db);
  if (database) {
    if (database.type === 'mariadb') {
      services.mariadb = mariadbConfig.getConfig(database.image);
    } else {
      services.mysql = mysqlConfig.getConfig(database.image);
    }
  }

  const searchEngine = getSearchEngineChoice(entry, preferences.search);
  if (searchEngine) {
    if (searchEngine.type === 'opensearch') {
      services.opensearch = opensearchConfig.getConfig(searchEngine.image);
    } else {
      services.elasticsearch = elasticsearchConfig.getConfig(searchEngine.image);
    }
  }

  if (entry.rabbitmq && entry.rabbitmq.trim() !== '') {
    services.rabbitmq = rabbitmqConfig.getConfig(entry.rabbitmq);
  }

  const cache = getCacheChoice(entry, preferences.cache);
  if (cache) {
    if (cache.type === 'valkey') {
      services.valkey = valkeyConfig.getConfig(cache.image);
    } else {
      services.redis = redisConfig.getConfig(cache.image);
    }
  }

  const nginxImage = (entry.nginx || '').trim();
  const phpVersion = String(entry.php ?? '').trim();
  if (nginxImage !== '' && phpVersion !== '') {
    services.nginx = buildNginxConfig(nginxImage, workspace);
    services['php-fpm'] = buildPhpFpmConfig(phpVersion, workspace);
  }

  return services;
}
