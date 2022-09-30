import { fireEvent, render, screen } from '@testing-library/react'
import { AddCategory } from '../../src/components'

describe('Pruebas en <AddCategory />', () => {

  test('Debe de cambiar el valor del input', () => {

    render(<AddCategory handleAddCategory={() => {
    }}/>)

    const input = screen.getByRole('textbox') as HTMLInputElement

    fireEvent.input(input, { target: { value: 'Hola mundo' } })

    expect(input.value).toBe('Hola mundo')

    // screen.debug()

  })

})
