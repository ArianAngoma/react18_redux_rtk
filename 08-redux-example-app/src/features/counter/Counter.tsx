import { FC, useState } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { decrement, increment, incrementByAmount, reset } from './counterSlice'

const Counter: FC = () => {

  const { count } = useAppSelector((state) => state.counter)
  const dispatch = useAppDispatch()

  const [incrementAmount, setIncrementAmount] = useState<number>(0)

  const addValue = incrementAmount || 0

  const onResetAll = () => {
    setIncrementAmount(0)
    dispatch(reset())
  }

  return (
    <section>

      <p>{count}</p>

      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>

      <input
        type="number"
        value={incrementAmount}
        onChange={(e) => setIncrementAmount(Number(e.target.value))}
      />

      <div>
        <button onClick={() => dispatch(incrementByAmount(addValue))}>Add Amount</button>
        <button onClick={onResetAll}>Reset</button>
      </div>

    </section>
  )

}

export default Counter
