import { describe, it, expect, beforeEach, vi, Mock } from 'vitest'

// Mock useDirectApi before importing useApiCache
const mockUseDirectApi = vi.fn()
vi.mock('~/composables/useDirectApi', () => ({
  default: mockUseDirectApi
}))

// Mock console methods to reduce noise in tests
const consoleMock = {
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn()
}
vi.stubGlobal('console', consoleMock)

// Now import the module to test
import { useApiWithCache, invalidateCache, clearCache, getCacheStats, apiCache } from '~/composables/useApiCache'

describe('useApiCache', () => {
  beforeEach(() => {
    // Clear cache before each test
    clearCache()
    // Reset all mocks
    vi.clearAllMocks()
  })

  describe('Basic Caching', () => {
    it('should cache API responses', async () => {
      const mockData = { id: 1, name: 'Test' }
      mockUseDirectApi.mockResolvedValueOnce(mockData)

      // First call should hit API
      const result1 = await useApiWithCache('/test-endpoint', {}, mockUseDirectApi)
      expect(result1).toEqual(mockData)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(1)

      // Second call should use cache
      const result2 = await useApiWithCache('/test-endpoint', {}, mockUseDirectApi)
      expect(result2).toEqual(mockData)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(1) // Still 1, not called again
    })

    it('should return different data for different endpoints', async () => {
      const mockData1 = { id: 1, name: 'Test1' }
      const mockData2 = { id: 2, name: 'Test2' }

      mockUseDirectApi
        .mockResolvedValueOnce(mockData1)
        .mockResolvedValueOnce(mockData2)

      const result1 = await useApiWithCache('/endpoint1', {}, mockUseDirectApi)
      const result2 = await useApiWithCache('/endpoint2', {}, mockUseDirectApi)

      expect(result1).toEqual(mockData1)
      expect(result2).toEqual(mockData2)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(2)
    })

    it('should use custom cache key when provided', async () => {
      const mockData = { id: 1, name: 'Test' }
      mockUseDirectApi.mockResolvedValueOnce(mockData)

      // First call with custom key
      await useApiWithCache('/test', { key: 'custom-key' }, mockUseDirectApi)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(1)

      // Second call with same custom key should use cache
      await useApiWithCache('/different-endpoint', { key: 'custom-key' }, mockUseDirectApi)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(1)
    })
  })

  describe('TTL (Time To Live)', () => {
    it('should expire cache after TTL', async () => {
      const mockData = { id: 1, name: 'Test' }
      mockUseDirectApi.mockResolvedValue(mockData)

      // Cache with very short TTL
      await useApiWithCache('/test', { ttl: 10 }, mockUseDirectApi) // 10ms
      expect(mockUseDirectApi).toHaveBeenCalledTimes(1)

      // Wait for cache to expire
      await new Promise(resolve => setTimeout(resolve, 15))

      // Should call API again
      await useApiWithCache('/test', { ttl: 10 }, mockUseDirectApi)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(2)
    })

    it('should use default TTL when not specified', async () => {
      const mockData = { id: 1, name: 'Test' }
      mockUseDirectApi.mockResolvedValueOnce(mockData)

      await useApiWithCache('/test', {}, mockUseDirectApi)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(1)

      // Should still be cached (default TTL is 5 minutes)
      await useApiWithCache('/test', {}, mockUseDirectApi)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(1)
    })
  })

  describe('Force Refresh', () => {
    it('should bypass cache when force=true', async () => {
      const mockData1 = { id: 1, name: 'Test1' }
      const mockData2 = { id: 2, name: 'Test2' }

      mockUseDirectApi
        .mockResolvedValueOnce(mockData1)
        .mockResolvedValueOnce(mockData2)

      // First call
      const result1 = await useApiWithCache('/test', {}, mockUseDirectApi)
      expect(result1).toEqual(mockData1)

      // Force refresh
      const result2 = await useApiWithCache('/test', { force: true }, mockUseDirectApi)
      expect(result2).toEqual(mockData2)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(2)
    })
  })

  describe('Tag-based Invalidation', () => {
    it('should invalidate cache by tag', async () => {
      const mockData1 = { id: 1, name: 'User1' }
      const mockData2 = { id: 2, name: 'Service1' }
      const mockData3 = { id: 3, name: 'User2' }

      mockUseDirectApi
        .mockResolvedValueOnce(mockData1)
        .mockResolvedValueOnce(mockData2)
        .mockResolvedValueOnce(mockData3)

      // Cache with tags
      await useApiWithCache('/users/1', { tags: ['users'] }, mockUseDirectApi)
      await useApiWithCache('/services/1', { tags: ['services'] }, mockUseDirectApi)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(2)

      // Verify cache works
      await useApiWithCache('/users/1', { tags: ['users'] }, mockUseDirectApi)
      await useApiWithCache('/services/1', { tags: ['services'] }, mockUseDirectApi)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(2) // Still 2

      // Invalidate users tag
      invalidateCache('users')

      // Users endpoint should call API again, services should use cache
      await useApiWithCache('/users/1', { tags: ['users'] }, mockUseDirectApi)
      await useApiWithCache('/services/1', { tags: ['services'] }, mockUseDirectApi)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(3) // +1 for users
    })
  })

  describe('Error Handling', () => {
    it('should throw error when API call fails', async () => {
      const error = new Error('API Error')
      mockUseDirectApi.mockRejectedValueOnce(error)

      await expect(useApiWithCache('/error-endpoint', {}, mockUseDirectApi)).rejects.toThrow('API Error')
    })

    it('should not cache failed responses', async () => {
      const error = new Error('API Error')
      const successData = { id: 1, name: 'Success' }

      mockUseDirectApi
        .mockRejectedValueOnce(error)
        .mockResolvedValueOnce(successData)

      // First call fails
      await expect(useApiWithCache('/test', {}, mockUseDirectApi)).rejects.toThrow('API Error')

      // Second call should hit API again (not cached)
      const result = await useApiWithCache('/test', {}, mockUseDirectApi)
      expect(result).toEqual(successData)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(2)
    })
  })

  describe('Non-GET Methods', () => {
    it('should not cache POST requests', async () => {
      const mockData = { id: 1, name: 'Created' }
      mockUseDirectApi.mockResolvedValue(mockData)

      // First POST call
      await useApiWithCache('/create', { method: 'POST', body: { name: 'Test' } }, mockUseDirectApi)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(1)

      // Second POST call should hit API again
      await useApiWithCache('/create', { method: 'POST', body: { name: 'Test' } }, mockUseDirectApi)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(2)
    })

    it('should not check cache for PUT requests', async () => {
      const mockData = { id: 1, name: 'Updated' }
      mockUseDirectApi.mockResolvedValue(mockData)

      await useApiWithCache('/update/1', { method: 'PUT', body: { name: 'New Name' } }, mockUseDirectApi)
      await useApiWithCache('/update/1', { method: 'PUT', body: { name: 'New Name' } }, mockUseDirectApi)

      expect(mockUseDirectApi).toHaveBeenCalledTimes(2)
    })
  })

  describe('Cache Statistics', () => {
    it('should provide accurate cache statistics', async () => {
      const mockData = { id: 1, name: 'Test' }
      mockUseDirectApi.mockResolvedValue(mockData)

      // Initially empty
      let stats = getCacheStats()
      expect(stats.total).toBe(0)

      // Add some cached entries
      await useApiWithCache('/test1', {}, mockUseDirectApi)
      await useApiWithCache('/test2', {}, mockUseDirectApi)

      stats = getCacheStats()
      expect(stats.total).toBe(2)
      expect(stats.valid).toBe(2)
      expect(stats.expired).toBe(0)
    })
  })

  describe('Cache Key Generation', () => {
    it('should generate different keys for requests with different bodies', async () => {
      const mockData1 = { result: 'data1' }
      const mockData2 = { result: 'data2' }

      mockUseDirectApi
        .mockResolvedValueOnce(mockData1)
        .mockResolvedValueOnce(mockData2)

      // Same endpoint, different bodies
      const result1 = await useApiWithCache('/search', { 
        method: 'POST', 
        body: { query: 'test1' } 
      }, mockUseDirectApi)
      const result2 = await useApiWithCache('/search', { 
        method: 'POST', 
        body: { query: 'test2' } 
      }, mockUseDirectApi)

      expect(result1).toEqual(mockData1)
      expect(result2).toEqual(mockData2)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(2)
    })
  })

  describe('Clear Cache', () => {
    it('should clear all cache entries', async () => {
      const mockData = { id: 1, name: 'Test' }
      mockUseDirectApi.mockResolvedValue(mockData)

      // Add some cache entries
      await useApiWithCache('/test1', {}, mockUseDirectApi)
      await useApiWithCache('/test2', {}, mockUseDirectApi)
      
      let stats = getCacheStats()
      expect(stats.total).toBe(2)

      // Clear cache
      clearCache()

      stats = getCacheStats()
      expect(stats.total).toBe(0)

      // Next call should hit API
      await useApiWithCache('/test1', {}, mockUseDirectApi)
      expect(mockUseDirectApi).toHaveBeenCalledTimes(3) // 2 initial + 1 after clear
    })
  })
})