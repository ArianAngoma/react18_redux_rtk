import { FC, FormEvent, useState } from 'react'
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '../api/apiSlice'

const TodoList: FC = () => {

  const [newTodo, setNewTodo] = useState<string>('')

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTodosQuery()

  const [addTodo] = useAddTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [deleteTodo] = useDeleteTodoMutation()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    addTodo({
      userId: 1,
      title: newTodo,
      completed: false,
    })

    setNewTodo('')
  }

  const newItemSection = (
    <form onSubmit={onSubmit}>

      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
      </div>

      <button type="submit">
        <FontAwesomeIcon icon={faUpload}/>
      </button>

    </form>
  )

  let content
  if (isLoading) {

    content = <p>Loading...</p>

  } else if (isSuccess) {

    content = todos.map(todo => (
      <article key={todo.id}>

        <div className="todo">
          <input
            type="checkbox"
            checked={todo.completed}
            id={String(todo.id)}
            onChange={() => updateTodo({
              ...todo,
              completed: !todo.completed
            })}
          />
          <label htmlFor={String(todo.id)}>{todo.title}</label>
        </div>

        <button
          className="trash"
          onClick={() => deleteTodo({
            id: todo.id
          })}
        >
          <FontAwesomeIcon icon={faTrash}/>
        </button>

      </article>
    ))

  } else if (isError) {

    if ('status' in error) {
      const errMessage = 'error' in error ? error.error : JSON.stringify(error)
      content = <p>{errMessage}</p>
    } else {
      content = <p>{error.message}</p>
    }

  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  )

}

export default TodoList
