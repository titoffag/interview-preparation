type Head<T extends unknown[]> =
    T extends [infer First, ...infer Rest] ? First : never;

// @ts-ignore
type Tail<T extends unknown[]> =
    T extends [infer First, ...infer Rest] ? Rest : never;

// {} с вариантами вместо этажей тернарников
type Drop<N extends number, A extends unknown[], R extends unknown[]> = {
    0: R;
    1: Drop<N, Tail<A>, [...R, Head<A>]>;
}[A['length'] extends 0 ? 0 : R['length'] extends N ? 0 : 1]