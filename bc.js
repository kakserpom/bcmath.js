import * as bc_pkg from "locutus/php/bc/index.js";
import BigNumber from "bignumber.js";

export const { bcround } = bc_pkg
const _BN_SCALE = new Map()

const _BN = scale => {
    let BN = _BN_SCALE.get(scale)
    if (!BN) {
        BN = BigNumber.clone({ DECIMAL_PLACES: scale })
        _BN_SCALE.set(scale, BN)
    }
    return BN
}

export function bcmul(a, b, scale) {
    const bn = new (_BN(scale))(a)
    return bn.multipliedBy(b).toFixed()
}

export function bcdiv(a, b, scale) {
    const bn = new (_BN(scale))(a)
    return bn.dividedBy(b).toFixed()
}

export function bcsub(a, b, scale) {
    const BN = BigNumber.clone({ DECIMAL_PLACES: scale })

    const bn = new (_BN(scale))(a)
    return bn.minus(b).toFixed()
}

export function bcadd(a, b, scale) {
    const bn = new (_BN(scale))(a)
    return bn.plus(b).toFixed()
}

export function bccomp(a, b, scale) {
    const bn = new (_BN(scale))(a)
    return bn.comparedTo(b).toFixed()
}
