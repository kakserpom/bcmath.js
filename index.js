import * as bc_pkg from "locutus/php/bc/index.js";

const {bcmul, bcdiv, bcadd, bcsub, bccomp, bcround} = bc_pkg
import {Parser} from "./parser.js";
import {Chain} from "bcmath/chain.js";


/**
 *
 */
class Math {

    /**
     *
     * @param scale
     */
    constructor(scale = 10) {
        this._scale = scale
    }


    /**
     * Returns Chain object
     * @param number Number to start with
     * @param scale Number of decimal places
     * @returns {Chain}
     */
    chain(number, scale) {
        return new Chain(number, scale || this._scale)
    }

    /**
     * Returns:
     -1 if left is lesser than right
     0 if left is equal to right
     1 if left is greater than right
     * @param left Left operand
     * @param right Right operand
     * @returns {int}
     */
    compare(left, right) {
        return bccomp(left, right, this._scale)
    }

    /**
     *
     * Number to be raised to a power
     * @param number Number
     * @param power Power
     * @returns {number|*}
     */
    pow(number, power) {
        const cmp = bccomp(power, '0', this._scale)
        if (cmp === 0) {
            return 1
        }

        let result = number
        if (cmp < 0) {
            while (bccomp(power, '1', this._scale) < 0) {
                power = bcadd(power, '1', this._scale)
                result = bcdiv(result, number, this._scale + 5)
            }
        } else {
            while (bccomp(power, '1', this._scale) > 0) {
                power = bcsub(power, '1', this._scale)
                result = bcmul(result, number, this._scale + 5)
            }
        }
        return this.round(result, this._scale)
    }

    /**
     * Round the number to the nearest round number
     * @param number Number
     * @param precision Number of decimal places. Can be negative. Default: 0
     * @returns {string}
     */
    round(number = 0, precision) {
        if (precision >= 0) {
            return trimZeroes(bcround(number, precision))
        }
        precision = this.abs(precision)
        const p = this.pow(10, precision)
        return trimZeroes(bcmul(bcround(bcdiv(this.floor(number), p), precision), p))
    }

    /**
     * Returns the absolute value of the specified number
     * @param number
     * @returns {string}
     */
    abs(number) {
        if (this.compare(number, 0) >= 0) {
            return trimZeroes(number)
        } else {
            return trimZeroes(this.mul(number, -1))
        }
    }

    /**
     * Round the number down
     * @param number Subject number
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
     * @param number Subject number
     * @param precision Number of decimal places. Can be negative. Default: 0
     * @returns {string}
     */

    ceil(number, precision = 0) {
        number = number.toString()
        const s = number.split('.', 2)[1] || ''
        const f = floor(number, precision)
        const cmp = bccomp(number, f, s.length)
        if (cmp > 0) {
            return trimZeroes(bcadd(f, 1 / pow(10, precision), precision))
        } else {
            return trimZeroes(number)
        }
    }

    /**
     * Multiply
     * @param number
     * @param multiplier
     * @param scale Number of decimal places
     * @returns {string}
     */

    mul(number, multiplier) {
        return trimZeroes(bcmul(number, multiplier, this._scale))
    }

    /**
     * Divide
     * @param number Number
     * @param divisor Divisor
     * @param scale Number of decimal places
     * @returns {string}
     */

    div(number, divisor) {
        return trimZeroes(bcdiv(number, divisor, this._scale))
    }

    /**
     * Add two numbers
     * @param left Left operand
     * @param right Right operand
     * @param scale Number of decimal places
     * @returns {string}
     */

    add(left, right) {
        return trimZeroes(bcadd(left, right, this._scale))
    }

    /**
     * Get the modulus
     * @param number Number
     * @param divisor Divisor
     * @returns {string}
     */

    mod(number, divisor) {
        return trimZeroes(this.sub(number, this.mul(divisor, this.floor(divide(number, divisor)))))
    }


    /**
     * Substract right from left
     * @param left Left operand
     * @param right Right operand
     * @param scale Number of decimal places
     * @returns {string}
     */

    sub(left, right) {
        return trimZeroes(bcsub(left, right, this._scale))
    }


    /**
     * Returns the highest number
     * @param ...numbers Array of numbers
     * @param scale Number of decimal places
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
     * @param scale Number of decimal places
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
     * @param number Number
     * @returns {boolean}
     */

    isBigInt(number) {
        return compare(abs(number), '9223372036854775807') <= 0
    }

    /**
     * Check if the number is safe to use in Javascript BigInt
     * @param number Number
     * @returns {boolean}
     */

    isSafeBigInt(number) {
        return compare(abs(number), Number.MAX_SAFE_INTEGER) <= 0
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
     * Get π
     * @param scale Number of decimal places
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
     * π in a formatted string, up to 50 digits per line
     * @param scale Number of decimal places
     * @returns {string}
     */
    piFormatted(scale) {
        scale ??= this._scale
        return pi(scale).match(/^3\.|\d{1,50}/g).join('\n')
    }

    /**
     * Calculate square root
     * @param number
     * @param scale
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
     * @param number Number
     */

    neg(number) {
        return this.mul(number, -1)
    }

    /**
     *
     * @param expr
     * @param variables
     */
    eval(expr, variables = {}) {
        const parser = new Parser(this)
        return parser.evaluate(expr, variables)
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

export const Bcmath = Math