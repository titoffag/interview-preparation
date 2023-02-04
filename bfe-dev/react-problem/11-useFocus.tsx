import React from 'react';

export function useFocus<T extends HTMLElement>(): [React.Ref<T>, boolean] {
  const [isFocused, setIsFocused] = React.useState(false);
  const ref = React.useRef<T>(null);
  const handleFocus = React.useCallback(() => setIsFocused(true), []);
  const handleBlur = React.useCallback(() => setIsFocused(false), []);

  React.useEffect(() => {
    const element = ref.current;

    element?.addEventListener('focus', handleFocus);
    element?.addEventListener('blur', handleBlur);

    return () => {
      element?.removeEventListener('focus', handleFocus);
      element?.removeEventListener('blur', handleBlur);
    }
  });
  
  return [ref, isFocused];
}
