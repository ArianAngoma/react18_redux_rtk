import { render, screen } from '@testing-library/react'
import TodoApp from '../../src/08-useReducer/TodoApp'
import useTodos from '../../src/hooks/useTodos'

jest.mock('../../src/hooks/useTodos')
const useTodosMock = jest.mocked(useTodos)

describe('Pruebas en <TodoApp />', () => {

  useTodosMock.mockReturnValue({
    todos: [
      {
        id: 1,
        description: 'Aprender React',
        done: false
      },
      {
        id: 2,
        description: 'Aprender Mongo',
        done: true
      }
    ],
    onToggleTodo: jest.fn(),
    onRemoveTodo: jest.fn(),
    onAddTodo: jest.fn(),
    todosCount: 2,
    pendingTodosCount: 1
  })

  test('debe de mostrarse correctamente', () => {

    render(<TodoApp/>)

    screen.debug()

    expect(screen.getByText('Aprender React')).toBeTruthy()
    expect(screen.getByText('Aprender Mongo')).toBeTruthy()

  })

})
