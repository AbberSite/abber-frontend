interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

interface CacheOptions {
  ttl?: number // Time to live in milliseconds (default: 5 minutes)
  key?: string // Custom cache key
  force?: boolean // Force refresh cache
  tags?: string[] // Tags for cache invalidation
}

class ApiCache {
  private cache = new Map<string, CacheEntry<any>>()
  private tags = new Map<string, Set<string>>() // tag -> cache keys

  set<T>(key: string, data: T, ttl: number, tags?: string[]): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })

    // Register tags
    if (tags) {
      tags.forEach(tag => {
        if (!this.tags.has(tag)) {
          this.tags.set(tag, new Set())
        }
        this.tags.get(tag)!.add(key)
      })
    }
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)
    
    if (!entry) {
      return null
    }

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.delete(key)
      return null
    }

    return entry.data
  }

  delete(key: string): void {
    this.cache.delete(key)
    
    // Remove from tags
    this.tags.forEach((keys, tag) => {
      keys.delete(key)
      if (keys.size === 0) {
        this.tags.delete(tag)
      }
    })
  }

  invalidateByTag(tag: string): void {
    const keys = this.tags.get(tag)
    if (keys) {
      keys.forEach(key => this.delete(key))
    }
  }

  clear(): void {
    this.cache.clear()
    this.tags.clear()
  }

  size(): number {
    return this.cache.size
  }

  // Get cache statistics
  getStats() {
    const entries = Array.from(this.cache.values())
    const now = Date.now()
    const valid = entries.filter(entry => now - entry.timestamp <= entry.ttl).length
    const expired = entries.length - valid

    return {
      total: entries.length,
      valid,
      expired,
      hitRate: valid / (valid + expired) || 0
    }
  }
}

// Global cache instance
const apiCache = new ApiCache()

/**
 * Enhanced API composable with caching support
 * @param endpoint API endpoint
 * @param options Request and cache options
 * @param apiFunction Optional API function for dependency injection (for testing)
 */
export async function useApiCache<T>(
  endpoint: string,
  options: CacheOptions & { method?: string; body?: any } = {},
  apiFunction?: typeof useDirectApi
): Promise<T> {
  const {
    ttl = 300000, // 5 minutes default
    key,
    force = false,
    tags = [],
    method = 'GET',
    body,
    ...apiOptions
  } = options

  // Generate cache key
  const cacheKey = key || `${method}:${endpoint}${body ? ':' + JSON.stringify(body) : ''}`

  // Check cache first (only for GET requests and if not forced)
  if (method === 'GET' && !force) {
    const cached = apiCache.get<T>(cacheKey)
    if (cached !== null) {
      console.log(`[Cache HIT] ${cacheKey}`)
      return cached
    }
  }

  console.log(`[Cache MISS] ${cacheKey}`)

  // Make API call
  try {
    let data: T;
    if (/^https?:\/\//.test(endpoint)) {
      // If endpoint is a full URL, use axios.get
      const axios = (await import('axios')).default;
      const response = await axios.get(endpoint);
      data = response.data;
    } else if (endpoint.startsWith('/api/')) {
      // If endpoint starts with /api/, use useApi composable
      data = await useApi(endpoint, { method, body, ...apiOptions });
    } else {
      // Use injected function for testing, fallback to useDirectApi
      const apiCall = apiFunction || (await import('~/composables/useDirectApi')).default;
      data = await apiCall<T>(endpoint, {
        method,
        body,
        ...apiOptions
      });
    }

    // Cache only successful GET requests
    if (method === 'GET' && data) {
      apiCache.set(cacheKey, data, ttl, tags)
    }

    return data
  } catch (error) {
    console.error(`[API Error] ${cacheKey}:`, error)
    throw error
  }
}

/**
 * Invalidate cache by tag
 * @param tag Cache tag to invalidate
 */
export function invalidateCache(tag: string): void {
  apiCache.invalidateByTag(tag)
  console.log(`[Cache Invalidated] Tag: ${tag}`)
}

/**
 * Clear entire cache
 */
export function clearCache(): void {
  apiCache.clear()
  console.log('[Cache Cleared] All entries removed')
}

/**
 * Get cache statistics
 */
export function getCacheStats() {
  return apiCache.getStats()
}

/**
 * Pre-fetch and cache data
 * @param endpoint API endpoint
 * @param options Cache options
 */
export async function prefetchApi<T>(
  endpoint: string,
  options: CacheOptions = {}
): Promise<void> {
  try {
    await useApiCache<T>(endpoint, options)
  } catch (error) {
    console.warn(`[Prefetch Failed] ${endpoint}:`, error)
  }
}

// Export cache instance for advanced usage
export { apiCache }