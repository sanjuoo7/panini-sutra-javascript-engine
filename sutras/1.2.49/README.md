## 1.2.49 लुक् तद्धितलुकि

IAST: luk taddhita-luki  
When a taddhita affix has been elided by LUK, the feminine affix of the upasarjana is also elided (LUK).

### Conditions
- context.taddhitaElisionType === 'luk'.
- Member role upasarjana & feminine (gender or hasFeminineAffix).

### Implementation
Iterates members; marks qualifying ones with `elided=true`, `elisionType='luk'`.

### Return
Indices of affected members and count.

### Example
```js
applySutra1_2_49([{ text:'देवी', role:'upasarjana', gender:'feminine', hasFeminineAffix:true }], { taddhitaElisionType:'luk' });
```
