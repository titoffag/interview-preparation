import React from 'react';

export function useHover<T extends HTMLElement>(): [React.Ref<T>, boolean] {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const ref = React.useRef<T>();
  const setHoveredEqualsTrue = React.useCallback(() => setIsHovered(true), []);
  const setHoveredEqualsFalse = React.useCallback(() => setIsHovered(false), []);

  const cbRef = React.useCallback((element: T) => {
    if (ref.current) {
      ref.current.removeEventListener('mouseenter', setHoveredEqualsTrue);
      ref.current.removeEventListener('mouseleave', setHoveredEqualsFalse);
    }

    ref.current = element;

    ref.current?.addEventListener('mouseenter', setHoveredEqualsTrue);
    ref.current?.addEventListener('mouseleave', setHoveredEqualsFalse);
  }, [setHoveredEqualsTrue, setHoveredEqualsFalse]);

  return [cbRef, isHovered];
}
