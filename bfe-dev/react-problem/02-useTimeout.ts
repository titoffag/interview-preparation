import React from 'react';

const stubFn = () => {};

export function useTimeout(callback: () => void, delay: number) {
  const cbRef = React.useRef<Function>(stubFn);
  
  React.useEffect(() => {
    cbRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => cbRef.current(), delay);

    return () => clearTimeout(timer);
  }, [delay]);
}
