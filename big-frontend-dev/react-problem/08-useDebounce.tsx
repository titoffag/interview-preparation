import React from 'react';

function debounce(fn: Function, delay: number) {
  let timer: number;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => fn(arguments), delay);
  }
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
}
