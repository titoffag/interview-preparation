import React from 'react';

type UseArrayActions<T> = {
  push: (item: T) => void,
  removeByIndex: (index: number) => void
}

export function useArray<T>(initialValue: T[] = []): { value: T[] } & UseArrayActions<T> {
  const [value, setValue] = React.useState<T[]>(initialValue);
  
  const push = React.useCallback((item: T) => setValue([...value, item]), []);
  const removeByIndex = React.useCallback((idx: number) => setValue([...value.slice(0, idx), ...value.slice(idx + 1)]), []);

  return {
    value,
    push,
    removeByIndex,
  }
}
