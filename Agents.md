# Agents Plan

This document defines the responsibilities of agents working on the Panini Sutra Engine project. Each agent has a clear and limited scope to ensure systematic development, test-first methodology, and consistency across all sutras.

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

### Boundaries
- Jules never writes sutra logic (`index.js`).  
- Jules never modifies shared utilities.  
- Jules only produces: `README.md` + `index.test.js` + ensures folder structure.  

---

## Agent: Arjun

**Scope:** Sutra Implementation  

### Responsibilities
1. **Logic Implementation**
   - Create `index.js` inside the sutra directory.  
   - Implement sutra function using shared utilities from `sanskrit-utils`.  
   - Must satisfy Jules’s `index.test.js` test cases.  

2. **Code Standards**
   - Function signature format:  
     ```js
     function sutraXXXX(word, context = {}) { /* ... */ }
     export default sutraXXXX;
     ```
   - Support both IAST and Devanagari inputs.  
   - Include input validation (type, script, invalid inputs).  

3. **Integration**
   - Reference dependencies documented by Jules.  
   - Ensure consistency with related sutras.  

### Boundaries
- Arjun does not write documentation or tests.  
- Arjun only edits `index.js` files inside sutra folders.  

---

## Workflow Principle

1. **Jules goes first**: Documentation and tests must exist before logic is implemented.  
2. **Arjun follows**: Implementation must satisfy Jules’s test suite.  
3. After implementation:
   - Run all tests (`npm test`).  
   - Ensure coverage >95% for the sutra module.  
   - Update project documentation index if required.  

---

## Example Directory After Both Agents