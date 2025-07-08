import { ref, watch } from 'vue'
import type { WatchOptions } from 'vue'

interface DebounceOptions {
  delay?: number
  immediate?: boolean
}

export function useDebounceFilter<T>(
  source: Ref<T> | (() => T),
  callback: (value: T, oldValue: T) => void,
  options: DebounceOptions & WatchOptions = {}
) {
  const { delay = 300, immediate = false, ...watchOptions } = options
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const debouncedCallback = (value: T, oldValue: T) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      callback(value, oldValue)
      timeoutId = null
    }, delay)
  }

  const stopWatcher = watch(source, debouncedCallback, watchOptions)

  const flush = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  const cancel = () => {
    flush()
    stopWatcher()
  }

  return { cancel, flush }
}

export function useDebounceSearch(
  searchTerm: Ref<string>,
  searchCallback: (term: string) => void,
  delay: number = 300
) {
  const isSearching = ref(false)
  
  const { cancel, flush } = useDebounceFilter(
    searchTerm,
    async (newTerm: string, oldTerm: string) => {
      if (newTerm !== oldTerm) {
        isSearching.value = true
        try {
          await searchCallback(newTerm)
        } finally {
          isSearching.value = false
        }
      }
    },
    { delay, immediate: false }
  )

  return {
    isSearching,
    cancel,
    flush
  }
}