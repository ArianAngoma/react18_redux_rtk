import { fireEvent, render, screen } from '@testing-library/react'
import GifExpertApp from '../src/GifExpertApp'

describe('Pruebas en el componente <GifExpertApp />', () => {

  test('Debe de agregar una categoría with handleAddCategory', () => {

    render(<GifExpertApp/>)

    const input = screen.getByRole('textbox') as HTMLInputElement
    const form = screen.getByRole('form')

    fireEvent.input(input, { target: { value: 'Hola mundo' } })

    fireEvent.submit(form)

    const category = screen.getByText('Hola mundo')

    expect(category).toBeTruthy()

  })

  test('No Debe de agregar una categoria si ya existe', () => {

    render(<GifExpertApp/>)

    const input = screen.getByRole('textbox') as HTMLInputElement
    const form = screen.getByRole('form')

    fireEvent.input(input, { target: { value: 'Hola mundo' } })

    fireEvent.submit(form)

    fireEvent.input(input, { target: { value: 'Hola mundo' } })

    fireEvent.submit(form)

    const category = screen.getAllByText('Hola mundo')

    expect(category.length).toBe(1)

  })


})
