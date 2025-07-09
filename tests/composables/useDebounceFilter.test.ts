import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref, nextTick } from 'vue'
import { useDebounceFilter, useDebounceSearch } from '~/composables/useDebounceFilter'

describe('useDebounceFilter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should debounce function calls', async () => {
    const callback = vi.fn()
    const source = ref('initial')
    
    useDebounceFilter(source, callback, { delay: 300 })
    
    source.value = 'test1'
    source.value = 'test2'
    source.value = 'test3'
    
    expect(callback).not.toHaveBeenCalled()
    
    vi.advanceTimersByTime(300)
    await nextTick()
    
    expect(callback).toHaveBeenCalledOnce()
    expect(callback).toHaveBeenCalledWith('test3', 'test2')
  })

  it('should cancel previous timeout when new value is set', async () => {
    const callback = vi.fn()
    const source = ref('initial')
    
    useDebounceFilter(source, callback, { delay: 300 })
    
    source.value = 'test1'
    vi.advanceTimersByTime(100)
    
    source.value = 'test2'
    vi.advanceTimersByTime(100)
    
    source.value = 'test3'
    vi.advanceTimersByTime(300)
    
    expect(callback).toHaveBeenCalledOnce()
    expect(callback).toHaveBeenCalledWith('test3', 'initial')
  })

  it('should allow cancelling debounced function', async () => {
    const callback = vi.fn()
    const source = ref('initial')
    
    const { cancel } = useDebounceFilter(source, callback, { delay: 300 })
    
    source.value = 'test1'
    cancel()
    
    vi.advanceTimersByTime(300)
    
    expect(callback).not.toHaveBeenCalled()
  })

  it('should allow flushing debounced function immediately', async () => {
    const callback = vi.fn()
    const source = ref('initial')
    
    const { flush } = useDebounceFilter(source, callback, { delay: 300 })
    
    source.value = 'test1'
    flush()
    
    expect(callback).not.toHaveBeenCalled()
    
    vi.advanceTimersByTime(300)
    expect(callback).toHaveBeenCalledOnce()
  })
})

describe('useDebounceSearch', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should debounce search calls', async () => {
    const searchCallback = vi.fn()
    const searchTerm = ref('')
    
    const { isSearching } = useDebounceSearch(searchTerm, searchCallback, 300)
    
    searchTerm.value = 'test'
    
    expect(searchCallback).not.toHaveBeenCalled()
    expect(isSearching.value).toBe(false)
    
    vi.advanceTimersByTime(300)
    
    expect(searchCallback).toHaveBeenCalledOnce()
    expect(searchCallback).toHaveBeenCalledWith('test')
  })

  it('should set isSearching to true during search', async () => {
    const searchCallback = vi.fn().mockResolvedValue(undefined)
    const searchTerm = ref('')
    
    const { isSearching } = useDebounceSearch(searchTerm, searchCallback, 300)
    
    searchTerm.value = 'test'
    vi.advanceTimersByTime(300)
    
    expect(isSearching.value).toBe(true)
    
    await nextTick()
    
    expect(isSearching.value).toBe(false)
  })

  it('should not call search callback if term has not changed', async () => {
    const searchCallback = vi.fn()
    const searchTerm = ref('test')
    
    useDebounceSearch(searchTerm, searchCallback, 300)
    
    searchTerm.value = 'test'
    
    vi.advanceTimersByTime(300)
    
    expect(searchCallback).not.toHaveBeenCalled()
  })
})