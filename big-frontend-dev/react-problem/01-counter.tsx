
import React from 'react';

type OperationType = 'increment' | 'decrement';

const handleOperationStrategyMap: Record<OperationType, React.SetStateAction<number>> = {
  'increment': (prevCounter: number) => prevCounter + 1,
  'decrement': (prevCounter: number) => prevCounter - 1,
};

export function App() {
  const [counter, setCounter] = React.useState(0);

  const handleOperation = (operationType: OperationType) => () => {
    setCounter(handleOperationStrategyMap[operationType]);
  };

  return (
    <div>
      <button data-testid="decrement-button" onClick={handleOperation('decrement')}>-</button>
      <button data-testid="increment-button" onClick={handleOperation('increment')}>+</button>
      <p>clicked: {counter}</p>
    </div>
  )
}
