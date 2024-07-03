// type ExtractNumbers<S extends string, R extends string = ""> = S extends `${infer First}${infer Rest}`
//     ? First extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
//         ? ExtractNumbers<Rest, `${R}${First}`>
//         : ExtractNumbers<Rest, R>
//     : R;
//
// type ToNumber<S extends string> = S extends "" ? 0 : S extends `${infer N extends number}` ? N : never;
//
// type ExtractAndConvert<S extends string> = ToNumber<ExtractNumbers<S>>;
//
// type SumArray<T extends Readonly<Array<string | number>>, Acc extends number = 0> =
//     T extends [infer First, ...infer Rest]
//         ? SumArray<
//             Rest,
//             First extends number
//                 ? Acc + First
//         : First extends string
//             ? Acc + ExtractAndConvert<First>
//             : Acc
//             >
//         : Acc;
//
// type Solution<T extends Readonly<Array<string | number>>> = SumArray<T>;
//
// // Примеры тестов
// type Test1 = Solution<[
//     1,
//     "2abc0",
//     "3",
// ]>; // 6
//
// type Test2 = Solution<[1, 2, 3, 4, 5, 6]>; // 21
//
// type Test3 = Solution<[1]>; // 1
//
// type Test4 = Solution<["1", "2", "3"]>; // 6
//
// type Test5 = Solution<["1abc", 2, "3"]>; // 6
//
// type Test6 = Solution<[111, 222, 333]>; // 666

type ExtractNumbers<S extends string> = S extends `${infer First}${infer Rest}`
    ? First extends "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
        ? `${First}${ExtractNumbers<Rest>}`
        : ExtractNumbers<Rest>
    : "";

type ToNumber<S extends string> = S extends `${infer N}`
    ? N extends keyof ToNumberMap ? ToNumberMap[N] : never
    : never;

type ToNumberMap = {
    '0': 0;
    '1': 1;
    '2': 2;
    '3': 3;
    '4': 4;
    '5': 5;
    '6': 6;
    '7': 7;
    '8': 8;
    '9': 9;
};

type SumArray<T extends readonly (string | number)[], Acc extends number = 0> =
    T extends [infer First, ...infer Rest]
        ? First extends string
            ? SumArray<Rest, Acc + ToNumber<ExtractNumbers<First>>>
        : First extends number
            ? SumArray<Rest, Acc + First>
        : never
    : Acc;

type Solution<T extends readonly (string | number)[]> = SumArray<T>;

// Примеры тестов
type Test1 = Solution<[
    1,
    "2abc0",
    "3",
]>; // 6

type Test2 = Solution<[1, 2, 3, 4, 5, 6]>; // 21

type Test3 = Solution<[1]>; // 1

type Test4 = Solution<["1", "2", "3"]>; // 6

type Test5 = Solution<["1abc", 2, "3"]>; // 6

type Test6 = Solution<[111, 222, 333]>; // 666
