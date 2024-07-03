type IterableType<T extends Iterable<any> | AsyncIterable<any>> =
    T extends AsyncIterable<infer V> ? V :
        T extends Iterable<infer V> ? V : unknown;

// number
let test1: IterableType<[1,2,3]>
// string
let test2: IterableType<Set<string>>
// number
let test3: IterableType<AsyncIterable<{a: number}>>