import { FC, useCallback } from 'react'
import { useCounter } from '../hooks'
import ShowIncrement from './ShowIncrement'

const CallbackHook: FC = () => {

  const {
    counter,
    handleIncrement
  } = useCounter({
    initialState: 10,
  })

  const increment = () => {
    handleIncrement({ value: 1 })
  }

  const callbackIncrement = useCallback((value: number) => {
    handleIncrement({ value })
  }, [])

  return (
    <>
      <h1>useCallback Hook: {counter}</h1>
      <hr/>

      <ShowIncrement increment={callbackIncrement}/>
    </>
  )

}

export default CallbackHook
