import { render, screen } from '@testing-library/react'
import MultipleCustomHooks from '../../src/03-examples/MultipleCustomHooks'

describe('Pruebas en <MultipleCustomHooks />', () => {

  test('Debe de mostrar el componente por defecto', () => {

    render(<MultipleCustomHooks/>)

    expect(screen.getByText('Loading...'))
    expect(screen.getByText('Breaking Quotes'))

    const nexButton = screen.getByRole('button', { name: 'Next quote' }) as HTMLButtonElement

    expect(nexButton.disabled).toBeTruthy()

  })

})
