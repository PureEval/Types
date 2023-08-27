import type { Fn, LabeledStartParams } from "../type-utils"

// TODO: we can avoid `origin` by adding a symbol tag to mark a function curried by PureEval

type Curring<Params extends unknown[], ReturnType, NewParams extends unknown[] = []> =
  Params extends [infer _Next, ...infer Remaining]  // `...LabeledStartParams<Params, 1>]` is used instead of `_Next` to keep tuple label
  ? LabeledStartParams<Params, 1> extends (infer NextParamTuple extends unknown[])
  ? {
    (...args: [...NewParams, ...NextParamTuple]): CurriedReturnType<Remaining, ReturnType>,
    origin: (...args: [...NewParams, ...Params]) => ReturnType  // TODO(fixme): this would be created many times. 
  } & (
    Remaining extends []
    ? {}
    : Curring<Remaining, ReturnType, [...NewParams, ...NextParamTuple]>
  )
  : never
  : ReturnType

type CurriedReturnType<Params extends unknown[], ReturnType> =
  Params extends []
  ? ReturnType
  : Curring<Params, ReturnType>

/**
 * Wrap a function with this to get a curried version
 */
export type Curry<F extends Fn> =
  Parameters<F>['length'] extends (0 | 1)
  ? F
  : CurriedReturnType<Parameters<F>, ReturnType<F>>

/**
 * @example
 * const foo = (a, b, c) => a + b + c;
 * curry(foo)(1, 2, 3); //6
 * curry(foo)(1)(2, 3); //6
 */
export function curry<F extends Fn>(func: F): Curry<F>

/**
 * @example
 * const foo = (a, b, c) => a + b + c;
 * uncurry(curry(foo)(1)); //(b, c) -> 1 + b + c
 */
export function uncurry<F extends Fn & { origin: Fn }>(func: F):
  (...args: Parameters<F>) => ReturnType<F> // this is a walk-around for debet from `Curry`
