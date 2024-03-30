package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func parseRange(s string) []int {
	parts := strings.Split(s, "-")
	start, _ := strconv.Atoi(parts[0])
	end, _ := strconv.Atoi(parts[1])
	result := make([]int, end-start+1)
	for i := range result {
		result[i] = start + i
	}
	return result
}

func parseLine(s string) []int {
	parts := strings.Split(s, ",")
	result := make([]int, 0, len(parts))
	for _, part := range parts {
		if strings.Contains(part, "-") {
			result = append(result, parseRange(part)...)
		} else {
			num, _ := strconv.Atoi(part)
			result = append(result, num)
		}
	}
	return result
}

// func intersect(a, b []int) []int {
// 	m := make(map[int]bool)
// 	for _, item := range a {
// 		m[item] = true
// 	}
// 	var result []int
// 	for _, item := range b {
// 		if _, ok := m[item]; ok {
// 			result = append(result, item)
// 		}
// 	}
// 	return result
// }

func difference(a, b []int) []int {
	m := make(map[int]bool)
	for _, item := range b {
		m[item] = true
	}
	var result []int
	for _, item := range a {
		if _, ok := m[item]; !ok {
			result = append(result, item)
		}
	}
	return result
}

func formatRange(nums []int) string {
	if len(nums) == 0 {
		return ""
	}

	ranges := make([]string, 0)
	start := nums[0]
	end := nums[0]

	for i := 1; i < len(nums); i++ {
		if nums[i] == end+1 {
			end = nums[i]
		} else {
			if start == end {
				ranges = append(ranges, strconv.Itoa(start))
			} else {
				ranges = append(ranges, fmt.Sprintf("%d-%d", start, end))
			}
			start = nums[i]
			end = nums[i]
		}
	}

	if start == end {
		ranges = append(ranges, strconv.Itoa(start))
	} else {
		ranges = append(ranges, fmt.Sprintf("%d-%d", start, end))
	}

	return strings.Join(ranges, ",")
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	// Read the count of lines
	scanner.Scan()
	countStr := scanner.Text()
	count, err := strconv.Atoi(countStr)
	if err != nil {
		fmt.Println("Error converting count to integer:", err)
		return
	}

	// Read each line as an array
	lines := make([]string, count*2)
	for i := 0; i < count*2; i += 2 {
		scanner.Scan()
		lines[i] = scanner.Text()
		scanner.Scan()
		lines[i+1] = scanner.Text()
	}

	for i := 0; i < count*2; i += 2 {
		a := make([]int, 0)
		lineCount, err := strconv.Atoi(lines[i])
		if err != nil {
			fmt.Println("Error converting line count to integer:", err)
			return
		}
		for j := 1; j <= lineCount; j++ {
			a = append(a, j)
		}
		b := parseLine(lines[i+1])

		// intersection := intersect(a, b)
		outersection := difference(a, b)

		// fmt.Println("Intersection:", intersection)
		fmt.Println(formatRange(outersection))
	}
}
