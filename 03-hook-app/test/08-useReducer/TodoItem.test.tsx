import { Todo } from '../../src/08-useReducer/todoReducer'
import { fireEvent, render, screen } from '@testing-library/react'
import TodoItem from '../../src/08-useReducer/TodoItem'

describe('Pruebas en el componente <TodoItem/>', () => {

  const todo: Todo = {
    id: 1,
    description: 'Aprender React',
    done: false
  }

  const onRemoveTodoMock = jest.fn()
  const onToggleTodoMock = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Debe de mostrarse el Todo pendiente de completar', () => {

    render(
      <TodoItem
        todo={todo}
        onRemoveTodo={onRemoveTodoMock}
        onToggleTodo={onToggleTodoMock}
      />
    )

    const liElement = screen.getByRole('listitem')
    expect(liElement.className).toBe('list-group-item d-flex justify-content-between')

    const spanElement = screen.getByText(todo.description)
    expect(spanElement.className).toBe('align-self-center ')
    expect(spanElement.className).toContain('align-self-center')
    expect(spanElement.className).not.toContain('text-decoration-line-through')

    const buttonElement = screen.getByRole('button')
    expect(buttonElement.className).toBe('btn btn-danger')

  })

  test('Debe de mostrarse el Todo completado', () => {

    const todo: Todo = {
      id: 1,
      description: 'Aprender React',
      done: true
    }

    render(
      <TodoItem
        todo={todo}
        onRemoveTodo={onRemoveTodoMock}
        onToggleTodo={onToggleTodoMock}
      />
    )

    const spanElement = screen.getByText(todo.description)
    expect(spanElement.className).toBe('align-self-center text-decoration-line-through')
    expect(spanElement.className).toContain('align-self-center')
    expect(spanElement.className).toContain('text-decoration-line-through')

  })

  test('El span debe de llamar la función onToggleTodo', () => {

    render(
      <TodoItem
        todo={todo}
        onRemoveTodo={onRemoveTodoMock}
        onToggleTodo={onToggleTodoMock}
      />
    )

    const spanElement = screen.getByText(todo.description)
    // spanElement.click()
    fireEvent.click(spanElement)

    expect(onToggleTodoMock).toHaveBeenCalledTimes(1)
    expect(onToggleTodoMock).toHaveBeenCalledWith(todo.id)

  })

  test('El botón debe de llamar la función onRemoveTodo', () => {

    render(
      <TodoItem
        todo={todo}
        onRemoveTodo={onRemoveTodoMock}
        onToggleTodo={onToggleTodoMock}
      />
    )

    const buttonElement = screen.getByRole('button')
    // buttonElement.click()
    fireEvent.click(buttonElement)

    expect(onRemoveTodoMock).toHaveBeenCalledTimes(1)
    expect(onRemoveTodoMock).toHaveBeenCalledWith(todo.id)

  })

})
