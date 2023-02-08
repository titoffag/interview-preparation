function allSettledLimit<T>(iterable: Array<() => Promise<T>>, countActive: number): Promise<Array<T>> {
  
}

allSettledLimit([
  () => fetch('//some-data-1'),
  () => fetch('//some-data-2'),
  () => fetch('//some-data-3'),
  () => fetch('//some-data-4')
], 2).then(console.log);
