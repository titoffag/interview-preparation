type Reverse<T extends any[]> = T extends [infer First, ...infer Rest]
    ? [...Reverse<Rest>, First]
    : T;

type Reverse2<T extends any[], R extends any[] = []> = {
    0: R,
    1: Reverse2<Tail<T>, [Head<T>, ...R]>
}[T['length'] extends 0 ? 0 : 1]