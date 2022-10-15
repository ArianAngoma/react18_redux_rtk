import { useCallback, useReducer } from 'react'
import todoReducer, { Todo } from './todoReducer'
import TodoList from './TodoList'
import TodoAdd from './TodoAdd'

const initialState: Todo[] = [
  {
    id: new Date().getTime(),
    description: 'Aprender React',
    done: false
  },
  {
    id: new Date().getTime() * 2,
    description: 'Aprender Mongo',
    done: false
  }
]

const TodoApp = () => {

  const [todos, dispatchTodo] = useReducer(todoReducer, initialState)

  const onAddTodo = useCallback((newTodo: Todo) => {
    dispatchTodo({
      type: '[TODO] Add Todo',
      payload: newTodo
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
