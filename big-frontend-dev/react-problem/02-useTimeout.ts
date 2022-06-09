import React from "react";

export function useTimeout(callback: () => void, delay: number) {
  const callbackRef = React.useRef<() => void>();

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  React.useEffect(()=> {
    const timeoutId = setTimeout(() => callbackRef.current?.call(null), delay);
    return () => clearTimeout(timeoutId);
  }, [delay]);
}
