package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	scanner.Scan()
	countTreeStr := scanner.Text()
	countTree, err := strconv.Atoi(countTreeStr)
	if err != nil {
		return
	}

	for i := 0; i < countTree; i++ {
		scanner.Scan()
		countLinesStr := scanner.Text()
		countLines, err := strconv.Atoi(countLinesStr)
		if err != nil {
			return
		}

		// Read each line as an array
		lines := make([]string, countLines)
		for i := 0; i < countLines; i++ {
			scanner.Scan()
			lines[i] = scanner.Text()
		}

		rootNodes := findNodesByParentId(lines, "-1")
	
		for j, line := range rootNodes {
			printTreeNode(&line, "")

			if (j != len(rootNodes) - 1) {
				fmt.Println("")
			}
		}

		if (i != countTree - 1) {
			fmt.Println("")
		}
	}
}

type Node struct {
    ID       string
    ParentID string
    Text     string
	Children []Node
}

func sortNodesById(nodes []Node) []Node {
    sort.Slice(nodes, func(i, j int) bool {
        id1, _ := strconv.Atoi(nodes[i].ID)
        id2, _ := strconv.Atoi(nodes[j].ID)
        return id1 < id2
    })
    return nodes
}

func findNodesByParentId(input []string, parent string) []Node {
    var rootNodes []Node

    for _, line := range input {
        parts := strings.Split(line, " ")
        if len(parts) < 2 {
            continue
        }
        parentID := parts[1]

        if parentID == parent {
            id := parts[0]
            text := strings.Join(parts[2:], " ")

            rootNodes = append(rootNodes, Node{
                ID:       id,
                ParentID: parentID,
                Text:     text,
				Children: findNodesByParentId(input, id),
            })
        }
    }

    return sortNodesById(rootNodes)
}

func printTreeNode(root *Node, prefix string) {
    if root == nil {
        return
    }
    fmt.Println(root.Text)
    for i, child := range root.Children {
        newPrefix := prefix
        if i == len(root.Children)-1 {
			fmt.Printf("%s|\n%s|--", prefix, prefix)
            newPrefix += "   "
        } else {
			fmt.Printf("%s|\n%s|--", prefix, prefix)
            newPrefix += "|  "
        }
        printTreeNode(&child, newPrefix)
    }
}
