import React from 'react';

export function useThrottle(cb, delay) {
  const isThrottled = React.useRef(false);

  const throttledCb = React.useCallback(
    (...args) => {
      if (isThrottled.current) {
        return;
      }

      cb(...args);
      isThrottled.current = true;
      setTimeout(() => isThrottled.current = false, delay);
    },  
    [cb, delay],
  );

  return throttledCb;
}
