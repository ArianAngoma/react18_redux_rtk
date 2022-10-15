import TodoList from './TodoList'
import TodoAdd from './TodoAdd'
import { useTodos } from '../hooks'

const TodoApp = () => {

  const {
    todos,
    onToggleTodo,
    onRemoveTodo,
    onAddTodo,
    todosCount,
    pendingTodosCount
  } = useTodos()

  return (
    <>
      <h1>
        TodoApp: {todosCount}, <small>pendientes: {pendingTodosCount}</small>
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
