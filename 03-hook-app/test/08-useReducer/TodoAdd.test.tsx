import { fireEvent, render, screen } from '@testing-library/react'

import useForm from '../../src/hooks/useForm'
import { Todo } from '../../src/08-useReducer/todoReducer'
import TodoAdd from '../../src/08-useReducer/TodoAdd'

jest.mock('../../src/hooks/useForm')
const useFormMock = jest.mocked(useForm<Pick<Todo, 'description'>>)

describe('Pruebas en el componente <TodoAdd/>', () => {

  const onAddTodoMock = jest.fn()
  const onResetMock = jest.fn()

  useFormMock.mockReturnValue({
    description: 'Aprender React',
    onInputChange: jest.fn(),
    onResetForm: onResetMock
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe de mostrarse correctamente', () => {

    render(<TodoAdd onAddTodo={onAddTodoMock}/>)

    // screen.debug()

    const input = screen.getByRole('textbox') as HTMLInputElement

    expect(input)

    expect(input.value).toBe('Aprender React')

    const button = screen.getByRole('button', { name: 'Agregar' })

    expect(button)

  })

  test('Debe de llamar la función onAddTodo', () => {

    render(<TodoAdd onAddTodo={onAddTodoMock}/>)

    const button = screen.getByRole('button', { name: 'Agregar' })

    fireEvent.click(button)

    expect(onAddTodoMock).toHaveBeenCalled()

    expect(onAddTodoMock).toHaveBeenCalledTimes(1)

    expect(onAddTodoMock).toHaveBeenCalledWith({
      id: expect.any(Number),
      description: 'Aprender React',
      done: false
    })

  })

  test('Debe de llamar la función onResetForm', () => {

    render(<TodoAdd onAddTodo={onAddTodoMock}/>)

    const button = screen.getByRole('button', { name: 'Agregar' })
    fireEvent.click(button)

    expect(onResetMock).toHaveBeenCalled()

    expect(onResetMock).toHaveBeenCalledTimes(1)

  })

})
