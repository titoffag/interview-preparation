package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

func main() {
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

		numbers := strings.Split(line, " ")

		day, _ := strconv.Atoi(numbers[0])
		month, _ := strconv.Atoi(numbers[1])
		year, _ := strconv.Atoi(numbers[2])

		if (isValidDate(day, month, year)) {
			fmt.Println("YES");
		} else {
			fmt.Println("NO");
		}
	}
}

func isValidDate(day int, month int, year int) bool {
	dateString := fmt.Sprintf("%d-%02d-%02d", year, month, day)
	_, err := time.Parse("2006-01-02", dateString)
	return err == nil
}
