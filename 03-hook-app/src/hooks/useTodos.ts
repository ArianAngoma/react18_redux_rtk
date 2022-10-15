import { useCallback, useEffect, useMemo, useReducer } from 'react'
import todoReducer, { Todo } from '../08-useReducer/todoReducer'

const init = (initialTodos: Todo[]) => {
  return JSON.parse(localStorage.getItem('todos')!) || initialTodos
}

const useTodos = () => {

  const [todos, dispatchTodo] = useReducer(todoReducer, [], init)

  useEffect(() => {

    localStorage.setItem('todos', JSON.stringify(todos))

  }, [todos])

  const onAddTodo = useCallback((newTodo: Todo) => {

    dispatchTodo({
      type: '[TODO] Add Todo',
      payload: newTodo
    })

  }, [])

  const onRemoveTodo = useCallback((todoId: number) => {

    dispatchTodo({
      type: '[TODO] Remove Todo',
      payload: todoId
    })

  }, [])

  const onToggleTodo = useCallback((todoId: number) => {

    dispatchTodo({
      type: '[TODO] Toggle Todo',
      payload: todoId
    })

  }, [])

  const todosCount = useMemo(() => todos.length, [todos])

  const pendingTodosCount = useMemo(() => todos.filter(todo => !todo.done).length, [todos])

  return {
    todos,
    onAddTodo,
    onRemoveTodo,
    onToggleTodo,
    todosCount,
    pendingTodosCount
  }

}

export default useTodos
