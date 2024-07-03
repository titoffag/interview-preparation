package main

import "fmt"

func getFloorAndEntrance(flatNumber int) (int, int) {
	// Calculate the floor number
	floor := (flatNumber - 1) / 20 + 1

	// Calculate the entrance number
	entrance := ((flatNumber - 1) % 20) / 4 + 1

	return floor, entrance
}

func main() {
	floor, entrance := getFloorAndEntrance(21)
    fmt.Printf("Floor: %d, Entrance: %d\n", floor, entrance)
}
