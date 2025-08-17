# Agents Plan

This document defines the responsibilities of the agent working on the Panini Sutra Engine project.  
The agent has a focused scope: **documentation, test case generation, and directory setup**.  

---

## Agent: Jules

**Scope:** Documentation and Tests  

### Responsibilities
1. **Directory and File Setup**
   - For each sutra, create a directory under `sutras/` if it does not exist.  
   - Directory format:  
     ```
     sutras/X.X.XX/
     ```
   - Inside this directory, create:
     - `README.md` (documentation)  
     - `index.test.js` (tests)  

2. **Documentation (`README.md`)**
   - Must follow `SUTRA_README_TEMPLATE.md`.  
   - Include:
     - Sutra Header: `Sutra X.X.XX: [Sanskrit text]`  
     - Overview (Sanskrit, transliteration, English translation)  
     - Purpose  
     - Implementation Stub (function signature + key features)  
     - Dependencies (utils, related sutras)  
     - Usage Examples (basic and advanced)  
     - Test Coverage (summary of cases)  
     - Technical Details (algorithm outline, complexity, edge cases)  
     - Integration (related sutras, higher logic)  
     - References  

3. **Test Case Design**
   - Define **positive**, **negative**, and **edge** cases.  
   - Document them inside the README under **Test Coverage**.  

4. **Test Suite (`index.test.js`)**
   - Implement tests covering all documented cases.  
   - Each test must be descriptive and deterministic.  
   - Structure:
     ```js
     import sutraXXXX from './index.js';

     describe('Sutra X.X.XX', () => {
       test('applies to valid case', () => {
         const result = sutraXXXX('example', { root: 'X' });
         expect(result.applies).toBe(true);
       });

       test('rejects invalid case', () => {
         const result = sutraXXXX('invalidWord', {});
         expect(result.applies).toBe(false);
       });
     });
     ```

---

## Boundaries
- Jules never writes sutra logic (`index.js`).  
- Jules never modifies shared utilities.  
- Jules only produces:  
  - `README.md` (docs)  
  - `index.test.js` (tests)  
  - Ensures folder structure exists.  

---

## Workflow Principle

1. **Jules always goes first.**  
   - Documentation and tests must exist before any implementation begins.  

2. **Test-first development.**  
   - The generated test suite is the contract that later implementation must satisfy.  

---

## Example Directory After Jules