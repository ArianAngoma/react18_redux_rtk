import { FC, useState } from 'react'
import { useGetTodoByIdQuery, useGetTodosQuery } from './store/apis'

const TodoApp: FC = () => {

  const [todoId, setTodoId] = useState<number>(1)

  /* const {
    data: todos,
    isLoading
  } = useGetTodosQuery() */

  const {
    data: todo,
    isLoading
  } = useGetTodoByIdQuery(todoId)

  const onNextTodo = () => {
    setTodoId(prevState => prevState + 1)
  }

  const onPrevTodo = () => {
    if (todoId > 1) {
      setTodoId(prevState => prevState - 1)
    }
  }

  return (
    <>
      <h1>ToDo - RTK Query</h1>
      <hr/>

      <h4>isLoading: {isLoading ? 'True' : 'False'}</h4>

      <pre>
        {
          JSON.stringify(todo, null, 2)
        }
      </pre>

      <button onClick={onPrevTodo}>
        Previous Todo
      </button>

      <button
        onClick={onNextTodo}
      >
        Next Todo
      </button>

      {/* <ul>

        {
          todos?.map((todo) => (
            <li key={todo.id}>
              <strong>{todo.completed ? 'DONE' : 'Pending'}</strong>
              {todo.title}
            </li>
          ))
        }

      </ul> */}


    </>
  )

}

export default TodoApp
