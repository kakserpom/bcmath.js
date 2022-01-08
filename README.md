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

console.log(math.max([1,3.55,3])
```
## API

### Classes

<dl>
<dt><a href="#Chain">Chain</a></dt>
<dd><p>Chain</p>
</dd>
</dl>

### Functions

<dl>
<dt><a href="#trimZeroes">trimZeroes(value)</a> ⇒ <code>string</code></dt>
<dd><p>Trims empty decimal places</p>
</dd>
<dt><a href="#chain">chain(value)</a> ⇒ <code><a href="#Chain">Chain</a></code></dt>
<dd><p>Returns Chain object</p>
</dd>
<dt><a href="#compare">compare(left, right)</a> ⇒ <code>int</code></dt>
<dd><p>Returns:
    -1 if left is lesser than right
    0 if left is equal to right
    1 if left is greater than right</p>
</dd>
<dt><a href="#pow">pow(number, power, scale)</a> ⇒ <code>number</code> | <code>*</code></dt>
<dd><p>Number to be raised to a power</p>
</dd>
<dt><a href="#round">round(number, precision)</a> ⇒ <code>string</code></dt>
<dd><p>Round the number to the nearest round number</p>
</dd>
<dt><a href="#abs">abs(number)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the absolute value of the specified number</p>
</dd>
<dt><a href="#floor">floor(number, precision)</a> ⇒ <code>string</code></dt>
<dd><p>Round the number down</p>
</dd>
<dt><a href="#ceil">ceil(number, precision)</a> ⇒ <code>string</code></dt>
<dd><p>Round the number up</p>
</dd>
<dt><a href="#multiply">multiply(number, multiplier, scale)</a> ⇒ <code>string</code></dt>
<dd><p>Multiply</p>
</dd>
<dt><a href="#divide">divide(number, divisor, scale)</a> ⇒ <code>string</code></dt>
<dd><p>Divide</p>
</dd>
<dt><a href="#add">add(left, right, scale)</a> ⇒ <code>string</code></dt>
<dd><p>Add two numbers</p>
</dd>
<dt><a href="#mod">mod(number, divisor)</a> ⇒ <code>string</code></dt>
<dd><p>Get the modulus</p>
</dd>
<dt><a href="#substract">substract(left, right, scale)</a> ⇒ <code>string</code></dt>
<dd><p>Substract right from left</p>
</dd>
<dt><a href="#max">max(numbers, scale)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the highest number</p>
</dd>
<dt><a href="#min">min(numbers, scale)</a> ⇒ <code>string</code></dt>
<dd><p>Returns the lowest number</p>
</dd>
<dt><a href="#isBigInt">isBigInt(number)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if the number fits in a signed BigInt</p>
</dd>
<dt><a href="#isSafeBigInt">isSafeBigInt(number)</a> ⇒ <code>boolean</code></dt>
<dd><p>Check if the number is safe to use in Javascript BigInt</p>
</dd>
<dt><a href="#generateDigitsOfPi">generateDigitsOfPi()</a> ⇒ <code>Generator.&lt;number, void, *&gt;</code></dt>
<dd></dd>
<dt><a href="#pi">pi(scale)</a> ⇒ <code>string</code></dt>
<dd><p>Get π</p>
</dd>
<dt><a href="#piFormatted">piFormatted(scale)</a> ⇒ <code>string</code></dt>
<dd><p>π in a formatted string, up to 50 digits per line</p>
</dd>
</dl>

<a name="trimZeroes"></a>

### trimZeroes(value) ⇒ <code>string</code>
Trims empty decimal places

**Kind**: global function

| Param |
| --- |
| value | 

<a name="chain"></a>

### chain(value) ⇒ [<code>Chain</code>](#Chain)
Returns Chain object

**Kind**: global function

| Param |
| --- |
| value | 

<a name="compare"></a>

### compare(left, right) ⇒ <code>int</code>
Returns:
-1 if left is lesser than right
0 if left is equal to right
1 if left is greater than right

**Kind**: global function

| Param | Description |
| --- | --- |
| left | Left operand |
| right | Right operand |

<a name="pow"></a>

### pow(number, power, scale) ⇒ <code>number</code> \| <code>\*</code>
Number to be raised to a power

**Kind**: global function

| Param | Description |
| --- | --- |
| number | Number |
| power | Power |
| scale | Number of decimal places |

<a name="round"></a>

### round(number, precision) ⇒ <code>string</code>
Round the number to the nearest round number

**Kind**: global function

| Param | Description |
| --- | --- |
| number | Number |
| precision | Number of decimal places. Can be negative. Default: 0 |

<a name="abs"></a>

### abs(number) ⇒ <code>string</code>
Returns the absolute value of the specified number

**Kind**: global function

| Param |
| --- |
| number | 

<a name="floor"></a>

### floor(number, precision) ⇒ <code>string</code>
Round the number down

**Kind**: global function

| Param | Description |
| --- | --- |
| number | Subject number |
| precision | Number of decimal places. Can be negative. Default: 0 |

<a name="ceil"></a>

### ceil(number, precision) ⇒ <code>string</code>
Round the number up

**Kind**: global function

| Param | Description |
| --- | --- |
| number | Subject number |
| precision | Number of decimal places. Can be negative. Default: 0 |

<a name="multiply"></a>

### multiply(number, multiplier, scale) ⇒ <code>string</code>
Multiply

**Kind**: global function

| Param | Description |
| --- | --- |
| number |  |
| multiplier |  |
| scale | Number of decimal places |

<a name="divide"></a>

### divide(number, divisor, scale) ⇒ <code>string</code>
Divide

**Kind**: global function

| Param | Description |
| --- | --- |
| number |  |
| divisor |  |
| scale | Number of decimal places |

<a name="add"></a>

### add(left, right, scale) ⇒ <code>string</code>
Add two numbers

**Kind**: global function

| Param | Description |
| --- | --- |
| left | Left operand |
| right | Right operand |
| scale | Number of decimal places |

<a name="mod"></a>

### mod(number, divisor) ⇒ <code>string</code>
Get the modulus

**Kind**: global function

| Param |
| --- |
| number | 
| divisor | 

<a name="substract"></a>

### substract(left, right, scale) ⇒ <code>string</code>
Substract right from left

**Kind**: global function

| Param | Description |
| --- | --- |
| left | Left operand |
| right | Right operand |
| scale | Number of decimal places |

<a name="max"></a>

### max(numbers, scale) ⇒ <code>string</code>
Returns the highest number

**Kind**: global function

| Param | Description |
| --- | --- |
| numbers | Array of numbers |
| scale | Number of decimal places |

<a name="min"></a>

### min(numbers, scale) ⇒ <code>string</code>
Returns the lowest number

**Kind**: global function

| Param | Description |
| --- | --- |
| numbers | Array of numbers |
| scale | Number of decimal places |

<a name="isBigInt"></a>

### isBigInt(number) ⇒ <code>boolean</code>
Check if the number fits in a signed BigInt

**Kind**: global function

| Param | Description |
| --- | --- |
| number | Number |

<a name="isSafeBigInt"></a>

### isSafeBigInt(number) ⇒ <code>boolean</code>
Check if the number is safe to use in Javascript BigInt

**Kind**: global function

| Param | Description |
| --- | --- |
| number | Number |

<a name="generateDigitsOfPi"></a>

### generateDigitsOfPi() ⇒ <code>Generator.&lt;number, void, \*&gt;</code>
**Kind**: global function  
<a name="pi"></a>

### pi(scale) ⇒ <code>string</code>
Get π

**Kind**: global function

| Param | Description |
| --- | --- |
| scale | Number of decimal places |

<a name="piFormatted"></a>

### piFormatted(scale) ⇒ <code>string</code>
π in a formatted string, up to 50 digits per line

**Kind**: global function

| Param | Description |
| --- | --- |
| scale | Number of decimal places |

## Development

GitHub: https://github.com/kakserpom/bcmath.js
