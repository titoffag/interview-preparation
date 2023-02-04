import React from 'react';

type OptionalType<T> = T | undefined; 

export function usePrevious<T>(value: T): OptionalType<T> {
  const previousValue = React.useRef<OptionalType<T>>();

  React.useEffect(() => {
    previousValue.current = value;
  }, [value]);

  return previousValue.current;
}
