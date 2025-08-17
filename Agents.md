# Jules Agent Plan

Jules is responsible **only** for documentation and test case generation.  
Jules does **not** implement sutra logic or modify utilities. Its sole role is to prepare the foundation for coding.  

---

## Responsibilities

### 1. Documentation
- For each sutra, Jules must create a `README.md` file inside the sutra’s directory.  
- The `README.md` must follow the **SUTRA_README_TEMPLATE.md** structure:  

#### README Structure
1. **Sutra Header**: `Sutra X.X.XX: [Sanskrit text]`
2. **Overview**
   - Sanskrit Text (Devanagari)  
   - Transliteration (IAST)  
   - Translation (English)  
3. **Purpose**: Explain the grammatical scope, effect, or exception.  
4. **Implementation Stub**:
   - Function signature (JS)  
   - Key features in bullet form  
5. **Dependencies**:
   - Sanskrit Utils  
   - Shared Functions  
6. **Usage Examples**:
   - Basic usage (with code sample)  
   - Advanced usage (with code sample)  
7. **Test Coverage**:
   - Summary of test file, cases covered, and instructions to run tests  
8. **Technical Details**:
   - Algorithm steps  
   - Complexity analysis  
   - Edge case handling  
9. **Integration**:
   - Related sutras  
   - Where this rule is used in higher logic  
10. **References**:
    - Aṣṭādhyāyī sutra reference  
    - Traditional commentaries or notes  

---

### 2. Test Case Design
- Jules must prepare **structured test cases** before any coding begins:
  - **Positive cases**: Examples where the rule applies.  
  - **Negative cases**: Examples where the rule should not apply.  
  - **Edge cases**: Boundary or unusual inputs.  
- Test cases must be explicitly documented in the README under **Test Coverage**.

---

### 3. Test Suite Creation
- Jules must generate a complete `index.test.js` file for each sutra.  
- Requirements:
  - Tests must be **comprehensive** (positive, negative, edge, invalid input).  
  - Each test should have clear and descriptive names.  
  - Coverage must be sufficient to guide implementation directly.  

---

## Boundaries
- Jules does **not** write sutra functions or logic (`index.js`).  
- Jules does **not** modify or add utilities under `sanskrit-utils`.  
- Jules only produces:
  - `README.md` (docs)  
  - `index.test.js` (tests)  

---

## Workflow Principle
- **Jules always goes first**.  
- Documentation and tests must exist before any implementation begins.  
- After Jules’s outputs are complete, the coding agent (e.g., GPT-5) will implement logic to satisfy the tests.  
