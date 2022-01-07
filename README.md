bcmath
=======
[![total downloads of bcmath](https://img.shields.io/npm/dt/bcmath.svg)](https://www.npmjs.com/package/bcmath)
[![bcmath's License](https://img.shields.io/npm/l/bcmath.svg)](https://www.npmjs.com/package/bcmath)
[![latest version of bcmath](https://img.shields.io/npm/v/bcmath.svg)](https://www.npmjs.com/package/bcmath)

*Arbitrary-length arithmetics without hassle.*
<br />

**bcmath** package is a robust solution for calculations when precision is key.

- **No** to floating-point numbers.
- **No** to length/precision limits
- **Yes** to an API that makes sense. 

## Examples
```
import * as math from 'bcmath'

console.log(0.1 + 0.2 + 0.3)
// 0.6000000000000001 :-(

console.log(math.chain(0.1).add(0.2).add(0.3).done())
// 0.6 :-)

console.log(math.pow(2, 4096).length)
// 1234

const n = math.chain(0.15).pow(-10)

//173415299.1583261182
console.log(n.done())

console.log(n.round(3).done())
//173415299.158

console.log(n.round(-3).done())
//173415000
```

## Development

GitHub: https://github.com/kakserpom/bcmath.js
