import React from 'react'

export function App() {
  const [counter, setCounter] = React.useState(0);

  const handleOperation = (opType = 'inc') => () => {
    setCounter(prev => opType === 'inc' ? prev + 1: prev - 1);
  };

  return (
    <div>
      <button data-testid="decrement-button" onClick={handleOperation('dec')}>-</button>
      <button data-testid="increment-button" onClick={handleOperation('inc')}>+</button>
      <p>clicked: {counter}</p>
    </div>
  )
}
