Array.prototype.myReduce = function (callback, initialValue) {
  const array = this;
  const withoutInitialValue = arguments.length == 1;
  if (withoutInitialValue && array.length === 0) {
    throw new Error('Reduce of empty array with no initial value');
  }

  let accumulator = withoutInitialValue ? array[0] : initialValue;
  let index = withoutInitialValue ? 1 : 0;

  for (let i = index; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }

  // while (index < array.length) {
  //   accumulator = callback(accumulator, array[index], index, array);
  //   index++;
  // }

  return accumulator;
}
