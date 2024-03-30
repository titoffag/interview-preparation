package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

// 6
// R48FAO00OOO0OOA99OKA99OK
// R48FAO00OOO0OOA99OKA99O
// A9PQ
// A9PQA
// A99AAA99AAA99AAA99AA
// AP9QA

// R48FA O00OO O0OO A99OK A99OK
// -
// A9PQ
// -
// A99AA A99AA A99AA A99AA
// -

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
