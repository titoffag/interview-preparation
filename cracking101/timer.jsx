import { useLayoutEffect, useRef, useState } from "react";

export default function Timer() {
  let timer = useRef();
  const [ count, setCount ] = useState(0);
  const [ shouldWork, setShouldWork ] = useState(false);

  useLayoutEffect(() => {
    if (shouldWork) {
      timer.current = setInterval(() => {
        setCount(value => value + 1);
      }, 1_000);
    } else {
      clearInterval(timer.current);
    }
  }, [shouldWork]);

  const startTimer = () => setShouldWork(true);
  const stopTimer = () => setShouldWork(false);

  return (
    <>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <div>{count}</div>
    </>
  );
}
