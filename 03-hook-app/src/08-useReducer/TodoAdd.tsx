import { FC, FormEvent, memo } from 'react'
import { Todo } from './todoReducer'
import { useForm } from '../hooks'

interface TodoAddProps {
  onAddTodo: (newTodo: Todo) => void
}

const TodoAdd: FC<TodoAddProps> = ({ onAddTodo }) => {

  const {
    description,
    onInputChange,
    onResetForm
  } = useForm({
    description: ''
  })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (description.trim().length === 0) return

    const newTodo: Todo = {
      id: new Date().getTime(),
      description,
      done: false
    }

    onAddTodo(newTodo)
    onResetForm()
  }

  return (
    <form
      onSubmit={onSubmit}
    >

      <input
        type="text"
        placeholder="¿Qué vas a hacer?"
        className="form-control"
        name="description"
        value={description}
        onChange={onInputChange}
      />

      <button
        type="submit"
        className="btn btn-outline-primary mt-1 btn-block"
      >
        Agregar
      </button>

    </form>
  )
}

export default memo(TodoAdd)
