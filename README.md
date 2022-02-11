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
import {Bcmath} from 'bcmath'

// Spawn a bcmath instance with a precision of 20 decimal places
const math = Bcmath(20)

console.log(0.1 + 0.2 + 0.3)
// 0.6000000000000001 :-(

console.log(math.chain(0.1).add(0.2).add(0.3).done())
// 0.6 :-)

console.log(math.eval('x ^ (y + 5)', {x: 2, y: 3}))
// 256

console.log(math.pow(2, 4096).length)
// 1234

const n = math.chain(0.15, 50).pow(-10)
console.log(n.done())
// 173415299.15832613592101475046148114277972531287574726074779

console.log(n.round(3).done())
//173415299.158

console.log(n.round(-3).done())
//173415000

console.log(math.max(1, 2, 3.62, 3.61))
// 3.62

console.log(math.pi(50))
// 3.14159265358979323846264338327950288419716939937510

console.log(math.sqrt(2))
// 1.41421568627450980392

```

## API
### index.js


#### Bcmath(scale) 

Get a BcmathClass instance




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| scale | `int`  | Decimal places | &nbsp; |




##### Returns


- `BcmathClass`  



#### new BcmathClass() 

Bcmath






##### Returns


- `Void`



#### BcmathClass.constructor(scale) 

Constructor




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| scale | `int`  | Decimal places | &nbsp; |




##### Returns


- `Void`



#### BcmathClass.chain(number, scale) 

Returns Chain object




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| number | `string` `number` `BigInt`  | Number to start with | &nbsp; |
| scale | `int`  | Number of decimal places | &nbsp; |




##### Returns


- `Chain`  



#### BcmathClass.compare(left, right) 

Returns:
     -1 if left is lesser than right
     0 if left is equal to right
     1 if left is greater than right




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| left | `string` `number` `BigInt`  | Left operand | &nbsp; |
| right | `string` `number` `BigInt`  | Right operand | &nbsp; |




##### Returns


- `int`  



#### BcmathClass.pow(number, power) 

Number to be raised to a power




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| number | `string` `number` `BigInt`  | Number | &nbsp; |
| power | `int`  | Power | &nbsp; |




##### Returns


- `number`  



#### BcmathClass.avg(numbers) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| numbers |  |  | &nbsp; |




##### Returns


- `Chain`  



#### BcmathClass.round(number, precision) 

Round the number to the nearest round number




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| number | `string` `number` `BigInt`  | Number | &nbsp; |
| precision |  | Number of decimal places. Can be negative. Default: 0 | &nbsp; |




##### Returns


- `string`  



#### BcmathClass.abs(number) 

Returns the absolute value of the specified number




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| number | `string` `number` `BigInt`  |  | &nbsp; |




##### Returns


- `string`  



#### BcmathClass.floor(number, precision) 

Round the number down




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| number | `string` `number` `BigInt`  | Subject number | &nbsp; |
| precision |  | Number of decimal places. Can be negative. Default: 0 | &nbsp; |




##### Returns


- `string`  



#### BcmathClass.ceil(number, precision) 

Round the number up




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| number | `string` `number` `BigInt`  | Subject number | &nbsp; |
| precision | `int`  | Number of decimal places. Can be negative. Default: 0 | &nbsp; |




##### Returns


- `string`  



#### BcmathClass.mul(number, multiplier, scale) 

Multiply




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| number | `string` `number` `BigInt`  |  | &nbsp; |
| multiplier | `string` `number` `BigInt`  |  | &nbsp; |
| scale | `int`  | Number of decimal places | &nbsp; |




##### Returns


- `string`  



#### BcmathClass.div(number, divisor, scale) 

Divide




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| number | `string` `number` `BigInt`  | Number | &nbsp; |
| divisor | `string` `number` `BigInt`  | Divisor | &nbsp; |
| scale | `int`  | Number of decimal places | &nbsp; |




##### Returns


- `string`  



#### BcmathClass.add(left, right, scale) 

Add two numbers




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| left | `string` `number` `BigInt`  | Left operand | &nbsp; |
| right | `string` `number` `BigInt`  | Right operand | &nbsp; |
| scale | `int`  | Number of decimal places | &nbsp; |




##### Returns


- `string`  



#### BcmathClass.mod(number, divisor) 

Get the modulus




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| number | `string` `number` `BigInt`  | Number | &nbsp; |
| divisor |  | Divisor | &nbsp; |




##### Returns


- `string`  



#### BcmathClass.sub(left, right, scale) 

Substract right from left




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| left |  | Left operand | &nbsp; |
| right |  | Right operand | &nbsp; |
| scale | `int`  | Number of decimal places | &nbsp; |




##### Returns


- `string`  



#### BcmathClass.max(scale) 

Returns the highest number




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| ...numbers |  | Array of numbers | &nbsp; |
| scale | `int`  | Number of decimal places | &nbsp; |




##### Returns


- `string`  



#### BcmathClass.min(scale) 

Returns the lowest number




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| ...numbers |  | Array of numbers | &nbsp; |
| scale | `int`  | Number of decimal places | &nbsp; |




##### Returns


- `string`  



#### BcmathClass.isBigInt(number) 

Check if the number fits in a signed BigInt




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| number | `string` `number` `BigInt`  | Number | &nbsp; |




##### Returns


- `boolean`  



#### BcmathClass.isSafeBigInt(number) 

Check if the number is safe to use in Javascript BigInt




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| number | `string` `number` `BigInt`  | Number | &nbsp; |




##### Returns


- `boolean`  



#### BcmathClass.*generateDigitsOfPi() 








##### Returns


- `Generator.&lt;number&gt;`  



#### BcmathClass.pi(scale) 

Get π




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| scale | `int`  | Number of decimal places | &nbsp; |




##### Returns


- `string`  



#### BcmathClass.piFormatted(scale) 

π in a formatted string, up to 50 digits per line




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| scale | `int`  | Number of decimal places | &nbsp; |




##### Returns


- `string`  



#### BcmathClass.sqrt(number, scale) 

Calculate square root




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| number | `string` `number` `BigInt`  |  | &nbsp; |
| scale | `int`  |  | &nbsp; |




##### Returns


- `string`  



#### BcmathClass.neg(number) 

Multiply by -1




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| number | `string` `number` `BigInt`  | Number | &nbsp; |




##### Returns


- `Void`



#### BcmathClass.eval(expr, variables) 

Evaluate an expression




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| expr | `string`  | Expression, e.g 'x + y' | &nbsp; |
| variables | `object`  |  | &nbsp; |




##### Returns


- `Void`



#### BcmathClass.parse(expr) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| expr |  |  | &nbsp; |




##### Returns


- `function(*): *`  



#### trimZeroes(value) 

Trims empty decimal places




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value |  |  | &nbsp; |




##### Returns


- `string`  




### chain.js


#### Chain.constructor(number, scale) 

Constructor




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| number | `string` `number` `BigInt`  | Number | &nbsp; |
| scale | `int`  | Number of decimal places (default: 10) | &nbsp; |




##### Returns


- `Void`



#### Chain.toJSON() 

toJSON






##### Returns


- `string`  



#### Chain.scale(scale) 

Set the scale of operations




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| scale | `int`  | Number of decimal places | &nbsp; |




##### Returns


- `Chain`  



#### Chain.compare(left, right) 

Returns:
     -1 if current value is lesser than the number
     0 if left is equal to the number
     1 if left is greater than the number




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| left |  | Left operand | &nbsp; |
| right |  | Right operand | &nbsp; |




##### Returns


- `int`  



#### Chain.round(precision) 

Round value to the nearest round number




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| precision |  | Number of decimal places. Can be negative. Default: 0 | &nbsp; |




##### Returns


- `string`  



#### Chain.floor(precision) 

Round the number down




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| precision |  | Number of decimal places. Can be negative. Default: 0 | &nbsp; |




##### Returns


- `Chain`  



#### Chain.ceil(precision) 

Round the number up




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| precision |  | Number of decimal places. Can be negative. Default: 0 | &nbsp; |




##### Returns


- `Chain`  



#### Chain.pow(power) 

Pow




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| power |  |  | &nbsp; |




##### Returns


- `Chain`  



#### Chain.mul(value) 

Multiply




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value |  |  | &nbsp; |




##### Returns


- `Chain`  



#### Chain.div(divisor) 

Divide value by a divisor




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| divisor |  | Divisor | &nbsp; |




##### Returns


- `Chain`  



#### Chain.sub(number) 

Substract a number




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| number | `string` `number` `BigInt`  | Number to add | &nbsp; |




##### Returns


- `Chain`  



#### Chain.add(value) 

Add a number




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value |  |  | &nbsp; |




##### Returns


- `Chain`  



#### Chain.max(numbers) 

Returns the highest number




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| numbers | `string` `number` `BigInt`  | Array of numbers | &nbsp; |




##### Returns


- `Chain`  



#### Chain.min(numbers) 

Returns the lowest number




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| numbers | `string` `number` `BigInt`  | Array of numbers | &nbsp; |




##### Returns


- `Chain`  



#### Chain.abs() 

Returns the absolute value of the specified number






##### Returns


- `Chain`  



#### Chain.done(plus) 

Return the final value of the chain




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| plus |  | If true, positive number will be prepended by + sign. Default: false | &nbsp; |




##### Returns


- `string`  



#### Chain.raw() 

Get the raw value






##### Returns


-  




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*

## Development

GitHub: https://github.com/kakserpom/bcmath.js
