import {Bcmath, trimZeroes} from "bcmath";
import {bcmul, bcdiv, bcadd, bcsub, bccomp, bcround} from './bc.js'

/**
 *
 */
export class Chain {

    /**
     * Constructor
     * @param {string|number|BigInt} number Number
     * @param {int} scale Number of decimal places (default: 10)
     */
    constructor(number, scale = 10) {
        this.value = number
        this._scale = scale
        this.math = new Bcmath(scale)
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
     * @param {int} scale Number of decimal places
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
        return this.math.compare(this.value, number, this._scale)
    }

    /**
     * Round value to the nearest round number
     * @param precision Number of decimal places. Can be negative. Default: 0
     * @returns {Chain}
     */
    round(precision = 0) {
        this.value = this.math.round(this.value, precision)
        return this
    }

    /**
     * Round the number down
     * @param precision Number of decimal places. Can be negative. Default: 0
     * @returns {Chain}
     */
    floor(precision = 0) {
        this.value = this.math.floor(this.value, precision)
        return this
    }

    /**
     * Round the number up
     * @param precision Number of decimal places. Can be negative. Default: 0
     * @returns {Chain}
     */
    ceil(precision = 0) {
        this.value = this.math.ceil(this.value, precision)
        return this
    }

    /**
     * Pow
     * @param power
     * @returns {Chain}
     */
    pow(power) {
        this.value = this.math.pow(this.value, power);
        return this
    }

    /**
     * Multiply
     * @param value
     * @returns {Chain}
     */
    mul(value) {
        this.value = bcmul(this.value, value, this._scale)
        return this
    }

    /**
     * Divide value by a divisor
     * @param divisor Divisor
     * @returns {Chain}
     */
    div(divisor) {
        this.value = bcdiv(this.value, divisor, this._scale)
        return this
    }

    /**
     * Substract a number
     * @param {string|number|BigInt} number Number to add
     * @returns {Chain}
     */
    sub(number) {
        this.value = bcsub(this.value, number, this._scale)
        return this
    }

    /**
     * Add a number
     * @param value
     * @returns {Chain}
     */
    add(...numbers) {
        numbers.forEach(number => {
            this.value = bcadd(this.value, number, this._scale)
        })
        return this
    }

    /**
     * Returns the highest number
     * @param {string|number|BigInt} numbers Array of numbers
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
     * @param {string|number|BigInt} numbers Array of numbers
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
        if (this.math.compare(this.value, 0) < 0) {
            this.mul(-1)
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
        if (plus && this.compare(0) > 0) {
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
