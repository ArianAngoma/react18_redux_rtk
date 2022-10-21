import { useForm } from '../../src/hooks'
import { act, renderHook } from '@testing-library/react'

interface FormValues {
  name: string
  email: string
}

describe('Pruebas en useForm', () => {

  const initialForm: FormValues = {
    name: 'Arian',
    email: 'arian.angoma.js@gmail.com'
  }

  test('debe de regresar un formulario por defecto', () => {

    const { result } = renderHook(() => useForm<FormValues>(initialForm))

    expect(result.current).toEqual({
      ...initialForm,
      onInputChange: expect.any(Function),
      onResetForm: expect.any(Function)
    })

  })

  test('Debe de cambiar el valor del formulario (cambiar name)', () => {

    const newVAlue = 'Arian Angoma'

    const { result } = renderHook(() => useForm<FormValues>(initialForm))

    const { onInputChange } = result.current

    act(() => {

      onInputChange({
        target: {
          name: 'name',
          value: newVAlue
        }
      })

    })

    expect(result.current.name).toBe(newVAlue)

  })

  test('Debe de re-establecer el formulario con RESET', () => {

    const newVAlue = 'Arian Angoma'

    const { result } = renderHook(() => useForm<FormValues>(initialForm))

    const {
      onInputChange,
      onResetForm
    } = result.current

    act(() => {

      onInputChange({
        target: {
          name: 'name',
          value: newVAlue
        }
      })

      onResetForm()

    })

    expect(result.current.name).toBe(initialForm.name)

  })

})
