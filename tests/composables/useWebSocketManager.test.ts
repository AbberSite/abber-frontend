import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useWebSocketManager } from '~/composables/useWebSocketManager'

// Mock useWebSocket from @vueuse/core
const mockUseWebSocket = vi.fn(() => ({
  status: { value: 'CONNECTING' },
  data: { value: null },
  close: vi.fn(),
  open: vi.fn(),
  send: vi.fn()
}))

vi.mock('@vueuse/core', () => ({
  useWebSocket: mockUseWebSocket
}))

describe('useWebSocketManager', () => {
  let manager: ReturnType<typeof useWebSocketManager>

  beforeEach(() => {
    vi.clearAllMocks()
    manager = useWebSocketManager()
  })

  afterEach(() => {
    manager.disconnectAll()
  })

  it('should create a new WebSocket connection', () => {
    const connection = manager.connect('test-id', 'ws://localhost:8000/test')
    
    expect(connection).toBeDefined()
    expect(manager.getConnectionCount()).toBe(1)
    expect(manager.getActiveConnections()).toContain('test-id')
  })

  it('should return existing connection if it exists and is open', () => {
    mockUseWebSocket.mockReturnValue({
      status: { value: 'OPEN' },
      data: { value: null },
      close: vi.fn(),
      open: vi.fn(),
      send: vi.fn()
    })

    const connection1 = manager.connect('test-id', 'ws://localhost:8000/test')
    const connection2 = manager.connect('test-id', 'ws://localhost:8000/test')
    
    expect(connection1).toBe(connection2)
    expect(manager.getConnectionCount()).toBe(1)
  })

  it('should disconnect a specific connection', () => {
    const mockClose = vi.fn()
    mockUseWebSocket.mockReturnValue({
      status: { value: 'OPEN' },
      data: { value: null },
      close: mockClose,
      open: vi.fn(),
      send: vi.fn()
    })

    manager.connect('test-id', 'ws://localhost:8000/test')
    manager.disconnect('test-id')
    
    expect(mockClose).toHaveBeenCalled()
    expect(manager.getConnectionCount()).toBe(0)
  })

  it('should disconnect all connections', () => {
    const mockClose1 = vi.fn()
    const mockClose2 = vi.fn()
    
    mockUseWebSocket.mockReturnValueOnce({
      status: { value: 'OPEN' },
      data: { value: null },
      close: mockClose1,
      open: vi.fn(),
      send: vi.fn()
    }).mockReturnValueOnce({
      status: { value: 'OPEN' },
      data: { value: null },
      close: mockClose2,
      open: vi.fn(),
      send: vi.fn()
    })

    manager.connect('test-id-1', 'ws://localhost:8000/test1')
    manager.connect('test-id-2', 'ws://localhost:8000/test2')
    
    expect(manager.getConnectionCount()).toBe(2)
    
    manager.disconnectAll()
    
    expect(mockClose1).toHaveBeenCalled()
    expect(mockClose2).toHaveBeenCalled()
    expect(manager.getConnectionCount()).toBe(0)
  })

  it('should check if connection is active', () => {
    mockUseWebSocket.mockReturnValue({
      status: { value: 'OPEN' },
      data: { value: null },
      close: vi.fn(),
      open: vi.fn(),
      send: vi.fn()
    })

    manager.connect('test-id', 'ws://localhost:8000/test')
    
    expect(manager.isConnected('test-id')).toBe(true)
    expect(manager.isConnected('non-existent')).toBe(false)
  })

  it('should get connection status', () => {
    mockUseWebSocket.mockReturnValue({
      status: { value: 'CONNECTING' },
      data: { value: null },
      close: vi.fn(),
      open: vi.fn(),
      send: vi.fn()
    })

    manager.connect('test-id', 'ws://localhost:8000/test')
    
    expect(manager.getConnectionStatus('test-id')).toBe('CONNECTING')
    expect(manager.getConnectionStatus('non-existent')).toBe('CLOSED')
  })
})