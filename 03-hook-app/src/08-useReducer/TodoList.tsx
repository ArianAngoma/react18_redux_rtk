import { FC, memo } from 'react'
import { Todo } from './todoReducer'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  onRemoveTodo: (todoId: number) => void
}

const TodoList: FC<TodoListProps> = ({
  todos,
  onRemoveTodo
}) => {
  return (
    <ul className="list-group">

      {

        todos.map((todo: Todo, index: number) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onRemoveTodo={onRemoveTodo}
          />
        ))

      }

    </ul>
  )
}

export default memo(TodoList)
