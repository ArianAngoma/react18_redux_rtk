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

  test('Debe de llamar la función handleAddCategory y limpiar la caja de texto', () => {

    const inputValue = 'Hola mundo'

    const handleAddCategory = jest.fn()

    render(<AddCategory handleAddCategory={handleAddCategory}/>)

    const input = screen.getByRole('textbox') as HTMLInputElement
    const form = screen.getByRole('form')

    fireEvent.input(input, { target: { value: inputValue } })

    fireEvent.submit(form)

    expect(input.value).toBe('')

    expect(handleAddCategory).toHaveBeenCalled()

    expect(handleAddCategory).toHaveBeenCalledTimes(1)

    expect(handleAddCategory).toHaveBeenCalledWith(inputValue)

  })

  test('No debe de llamar el handleAddCategory si el input está vacío', () => {

    const handleAddCategory = jest.fn()

    render(<AddCategory handleAddCategory={handleAddCategory}/>)

    const form = screen.getByRole('form')

    fireEvent.submit(form)

    expect(handleAddCategory).not.toHaveBeenCalled()

  })

})
