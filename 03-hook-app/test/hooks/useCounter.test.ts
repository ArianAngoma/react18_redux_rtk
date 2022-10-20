import { renderHook } from '@testing-library/react'
import { useCounter } from '../../src/hooks'

describe('Pruebas en useCounter', () => {

  test('Debe de retornar valores por defecto', () => {

    const { result } = renderHook(() => useCounter())
    console.log(result)

  })

})
