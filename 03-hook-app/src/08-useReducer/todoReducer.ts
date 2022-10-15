export interface Todo {
  id: number
  description: string
  done: boolean
}

type Action =
  | { type: '[TODO] Add Todo'; payload: Todo }
  | { type: 'toggle'; payload: number }
  | { type: 'delete'; payload: number }

const todoReducer = (initialState: Todo[], action: Action) => {

  switch (action.type) {
    case '[TODO] Add Todo':
      return [
        ...initialState,
        action.payload
      ]
    default:
      return initialState
  }

}

export default todoReducer
