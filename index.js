import * as bc_pkg from "locutus/php/bc/index.js";

const {bcmul, bcdiv, bcadd, bcsub, bccomp, bcround} = bc_pkg

/**
 *
 */
export class Chain {

    /**
     *
     * @param value
     * @param scale
     */
    constructor(value, scale = 10) {
        this.value = value
        this._scale = scale
    }

    /**
     *
     * @param scale
     * @returns {Chain}
     */
    scale(scale) {
        this._scale = scale
        return this
    }

    /**
     *
     * @param value
     * @returns {number}
     */
    compare(value) {
        return bccomp(this.value, value, this._scale)
    }

    /**
     *
     * @param n
     * @returns {Chain}
     */
    round(n = 0) {
        this.value = round(this.value, n)
        return this
    }

    floor(n = 0) {
        this.value = floor(this.value, n)
        return this
    }

    ceil(n = 0) {
        this.value = ceil(this.value, n)
        return this
    }

    /**
     *
     * @param power
     * @returns {Chain}
     */
    pow(power) {
        this.value = pow(this.value, power, this._scale);
        return this
    }

    /**
     *
     * @param value
     * @returns {Chain}
     */
    multiply(value) {
        this.value = bcmul(this.value, value, this._scale)
        return this
    }

    /**
     *
     * @param value
     * @returns {Chain}
     */
    divide(value) {
        this.value = bcdiv(this.value, value, this._scale)
        return this
    }

    /**
     *
     * @param value
     * @returns {Chain}
     */
    substract(value) {
        this.value = bcsub(this.value, value, this._scale)
        return this
    }

    /**
     *
     * @param value
     * @returns {Chain}
     */
    add(value) {
        this.value = bcadd(this.value, value, this._scale)
        return this
    }

    /**
     *
     * @param args
     * @returns {Chain}
     */
    max(...args) {
        args.forEach(arg => {
            if (bccomp(this.value, arg, this._scale) < 0) {
                this.value = arg
            }
        })
        return this
    }

    /**
     *
     * @param args
     * @returns {Chain}
     */
    min(...args) {
        args.forEach(arg => {
            if (bccomp(this.value, arg, this._scale) > 0) {
                this.value = arg
            }
        })
        return this
    }

    abs() {
        if (compare(this.value, 0) < 0) {
            this.multiply(-1)
        }
        return this
    }


    /**
     * 
     * @param plus
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
     *
     * @returns {*}
     */
    raw() {
        return this.value
    }
}

/**
 *
 * @param value
 * @returns {string}
 */
function trimZeroes(value) {
    const split = value.toString().split('.')
    if (split.length > 1) {
        split[1] = split[1].replace(/0+$/, '')
        if (split[1].length === 0) {
            split.pop()
        }
    }
    return split.join('.')
}

/**
 *
 * @param value
 * @returns {Chain}
 */
export function chain(value) {
    return new Chain(value)
}

/**
 *
 * @param a
 * @param b
 * @returns {number}
 */
export function compare(a, b, scale = 10) {
    return bccomp(a, b, scale)
}

/**
 *
 * @param number
 * @param power
 * @param scale
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
 *
 * @param number
 * @returns {*}
 */
export function round(number = 0, precision) {
    if (precision >= 0) {
        return bcround(number, precision)
    }
    precision = abs(precision)
    const p = pow(10, precision)
    return bcmul(bcround(bcdiv(floor(number), p), precision), p)
}

export function abs(number) {
    if (compare(number, 0) >= 0) {
        return trimZeroes(number)
    } else {
        return trimZeroes(multiply(number, -1))
    }
}

/**
 *
 * @param number
 * @param precision
 * @returns {*}
 */
export function floor(number, precision = 0) {
    const m = pow(10, precision)
    let result = bcmul(number, m, precision)
    result = result.split('.', 2)[0]
    result = bcdiv(result, m, precision)
    return trimZeroes(result)
}

/**
 *
 * @param number
 * @param precision
 * @return number
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
 *
 * @param a
 * @param b
 * @param scale
 * @returns number
 */
export function multiply(a, b, scale = 10) {
    return trimZeroes(bcmul(a, b, scale))
}

/**
 *
 * @param a
 * @param b
 * @param scale
 * @returns number
 */
export function divide(a, b, scale = 10) {
    return trimZeroes(bcdiv(a, b, scale))
}


/**
 *
 * @param a
 * @param b
 * @param scale
 * @returns number
 */
export function add(a, b, scale = 10) {
    return trimZeroes(bcadd(a, b, scale))
}

/**
 *
 * @param a
 * @param b
 * @param scale
 * @returns number
 */
export function substract(a, b, scale = 10) {
    return trimZeroes(bcsub(a, b, scale))
}

export function isBigInt(n) {
    return compare(abs(n), '9223372036854775807') <= 0
}
export function isSafeBigInt(n) {
    return compare(abs(n), Number.MAX_SAFE_INTEGER) <= 0
}