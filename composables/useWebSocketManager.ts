import { useWebSocket } from '@vueuse/core'
import type { UseWebSocketReturn } from '@vueuse/core'

interface WebSocketConnection {
  id: string
  connection: UseWebSocketReturn<any>
  url: string
  options?: any
}

class WebSocketManager {
  private connections: Map<string, WebSocketConnection> = new Map()
  private reconnectAttempts: Map<string, number> = new Map()
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000

  connect(
    id: string,
    url: string,
    options: any = {}
  ): UseWebSocketReturn<any> {
    // If connection already exists, return it
    if (this.connections.has(id)) {
      const existing = this.connections.get(id)!
      if (existing.connection.status.value === 'OPEN') {
        return existing.connection
      }
      // Clean up closed connection
      this.disconnect(id)
    }

    const connection = useWebSocket(url, {
      autoReconnect: false, // We'll handle reconnection manually
      ...options,
      onConnected: () => {
        this.reconnectAttempts.set(id, 0)
        options.onConnected?.(id)
      },
      onDisconnected: () => {
        this.handleDisconnection(id, url, options)
        options.onDisconnected?.(id)
      },
      onError: (error) => {
        console.error(`WebSocket error for ${id}:`, error)
        options.onError?.(error, id)
      }
    })

    this.connections.set(id, {
      id,
      connection,
      url,
      options
    })

    return connection
  }

  private handleDisconnection(id: string, url: string, options: any) {
    const attempts = this.reconnectAttempts.get(id) || 0
    
    if (attempts < this.maxReconnectAttempts) {
      this.reconnectAttempts.set(id, attempts + 1)
      
      setTimeout(() => {
        if (this.connections.has(id)) {
          console.log(`Reconnecting WebSocket ${id}, attempt ${attempts + 1}`)
          this.disconnect(id)
          this.connect(id, url, options)
        }
      }, this.reconnectDelay * Math.pow(2, attempts)) // Exponential backoff
    } else {
      console.error(`Max reconnection attempts reached for WebSocket ${id}`)
      this.disconnect(id)
    }
  }

  disconnect(id: string) {
    const connection = this.connections.get(id)
    if (connection) {
      connection.connection.close()
      this.connections.delete(id)
      this.reconnectAttempts.delete(id)
    }
  }

  disconnectAll() {
    for (const [id] of this.connections) {
      this.disconnect(id)
    }
  }

  getConnection(id: string): UseWebSocketReturn<any> | undefined {
    return this.connections.get(id)?.connection
  }

  isConnected(id: string): boolean {
    const connection = this.connections.get(id)
    return connection?.connection.status.value === 'OPEN'
  }

  getConnectionStatus(id: string): string {
    const connection = this.connections.get(id)
    return connection?.connection.status.value || 'CLOSED'
  }

  getActiveConnections(): string[] {
    return Array.from(this.connections.keys())
  }

  getConnectionCount(): number {
    return this.connections.size
  }
}

const wsManager = new WebSocketManager()

export function useWebSocketManager() {
  return wsManager
}

export function useWebSocketConnection(
  id: string,
  url: string,
  options: any = {}
) {
  const manager = useWebSocketManager()
  
  const connection = manager.connect(id, url, options)
  
  // Auto-cleanup on unmount
  onUnmounted(() => {
    manager.disconnect(id)
  })
  
  return {
    ...connection,
    disconnect: () => manager.disconnect(id),
    isConnected: computed(() => manager.isConnected(id)),
    status: computed(() => manager.getConnectionStatus(id))
  }
}