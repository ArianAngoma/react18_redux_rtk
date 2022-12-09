import reactLogo from './assets/react.svg'
import { useDispatch, useSelector } from 'react-redux'

import './App.css'

import { RootState } from './store'
import { decrement, increment, incrementByAmount } from './store/slices/counter'

function App () {

  const { value } = useSelector((state: RootState) => state.counter)

  const dispatch = useDispatch()

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
