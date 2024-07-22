# TypeScript 5.5 Maximum call stack size exceeded

Minimim code to reproduce this [issue](https://github.com/microsoft/TypeScript/issues/59308)

## Reproduction Steps

```
npm install
npm run ts
```

Should produce 
```
RangeError: Maximum call stack size exceeded
```