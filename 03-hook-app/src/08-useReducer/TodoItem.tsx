import { FC, memo } from 'react'
import { Todo } from './todoReducer'

interface TodoItemProps {
  todo: Todo
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  return (
    <li
      className="list-group-item d-flex justify-content-between"
    >

      <span className="align-self-center">
        {todo.description}
      </span>

      <button className="btn btn-danger">
        Borrar
      </button>

    </li>
  )
}

export default memo(TodoItem)
