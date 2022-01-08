import * as bc_pkg from "locutus/php/bc/index.js";

const {bcmul, bcdiv, bcadd, bcsub, bccomp, bcround} = bc_pkg

/**
 * Chain
 */
export class Chain {

    /**
     * Constructor
     * @param number Number
     * @param scale Number of decimal places (default: 10)
     */
    constructor(number, scale = 10) {
        this.value = number
        this._scale = scale
    }

    /**
     * toJSON
     * @returns {string}
     */
    toJSON() {
        return trimZeroes(this.value)
    }

    /**
     * Set the scale of operations
     * @param scale Number of decimal places
     * @returns {Chain}
     */
    scale(scale) {
        this._scale = scale
        return this
    }

    /**
     * Returns:
     -1 if current value is lesser than the number
     0 if left is equal to the number
     1 if left is greater than the number
     * @param left Left operand
     * @param right Right operand
     * @returns {int}
     */
    compare(number) {
        return bccomp(this.value, number, this._scale)
    }

    /**
     * Round value to the nearest round number
     * @param precision Number of decimal places. Can be negative. Default: 0
     * @returns {string}
     */
    round(precision = 0) {
        this.value = round(this.value, precision)
        return this
    }

    /**
     * Round the number down
     * @param precision Number of decimal places. Can be negative. Default: 0
     * @returns {Chain}
     */
    floor(precision = 0) {
        this.value = floor(this.value, precision)
        return this
    }

    /**
     * Round the number up
     * @param precision Number of decimal places. Can be negative. Default: 0
     * @returns {Chain}
     */
    ceil(precision = 0) {
        this.value = ceil(this.value, precision)
        return this
    }

    /**
     * Pow
     * @param power
     * @returns {Chain}
     */
    pow(power) {
        this.value = pow(this.value, power, this._scale);
        return this
    }

    /**
     * Multiply
     * @param value
     * @returns {Chain}
     */
    multiply(value) {
        this.value = bcmul(this.value, value, this._scale)
        return this
    }

    /**
     * Divide value by a divisor
     * @param divisor Divisor
     * @returns {Chain}
     */
    divide(divisor) {
        this.value = bcdiv(this.value, divisor, this._scale)
        return this
    }

    /**
     * Substract a number
     * @param number Number to add
     * @returns {Chain}
     */
    substract(number) {
        this.value = bcsub(this.value, number, this._scale)
        return this
    }

    /**
     * Add a number
     * @param value
     * @returns {Chain}
     */
    add(number) {
        this.value = bcadd(this.value, number, this._scale)
        return this
    }

    /**
     * Returns the highest number
     * @param numbers Array of numbers
     * @returns {Chain}
     */
    max(...numbers) {
        numbers.forEach(number => {
            if (bccomp(this.value, number, this._scale) < 0) {
                this.value = number
            }
        })
        return this
    }

    /**
     * Returns the lowest number
     * @param numbers Array of numbers
     * @returns {Chain}
     */
    min(...numbers) {
        numbers.forEach(number => {
            if (bccomp(this.value, number, this._scale) > 0) {
                this.value = number
            }
        })
        return this
    }

    /**
     * Returns the absolute value of the specified number
     * @returns {Chain}
     */
    abs() {
        if (compare(this.value, 0) < 0) {
            this.multiply(-1)
        }
        return this
    }


    /**
     * Return the final value of the chain
     * @param plus If true, positive number will be prepended by + sign. Default: false
     * @returns {string}
     */
    done({plus = false} = {}) {
        let value = trimZeroes(this.value)
        if (plus && compare(value, 0, this._scale) > 0) {
            return '+' + value
        }
        return value
    }


    /**
     * Get the raw value
     * @returns {*}
     */
    raw() {
        return this.value
    }
}

/**
 * Trims empty decimal places
 * @param value
 * @returns {string}
 */
function trimZeroes(value) {
    const split = value.toString().split('.', 2)
    if (split.length > 1) {
        split[1] = split[1].replace(/0+$/, '')
        if (split[1].length === 0) {
            split.pop()
        }
    }
    return split.join('.')
}

/**
 * Returns Chain object
 * @param number Number to start with
 * @param scale Number of decimal places
 * @returns {Chain}
 */
