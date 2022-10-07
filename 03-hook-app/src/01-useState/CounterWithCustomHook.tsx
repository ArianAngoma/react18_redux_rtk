import useCounter from '../hooks/useCounter'

function CounterWithCustomHook () {

  const {
    counter,
    handleIncrement,
    handleDecrement,
    handleReset
  } = useCounter()
  return (
    <>

      <h1>Counter with custom hook: {counter}</h1>

      <hr/>

      <button
        className="btn btn-primary"
        onClick={() => handleIncrement({ value: 2 })}
      >
        +1
      </button>

      <button
        className="btn btn-warning"
        onClick={handleReset}
      >
        Reset
      </button>

      <button
        className="btn btn-primary"
        onClick={() => handleDecrement({ value: 10 })}
      >
        -1
      </button>

    </>
  )

}

export default CounterWithCustomHook
