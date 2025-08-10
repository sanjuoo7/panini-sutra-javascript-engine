/**
 * Comprehensive test runner for sutras 1.1.30 to 1.1.42
 * This script validates that all our implementations work correctly
 */

import { applySutra1_1_30 } from './1.1.30/index.js';
import { applySutra1_1_31 } from './1.1.31/index.js';
import { applySutra1_1_32 } from './1.1.32/index.js';
import { applySutra1_1_33 } from './1.1.33/index.js';
import { applySutra1_1_37 } from './1.1.37/index.js';
import { applySutra1_1_42 } from './1.1.42/index.js';

/**
 * Test cases for comprehensive validation
 */
const testSuite = {
    '1.1.30': {
        function: applySutra1_1_30,
        testCases: [
            {
                description: 'Tritiyasamasa with sarva - should not be sarvanama',
                word: 'sarvadhana',
                context: {
                    compound: {
                        type: 'tritiyasamasa',
                        parts: ['sarva', 'dhana']
                    }
                },
                expected: { applies: true, sarvanama_status: false }
            }
        ]
    },
    
    '1.1.31': {
        function: applySutra1_1_31,
        testCases: [
            {
                description: 'Dvandva with sarva - should not be sarvanama',
                word: 'sarvaviśva',
                context: {
                    compound: {
                        type: 'dvandva',
                        parts: ['sarva', 'viśva']
                    }
                },
                expected: { applies: true, sarvanama_status: false }
            }
        ]
    },
    
    '1.1.32': {
        function: applySutra1_1_32,
        testCases: [
            {
                description: 'Dvandva with sarva before jas - optional sarvanama',
                word: 'sarvaviśvāḥ',
                context: {
                    compound: {
                        type: 'dvandva',
                        parts: ['sarva', 'viśva']
                    },
                    case: {
                        vibhakti: 'prathama',
                        vacana: 'bahuvacana'
                    }
                },
                expected: { applies: true, sarvanama_status: 'optional' }
            }
        ]
    },
    
    '1.1.33': {
        function: applySutra1_1_33,
        testCases: [
            {
                description: 'Prathama before jas - optional sarvanama',
                word: 'prathamāḥ',
                context: {
                    case: {
                        vibhakti: 'prathama',
                        vacana: 'bahuvacana'
                    }
                },
                expected: { applies: true, sarvanama_status: 'optional' }
            }
        ]
    },
    
    '1.1.37': {
        function: applySutra1_1_37,
        testCases: [
            {
                description: 'Nipata ca - should be avyaya',
                word: 'ca',
                context: { type: 'nipata' },
                expected: { applies: true, avyaya_status: true, category: 'nipata' }
            },
            {
                description: 'Svaradi svar - should be avyaya',
                word: 'svar',
                context: { type: 'svaradi' },
                expected: { applies: true, avyaya_status: true, category: 'svaradi' }
            }
        ]
    },
    
    '1.1.42': {
        function: applySutra1_1_42,
        testCases: [
            {
                description: 'Affix śi - should be sarvanāmasthāna',
                word: 'śi',
                context: {},
                expected: { applies: true, sarvanāmasthāna_status: true, affix_type: 'śi' }
            }
        ]
    }
};

/**
 * Runs all test cases and reports results
 */
function runComprehensiveTests() {
    console.log('🧪 Running Comprehensive Sutra Tests (1.1.30-1.1.42)\n');
    
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = 0;
    
    for (const [sutraNumber, sutraData] of Object.entries(testSuite)) {
        console.log(`\n📖 Testing Sutra ${sutraNumber}:`);
        console.log('=' .repeat(50));
        
        for (const testCase of sutraData.testCases) {
            totalTests++;
            
            try {
                const result = sutraData.function(testCase.word, testCase.context);
                const passed = validateTestResult(result, testCase.expected);
                
                if (passed) {
                    passedTests++;
                    console.log(`✅ PASS: ${testCase.description}`);
                    console.log(`   Word: ${testCase.word}`);
                    console.log(`   Result: ${JSON.stringify(result, null, 2)}`);
                } else {
                    failedTests++;
                    console.log(`❌ FAIL: ${testCase.description}`);
                    console.log(`   Word: ${testCase.word}`);
                    console.log(`   Expected: ${JSON.stringify(testCase.expected)}`);
                    console.log(`   Got: ${JSON.stringify(result)}`);
                }
                
            } catch (error) {
                failedTests++;
                console.log(`💥 ERROR: ${testCase.description}`);
                console.log(`   Error: ${error.message}`);
            }
        }
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests} ✅`);
    console.log(`Failed: ${failedTests} ❌`);
    console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    
    if (failedTests === 0) {
        console.log('\n🎉 All tests passed! Implementations are working correctly.');
    } else {
        console.log('\n⚠️  Some tests failed. Please review the implementations.');
    }
    
    return {
        total: totalTests,
        passed: passedTests,
        failed: failedTests,
        successRate: (passedTests / totalTests) * 100
    };
}

/**
 * Validates if test result matches expected outcome
 */
function validateTestResult(result, expected) {
    for (const [key, expectedValue] of Object.entries(expected)) {
        if (result[key] !== expectedValue) {
            return false;
        }
    }
    return true;
}

/**
 * Demonstrates integration between different sutras
 */
function demonstrateIntegration() {
    console.log('\n🔗 INTEGRATION DEMONSTRATION');
    console.log('='.repeat(50));
    
    // Example: How sutras 1.1.30, 1.1.31, and 1.1.32 interact
    const testWord = 'sarvaviśva';
    
    console.log(`\nAnalyzing word: "${testWord}" in different contexts:`);
    
    // Context 1: In tritiyasamasa
    const context1 = {
        compound: { type: 'tritiyasamasa', parts: ['sarva', 'viśva'] }
    };
    const result1 = applySutra1_1_30(testWord, context1);
    console.log(`\n1️⃣  In tritiyasamasa (1.1.30): ${result1.sarvanama_status === false ? 'NOT sarvanama' : 'sarvanama'}`);
    
    // Context 2: In dvandva (general)
    const context2 = {
        compound: { type: 'dvandva', parts: ['sarva', 'viśva'] }
    };
    const result2 = applySutra1_1_31(testWord + 'am', context2);
    console.log(`2️⃣  In dvandva general (1.1.31): ${result2.sarvanama_status === false ? 'NOT sarvanama' : 'sarvanama'}`);
    
    // Context 3: In dvandva before jas
    const context3 = {
        compound: { type: 'dvandva', parts: ['sarva', 'viśva'] },
        case: { vibhakti: 'prathama', vacana: 'bahuvacana' }
    };
    const result3 = applySutra1_1_32(testWord + 'āḥ', context3);
    console.log(`3️⃣  In dvandva before jas (1.1.32): ${result3.sarvanama_status === 'optional' ? 'OPTIONALLY sarvanama' : 'NOT sarvanama'}`);
    
    console.log(`\n💡 This shows how context determines the application of different sutras!`);
}

// Run the tests
if (typeof module !== 'undefined' && require.main === module) {
    const results = runComprehensiveTests();
    demonstrateIntegration();
}

export { runComprehensiveTests, demonstrateIntegration, testSuite };
