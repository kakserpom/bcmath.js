import * as math from 'bcmath'

console.log(0.1 + 0.2 + 0.3)
// 0.6000000000000001 :-(

console.log(math.chain(0.1).add(0.2).add(0.3).done())
// 0.6 :-)

console.log(math.pow(2, 4096).length)
// 1234

const n = math.chain(0.15, 50).pow(-10)

console.log(n.done())
// 173415299.15832613592101475046148114277972531287574726074779

console.log(n.round(3).done())
//173415299.158

console.log(n.round(-3).done())
//173415000

console.log(math.max([1, 2, 3.61, 3.62], 1))
// 3.61   (scale is 1)
