import React from 'react';

export function useIsMounted(): () => boolean {
  const isMountedRef = React.useRef(false);

  React.useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    }
  }, []);

  return () => isMountedRef.current;
}
