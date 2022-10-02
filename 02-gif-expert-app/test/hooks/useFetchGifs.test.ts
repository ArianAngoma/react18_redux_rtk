import { renderHook, waitFor } from '@testing-library/react'
import useFetchGifs from '../../src/hooks/useFetchGifs'

describe('Pruebas en el hook useFetchGifs', () => {

  test('Debe de retornar el estado inicial', async () => {

    const { result } = renderHook(() => useFetchGifs({ category: 'One Punch' }))

    const {
      gifs,
      isLoading
    } = result.current

    expect(gifs.length).toBe(0)
    expect(isLoading).toBeTruthy()

  })

  test('Debe de retornar un arreglo de gifs y el loading en false', async () => {

    const { result } = renderHook(() => useFetchGifs({ category: 'One Punch' }))

    await waitFor(() => {
      expect(result.current.gifs.length).toBeGreaterThan(0)
    })

    const {
      gifs,
      isLoading
    } = result.current

    expect(gifs.length).toBeGreaterThan(0)

    expect(isLoading).toBeFalsy()

  })

})
