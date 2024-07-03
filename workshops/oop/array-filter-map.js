/**
 * Applies a filter function to each element of the array and returns a new array with the mapped values.
 *
 * @param {Function} filter - A function that takes an element and its index as arguments and returns a boolean indicating whether the element should be included in the result.
 * @param {Function} map - A function that takes an element and its index as arguments and returns the mapped value.
 * @return {Array} A new array with the mapped values of the elements that passed the filter.
 */
Array.prototype.filterMap = function (filter, map) {
    // return this.map(map).filter(filter);
    const result = [];

    for (const [i, el] of this.entries()) {
        if (filter(el, i, this)) {
            result.push(map(el, i, this));
        }
    }

    return result;
}
