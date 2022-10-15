import { FC, memo } from 'react'
import { Todo } from './todoReducer'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
}

const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <ul className="list-group">

      {

        todos.map((todo: Todo, index: number) => (
          <TodoItem
            key={todo.id}
            todo={todo}
          />
        ))

      }

    </ul>
  )
}

export default memo(TodoList)
