export interface Todo {
  id: number
  description: string
  done: boolean
}

type Action =
  | { type: '[TODO] Add Todo'; payload: Todo }
  | { type: '[TODO] Remove Todo'; payload: number }

const todoReducer = (initialState: Todo[], action: Action) => {

  switch (action.type) {
    case '[TODO] Add Todo':
      return [
        ...initialState,
        action.payload
      ]
    case '[TODO] Remove Todo':
      return initialState.filter(todo => todo.id !== action.payload)
    default:
      return initialState
  }

}

export default todoReducer
