import React from 'react';

export function useDebounce(cb, delay) {
  const timer = React.useRef(null);

  const debounceCb = React.useCallback(
    (...args) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        cb(...args);
        timer.current = null;
      }, delay);
    },
    [cb, delay],
  );
  
  return debounceCb;
}