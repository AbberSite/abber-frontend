import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useRequestDeduplication, useDeduplicatedApi } from '~/composables/useRequestDeduplication'

// Mock API functions
const mockUseApi = vi.fn()
const mockUseDirectApi = vi.fn()
const mockUseFormDataApi = vi.fn()

// Mock the global functions
global.useApi = mockUseApi
global.useDirectApi = mockUseDirectApi
global.useFormDataApi = mockUseFormDataApi

describe('useRequestDeduplication', () => {
  let deduplicator: ReturnType<typeof useRequestDeduplication>

  beforeEach(() => {
    vi.clearAllMocks()
    deduplicator = useRequestDeduplication()
    deduplicator.cancelAllRequests()
  })

  afterEach(() => {
    deduplicator.cancelAllRequests()
  })

  it('should deduplicate identical requests', async () => {
    const mockResponse = { data: 'test' }
    const mockRequestFunction = vi.fn().mockResolvedValue(mockResponse)

    const request1 = deduplicator.request('/test', {}, mockRequestFunction)
    const request2 = deduplicator.request('/test', {}, mockRequestFunction)

    expect(deduplicator.getPendingRequestsCount()).toBe(1)
    expect(mockRequestFunction).toHaveBeenCalledOnce()

    const [result1, result2] = await Promise.all([request1, request2])
    
    expect(result1).toBe(mockResponse)
    expect(result2).toBe(mockResponse)
    expect(deduplicator.getPendingRequestsCount()).toBe(0)
  })

  it('should not deduplicate different requests', async () => {
    const mockResponse1 = { data: 'test1' }
    const mockResponse2 = { data: 'test2' }
    const mockRequestFunction = vi.fn()
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2)

    const request1 = deduplicator.request('/test1', {}, mockRequestFunction)
    const request2 = deduplicator.request('/test2', {}, mockRequestFunction)

    expect(deduplicator.getPendingRequestsCount()).toBe(2)
    expect(mockRequestFunction).toHaveBeenCalledTimes(2)

    const [result1, result2] = await Promise.all([request1, request2])
    
    expect(result1).toBe(mockResponse1)
    expect(result2).toBe(mockResponse2)
  })

  it('should differentiate requests by method', async () => {
    const mockResponse1 = { data: 'get' }
    const mockResponse2 = { data: 'post' }
    const mockRequestFunction = vi.fn()
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2)

    const request1 = deduplicator.request('/test', { method: 'GET' }, mockRequestFunction)
    const request2 = deduplicator.request('/test', { method: 'POST' }, mockRequestFunction)

    expect(deduplicator.getPendingRequestsCount()).toBe(2)
    expect(mockRequestFunction).toHaveBeenCalledTimes(2)

    const [result1, result2] = await Promise.all([request1, request2])
    
    expect(result1).toBe(mockResponse1)
    expect(result2).toBe(mockResponse2)
  })

  it('should differentiate requests by body', async () => {
    const mockResponse1 = { data: 'body1' }
    const mockResponse2 = { data: 'body2' }
    const mockRequestFunction = vi.fn()
      .mockResolvedValueOnce(mockResponse1)
      .mockResolvedValueOnce(mockResponse2)

    const request1 = deduplicator.request('/test', { body: { id: 1 } }, mockRequestFunction)
    const request2 = deduplicator.request('/test', { body: { id: 2 } }, mockRequestFunction)

    expect(deduplicator.getPendingRequestsCount()).toBe(2)
    expect(mockRequestFunction).toHaveBeenCalledTimes(2)

    const [result1, result2] = await Promise.all([request1, request2])
    
    expect(result1).toBe(mockResponse1)
    expect(result2).toBe(mockResponse2)
  })

  it('should cancel specific request', async () => {
    const mockRequestFunction = vi.fn().mockImplementation(() => 
      new Promise((resolve) => setTimeout(resolve, 1000))
    )

    const request = deduplicator.request('/test', {}, mockRequestFunction)
    
    expect(deduplicator.getPendingRequestsCount()).toBe(1)
    
    deduplicator.cancelRequest('/test', {})
    
    expect(deduplicator.getPendingRequestsCount()).toBe(0)
    
    await expect(request).rejects.toThrow()
  })

  it('should cancel all requests', async () => {
    const mockRequestFunction = vi.fn().mockImplementation(() => 
      new Promise((resolve) => setTimeout(resolve, 1000))
    )

    const request1 = deduplicator.request('/test1', {}, mockRequestFunction)
    const request2 = deduplicator.request('/test2', {}, mockRequestFunction)
    
    expect(deduplicator.getPendingRequestsCount()).toBe(2)
    
    deduplicator.cancelAllRequests()
    
    expect(deduplicator.getPendingRequestsCount()).toBe(0)
    
    await expect(request1).rejects.toThrow()
    await expect(request2).rejects.toThrow()
  })

  it('should clean up expired requests', async () => {
    vi.useFakeTimers()

    const mockRequestFunction = vi.fn().mockImplementation(() => 
      new Promise((resolve) => setTimeout(resolve, 1000))
    )

    deduplicator.request('/test', {}, mockRequestFunction)
    
    expect(deduplicator.getPendingRequestsCount()).toBe(1)
    
    // Fast-forward time by 61 seconds (beyond maxAge of 60 seconds)
    vi.advanceTimersByTime(61000)
    
    // Trigger cleanup by making another request
    deduplicator.request('/test2', {}, mockRequestFunction)
    
    expect(deduplicator.getPendingRequestsCount()).toBe(1)
    
    vi.useRealTimers()
  })
})

describe('useDeduplicatedApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should use deduplication for API calls', async () => {
    const mockResponse = { data: 'test' }
    mockUseApi.mockResolvedValue(mockResponse)

    const request1 = useDeduplicatedApi('/test')
    const request2 = useDeduplicatedApi('/test')

    expect(mockUseApi).toHaveBeenCalledOnce()

    const [result1, result2] = await Promise.all([request1, request2])
    
    expect(result1).toBe(mockResponse)
    expect(result2).toBe(mockResponse)
  })
})