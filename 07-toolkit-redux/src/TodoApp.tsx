import { FC } from 'react'
import { useGetTodosQuery } from './store/apis'

const TodoApp: FC = () => {

  const {
    data: todos,
    isLoading
  } = useGetTodosQuery()

  return (
    <>
      <h1>ToDo - RTK Query</h1>
      <hr/>

      <h4>isLoading: {isLoading ? 'True' : 'False'}</h4>

      <pre>...</pre>

      <ul>

        {
          todos?.map((todo) => (
            <li key={todo.id}>
              <strong>{todo.completed ? 'DONE' : 'Pending'}</strong>
              {todo.title}
            </li>
          ))
        }

      </ul>

      <button>
        Next Todo
      </button>
    </>
  )

}

export default TodoApp
