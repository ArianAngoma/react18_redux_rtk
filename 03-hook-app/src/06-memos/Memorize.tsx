import { useCounter } from '../hooks'
import Small from './Small'
import { useState } from 'react'

const Memorize = () => {

  const {
    counter,
    handleIncrement
  } = useCounter({ initialState: 10 })

  const [show, setShow] = useState<boolean>(true)

  return (
    <>

      <h1>
        Counter: <Small value={counter}/>
      </h1>
      <hr/>

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

export default Memorize
