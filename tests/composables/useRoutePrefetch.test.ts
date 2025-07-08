import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useRoutePrefetch } from '~/composables/useRoutePrefetch'

// Mock useApiWithCache
const mockUseApiWithCache = vi.fn()
global.useApiWithCache = mockUseApiWithCache

describe('useRoutePrefetch', () => {
  let prefetcher: ReturnType<typeof useRoutePrefetch>

  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    prefetcher = useRoutePrefetch()
    prefetcher.clearAllData()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should register prefetch configuration', () => {
    const config = {
      route: '/test',
      apiEndpoints: ['/api/test'],
      delay: 200
    }

    prefetcher.registerPrefetch(config)
    
    // Should be able to trigger prefetch for registered route
    prefetcher.onRouteEnter('/test')
    
    expect(mockUseApiWithCache).not.toHaveBeenCalled()
    
    vi.advanceTimersByTime(200)
    
    expect(mockUseApiWithCache).toHaveBeenCalledWith('/api/test', {
      ttl: 300000,
      tags: ['prefetch-/test']
    })
  })

  it('should not prefetch for unregistered route', () => {
    prefetcher.onRouteEnter('/unknown')
    
    vi.advanceTimersByTime(1000)
    
    expect(mockUseApiWithCache).not.toHaveBeenCalled()
  })

  it('should prefetch immediately when specified', () => {
    const config = {
      route: '/test',
      apiEndpoints: ['/api/test'],
      delay: 200
    }

    prefetcher.registerPrefetch(config)
    prefetcher.onRouteEnter('/test', true)
    
    expect(mockUseApiWithCache).toHaveBeenCalledWith('/api/test', {
      ttl: 300000,
      tags: ['prefetch-/test']
    })
  })

  it('should respect conditions', () => {
    const config = {
      route: '/test',
      apiEndpoints: ['/api/test'],
      delay: 200,
      conditions: () => false
    }

    prefetcher.registerPrefetch(config)
    prefetcher.onRouteEnter('/test')
    
    vi.advanceTimersByTime(200)
    
    expect(mockUseApiWithCache).not.toHaveBeenCalled()
  })

  it('should cancel pending prefetch on route leave', () => {
    const config = {
      route: '/test',
      apiEndpoints: ['/api/test'],
      delay: 200
    }

    prefetcher.registerPrefetch(config)
    prefetcher.onRouteEnter('/test')
    prefetcher.onRouteLeave('/test')
    
    vi.advanceTimersByTime(200)
    
    expect(mockUseApiWithCache).not.toHaveBeenCalled()
  })

  it('should handle multiple endpoints', async () => {
    const config = {
      route: '/test',
      apiEndpoints: ['/api/test1', '/api/test2'],
      delay: 0
    }

    mockUseApiWithCache.mockResolvedValue({ data: 'test' })

    prefetcher.registerPrefetch(config)
    prefetcher.onRouteEnter('/test', true)
    
    expect(mockUseApiWithCache).toHaveBeenCalledWith('/api/test1', {
      ttl: 300000,
      tags: ['prefetch-/test']
    })
    expect(mockUseApiWithCache).toHaveBeenCalledWith('/api/test2', {
      ttl: 300000,
      tags: ['prefetch-/test']
    })
  })

  it('should handle failed prefetch gracefully', async () => {
    const config = {
      route: '/test',
      apiEndpoints: ['/api/test'],
      delay: 0
    }

    mockUseApiWithCache.mockRejectedValue(new Error('API Error'))

    prefetcher.registerPrefetch(config)
    
    // Should not throw error
    expect(() => prefetcher.onRouteEnter('/test', true)).not.toThrow()
  })

  it('should store and retrieve prefetched data', async () => {
    const testData = { data: 'test' }
    mockUseApiWithCache.mockResolvedValue(testData)

    const config = {
      route: '/test',
      apiEndpoints: ['/api/test'],
      delay: 0
    }

    prefetcher.registerPrefetch(config)
    prefetcher.onRouteEnter('/test', true)
    
    // Wait for async operation
    await vi.runAllTimersAsync()
    
    const cachedData = prefetcher.getPrefetchedData('/api/test')
    expect(cachedData).toBe(testData)
  })

  it('should return null for non-existent prefetched data', () => {
    const cachedData = prefetcher.getPrefetchedData('/api/nonexistent')
    expect(cachedData).toBeNull()
  })

  it('should return null for expired prefetched data', async () => {
    const testData = { data: 'test' }
    mockUseApiWithCache.mockResolvedValue(testData)

    const config = {
      route: '/test',
      apiEndpoints: ['/api/test'],
      delay: 0
    }

    prefetcher.registerPrefetch(config)
    prefetcher.onRouteEnter('/test', true)
    
    await vi.runAllTimersAsync()
    
    // Fast-forward time beyond maxAge (5 minutes)
    vi.advanceTimersByTime(301000)
    
    const cachedData = prefetcher.getPrefetchedData('/api/test')
    expect(cachedData).toBeNull()
  })
})