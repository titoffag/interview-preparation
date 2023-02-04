import React from 'react';

export function useIsFirstRender(): boolean {
  const isFirstRender = React.useRef(true);

  if (isFirstRender.current) {
    isFirstRender.current = false
    return true;
  }

  return false;
}

export function useIsFirstRenderAlt(): boolean {
  const isFirstRenderedRef = React.useRef(true);

  React.useEffect(() => {
    isFirstRenderedRef.current = false;
  }, []);

  return isFirstRenderedRef.current;
}
