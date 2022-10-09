import { useMemo, useState } from 'react'
import { useCounter } from '../hooks'

const heavyProcess = (iterationNumber: number = 100) => {

  for (let i = 0; i < iterationNumber; i++) {
    console.log('Here we go...')
  }

  return `${iterationNumber} iterations done`

}

const MemoHook = () => {

  const {
    counter,
    handleIncrement
  } = useCounter({ initialState: 1000 })

  const [show, setShow] = useState<boolean>(true)

  const memoHeavyProcess = useMemo(() => heavyProcess(counter), [counter])

  return (
    <>

      <h1>
        Counter: <small>{counter}</small>
      </h1>
      <hr/>

      <h4>

        {
          memoHeavyProcess
        }

      </h4>

      <button
        className="btn btn-primary"
        onClick={() => handleIncrement()}
      >
        +1
      </button>

      <button
        className="btn btn-outline-primary ml-3"
        onClick={() => setShow(!show)}
      >
        Show/Hide {JSON.stringify(show)}
      </button>

    </>
  )
}

export default MemoHook
