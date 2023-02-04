import React from 'react';

export function useEffectOnce(effect: React.EffectCallback) {
  const ref = React.useRef(effect);
  React.useEffect(() => ref.current(), []);
}
