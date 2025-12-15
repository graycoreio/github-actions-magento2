import { PackageMatrixVersion, Services } from '../matrix/matrix-type';
import {
  mysqlConfig,
  elasticsearchConfig,
  opensearchConfig,
  rabbitmqConfig,
  redisConfig,
  valkeyConfig
} from './service-config';

interface SearchEngineChoice {
  type: 'opensearch' | 'elasticsearch';
  image: string;
}

interface CacheChoice {
  type: 'valkey' | 'redis';
  image: string;
}

/**
 * Determines which search engine to use for a matrix entry.
 * Prefers opensearch over elasticsearch.
 */
function getSearchEngineChoice(entry: PackageMatrixVersion): SearchEngineChoice | null {
  if (entry.opensearch && entry.opensearch.trim() !== '') {
    return { type: 'opensearch', image: entry.opensearch };
  }
  if (entry.elasticsearch && entry.elasticsearch.trim() !== '') {
    return { type: 'elasticsearch', image: entry.elasticsearch };
  }
  return null;
}

/**
 * Determines which cache to use for a matrix entry.
 * Prefers valkey over redis.
 */
function getCacheChoice(entry: PackageMatrixVersion): CacheChoice | null {
  if (entry.valkey && entry.valkey.trim() !== '') {
    return { type: 'valkey', image: entry.valkey };
  }
  if (entry.redis && entry.redis.trim() !== '') {
    return { type: 'redis', image: entry.redis };
  }
  return null;
}

/**
 * Builds the services object for a single matrix entry.
 */
export function buildServicesForEntry(entry: PackageMatrixVersion): Services {
  const services: Services = {};

  // MySQL is always included if present
  if (entry.mysql && entry.mysql.trim() !== '') {
    services.mysql = mysqlConfig.getConfig(entry.mysql);
  }

  // Search engine: prefer opensearch over elasticsearch
  const searchEngine = getSearchEngineChoice(entry);
  if (searchEngine) {
    if (searchEngine.type === 'opensearch') {
      services.opensearch = opensearchConfig.getConfig(searchEngine.image);
    } else {
      services.elasticsearch = elasticsearchConfig.getConfig(searchEngine.image);
    }
  }

  // RabbitMQ
  if (entry.rabbitmq && entry.rabbitmq.trim() !== '') {
    services.rabbitmq = rabbitmqConfig.getConfig(entry.rabbitmq);
  }

  // Cache: prefer valkey over redis
  const cache = getCacheChoice(entry);
  if (cache) {
    if (cache.type === 'valkey') {
      services.valkey = valkeyConfig.getConfig(cache.image);
    } else {
      services.redis = redisConfig.getConfig(cache.image);
    }
  }

  return services;
}