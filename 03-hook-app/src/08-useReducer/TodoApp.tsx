import { useCallback, useEffect, useReducer } from 'react'
import todoReducer, { Todo } from './todoReducer'
import TodoList from './TodoList'
import TodoAdd from './TodoAdd'

const initialState: Todo[] = []

const init = (initialTodos: Todo[]) => {
  return JSON.parse(localStorage.getItem('todos')!) || initialTodos
}

const TodoApp = () => {

  const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init)

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

  return (
    <>
      <h1>
        TodoApp: 10, <small>pendientes: 2</small>
      </h1>
      <hr/>

      <div className="row">

        <div className="col-7">

          <TodoList
            todos={todos}
            onRemoveTodo={onRemoveTodo}
            onToggleTodo={onToggleTodo}
          />

        </div>

        <div className="col-5">

          <h4>Agregar</h4>
          <hr/>

          <TodoAdd
            onAddTodo={onAddTodo}
          />

        </div>

      </div>

    </>
  )
}

export default TodoApp
