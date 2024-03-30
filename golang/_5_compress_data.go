package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

// 5
// 9
// 3 2 1 0 -1 0 6 6 7
// 1
// 1000
// 7
// 1 2 3 4 5 6 7
// 7
// 1 3 5 7 9 11 13
// 11
// 100 101 102 103 19 20 21 22 42 41 40

// 8
// 3 -4 0 0 6 0 6 1
// 2
// 1000 0
// 2
// 1 6
// 14
// 1 0 3 0 5 0 7 0 9 0 11 0 13 0
// 6
// 100 3 19 3 42 -2



func main() {
	// availableShips := map[int]int{
    //     1: 4,
    //     2: 3,
    //     3: 2,
    //     4: 1,
    // }

	scanner := bufio.NewScanner(os.Stdin)
	// Read the count of lines
	scanner.Scan()
	countStr := scanner.Text()
	count, err := strconv.Atoi(countStr)
	if err != nil {
		return
	}

	// Read each line as an array
	lines := make([]string, count)
	for i := 0; i < count; i++ {
		scanner.Scan()
		lines[i] = scanner.Text()
	}

	for _, line := range lines {

		// ships := countShips(line)

		// if (compareMaps(availableShips, ships)) {
			fmt.Println("YES", line);
		// } else {
			// fmt.Println("NO");
		// }
	}
}
