import { FC, memo } from 'react'
import { Todo } from './todoReducer'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onRemoveTodo: (todoId: number) => void
  onToggleTodo: (todoId: number) => void
}

const TodoList: FC<TodoListProps> = ({
  todos,
  onRemoveTodo,
  onToggleTodo
}) => {
  return (
    <ul className="list-group">

      {

        todos.map((todo: Todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
            onToggleTodo={onToggleTodo}
          />
        ))

      }

    </ul>
  )
}

export default memo(TodoList)
