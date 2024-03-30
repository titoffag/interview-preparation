package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func compareMaps(map1, map2 map[int]int) bool {
    if len(map1) != len(map2) {
        return false
    }
    for key, value := range map1 {
        if value2, ok := map2[key]; !ok || value != value2 {
            return false
        }
    }
    return true
}

func main() {
	availableShips := map[int]int{
        1: 4,
        2: 3,
        3: 2,
        4: 1,
    }

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

		ships := countShips(line)

		if (compareMaps(availableShips, ships)) {
			fmt.Println("YES");
		} else {
			fmt.Println("NO");
		}
	}
}

func countShips(line string) map[int]int {
	ships := make(map[int]int)

	numbers := strings.Split(line, " ")
	for _, numberStr := range numbers {
		number, err := strconv.Atoi(numberStr)
		if err != nil {
			continue
		}

		ships[number]++
	}

	return ships
}
