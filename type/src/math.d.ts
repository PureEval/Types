import type { Curry } from "./curry";
import type { $_ } from "./placeholder"

export function odd(x: number): boolean;

export function even(x: number): boolean;

export const add: Curry<(a: number, b: number) => number>;

export const minus: Curry<(a: number, b: number) => number>;

export const mul: Curry<(a: number, b: number) => number>;

export const div: Curry<(a: number, b: number) => number>;

export const divr: Curry<(a: number, b: number) => number>;

export const mod: Curry<(a: number, b: number) => number>;

export const rema: Curry<(a: number, b: number) => number>;

export const power: Curry<(a: number, b: number) => number>;

export const negate: (a: number) => number;

export const under: <T extends any>() => (a:T, b:T) => -1|1|0; //? constrain T to be comparable?

export const upper: <T extends any>() => (a:T, b:T) => -1|1|0; //? constrain T to be comparable?

export const sort: Curry<<T>(rule: $_| ((a: T, b: T) => number), arr: T[]) => T[]>;

export const median: (arr: number[]) => number;

export const sum: (arr: number[]) => number;

export const prod: (arr: number[]) => number;

export const max: (arr: number[]) => number;

export const min: (arr: number[]) => number;

export const average: (arr: number[]) => number;

export const inc: (x: number) => number;

export const dec: (x: number) => number;
