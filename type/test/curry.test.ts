import type { Equal, Expect } from '@type-challenges/utils'
import { curry, uncurry } from "../src/curry";

// sadly current implemention hits typescript's recursive limit 
// when there are more than 48 params

// some of test cases are borrowed from `type-challenges`
// https://github.com/type-challenges/type-challenges/blob/main/questions/00462-extreme-currying-2/README.md

{
  // about curry
  const fn1 = (a: string, b: number, c: boolean) => true
  const fn2 = (a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true

  const curried1 = curry(fn1)
  const curried2 = curry(fn2)

  const curried1Return1 = curried1('123')(123)(true)
  const curried1Return2 = curried1('123', 123)(false)
  const curried1Return3 = curried1('123', 123, true)

  const curried2Return1 = curried2('123')(123)(true)(false)(true)('123')(false)
  const curried2Return2 = curried2('123', 123)(true, false)(true, '123')(false)
  const curried2Return3 = curried2('123', 123)(true)(false)(true, '123', false)
  const curried2Return4 = curried2('123', 123, true)(false, true, '123')(false)
  const curried2Return5 = curried2('123', 123, true)(false)(true)('123')(false)
  const curried2Return6 = curried2('123', 123, true, false)(true, '123', false)
  const curried2Return7 = curried2('123', 123, true, false, true)('123', false)
  const curried2Return8 = curried2('123', 123, true, false, true)('123')(false)
  const curried2Return9 = curried2('123', 123, true, false, true, '123')(false)
  const curried2Return10 = curried2('123', 123, true, false, true, '123', false)

  type cases = [
    Expect<Equal<typeof curried1Return1, boolean>>,
    Expect<Equal<typeof curried1Return2, boolean>>,
    Expect<Equal<typeof curried1Return3, boolean>>,

    Expect<Equal<typeof curried2Return1, boolean>>,
    Expect<Equal<typeof curried2Return2, boolean>>,
    Expect<Equal<typeof curried2Return3, boolean>>,
    Expect<Equal<typeof curried2Return4, boolean>>,
    Expect<Equal<typeof curried2Return5, boolean>>,
    Expect<Equal<typeof curried2Return6, boolean>>,
    Expect<Equal<typeof curried2Return7, boolean>>,
    Expect<Equal<typeof curried2Return8, boolean>>,
    Expect<Equal<typeof curried2Return9, boolean>>,
    Expect<Equal<typeof curried2Return10, boolean>>,
  ]

  // we do not allow call with 0 params on curried function
  //@ts-expect-error
  curried1()
  //@ts-expect-error
  curried1('123')()

  // about uncurry
  const uncurried1 = uncurry(curried1)
  const uncurried2 = uncurry(curried2)

  type cases_uncurry = [
    Expect<Equal<typeof uncurried1, typeof fn1>>,
    Expect<Equal<typeof uncurried2, typeof fn2>>
  ]
}

{
  // about functions has less than 2 params
  // shoule return the same function
  const fn3 = (a: string) => true
  const fn4 = () => true

  const curried3 = curry(fn3)
  const curried4 = curry(fn4)

  type cases_less_than_2_params = [
    Expect<Equal<typeof curried3, typeof fn3>>,
    Expect<Equal<typeof curried4, typeof fn4>>
  ]
}

{
  // about how many params can be curried
  const canYouCurry30Params = curry((
    a: string, b: number, c: boolean, d: boolean, e: boolean,
    f: string, g: boolean, h: string, i: number, j: boolean,
    k: boolean, l: boolean, m: string, n: boolean, o: string,
    p: number, q: boolean, r: boolean, s: boolean, t: string,
    u: boolean, v: string, w: number, x: boolean, y: boolean,
    z: boolean, aa: string, bb: boolean, cc: string, dd: string
  ) => true)

  // the 48-params is ok
  const canYouCurry48Params = curry((
    a01: string, a02: string, a03: string, a04: string, a05: string,
    a06: string, a07: string, a08: string, a09: string, a10: string,
    a11: string, a12: string, a13: string, a14: string, a15: string,
    a16: string, a17: string, a18: string, a19: string, a20: string,
    a21: string, a22: string, a23: string, a24: string, a25: string,
    a26: string, a27: string, a28: string, a29: string, a30: string,
    a31: string, a32: string, a33: string, a34: string, a35: string,
    a36: string, a37: string, a38: string, a39: string, a40: string,
    a41: string, a42: string, a43: string, a44: string, a45: string,
    a46: string, a47: string
  ) => true)

  // the 49-params hits typescript's recursive limit
  // @ts-expect-error 
  const canYouCurry49Params = curry((
    a01: string, a02: string, a03: string, a04: string, a05: string,
    a06: string, a07: string, a08: string, a09: string, a10: string,
    a11: string, a12: string, a13: string, a14: string, a15: string,
    a16: string, a17: string, a18: string, a19: string, a20: string,
    a21: string, a22: string, a23: string, a24: string, a25: string,
    a26: string, a27: string, a28: string, a29: string, a30: string,
    a31: string, a32: string, a33: string, a34: string, a35: string,
    a36: string, a37: string, a38: string, a39: string, a40: string,
    a41: string, a42: string, a43: string, a44: string, a45: string,
    a46: string, a47: string, a48: string, a49: string
  ) => true)
}