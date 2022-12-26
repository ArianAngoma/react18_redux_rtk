import { FC, FormEvent, useState } from 'react'
import { useGetTodosQuery } from '../api/apiSlice'

const TodoList: FC = () => {

  const [newTodo, setNewTodo] = useState<string>('')

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTodosQuery()

  console.log(error)
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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

      <button type="submit">Add Todo</button>

    </form>
  )

  let content
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = JSON.stringify(todos)
  } else if (isError) {
    content = <p>{error}</p>
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
