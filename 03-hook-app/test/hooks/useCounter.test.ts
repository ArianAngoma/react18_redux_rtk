import { renderHook } from '@testing-library/react'
import { useCounter } from '../../src/hooks'

describe('Pruebas en useCounter', () => {

  test('Debe de retornar valores por defecto', () => {

    const { result } = renderHook(() => useCounter())

    const {
      counter,
      handleIncrement,
      handleDecrement,
      handleReset
    } = result.current

    expect(counter).toBe(0)
    expect(handleIncrement).toEqual(expect.any(Function))
    expect(handleDecrement).toEqual(expect.any(Function))
    expect(handleReset).toEqual(expect.any(Function))

  })

  test('Debe de tener el counter en 100', () => {

    const { result } = renderHook(() => useCounter({ initialState: 100 }))

    const { counter } = result.current

    expect(counter).toBe(100)

  })

})
