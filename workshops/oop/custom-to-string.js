/**
 * Adds a custom toString method to an array.
 * The method returns a string representation of the array.
 *
 * @param {Array} arr - The array to add the toString method to.
 */
function addToString(arr) {
    arr.toString = function () {
        // return `[${this.join(', ')}]`;
        switch (this.length) {
            case 0:
                return '';
            case 1:
                return String(this[0]);
            default:
                return `${this[0]}..${this.at(-1)}`;
        }
    }
}