import { useState } from 'react'

interface AppProps {
  value: number
}

function App ({ value }: AppProps): JSX.Element {
  const [counter, setCounter] = useState<number>(value)

  const handleIncrement = (): void => setCounter(counter + 1)

  const handleDecrement = (): void => setCounter(counter - 1)

  const handleReset = (): void => setCounter(value)

  return (
    <>
      <h1>Counter App</h1>
      <h2>{counter}</h2>

      <button onClick={handleDecrement}>-1</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={handleIncrement}>+1</button>
    </>
  )
}

export default App
