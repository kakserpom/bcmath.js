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
<dt><a href="#BcmathClass">BcmathClass</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#trimZeroes">trimZeroes(value)</a> ⇒ <code>string</code></dt>
<dd><p>Trims empty decimal places</p>
</dd>
</dl>

<a name="BcmathClass"></a>

## BcmathClass
**Kind**: global class  

* [BcmathClass](#BcmathClass)
    * [new BcmathClass(scale)](#new_BcmathClass_new)
    * [.chain(number, scale)](#BcmathClass+chain) ⇒ <code>Chain</code>
    * [.compare(left, right)](#BcmathClass+compare) ⇒ <code>int</code>
    * [.pow(number, power)](#BcmathClass+pow) ⇒ <code>number</code> \| <code>\*</code>
    * [.round(number, precision)](#BcmathClass+round) ⇒ <code>string</code>
    * [.abs(number)](#BcmathClass+abs) ⇒ <code>string</code>
    * [.floor(number, precision)](#BcmathClass+floor) ⇒ <code>string</code>
    * [.ceil(number, precision)](#BcmathClass+ceil) ⇒ <code>string</code>
    * [.mul(number, multiplier, scale)](#BcmathClass+mul) ⇒ <code>string</code>
    * [.div(number, divisor, scale)](#BcmathClass+div) ⇒ <code>string</code>
    * [.add(left, right, scale)](#BcmathClass+add) ⇒ <code>string</code>
    * [.mod(number, divisor)](#BcmathClass+mod) ⇒ <code>string</code>
    * [.sub(left, right, scale)](#BcmathClass+sub) ⇒ <code>string</code>
    * [.max(scale)](#BcmathClass+max) ⇒ <code>string</code>
    * [.min(scale)](#BcmathClass+min) ⇒ <code>string</code>
    * [.isBigInt(number)](#BcmathClass+isBigInt) ⇒ <code>boolean</code>
    * [.isSafeBigInt(number)](#BcmathClass+isSafeBigInt) ⇒ <code>boolean</code>
    * [.generateDigitsOfPi()](#BcmathClass+generateDigitsOfPi) ⇒ <code>Generator.&lt;number&gt;</code>
    * [.pi(scale)](#BcmathClass+pi) ⇒ <code>string</code>
    * [.piFormatted(scale)](#BcmathClass+piFormatted) ⇒ <code>string</code>
    * [.sqrt(number, scale)](#BcmathClass+sqrt) ⇒ <code>string</code>
    * [.neg(number)](#BcmathClass+neg)
    * [.eval(expr, variables)](#BcmathClass+eval)

<a name="new_BcmathClass_new"></a>

### new BcmathClass(scale)

| Param | Default |
| --- | --- |
| scale | <code>10</code> | 

<a name="BcmathClass+chain"></a>

### bcmathClass.chain(number, scale) ⇒ <code>Chain</code>
Returns Chain object

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Description |
| --- | --- |
| number | Number to start with |
| scale | Number of decimal places |

<a name="BcmathClass+compare"></a>

### bcmathClass.compare(left, right) ⇒ <code>int</code>
Returns:
     -1 if left is lesser than right
     0 if left is equal to right
     1 if left is greater than right

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Description |
| --- | --- |
| left | Left operand |
| right | Right operand |

<a name="BcmathClass+pow"></a>

### bcmathClass.pow(number, power) ⇒ <code>number</code> \| <code>\*</code>
Number to be raised to a power

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Description |
| --- | --- |
| number | Number |
| power | Power |

<a name="BcmathClass+round"></a>

### bcmathClass.round(number, precision) ⇒ <code>string</code>
Round the number to the nearest round number

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Default | Description |
| --- | --- | --- |
| number | <code>0</code> | Number |
| precision |  | Number of decimal places. Can be negative. Default: 0 |

<a name="BcmathClass+abs"></a>

### bcmathClass.abs(number) ⇒ <code>string</code>
Returns the absolute value of the specified number

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param |
| --- |
| number | 

<a name="BcmathClass+floor"></a>

### bcmathClass.floor(number, precision) ⇒ <code>string</code>
Round the number down

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Default | Description |
| --- | --- | --- |
| number |  | Subject number |
| precision | <code>0</code> | Number of decimal places. Can be negative. Default: 0 |

<a name="BcmathClass+ceil"></a>

### bcmathClass.ceil(number, precision) ⇒ <code>string</code>
Round the number up

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Default | Description |
| --- | --- | --- |
| number |  | Subject number |
| precision | <code>0</code> | Number of decimal places. Can be negative. Default: 0 |

<a name="BcmathClass+mul"></a>

### bcmathClass.mul(number, multiplier, scale) ⇒ <code>string</code>
Multiply

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Description |
| --- | --- |
| number |  |
| multiplier |  |
| scale | Number of decimal places |

<a name="BcmathClass+div"></a>

### bcmathClass.div(number, divisor, scale) ⇒ <code>string</code>
Divide

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Description |
| --- | --- |
| number | Number |
| divisor | Divisor |
| scale | Number of decimal places |

<a name="BcmathClass+add"></a>

### bcmathClass.add(left, right, scale) ⇒ <code>string</code>
Add two numbers

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Description |
| --- | --- |
| left | Left operand |
| right | Right operand |
| scale | Number of decimal places |

<a name="BcmathClass+mod"></a>

### bcmathClass.mod(number, divisor) ⇒ <code>string</code>
Get the modulus

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Description |
| --- | --- |
| number | Number |
| divisor | Divisor |

<a name="BcmathClass+sub"></a>

### bcmathClass.sub(left, right, scale) ⇒ <code>string</code>
Substract right from left

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Description |
| --- | --- |
| left | Left operand |
| right | Right operand |
| scale | Number of decimal places |

<a name="BcmathClass+max"></a>

### bcmathClass.max(scale) ⇒ <code>string</code>
Returns the highest number

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Description |
| --- | --- |
| ...numbers | Array of numbers |
| scale | Number of decimal places |

<a name="BcmathClass+min"></a>

### bcmathClass.min(scale) ⇒ <code>string</code>
Returns the lowest number

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Description |
| --- | --- |
| ...numbers | Array of numbers |
| scale | Number of decimal places |

<a name="BcmathClass+isBigInt"></a>

### bcmathClass.isBigInt(number) ⇒ <code>boolean</code>
Check if the number fits in a signed BigInt

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Description |
| --- | --- |
| number | Number |

<a name="BcmathClass+isSafeBigInt"></a>

### bcmathClass.isSafeBigInt(number) ⇒ <code>boolean</code>
Check if the number is safe to use in Javascript BigInt

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Description |
| --- | --- |
| number | Number |

<a name="BcmathClass+generateDigitsOfPi"></a>

### bcmathClass.generateDigitsOfPi() ⇒ <code>Generator.&lt;number&gt;</code>
**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  
<a name="BcmathClass+pi"></a>

### bcmathClass.pi(scale) ⇒ <code>string</code>
Get π

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Description |
| --- | --- |
| scale | Number of decimal places |

<a name="BcmathClass+piFormatted"></a>

### bcmathClass.piFormatted(scale) ⇒ <code>string</code>
π in a formatted string, up to 50 digits per line

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param | Description |
| --- | --- |
| scale | Number of decimal places |

<a name="BcmathClass+sqrt"></a>

### bcmathClass.sqrt(number, scale) ⇒ <code>string</code>
Calculate square root

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param |
| --- |
| number | 
| scale | 

<a name="BcmathClass+neg"></a>

### bcmathClass.neg(number)
Multiply by -1

**Kind**: instance method of [<code>BcmathClass</code>](#BcmathClass)  

| Param

## Development

GitHub: https://github.com/kakserpom/bcmath.js
