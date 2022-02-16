import * as bc_pkg from "locutus/php/bc/index.js";
import BigNumber from "bignumber.js";

export const {bcround} = bc_pkg

export function bcmul(a, b, scale) {
    const BN = BigNumber.clone({DECIMAL_PLACES: scale})

    const bn = new BN(a)
    return bn.multipliedBy(b).toFixed()
}

export function bcdiv(a, b, scale) {
    const BN = BigNumber.clone({DECIMAL_PLACES: scale})

    const bn = new BN(a)
    return bn.dividedBy(b).toFixed()
}

export function bcsub(a, b, scale) {
    const BN = BigNumber.clone({DECIMAL_PLACES: scale})

    const bn = new BN(a)
    return bn.minus(b).toFixed()
}

export function bcadd(a, b, scale) {
    const BN = BigNumber.clone({DECIMAL_PLACES: scale})

    const bn = new BN(a)
    return bn.plus(b).toFixed()
}

export function bccomp(a, b, scale) {
    const BN = BigNumber.clone({DECIMAL_PLACES: scale})

    const bn = new BN(a)
    return bn.comparedTo(b).toFixed()
}
