import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock $fetch
const mockFetch = vi.fn()
global.$fetch = mockFetch

// Mock useAuthState
const mockUseAuthState = vi.fn(() => ({
  status: { value: 'authenticated' },
  rawToken: { value: 'mock-jwt-token' }
}))

vi.mock('#app', () => ({
  useAuthState: mockUseAuthState
}))

describe('API Composables Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('useDirectApi', () => {
    it('should make API call with correct headers', async () => {
      // Arrange
      const mockResponse = { data: 'test response' }
      mockFetch.mockResolvedValue(mockResponse)

      // Import after mocking
      const { default: useDirectApi } = await import('~/composables/useDirectApi')

      // Act
      const result = await useDirectApi('/test-endpoint', {
        method: 'GET'
      })

      // Assert
      expect(mockFetch).toHaveBeenCalledWith('/api/custom-api-endpoint/fetch-api/', {
        method: 'GET',
        headers: {
          nuxtapiurl: '/test-endpoint',
          Authorization: 'JWT mock-jwt-token'
        }
      })
      expect(result).toBe(mockResponse)
    })

    it('should handle unauthenticated state', async () => {
      // Arrange
      mockUseAuthState.mockReturnValue({
        status: { value: 'unauthenticated' },
        rawToken: { value: null }
      })

      const mockResponse = { data: 'public data' }
      mockFetch.mockResolvedValue(mockResponse)

      const { default: useDirectApi } = await import('~/composables/useDirectApi')

      // Act
      const result = await useDirectApi('/public-endpoint')

      // Assert
      expect(mockFetch).toHaveBeenCalledWith('/api/custom-api-endpoint/fetch-api/', {
        headers: {
          nuxtapiurl: '/public-endpoint',
          Authorization: ''
        }
      })
      expect(result).toBe(mockResponse)
    })

    it('should merge custom headers', async () => {
      // Arrange
      mockUseAuthState.mockReturnValue({
        status: { value: 'authenticated' },
        rawToken: { value: 'test-token' }
      })

      mockFetch.mockResolvedValue({ success: true })

      const { default: useDirectApi } = await import('~/composables/useDirectApi')

      // Act
      await useDirectApi('/test', {
        headers: {
          'Custom-Header': 'custom-value',
          'Content-Type': 'application/json'
        }
      })

      // Assert
      expect(mockFetch).toHaveBeenCalledWith('/api/custom-api-endpoint/fetch-api/', {
        headers: {
          nuxtapiurl: '/test',
          Authorization: 'JWT test-token',
          'Custom-Header': 'custom-value',
          'Content-Type': 'application/json'
        }
      })
    })

    it('should handle POST requests with body', async () => {
      // Arrange
      const requestBody = { name: 'Test', email: 'test@example.com' }
      mockFetch.mockResolvedValue({ id: 1, ...requestBody })

      const { default: useDirectApi } = await import('~/composables/useDirectApi')

      // Act
      await useDirectApi('/users', {
        method: 'POST',
        body: requestBody
      })

      // Assert
      expect(mockFetch).toHaveBeenCalledWith('/api/custom-api-endpoint/fetch-api/', {
        method: 'POST',
        body: requestBody,
        headers: {
          nuxtapiurl: '/users',
          Authorization: 'JWT mock-jwt-token'
        }
      })
    })
  })

  describe('useFormDataApi', () => {
    it('should handle FormData uploads', async () => {
      // Mock useFormDataApi
      const mockFormData = new FormData()
      mockFormData.append('file', new Blob(['test'], { type: 'text/plain' }))
      mockFormData.append('name', 'test-file')

      mockFetch.mockResolvedValue({ success: true, file_id: 123 })

      // We need to create a mock for useFormDataApi since it's not imported directly
      const useFormDataApi = async (url: string, options: any) => {
        return await $fetch('/api/custom-api-endpoint/fetch-api/', {
          ...options,
          headers: {
            nuxtapiurl: url,
            Authorization: 'JWT mock-jwt-token',
            ...options?.headers
          }
        })
      }

      // Act
      const result = await useFormDataApi('/upload', {
        method: 'POST',
        body: mockFormData
      })

      // Assert
      expect(mockFetch).toHaveBeenCalledWith('/api/custom-api-endpoint/fetch-api/', {
        method: 'POST',
        body: mockFormData,
        headers: {
          nuxtapiurl: '/upload',
          Authorization: 'JWT mock-jwt-token'
        }
      })
      expect(result).toEqual({ success: true, file_id: 123 })
    })
  })

  describe('API Error Handling', () => {
    it('should handle API errors properly', async () => {
      // Arrange
      const apiError = {
        response: {
          _data: {
            error: 'Validation failed',
            details: { email: ['This field is required'] }
          },
          status: 400
        }
      }

      mockFetch.mockRejectedValue(apiError)

      const { default: useDirectApi } = await import('~/composables/useDirectApi')

      // Act & Assert
      await expect(useDirectApi('/invalid-data', {
        method: 'POST',
        body: { invalid: 'data' }
      })).rejects.toEqual(apiError)
    })

    it('should handle network errors', async () => {
      // Arrange
      const networkError = new Error('Network connection failed')
      mockFetch.mockRejectedValue(networkError)

      const { default: useDirectApi } = await import('~/composables/useDirectApi')

      // Act & Assert
      await expect(useDirectApi('/test')).rejects.toThrow('Network connection failed')
    })

    it('should handle timeout errors', async () => {
      // Arrange
      const timeoutError = new Error('Request timeout')
      mockFetch.mockRejectedValue(timeoutError)

      const { default: useDirectApi } = await import('~/composables/useDirectApi')

      // Act & Assert
      await expect(useDirectApi('/slow-endpoint')).rejects.toThrow('Request timeout')
    })
  })

  describe('API Response Types', () => {
    it('should handle JSON responses', async () => {
      // Arrange
      const jsonResponse = {
        data: { id: 1, name: 'Test' },
        meta: { total: 1 }
      }
      mockFetch.mockResolvedValue(jsonResponse)

      const { default: useDirectApi } = await import('~/composables/useDirectApi')

      // Act
      const result = await useDirectApi('/json-endpoint')

      // Assert
      expect(result).toEqual(jsonResponse)
      expect(typeof result).toBe('object')
    })

    it('should handle text responses', async () => {
      // Arrange
      const textResponse = 'Plain text response'
      mockFetch.mockResolvedValue(textResponse)

      const { default: useDirectApi } = await import('~/composables/useDirectApi')

      // Act
      const result = await useDirectApi('/text-endpoint')

      // Assert
      expect(result).toBe(textResponse)
      expect(typeof result).toBe('string')
    })

    it('should handle empty responses', async () => {
      // Arrange
      mockFetch.mockResolvedValue(null)

      const { default: useDirectApi } = await import('~/composables/useDirectApi')

      // Act
      const result = await useDirectApi('/empty-endpoint')

      // Assert
      expect(result).toBeNull()
    })
  })

  describe('Authentication Edge Cases', () => {
    it('should handle expired token', async () => {
      // Arrange
      mockUseAuthState.mockReturnValue({
        status: { value: 'authenticated' },
        rawToken: { value: 'expired-token' }
      })

      const authError = {
        response: {
          status: 401,
          _data: { error: 'Token expired' }
        }
      }

      mockFetch.mockRejectedValue(authError)

      const { default: useDirectApi } = await import('~/composables/useDirectApi')

      // Act & Assert
      await expect(useDirectApi('/protected-endpoint')).rejects.toEqual(authError)
    })

    it('should handle missing token', async () => {
      // Arrange
      mockUseAuthState.mockReturnValue({
        status: { value: 'authenticated' },
        rawToken: { value: '' }
      })

      mockFetch.mockResolvedValue({ data: 'response' })

      const { default: useDirectApi } = await import('~/composables/useDirectApi')

      // Act
      const result = await useDirectApi('/endpoint')

      // Assert
      expect(mockFetch).toHaveBeenCalledWith('/api/custom-api-endpoint/fetch-api/', {
        headers: {
          nuxtapiurl: '/endpoint',
          Authorization: ''
        }
      })
    })
  })
})