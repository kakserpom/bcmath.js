import {Parser} from "./parser.js";
import {Chain} from "bcmath/chain.js";
import BigNumber  from "bignumber.js";
import {bcmul, bcdiv, bcadd, bcsub, bccomp, bcround} from './bc.js'



/**
 * Get a BcmathClass instance
 * @param {int} scale Decimal places
 * @returns {BcmathClass}
 */
export function Bcmath(scale = 10) {
    return new BcmathClass(scale)
}

/**
 * Bcmath
 */
export class BcmathClass {

    /**
     * Constructor
     * @param {int} scale Decimal places
     */
    constructor(scale = 10) {
        this._scale = scale
        this.BN = BigNumber.clone({ DECIMAL_PLACES: scale})
    }

    /**
     * Returns Chain object
     * @param {string|number|BigInt} number Number to start with
     * @param {int} scale Number of decimal places
     * @returns {Chain}
     */
    chain(number, scale = null) {
        return new Chain(number, scale || this._scale)
    }

    /**
     * Returns:
     -1 if left is lesser than right
     0 if left is equal to right
     1 if left is greater than right
     * @param {string|number|BigInt} left Left operand
     * @param {string|number|BigInt} right Right operand
     * @returns {int}
     */
    compare(left, right) {
        const bn = new this.BN(left)
        return bn.comparedTo(right)
    }

    /**
     *
     * Number to be raised to a power
     * @param {string|number|BigInt} number Number
     * @param {int} power Power
     * @returns {number|*}
     */
    pow(number, power) {
        const bn = new this.BN(number)
        return trimZeroes(bn.pow(power))
    }

    /**
     *
     * @param numbers
     * @returns {string}
     */
    avg(...numbers) {
       return this
           .chain(0)
           .add(...numbers)
           .div(numbers.length)
           .done()
    }

    /**
     * Round the number to the nearest round number
     * @param {string|number|BigInt} number Number
     * @param precision Number of decimal places. Can be negative. Default: 0
     * @returns {string}
     */
    round(number = 0, precision = 0) {
        if (precision >= 0) {
            return trimZeroes(bcround(number, precision))
        }
        precision = this.abs(precision)
        const p = this.pow(10, precision)
        return trimZeroes(bcmul(bcround(bcdiv(this.floor(number), p), precision), p))
    }

    /**
     * Returns the absolute value of the specified number
     * @param {string|number|BigInt} number
     * @returns {string}
     */
    abs(number) {
        const bn = new BigNumber(number)
        return bn.abs().toFixed()
    }

    /**
     * Round the number down
     * @param {string|number|BigInt} number Subject number
     * @param precision Number of decimal places. Can be negative. Default: 0
     * @returns {string}
     */

    floor(number, precision = 0) {
        const m = this.pow(10, precision)
        let result = bcmul(number, m, precision)
        result = result.split('.', 2)[0]
        result = bcdiv(result, m, precision)
        return trimZeroes(result)
    }

    /**
     * Round the number up
     * @param {string|number|BigInt} number Subject number
     * @param {int} precision Number of decimal places. Can be negative. Default: 0
     * @returns {string}
     */

    ceil(number, precision = 0) {
        number = number.toString()
        const s = number.split('.', 2)[1] || ''
        const f = this.floor(number, precision)
        const cmp = bccomp(number, f, s.length)
        if (cmp > 0) {
            return trimZeroes(bcadd(f, 1 / this.pow(10, precision), precision))
        } else {
            return trimZeroes(number)
        }
    }

    /**
     * Multiply
     * @param {string|number|BigInt} number
     * @param {string|number|BigInt} multiplier
     * @param {int} scale Number of decimal places
     * @returns {string}
     */

    mul(number, multiplier) {
        return trimZeroes(bcmul(number, multiplier, this._scale))
    }

    /**
     * Divide
     * @param {string|number|BigInt} number Number
     * @param {string|number|BigInt} divisor Divisor
     * @param {int} scale Number of decimal places
     * @returns {string}
     */

    div(number, divisor) {
        return trimZeroes(bcdiv(number, divisor, this._scale))
    }

    /**
     * Add two numbers
     * @param {string|number|BigInt} left Left operand
     * @param {string|number|BigInt} right Right operand
     * @param {int} scale Number of decimal places
     * @returns {string}
     */

