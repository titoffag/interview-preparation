package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

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
