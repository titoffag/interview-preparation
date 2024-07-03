type HasTail<T extends any[]> = T extends [] | [any] ? false : true;

type HasTail2<T extends any[]> = T['length'] extends 0 | 1 ? false : true;

type HasTail3<T extends any[]> = T extends [any, ...infer R] ? true : false;

type HasTail4<T extends any[]> = T extends [any, ...any[]] ? true : false;

let a: HasTail<[1]>
let b: HasTail<[1,2]>