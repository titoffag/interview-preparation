// module.exports = function solution(field, moves) {
//     const size = 4;

//     function rotateLeft(matrix) {
//         const N = matrix.length;
//         let result = Array.from({ length: N }, () => Array(N).fill(0));
//         for (let r = 0; r < N; ++r) {
//             for (let c = 0; c < N; ++c) {
//                 result[N - c - 1][r] = matrix[r][c];
//             }
//         }
//         return result;
//     }

//     function rotateRight(matrix) {
//         const N = matrix.length;
//         let result = Array.from({ length: N }, () => Array(N).fill(0));
//         for (let r = 0; r < N; ++r) {
//             for (let c = 0; c < N; ++c) {
//                 result[c][N - r - 1] = matrix[r][c];
//             }
//         }
//         return result;
//     }

//     function swipeLeft(field) {
//         let newField = Array.from({ length: size }, () => Array(size).fill(0));
//         for (let i = 0; i < size; i++) {
//             let row = field[i].filter(x => x !== 0);
//             for (let j = 0; j < row.length - 1; j++) {
//                 if (row[j] === row[j + 1]) {
//                     row[j] *= 2;
//                     row[j + 1] = 0;
//                 }
//             }
//             row = row.filter(x => x !== 0);
//             for (let j = 0; j < row.length; j++) {
//                 newField[i][j] = row[j];
//             }
//         }
//         return newField;
//     }

//     function swipeRight(field) {
//         let rotated = rotateLeft(rotateLeft(field));
//         rotated = swipeLeft(rotated);
//         return rotateRight(rotateRight(rotated));
//     }

//     function swipeUp(field) {
//         let rotated = rotateRight(field);
//         rotated = swipeLeft(rotated);
//         return rotateLeft(rotated);
//     }

//     function swipeDown(field) {
//         let rotated = rotateLeft(field);
//         rotated = swipeLeft(rotated);
//         return rotateRight(rotated);
//     }

//     for (const move of moves.split(' ')) {
//         switch (move) {
//             case 'L':
//                 field = swipeLeft(field);
//                 break;
//             case 'R':
//                 field = swipeRight(field);
//                 break;
//             case 'U':
//                 field = swipeUp(field);
//                 break;
//             case 'D':
//                 field = swipeDown(field);
//                 break;
//         }
//     }

//     return field;
// }

// // Example usage
// const field = [
//     [0, 2, 4, 8],
//     [0, 0, 0, 0],
//     [0, 2, 2, 8],
//     [0, 2, 2, 2]
// ];

// const moves = "U U U";
// console.log(solution(field, moves)); // Output: [[0, 4, 8, 16], [0, 2, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0]]


module.exports = function solution(field, moves) {
    const size = 4;

    function swipeLeft(field) {
        let newField = Array.from({ length: size }, () => Array(size).fill(0));
        for (let i = 0; i < size; i++) {
            let row = field[i].filter(x => x !== 0);
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j + 1]) {
                    row[j] *= 2;
                    row[j + 1] = 0;
                }
            }
            row = row.filter(x => x !== 0);
            for (let j = 0; j < row.length; j++) {
                newField[i][j] = row[j];
            }
        }
        return newField;
    }

    function swipeRight(field) {
        let newField = Array.from({ length: size }, () => Array(size).fill(0));
        for (let i = 0; i < size; i++) {
            let row = field[i].filter(x => x !== 0);
            row.reverse();
            for (let j = 0; j < row.length - 1; j++) {
                if (row[j] === row[j + 1]) {
                    row[j] *= 2;
                    row[j + 1] = 0;
                }
            }
            row = row.filter(x => x !== 0);
            row.reverse();
            for (let j = 0; j < row.length; j++) {
                newField[i][size - row.length + j] = row[j];
            }
        }
        return newField;
    }

    function swipeUp(field) {
        let newField = Array.from({ length: size }, () => Array(size).fill(0));
        for (let col = 0; col < size; col++) {
            let column = [];
            for (let row = 0; row < size; row++) {
                if (field[row][col] !== 0) {
                    column.push(field[row][col]);
                }
            }
            for (let row = 0; row < column.length - 1; row++) {
                if (column[row] === column[row + 1]) {
                    column[row] *= 2;
                    column[row + 1] = 0;
                }
            }
            column = column.filter(x => x !== 0);
            for (let row = 0; row < column.length; row++) {
                newField[row][col] = column[row];
            }
        }
        return newField;
    }

    function swipeDown(field) {
        let newField = Array.from({ length: size }, () => Array(size).fill(0));
        for (let col = 0; col < size; col++) {
            let column = [];
            for (let row = 0; row < size; row++) {
                if (field[row][col] !== 0) {
                    column.push(field[row][col]);
                }
            }
            column.reverse();
            for (let row = 0; row < column.length - 1; row++) {
                if (column[row] === column[row + 1]) {
                    column[row] *= 2;
                    column[row + 1] = 0;
                }
            }
            column = column.filter(x => x !== 0);
            column.reverse();
            for (let row = 0; row < column.length; row++) {
                newField[size - column.length + row][col] = column[row];
            }
        }
        return newField;
    }

    for (let move of moves.split(' ')) {
        switch (move) {
            case 'L':
                field = swipeLeft(field);
                break;
            case 'R':
                field = swipeRight(field);
                break;
            case 'U':
                field = swipeUp(field);
                break;
            case 'D':
                field = swipeDown(field);
                break;
        }
    }

    return field;
}

// Пример использования
const field = [
    [0, 2, 4, 8],
    [0, 0, 0, 0],
    [0, 2, 2, 8],
    [0, 2, 2, 2]
];

const moves = "U U U";
console.log(solution(field, moves)); // Ожидаемый вывод: [[0, 4, 8, 16], [0, 2, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0]]
