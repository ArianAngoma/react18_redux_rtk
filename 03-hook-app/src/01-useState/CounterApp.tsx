import { useState } from 'react'

function CounterApp () {
  const [counter, setCounter] = useState<number>(0)

  const handleAddCounter = () => {
    setCounter(prevCounter => prevCounter + 1)
  }

  return (
    <>

      <h1>Counter: {counter}</h1>

      <hr/>

      <button
        onClick={handleAddCounter}
        className="btn btn-primary"
      >
        +1
      </button>

    </>
  )
}

export default CounterApp
