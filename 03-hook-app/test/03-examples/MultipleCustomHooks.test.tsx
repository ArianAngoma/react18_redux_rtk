import { fireEvent, render, screen } from '@testing-library/react'
import MultipleCustomHooks, { ResponseApi } from '../../src/03-examples/MultipleCustomHooks'
import useFetch from '../../src/hooks/useFetch'
import useCounter from '../../src/hooks/useCounter'

jest.mock('../../src/hooks/useFetch')
const useFetchMock = jest.mocked(useFetch<ResponseApi[]>)

jest.mock('../../src/hooks/useCounter')
const useCounterMock = jest.mocked(useCounter)

describe('Pruebas en <MultipleCustomHooks />', () => {

  const handleIncrement = jest.fn()

  useCounterMock.mockReturnValue({
    counter: 1,
    handleIncrement,
    handleDecrement: jest.fn(),
    handleReset: jest.fn(),
  })

  beforeEach(() => {

    jest.clearAllMocks()

  })

  test('Debe de mostrar el componente por defecto', () => {

    useFetchMock.mockReturnValue({
      data: null,
      error: null,
      isLoading: true
    })

    render(<MultipleCustomHooks/>)

    expect(screen.getByText('Loading...'))
    expect(screen.getByText('Breaking Quotes'))

    const nexButton = screen.getByRole('button', { name: 'Next quote' }) as HTMLButtonElement

    expect(nexButton.disabled).toBeTruthy()

  })

  test('Debe de mostrar un quote', async () => {

    useFetchMock.mockReturnValue({
      data: [
        {
          quote_id: 1,
          quote: 'Quote 1',
          author: 'Author 1',
          series: 'Series 1'
        }
      ],
      isLoading: false,
      error: null
    })

    render(<MultipleCustomHooks/>)

    // screen.debug()

    expect(screen.getByText('Quote 1')).toBeTruthy()
    expect(screen.getByText('Author 1')).toBeTruthy()

    const nexButton = screen.getByRole('button', { name: 'Next quote' }) as HTMLButtonElement

    expect(nexButton.disabled).toBeFalsy()

  })

  test('Debe de llamar la funcion de incrementar', () => {

    useFetchMock.mockReturnValue({
      data: [
        {
          quote_id: 1,
          quote: 'Quote 1',
          author: 'Author 1',
          series: 'Series 1'
        }
      ],
      isLoading: false,
      error: null
    })

    render(<MultipleCustomHooks/>)

    const nexButton = screen.getByRole('button', { name: 'Next quote' }) as HTMLButtonElement
    fireEvent.click(nexButton)

    expect(handleIncrement).toHaveBeenCalled()

  })

})
