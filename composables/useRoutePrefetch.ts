interface PrefetchConfig {
  route: string
  apiEndpoints: string[]
  delay?: number
  conditions?: () => boolean
}

interface PrefetchedData {
  [key: string]: {
    data: any
    timestamp: number
  }
}

class RoutePrefetcher {
  private prefetchedData: PrefetchedData = {}
  private prefetchConfig: PrefetchConfig[] = []
  private prefetchTimeout: Map<string, NodeJS.Timeout> = new Map()
  private readonly maxAge = 300000 // 5 minutes

  registerPrefetch(config: PrefetchConfig) {
    this.prefetchConfig.push(config)
  }

  private async prefetchData(endpoints: string[], routeKey: string) {
    const promises = endpoints.map(async (endpoint) => {
      try {
        const data = await useApiWithCache(endpoint, {
          ttl: this.maxAge,
          tags: [`prefetch-${routeKey}`]
        })
        
        this.prefetchedData[endpoint] = {
          data,
          timestamp: Date.now()
        }
        
        return { endpoint, data, success: true }
      } catch (error) {
        console.warn(`Prefetch failed for ${endpoint}:`, error)
        return { endpoint, error, success: false }
      }
    })

    const results = await Promise.allSettled(promises)
    return results
  }

  onRouteEnter(route: string, immediate = false) {
    const config = this.prefetchConfig.find(c => c.route === route)
    if (!config) return

    if (config.conditions && !config.conditions()) {
      return
    }

    const delay = immediate ? 0 : (config.delay || 200)
    const timeoutKey = `${route}-${Date.now()}`

    if (delay > 0) {
      const timeout = setTimeout(() => {
        this.prefetchData(config.apiEndpoints, route)
        this.prefetchTimeout.delete(timeoutKey)
      }, delay)
      
      this.prefetchTimeout.set(timeoutKey, timeout)
    } else {
      this.prefetchData(config.apiEndpoints, route)
    }
  }

  onRouteLeave(route: string) {
    // Cancel any pending prefetch for this route
    for (const [key, timeout] of this.prefetchTimeout) {
      if (key.startsWith(route)) {
        clearTimeout(timeout)
        this.prefetchTimeout.delete(key)
      }
    }
  }

  getPrefetchedData(endpoint: string): any | null {
    const cached = this.prefetchedData[endpoint]
    if (!cached) return null

    const now = Date.now()
    if (now - cached.timestamp > this.maxAge) {
      delete this.prefetchedData[endpoint]
      return null
    }

    return cached.data
  }

  clearExpiredData() {
    const now = Date.now()
    for (const [endpoint, cached] of Object.entries(this.prefetchedData)) {
      if (now - cached.timestamp > this.maxAge) {
        delete this.prefetchedData[endpoint]
      }
    }
  }

  clearAllData() {
    this.prefetchedData = {}
  }
}

const routePrefetcher = new RoutePrefetcher()

export function useRoutePrefetch() {
  return routePrefetcher
}

export function usePrefetchOnHover(element: Ref<HTMLElement | null>, route: string) {
  let timeoutId: NodeJS.Timeout | null = null
  
  const handleMouseEnter = () => {
    timeoutId = setTimeout(() => {
      routePrefetcher.onRouteEnter(route, true)
    }, 100) // Small delay to avoid excessive prefetching
  }

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  watchEffect(() => {
    if (element.value) {
      element.value.addEventListener('mouseenter', handleMouseEnter)
      element.value.addEventListener('mouseleave', handleMouseLeave)
    }
  })

  onUnmounted(() => {
    if (element.value) {
      element.value.removeEventListener('mouseenter', handleMouseEnter)
      element.value.removeEventListener('mouseleave', handleMouseLeave)
    }
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  })
}

// Auto-setup for common routes
export function setupCommonPrefetches() {
  const prefetcher = useRoutePrefetch()
  
  // Register common prefetch configurations
  prefetcher.registerPrefetch({
    route: '/orders',
    apiEndpoints: ['/api/orders', '/api/services/services/'],
    delay: 300
  })

  prefetcher.registerPrefetch({
    route: '/dashboard',
    apiEndpoints: ['/api/dashboard/stats', '/api/dashboard/orders'],
    delay: 200
  })

  prefetcher.registerPrefetch({
    route: '/orders/[id]',
    apiEndpoints: ['/api/chat/messages/'],
    delay: 200,
    conditions: () => process.client
  })
}