#!/usr/bin/env node

/**
 * API Testing Script
 * This script runs comprehensive API tests and generates a report
 */

import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'

const execAsync = promisify(exec)

interface TestResult {
  name: string
  passed: number
  failed: number
  total: number
  duration: number
  status: 'PASS' | 'FAIL'
}

interface ApiTestReport {
  timestamp: string
  environment: string
  totalTests: number
  passedTests: number
  failedTests: number
  testSuites: TestResult[]
  overall: 'PASS' | 'FAIL'
  recommendations: string[]
}

class ApiTester {
  private results: TestResult[] = []
  
  async runTests(): Promise<ApiTestReport> {
    console.log('🚀 Starting API Tests...\n')

    const testSuites = [
      { name: 'Settings API', file: 'tests/api/settings.test.ts' },
      { name: 'Settings Store', file: 'tests/stores/settings.test.ts' },
      { name: 'API Integration', file: 'tests/api/integration.test.ts' },
      { name: 'API Composables', file: 'tests/api/composables.test.ts' },
      { name: 'API Endpoints', file: 'tests/api/endpoints.test.ts' }
    ]

    for (const suite of testSuites) {
      await this.runTestSuite(suite.name, suite.file)
    }

    return this.generateReport()
  }

  private async runTestSuite(name: string, file: string): Promise<void> {
    console.log(`📋 Running ${name} tests...`)
    
    try {
      const startTime = Date.now()
      const { stdout, stderr } = await execAsync(`npx vitest run ${file} --reporter=json`)
      const duration = Date.now() - startTime

      // Parse vitest JSON output
      let testResult: TestResult
      
      try {
        const result = JSON.parse(stdout)
        const testFiles = result.testResults || []
        const fileResult = testFiles[0] || {}
        
        testResult = {
          name,
          passed: fileResult.numPassingTests || 0,
          failed: fileResult.numFailingTests || 0,
          total: fileResult.numPassingTests + fileResult.numFailingTests || 0,
          duration,
          status: (fileResult.numFailingTests || 0) === 0 ? 'PASS' : 'FAIL'
        }
      } catch (parseError) {
        // Fallback parsing if JSON parsing fails
        testResult = this.parseTestOutput(stdout, stderr, name, duration)
      }

      this.results.push(testResult)
      
      if (testResult.status === 'PASS') {
        console.log(`✅ ${name}: ${testResult.passed}/${testResult.total} passed (${duration}ms)`)
      } else {
        console.log(`❌ ${name}: ${testResult.failed}/${testResult.total} failed (${duration}ms)`)
        if (stderr) {
          console.log(`   Error details: ${stderr.slice(0, 200)}...`)
        }
      }
      
    } catch (error: any) {
      console.log(`❌ ${name}: Test execution failed`)
      console.log(`   Error: ${error.message}`)
      
      this.results.push({
        name,
        passed: 0,
        failed: 1,
        total: 1,
        duration: 0,
        status: 'FAIL'
      })
    }
    
    console.log('')
  }

  private parseTestOutput(stdout: string, stderr: string, name: string, duration: number): TestResult {
    // Simple parsing as fallback
    const passMatches = stdout.match(/(\d+) passed/g) || []
    const failMatches = stdout.match(/(\d+) failed/g) || []
    
    const passed = passMatches.length > 0 ? 
      parseInt(passMatches[passMatches.length - 1].match(/\d+/)?.[0] || '0') : 0
    const failed = failMatches.length > 0 ? 
      parseInt(failMatches[failMatches.length - 1].match(/\d+/)?.[0] || '0') : 0

    return {
      name,
      passed,
      failed,
      total: passed + failed,
      duration,
      status: failed === 0 && passed > 0 ? 'PASS' : 'FAIL'
    }
  }

  private generateReport(): ApiTestReport {
    const totalTests = this.results.reduce((sum, result) => sum + result.total, 0)
    const passedTests = this.results.reduce((sum, result) => sum + result.passed, 0)
    const failedTests = this.results.reduce((sum, result) => sum + result.failed, 0)
    
    const overall = failedTests === 0 && passedTests > 0 ? 'PASS' : 'FAIL'
    
    const recommendations: string[] = []
    
    // Generate recommendations based on results
    if (failedTests > 0) {
      recommendations.push('Fix failing tests before deploying to production')
    }
    
    if (passedTests === 0) {
      recommendations.push('Ensure test environment is properly configured')
      recommendations.push('Check if API endpoints are accessible')
    }
    
    const failedSuites = this.results.filter(r => r.status === 'FAIL')
    if (failedSuites.length > 0) {
      recommendations.push(`Review failed test suites: ${failedSuites.map(s => s.name).join(', ')}`)
    }
    
    if (overall === 'PASS') {
      recommendations.push('All API tests passing - system is ready for deployment')
      recommendations.push('Consider adding more edge case tests for better coverage')
    }

    return {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      totalTests,
      passedTests,
      failedTests,
      testSuites: this.results,
      overall,
      recommendations
    }
  }

  async saveReport(report: ApiTestReport): Promise<void> {
    const reportDir = path.join(process.cwd(), 'test-reports')
    
    // Create reports directory if it doesn't exist
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true })
    }
    
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const reportFile = path.join(reportDir, `api-test-report-${timestamp}.json`)
    
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2))
    console.log(`📊 Test report saved to: ${reportFile}`)
  }

  printSummary(report: ApiTestReport): void {
    console.log('\n' + '='.repeat(60))
    console.log('📊 API TEST SUMMARY')
    console.log('='.repeat(60))
    console.log(`🕐 Timestamp: ${report.timestamp}`)
    console.log(`🌍 Environment: ${report.environment}`)
    console.log(`📈 Total Tests: ${report.totalTests}`)
    console.log(`✅ Passed: ${report.passedTests}`)
    console.log(`❌ Failed: ${report.failedTests}`)
    console.log(`📊 Success Rate: ${((report.passedTests / report.totalTests) * 100).toFixed(1)}%`)
    console.log(`🎯 Overall Status: ${report.overall === 'PASS' ? '✅ PASS' : '❌ FAIL'}`)
    
    console.log('\n📋 Test Suites Results:')
    report.testSuites.forEach(suite => {
      const status = suite.status === 'PASS' ? '✅' : '❌'
      console.log(`  ${status} ${suite.name}: ${suite.passed}/${suite.total} (${suite.duration}ms)`)
    })
    
    if (report.recommendations.length > 0) {
      console.log('\n💡 Recommendations:')
      report.recommendations.forEach(rec => {
        console.log(`  • ${rec}`)
      })
    }
    
    console.log('\n' + '='.repeat(60))
  }
}

// Run the tests if this script is executed directly
if (require.main === module) {
  const tester = new ApiTester()
  
  tester.runTests()
    .then(report => {
      tester.printSummary(report)
      return tester.saveReport(report)
    })
    .then(() => {
      console.log('🎉 API testing completed!')
      process.exit(0)
    })
    .catch(error => {
      console.error('💥 API testing failed:', error)
      process.exit(1)
    })
}

export default ApiTester