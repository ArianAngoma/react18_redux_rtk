import { useState } from 'react'

interface CounterProps {
  initialState?: number;
}

function useCounter ({ initialState = 0 }: CounterProps = {}) {

  const [counter, setCounter] = useState<number>(initialState)

  const handleIncrement = ({ value = 1 } = {}) => {
    setCounter(prevState => prevState + value)
  }

  const handleDecrement = ({ value = 1 } = {}) => {
    setCounter(prevState => prevState - value)
  }

  const handleReset = () => {
    setCounter(initialState)
  }

  return {
    counter,
    handleIncrement,
    handleDecrement,
    handleReset
  }

}

export default useCounter
