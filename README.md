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
const math  = new Bcmath(20)

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
## Classes

<dl>
<dt><a href="#Math">Math</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#trimZeroes">trimZeroes(value)</a> ⇒ <code>string</code></dt>
<dd><p>Trims empty decimal places</p>
</dd>
</dl>

<a name="Math"></a>

## Math
**Kind**: global class  

* [Math](#Math)
    * [new Math(scale)](#new_Math_new)
    * [.chain(number, scale)](#Math+chain) ⇒ <code>Chain</code>
    * [.compare(left, right)](#Math+compare) ⇒ <code>int</code>
    * [.pow(number, power)](#Math+pow) ⇒ <code>number</code> \| <code>\*</code>
    * [.round(number, precision)](#Math+round) ⇒ <code>string</code>
    * [.abs(number)](#Math+abs) ⇒ <code>string</code>
    * [.floor(number, precision)](#Math+floor) ⇒ <code>string</code>
    * [.ceil(number, precision)](#Math+ceil) ⇒ <code>string</code>
    * [.mul(number, multiplier, scale)](#Math+mul) ⇒ <code>string</code>
    * [.div(number, divisor, scale)](#Math+div) ⇒ <code>string</code>
    * [.add(left, right, scale)](#Math+add) ⇒ <code>string</code>
    * [.mod(number, divisor)](#Math+mod) ⇒ <code>string</code>
    * [.sub(left, right, scale)](#Math+sub) ⇒ <code>string</code>
    * [.max(scale)](#Math+max) ⇒ <code>string</code>
    * [.min(scale)](#Math+min) ⇒ <code>string</code>
    * [.isBigInt(number)](#Math+isBigInt) ⇒ <code>boolean</code>
    * [.isSafeBigInt(number)](#Math+isSafeBigInt) ⇒ <code>boolean</code>
    * [.generateDigitsOfPi()](#Math+generateDigitsOfPi) ⇒ <code>Generator.&lt;number&gt;</code>
    * [.pi(scale)](#Math+pi) ⇒ <code>string</code>
    * [.piFormatted(scale)](#Math+piFormatted) ⇒ <code>string</code>
    * [.sqrt(number, scale)](#Math+sqrt) ⇒ <code>string</code>
    * [.neg(number)](#Math+neg)
    * [.eval(expr, variables)](#Math+eval)

<a name="new_Math_new"></a>

### new Math(scale)

| Param | Default |
| --- | --- |
| scale | <code>10</code> | 

<a name="Math+chain"></a>

### math.chain(number, scale) ⇒ <code>Chain</code>
Returns Chain object

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Description |
| --- | --- |
| number | Number to start with |
| scale | Number of decimal places |

<a name="Math+compare"></a>

### math.compare(left, right) ⇒ <code>int</code>
Returns:
     -1 if left is lesser than right
     0 if left is equal to right
     1 if left is greater than right

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Description |
| --- | --- |
| left | Left operand |
| right | Right operand |

<a name="Math+pow"></a>

### math.pow(number, power) ⇒ <code>number</code> \| <code>\*</code>
Number to be raised to a power

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Description |
| --- | --- |
| number | Number |
| power | Power |

<a name="Math+round"></a>

### math.round(number, precision) ⇒ <code>string</code>
Round the number to the nearest round number

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Default | Description |
| --- | --- | --- |
| number | <code>0</code> | Number |
| precision |  | Number of decimal places. Can be negative. Default: 0 |

<a name="Math+abs"></a>

### math.abs(number) ⇒ <code>string</code>
Returns the absolute value of the specified number

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param |
| --- |
| number | 

<a name="Math+floor"></a>

### math.floor(number, precision) ⇒ <code>string</code>
Round the number down

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Default | Description |
| --- | --- | --- |
| number |  | Subject number |
| precision | <code>0</code> | Number of decimal places. Can be negative. Default: 0 |

<a name="Math+ceil"></a>

### math.ceil(number, precision) ⇒ <code>string</code>
Round the number up

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Default | Description |
| --- | --- | --- |
| number |  | Subject number |
| precision | <code>0</code> | Number of decimal places. Can be negative. Default: 0 |

<a name="Math+mul"></a>

### math.mul(number, multiplier, scale) ⇒ <code>string</code>
Multiply

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Description |
| --- | --- |
| number |  |
| multiplier |  |
| scale | Number of decimal places |

<a name="Math+div"></a>

### math.div(number, divisor, scale) ⇒ <code>string</code>
Divide

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Description |
| --- | --- |
| number | Number |
| divisor | Divisor |
| scale | Number of decimal places |

<a name="Math+add"></a>

### math.add(left, right, scale) ⇒ <code>string</code>
Add two numbers

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Description |
| --- | --- |
| left | Left operand |
| right | Right operand |
| scale | Number of decimal places |

<a name="Math+mod"></a>

### math.mod(number, divisor) ⇒ <code>string</code>
Get the modulus

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Description |
| --- | --- |
| number | Number |
| divisor | Divisor |

<a name="Math+sub"></a>

### math.sub(left, right, scale) ⇒ <code>string</code>
Substract right from left

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Description |
| --- | --- |
| left | Left operand |
| right | Right operand |
| scale | Number of decimal places |

<a name="Math+max"></a>

### math.max(scale) ⇒ <code>string</code>
Returns the highest number

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Description |
| --- | --- |
| ...numbers | Array of numbers |
| scale | Number of decimal places |

<a name="Math+min"></a>

### math.min(scale) ⇒ <code>string</code>
Returns the lowest number

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Description |
| --- | --- |
| ...numbers | Array of numbers |
| scale | Number of decimal places |

<a name="Math+isBigInt"></a>

### math.isBigInt(number) ⇒ <code>boolean</code>
Check if the number fits in a signed BigInt

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Description |
| --- | --- |
| number | Number |

<a name="Math+isSafeBigInt"></a>

### math.isSafeBigInt(number) ⇒ <code>boolean</code>
Check if the number is safe to use in Javascript BigInt

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Description |
| --- | --- |
| number | Number |

<a name="Math+generateDigitsOfPi"></a>

### math.generateDigitsOfPi() ⇒ <code>Generator.&lt;number&gt;</code>
**Kind**: instance method of [<code>Math</code>](#Math)  
<a name="Math+pi"></a>

### math.pi(scale) ⇒ <code>string</code>
Get π

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Description |
| --- | --- |
| scale | Number of decimal places |

<a name="Math+piFormatted"></a>

### math.piFormatted(scale) ⇒ <code>string</code>
π in a formatted string, up to 50 digits per line

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Description |
| --- | --- |
| scale | Number of decimal places |

<a name="Math+sqrt"></a>

### math.sqrt(number, scale) ⇒ <code>string</code>
Calculate square root

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param |
| --- |
| number | 
| scale | 

<a name="Math+neg"></a>

### math.neg(number)
Multiply by -1

**Kind**: instance method of [<code>Math</code>](#Math)  

| Param | Description |
| --- | --- |
| number | Number |

<a name="Math+eval"></a>

### math.eval(expr, variables)
**Kind**: instance method of [<code>Math</code>](#Math)  

| Param |
| --- |
| expr | 
| variables | 

<a name="trimZeroes"></a>

## trimZeroes(value) ⇒ <code>string</code>
Trims empty decimal places

**Kind**: global function  

| Param |
| --- |
| value |

## Development

GitHub: https://github.com/kakserpom/bcmath.js
