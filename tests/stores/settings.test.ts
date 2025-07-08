import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useSettingsStore } from '~/stores/settings'

// Mock useApiWithCache
const mockUseApiWithCache = vi.fn()
vi.mock('~/composables/useApiCache', () => ({
  useApiWithCache: mockUseApiWithCache
}))

describe('Settings Store Tests', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should fetch and store settings successfully', async () => {
    // Arrange
    const mockSettings = {
      api_settings: {
        active_login_methods: { website: ['email', 'whatsapp', 'phone'] },
        payment_test: true,
        active_payment_methods: { website: ['card', 'wallet'] },
        active_coupon_apps: ['mobile']
      },
      policy_settings: {
        record_max_elapsed_time: 600,
        user_agreement: 'Terms and conditions'
      },
      financial_settings: {
        balance_withdrawal_tax: 0.1
      },
      general_settings: {
        phone: '+966501234567',
        email: 'contact@abber.co',
        address: 'Riyadh, Saudi Arabia',
        about: 'Abber platform description'
      },
      social_settings: {
        facebook: 'https://facebook.com/abber',
        snapchat: 'https://snapchat.com/abber',
        twitter: 'https://twitter.com/abber',
        instagram: 'https://instagram.com/abber'
      }
    }

    mockUseApiWithCache.mockResolvedValue(mockSettings)

    const settingsStore = useSettingsStore()

    // Act
    const result = await settingsStore.getSettings()

    // Assert
    expect(mockUseApiWithCache).toHaveBeenCalledWith('/api/settings/', {
      ttl: 600000,
      tags: ['settings'],
      key: 'website-settings'
    })
    expect(result).toEqual(mockSettings)
    expect(settingsStore.settings).toEqual(mockSettings)
  })

  it('should return cached settings without API call', async () => {
    // Arrange
    const settingsStore = useSettingsStore()
    const cachedSettings = {
      api_settings: {
        active_login_methods: { website: ['email'] },
        payment_test: false,
        active_payment_methods: { website: [] },
        active_coupon_apps: []
      },
      policy_settings: {
        record_max_elapsed_time: 300,
        user_agreement: ''
      },
      financial_settings: {
        balance_withdrawal_tax: 0
      },
      general_settings: {
        phone: '',
        email: '',
        address: '',
        about: ''
      },
      social_settings: {
        facebook: '',
        snapchat: '',
        twitter: '',
        instagram: ''
      }
    }

    settingsStore.settings = cachedSettings

    // Act
    const result = await settingsStore.getSettings()

    // Assert
    expect(mockUseApiWithCache).not.toHaveBeenCalled()
    expect(result).toEqual(cachedSettings)
  })

  it('should force refresh when requested', async () => {
    // Arrange
    const settingsStore = useSettingsStore()
    const cachedSettings = { api_settings: { active_login_methods: { website: ['email'] } } }
    const newSettings = { api_settings: { active_login_methods: { website: ['email', 'whatsapp'] } } }

    settingsStore.settings = cachedSettings as any
    mockUseApiWithCache.mockResolvedValue(newSettings)

    // Act
    const result = await settingsStore.getSettings(true)

    // Assert
    expect(mockUseApiWithCache).toHaveBeenCalledWith('/api/settings/', {
      ttl: 600000,
      tags: ['settings'],
      key: 'website-settings'
    })
    expect(result).toEqual(newSettings)
  })

  it('should handle API error and return fallback settings', async () => {
    // Arrange
    const settingsStore = useSettingsStore()
    const apiError = new Error('API request failed')
    mockUseApiWithCache.mockRejectedValue(apiError)

    // Mock console.error to avoid test output noise
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    // Act
    const result = await settingsStore.getSettings()

    // Assert
    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch settings:', apiError)
    expect(result).toBeDefined()
    expect(result.api_settings.active_login_methods.website).toContain('email')
    expect(settingsStore.settings).toEqual(result)

    consoleSpy.mockRestore()
  })

  it('should have correct fallback settings structure', async () => {
    // Arrange
    const settingsStore = useSettingsStore()
    mockUseApiWithCache.mockRejectedValue(new Error('Network error'))
    vi.spyOn(console, 'error').mockImplementation(() => {})

    // Act
    const result = await settingsStore.getSettings()

    // Assert
    expect(result).toHaveProperty('api_settings')
    expect(result).toHaveProperty('policy_settings')
    expect(result).toHaveProperty('financial_settings')
    expect(result).toHaveProperty('general_settings')
    expect(result).toHaveProperty('social_settings')

    expect(result.api_settings).toHaveProperty('active_login_methods')
    expect(result.api_settings).toHaveProperty('payment_test')
    expect(result.api_settings).toHaveProperty('active_payment_methods')
    expect(result.api_settings).toHaveProperty('active_coupon_apps')

    expect(result.policy_settings.record_max_elapsed_time).toBe(300)
    expect(result.financial_settings.balance_withdrawal_tax).toBe(0)
  })

  it('should validate login methods in fallback settings', async () => {
    // Arrange
    const settingsStore = useSettingsStore()
    mockUseApiWithCache.mockRejectedValue(new Error('Service unavailable'))
    vi.spyOn(console, 'error').mockImplementation(() => {})

    // Act
    const result = await settingsStore.getSettings()

    // Assert
    const loginMethods = result.api_settings.active_login_methods.website
    expect(Array.isArray(loginMethods)).toBe(true)
    expect(loginMethods).toContain('email')
    expect(loginMethods.length).toBeGreaterThan(0)
  })

  it('should handle concurrent API calls correctly', async () => {
    // Arrange
    const settingsStore = useSettingsStore()
    const mockSettings = {
      api_settings: {
        active_login_methods: { website: ['email'] },
        payment_test: false,
        active_payment_methods: { website: [] },
        active_coupon_apps: []
      }
    }

    // Simulate slow API response
    mockUseApiWithCache.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockSettings), 100))
    )

    // Act - Make concurrent calls
    const promise1 = settingsStore.getSettings()
    const promise2 = settingsStore.getSettings()
    const promise3 = settingsStore.getSettings()

    const [result1, result2, result3] = await Promise.all([promise1, promise2, promise3])

    // Assert
    expect(result1).toEqual(mockSettings)
    expect(result2).toEqual(mockSettings)
    expect(result3).toEqual(mockSettings)
    
    // API should only be called once due to caching
    expect(mockUseApiWithCache).toHaveBeenCalledTimes(1)
  })
})