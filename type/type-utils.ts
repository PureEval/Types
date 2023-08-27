
// the built-in `Function` type is not compatible with `Parameters<>` and `ReturnType<>`
export type Fn = (...args: any[]) => any

// use these to keep tuple labels
export type LabeledTailParams<Params extends unknown[], Length extends number> =
  Params['length'] extends Length
  ? Params
  : Params extends [infer _First, ...infer Remaining extends unknown[]]
  ? LabeledStartParams<Remaining, Length>
  : never

export type LabeledStartParams<Params extends unknown[], Length extends number> =
  Params['length'] extends Length
  ? Params
  : Params extends [...infer Remaining extends unknown[], infer _Last]
  ? LabeledStartParams<Remaining, Length>
  : never