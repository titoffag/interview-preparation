type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;

let c: Last<[1, 2, 3]>

// @ts-ignore
type Tail<T extends any[]> = T extends [any, ...infer U] ? U : [];

// старый подход
type Last2<T extends any[]> = {
    0: undefined;
    1: T[0];
    2: Last2<Tail<T>>;
}[T['length'] extends 0 ? 0 : T['length'] extends 1 ? 1 : 2]

let d: Last2<[1, 2]>

// typescript тьюринг полный яп
// enum отличный тул нооо не расширяемый через спред и добавление других кей-вельэ поэт иногда лучше as const / object.freeze
const e = Object.freeze({
    '1': '2'
})
const f = {'1': '2'} as const;