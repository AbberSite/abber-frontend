interface PendingRequest {
  promise: Promise<any>
  timestamp: number
  abortController: AbortController
}

class RequestDeduplicator {
  private pendingRequests: Map<string, PendingRequest> = new Map()
  private readonly maxAge = 60000 // 1 minute

  private generateKey(url: string, options: any = {}): string {
    const { method = 'GET', body, params } = options
    const searchParams = new URLSearchParams(params).toString()
    const bodyString = body ? JSON.stringify(body) : ''
    return `${method}:${url}:${searchParams}:${bodyString}`
  }

  private cleanupExpiredRequests(): void {
    const now = Date.now()
    for (const [key, request] of this.pendingRequests) {
      if (now - request.timestamp > this.maxAge) {
        request.abortController.abort()
        this.pendingRequests.delete(key)
      }
    }
  }

  async request<T>(
    url: string,
    options: any = {},
    requestFunction: (url: string, options: any) => Promise<T>
  ): Promise<T> {
    this.cleanupExpiredRequests()
    
    const key = this.generateKey(url, options)
    const existingRequest = this.pendingRequests.get(key)

    if (existingRequest) {
      console.log(`Deduplicating request: ${key}`)
      return existingRequest.promise
    }

    const abortController = new AbortController()
    const requestOptions = {
      ...options,
      signal: abortController.signal
    }

    const promise = requestFunction(url, requestOptions)
      .finally(() => {
        this.pendingRequests.delete(key)
      })

    this.pendingRequests.set(key, {
      promise,
      timestamp: Date.now(),
      abortController
    })

    return promise
  }

  cancelRequest(url: string, options: any = {}): void {
    const key = this.generateKey(url, options)
    const request = this.pendingRequests.get(key)
    
    if (request) {
      request.abortController.abort()
      this.pendingRequests.delete(key)
    }
  }

  cancelAllRequests(): void {
    for (const [key, request] of this.pendingRequests) {
      request.abortController.abort()
      this.pendingRequests.delete(key)
    }
  }

  getPendingRequestsCount(): number {
    return this.pendingRequests.size
  }

  getPendingRequestsKeys(): string[] {
    return Array.from(this.pendingRequests.keys())
  }
}

const requestDeduplicator = new RequestDeduplicator()

export function useRequestDeduplication() {
  return requestDeduplicator
}

export async function useDeduplicatedApi<T>(
  url: string,
  options: any = {}
): Promise<T> {
  const deduplicator = useRequestDeduplication()
  return deduplicator.request(url, options, useApi)
}

export async function useDeduplicatedDirectApi<T>(
  url: string,
  options: any = {}
): Promise<T> {
  const deduplicator = useRequestDeduplication()
  return deduplicator.request(url, options, useDirectApi)
}

export async function useDeduplicatedFormDataApi<T>(
  url: string,
  options: any = {}
): Promise<T> {
  const deduplicator = useRequestDeduplication()
  return deduplicator.request(url, options, useFormDataApi)
}