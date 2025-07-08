# API Tests Documentation

## 📚 Overview

This directory contains comprehensive unit tests for all API-related functionality in the Abber Frontend application. The tests ensure that API connections work correctly and handle various scenarios including errors, timeouts, and edge cases.

## 🗂️ Test Structure

### Test Files

- **`settings.test.ts`** - Tests for the Settings API endpoint
- **`integration.test.ts`** - Integration tests for API connectivity  
- **`composables.test.ts`** - Tests for API composables (useDirectApi, etc.)
- **`endpoints.test.ts`** - Validation tests for all API endpoints
- **`../stores/settings.test.ts`** - Tests for the Settings store

## 🚀 Running Tests

### Run All API Tests
```bash
npm run test:api
```

### Run Tests in Watch Mode
```bash
npm run test:api:watch
```

### Generate Detailed Report
```bash
npm run test:api:report
```

### Run Individual Test Files
```bash
# Settings API tests
npx vitest run tests/api/settings.test.ts

# Integration tests
npx vitest run tests/api/integration.test.ts

# Composables tests
npx vitest run tests/api/composables.test.ts
```

## 📋 Test Coverage

### Settings API Tests
- ✅ Successful API responses
- ✅ Error handling with response data
- ✅ Network errors without response
- ✅ Missing configuration validation
- ✅ Timeout handling
- ✅ Correct headers and authentication

### Integration Tests
- ✅ Settings endpoint connectivity
- ✅ Authentication endpoints
- ✅ Orders CRUD operations
- ✅ Error response handling (401, 404, 429, 500)
- ✅ Network timeout scenarios

### Composables Tests
- ✅ useDirectApi functionality
- ✅ Authentication state handling
- ✅ Custom headers merging
- ✅ FormData uploads
- ✅ Error propagation
- ✅ Response type handling

### Endpoints Validation
- ✅ URL structure validation
- ✅ Response format validation
- ✅ Headers validation
- ✅ WebSocket endpoints
- ✅ Pagination format
- ✅ Error response format

### Settings Store Tests
- ✅ Successful settings fetching
- ✅ Caching mechanism
- ✅ Force refresh functionality
- ✅ Fallback settings on error
- ✅ Concurrent request handling

## 🔧 Test Configuration

### Environment Variables
The tests use the following configuration:
```env
ABBER_ENV=development
VITE_WS_URL=wss://test.abber.co
VITE_AUTH_URL=https://test.abber.co/api/auth
```

### Mocking Strategy
- **axios** - Mocked for server-side API calls
- **$fetch** - Mocked for client-side API calls
- **useAuthState** - Mocked to simulate authentication states
- **useRuntimeConfig** - Mocked to provide test configuration

## 📊 Test Results

### Success Criteria
- ✅ All API endpoints respond correctly
- ✅ Error handling works as expected
- ✅ Authentication flow is validated
- ✅ Caching mechanisms function properly
- ✅ Fallback strategies prevent app crashes

### Performance Benchmarks
- API response time: < 2 seconds
- Test execution time: < 30 seconds
- Cache hit rate: > 80%
- Error recovery: < 1 second

## 🐛 Debugging Failed Tests

### Common Issues

1. **Network Connectivity**
   ```bash
   # Check if test API is accessible
   curl -I https://test.abber.co/api/settings/settings/
   ```

2. **Environment Variables**
   ```bash
   # Verify environment configuration
   echo $VITE_WS_URL
   echo $VITE_AUTH_URL
   ```

3. **Authentication Issues**
   - Check if API keys are correctly configured
   - Verify JWT token format in tests

4. **Timeout Issues**
   - Increase timeout values in test configuration
   - Check network latency to API endpoints

### Debug Commands
```bash
# Run tests with detailed output
npx vitest run tests/api/ --reporter=verbose

# Run specific test with debugging
npx vitest run tests/api/settings.test.ts --reporter=verbose

# Check test coverage
npm run test:coverage
```

## 📈 Performance Optimizations Tested

### API Caching
- ✅ Cache hit/miss scenarios
- ✅ TTL expiration handling
- ✅ Tag-based invalidation
- ✅ Force refresh functionality

### Request Deduplication
- ✅ Identical request merging
- ✅ Concurrent request handling
- ✅ Request cancellation

### Error Handling
- ✅ Graceful degradation
- ✅ Fallback mechanisms
- ✅ Retry strategies
- ✅ User-friendly error messages

## 🔐 Security Testing

### Authentication
- ✅ Token validation
- ✅ Unauthorized access handling
- ✅ Token expiration scenarios
- ✅ Header injection prevention

### API Security
- ✅ API key validation
- ✅ Rate limiting responses
- ✅ Input sanitization
- ✅ CORS handling

## 📝 Adding New Tests

### Test Template
```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('New API Feature Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should test new feature', async () => {
    // Arrange
    const mockData = { test: 'data' }
    
    // Act
    const result = await newApiFunction(mockData)
    
    // Assert
    expect(result).toBeDefined()
  })
})
```

### Best Practices
1. **Always mock external dependencies**
2. **Test both success and failure scenarios**
3. **Validate response structure and types**
4. **Include edge cases and boundary conditions**
5. **Use descriptive test names**
6. **Clean up mocks after each test**

## 📞 Support

For issues with API tests:
1. Check the test output for specific error messages
2. Verify environment configuration
3. Ensure all dependencies are installed
4. Run tests individually to isolate issues
5. Check network connectivity to API endpoints

## 🎯 Next Steps

- [ ] Add end-to-end API tests
- [ ] Implement load testing for API endpoints
- [ ] Add visual regression tests for API responses
- [ ] Create automated API documentation tests
- [ ] Add security penetration tests