// O(N * logN)

/**
* @param {number} N - целое число, количество сотрудников готовых к объединению
* @param {number[]} staff - массив длины N с грейдами доступных сотрудников
* @param {number} K - целое число, количество доступных клавиатур
* @returns {number}
*/
module.exports = function (N, staff, K) {
    staff.sort((a, b) => b - a);
    
    const maxLevel = staff.slice(0, K).reduce((acc, grade) => acc + grade, 0);
    
    return maxLevel;
}

// O(N * logK)

/**
* @param {number} N - целое число, количество сотрудников, готовых к объединению
* @param {number[]} staff - массив длины N с грейдами доступных сотрудников
* @param {number} K - целое число, количество доступных клавиатур
* @returns {number}
*/
module.exports = function (N, staff, K) {
    // Custom MinHeap class
    class MinHeap {
        constructor() {
            this.heap = [];
        }

        insert(val) {
            this.heap.push(val);
            this.bubbleUp();
        }

        extractMin() {
            if (this.heap.length === 1) {
                return this.heap.pop();
            }
            const min = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.bubbleDown();
            return min;
        }

        peek() {
            return this.heap[0];
        }

        size() {
            return this.heap.length;
        }

        bubbleUp() {
            let index = this.heap.length - 1;
            const element = this.heap[index];
            while (index > 0) {
                let parentIndex = Math.floor((index - 1) / 2);
                let parent = this.heap[parentIndex];
                if (parent <= element) break;
                this.heap[index] = parent;
                index = parentIndex;
            }
            this.heap[index] = element;
        }

        bubbleDown() {
            let index = 0;
            const length = this.heap.length;
            const element = this.heap[0];
            while (true) {
                let leftChildIndex = 2 * index + 1;
                let rightChildIndex = 2 * index + 2;
                let leftChild, rightChild;
                let swap = null;

                if (leftChildIndex < length) {
                    leftChild = this.heap[leftChildIndex];
                    if (leftChild < element) {
                        swap = leftChildIndex;
                    }
                }

                if (rightChildIndex < length) {
                    rightChild = this.heap[rightChildIndex];
                    if (
                        (swap === null && rightChild < element) ||
                        (swap !== null && rightChild < leftChild)
                    ) {
                        swap = rightChildIndex;
                    }
                }

                if (swap === null) break;
                this.heap[index] = this.heap[swap];
                index = swap;
            }
            this.heap[index] = element;
        }
    }

    let minHeap = new MinHeap();

    for (let i = 0; i < N; i++) {
        if (minHeap.size() < K) {
            minHeap.insert(staff[i]);
        } else if (staff[i] > minHeap.peek()) {
            minHeap.extractMin();
            minHeap.insert(staff[i]);
        }
    }

    // Sum up the elements in the min-heap
    let maxLevel = 0;
    while (minHeap.size() > 0) {
        maxLevel += minHeap.extractMin();
    }

    return maxLevel;
}