export function chain(number, scale = 10) {
    return new Chain(number, scale)
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
export function compare(left, right, scale = 10) {
    return bccomp(left, right, scale)
}

/**
 *
 * Number to be raised to a power
 * @param number Number
 * @param power Power
 * @param scale Number of decimal places
 * @returns {number|*}
 */
export function pow(number, power, scale = 10) {
    const cmp = bccomp(power, '0', scale)
    if (cmp === 0) {
        return 1
    }

    let result = number
    if (cmp < 0) {
        while (bccomp(power, '1', scale) < 0) {
            power = bcadd(power, '1', scale)
            result = bcdiv(result, number, scale + 5)
        }
    } else {
        while (bccomp(power, '1', scale) > 0) {
            power = bcsub(power, '1', scale + 5)
            result = bcmul(result, number, scale)
        }
    }
    return round(result, scale)
}

/**
 * Round the number to the nearest round number
 * @param number Number
 * @param precision Number of decimal places. Can be negative. Default: 0
 * @returns {string}
 */
export function round(number = 0, precision) {
    if (precision >= 0) {
        return bcround(number, precision)
    }
    precision = abs(precision)
    const p = pow(10, precision)
    return bcmul(bcround(bcdiv(floor(number), p), precision), p)
}

/**
 * Returns the absolute value of the specified number
 * @param number
 * @returns {string}
 */
export function abs(number) {
    if (compare(number, 0) >= 0) {
        return trimZeroes(number)
    } else {
        return trimZeroes(multiply(number, -1))
    }
}

/**
 * Round the number down
 * @param number Subject number
 * @param precision Number of decimal places. Can be negative. Default: 0
 * @returns {string}
 */
export function floor(number, precision = 0) {
    const m = pow(10, precision)
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
export function ceil(number, precision = 0) {
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
export function multiply(number, multiplier, scale = 10) {
    return trimZeroes(bcmul(number, multiplier, scale))
}

/**
 * Divide
 * @param number
 * @param divisor
 * @param scale Number of decimal places
 * @returns {string}
 */
export function divide(number, divisor, scale = 10) {
    return trimZeroes(bcdiv(number, divisor, scale))
}

/**
 * Add two numbers
 * @param left Left operand
 * @param right Right operand
 * @param scale Number of decimal places
 * @returns {string}
 */
export function add(left, right, scale = 10) {
    return trimZeroes(bcadd(left, right, scale))
}

/**
 * Get the modulus
 * @param number Number
 * @param divisor Divisor
 * @returns {string}
 */
export function mod(number, divisor) {
    return trimZeroes(substract(number, multiply(divisor, floor(divide(number, divisor)))))
}


/**
 * Substract right from left
 * @param left Left operand
 * @param right Right operand
 * @param scale Number of decimal places
 * @returns {string}
 */
export function substract(left, right, scale = 10) {
    return trimZeroes(bcsub(left, right, scale))
}


/**
 * Returns the highest number
 * @param numbers Array of numbers
 * @param scale Number of decimal places
 * @returns {string}
 */
export function max(numbers, scale = 10) {
    let result = null
    numbers.forEach(number => {
        if (result === null || bccomp(result, number, scale) < 0) {
            result = number
        }
    })
    return result
}

/**
 * Returns the lowest number
 * @param numbers Array of numbers
 * @param scale Number of decimal places
 * @returns {string}
 */
export function min(numbers, scale = 10) {
    let result = null
    numbers.forEach(number => {
        if (result === null || bccomp(result, number, scale) > 0) {
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
export function isBigInt(number) {
    return compare(abs(number), '9223372036854775807') <= 0
}

/**
 * Check if the number is safe to use in Javascript BigInt
 * @param number Number
 * @returns {boolean}
 */
export function isSafeBigInt(number) {
    return compare(abs(number), Number.MAX_SAFE_INTEGER) <= 0
}

/**
 *
 * @returns {Generator<number, void, *>}
 */
function* generateDigitsOfPi() {
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
export function pi(scale = 10) {
    const iter = generateDigitsOfPi()
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
export function piFormatted(scale = 1000) {
    return pi(scale).match(/^3\.|\d{1,50}/g).join('\n')
}
