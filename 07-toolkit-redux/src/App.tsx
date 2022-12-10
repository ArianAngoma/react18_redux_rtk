import reactLogo from './assets/react.svg'
import './App.css'

import { useAppDispatch, useAppSelector, increment, decrement, incrementByAmount } from './store'

function App () {

  const { value } = useAppSelector(state => state.counter)

  const dispatch = useAppDispatch()

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo"/>
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo"/>
        </a>
      </div>

      <h1>Vite + React</h1>

      <p>count is {value}</p>

      <div className="card">

        <button onClick={() => dispatch(increment())}>
          Increment
        </button>

        <button onClick={() => dispatch(decrement())}>
          Decrement
        </button>

        <button onClick={() => dispatch(incrementByAmount(5))}>
          Increment by 5
        </button>

      </div>

    </div>
  )
}

export default App
