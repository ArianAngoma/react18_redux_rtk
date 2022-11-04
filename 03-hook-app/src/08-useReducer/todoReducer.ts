export interface Todo {
  id: number
  description: string
  done: boolean
}

export type Action =
  | { type: '[TODO] Add Todo'; payload: Todo }
  | { type: '[TODO] Remove Todo'; payload: number }
  | { type: '[TODO] Toggle Todo'; payload: number }

const todoReducer = (initialState: Todo[], action: Action) => {

  switch (action.type) {

    case '[TODO] Add Todo':
      return [
        ...initialState,
        action.payload
      ]

    case '[TODO] Remove Todo':
      return initialState.filter(todo => todo.id !== action.payload)

    case '[TODO] Toggle Todo':
      return initialState.map(todo => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            done: !todo.done
          }
        } else {
          return todo
        }
      })

    default:
      return initialState

  }

}

export default todoReducer
