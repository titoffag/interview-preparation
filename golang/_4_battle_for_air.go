package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

// 4
// 1
// >= 30
// 6
// >= 18
// <= 23
// >= 20
// <= 27
// <= 21
// >= 28
// 3
// <= 25
// >= 20
// >= 25
// 3
// <= 15
// >= 30
// <= 24

// 30

// 18
// 18
// 20
// 20
// 20
// -1

// 15
// 20
// 25

// 15
// -1
// -1



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
