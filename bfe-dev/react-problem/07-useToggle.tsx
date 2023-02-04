import React from 'react';

export function useToggle(initIsOn = false): [boolean, () => void] {
  const [isOn, setIsOn] = React.useState<boolean>(initIsOn);
  const toggle = React.useCallback(() => {
    setIsOn((prevIsOn) => !prevIsOn);
  }, []);

  return [isOn, toggle];
}