    add(left, right) {
        return trimZeroes(bcadd(left, right, this._scale))
    }

    /**
     * Get the modulus
     * @param {string|number|BigInt} number Number
     * @param divisor Divisor
     * @returns {string}
     */

    mod(number, divisor) {
        return trimZeroes(this.sub(number, this.mul(divisor, this.floor(this.div(number, divisor)))))
    }


    /**
     * Substract right from left
     * @param left Left operand
     * @param right Right operand
     * @param {int} scale Number of decimal places
     * @returns {string}
     */

    sub(left, right) {
        return trimZeroes(bcsub(left, right, this._scale))
    }


    /**
     * Returns the highest number
     * @param ...numbers Array of numbers
     * @param {int} scale Number of decimal places
     * @returns {string}
     */

    max(...numbers) {
        let result = null
        numbers.forEach(number => {
            if (result === null || bccomp(result, number, this._scale) < 0) {
                result = number
            }
        })
        return result
    }

    /**
     * Returns the lowest number
     * @param ...numbers Array of numbers
     * @param {int} scale Number of decimal places
     * @returns {string}
     */

    min(...numbers) {
        let result = null
        numbers.forEach(number => {
            if (result === null || bccomp(result, number, this._scale) > 0) {
                result = number
            }
        })
        return result
    }

    /**
     * Check if the number fits in a signed BigInt
     * @param {string|number|BigInt} number Number
     * @returns {boolean}
     */

    isBigInt(number) {
        return this.compare(this.abs(number), '9223372036854775807') <= 0
    }

    /**
     * Check if the number is safe to use in Javascript BigInt
     * @param {string|number|BigInt} number Number
     * @returns {boolean}
     */

    isSafeBigInt(number) {
        return this.compare(this.abs(number), Number.MAX_SAFE_INTEGER) <= 0
    }

    /**
     *
     * @returns {Generator<number>}
     */
    * generateDigitsOfPi() {
        let q = 1n
        let r = 180n
        let t = 60n
        let i = 2n
        for (; ;) {
            let digit = ((i * 27n - 12n) * q + r * 5n) / (t * 5n)
            yield Number(digit)
            let u = i * 3n
            u = (u + 1n) * 3n * (u + 2n)
            r = u * 10n * (q * (i * 5n - 2n) + r - t * digit)
            q *= 10n * i * (i++ * 2n - 1n)
            t *= u
        }
    }

    /**
     * Get ??
     * @param {int} scale Number of decimal places
     * @returns {string}
     */

    pi(scale) {
        scale ??= this._scale
        const iter = this.generateDigitsOfPi()
        let pi = iter.next().value
        if (scale > 0) {
            pi += '.'
        }
        for (let i = 0; i < scale; ++i) {
            pi += iter.next().value;
        }
        return pi
    }

    /**
     * ?? in a formatted string, up to 50 digits per line
     * @param {int} scale Number of decimal places
     * @returns {string}
     */
    piFormatted(scale) {
        scale ??= this._scale
        return pi(scale).match(/^3\.|\d{1,50}/g).join('\n')
    }

    /**
     * Calculate square root
     * @param {string|number|BigInt} number
     * @param {int} scale
     * @returns {string}
     */
    sqrt(number) {
        let square = 1, i = 0
        do {
            square = this.div(this.add(this.div(number, square), square), 2)
        } while (this.compare(i++, number) < 0)
        return square
    }

    /**
     * Multiply by -1
     * @param {string|number|BigInt} number Number
     */

    neg(number) {
        return this.mul(number, -1)
    }

    /**
     * Evaluate an expression
     * @param {string} expr Expression, e.g 'x + y'
     * @param {object} variables
     */
    eval(expr, variables = {}) {
        const parser = new Parser(this)
        return parser.evaluate(expr, variables)
    }

    /**
     *
     * @param expr
     * @returns {function(*=): *}
     */
    parse(expr) {
        const parser = new Parser(this)
        const func = parser.parse(expr)
        return (variables = {}) => func.evaluate(variables)
    }
}

/**
 * Trims empty decimal places
 * @param value
 * @returns {string}
 */
export function trimZeroes(value) {
    const split = value.toString().split('.', 2)
    if (split.length > 1) {
        split[1] = split[1].replace(/0+$/, '')
        if (split[1].length === 0) {
            split.pop()
        }
    }
    return split.join('.')
}

