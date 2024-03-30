package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
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

	// availableCommands := map[rune]string{
	// 	"L": "left",
	// 	"R": "right",
	// 	"U": "up",
	// 	"D": "down",
	// 	"B": "begin",
	// 	"E": "end",
	// 	"N": "enter",
	// }

	// maxLineLength := 0
	// for _, line := range lines {
	// 	if len(line) > maxLineLength {
	// 		maxLineLength = len(line)
	// 	}
	// }

	for _, line := range lines {
		result := []string{""}
		positionX, positionY := 0, 0

		for _, command := range line {
			switch command {
			case 'L':
				if positionX > 0 {
					positionX--
				}
			case 'R':
				if positionX < len(result[positionY]) {
					positionX++
				}
			case 'U':
				if positionY > 0 {
					positionY--
					if positionX > len(result[positionY]) {
						positionX = len(result[positionY])
					}
				}
			case 'D':
				if positionY < len(result)-1 {
					positionY++
					if positionX > len(result[positionY]) {
						positionX = len(result[positionY])
					}
				}
			case 'B':
				positionX = 0
			case 'E':
				positionX = len(result[positionY])
			case 'N':
				result = append(result[:positionY+1], append([]string{result[positionY][positionX:]}, result[positionY+1:]...)...)
				result[positionY] = result[positionY][:positionX]
				positionY++
				positionX = 0
			default:
				result[positionY] = result[positionY][:positionX] + string(command) + result[positionY][positionX:]
				positionX++
			}
		}

		fmt.Println(strings.Join(result, "\n"))
		fmt.Println("-")
	}
}
