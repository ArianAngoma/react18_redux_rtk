export interface AuthState {
  isLoggedIn: boolean
  name?: string
}

type Action =
  | { type: '[AUTH] Login'; payload: Pick<AuthState, 'name'> }
  | { type: '[AUTH] Logout' }

const authReducer = (state: AuthState, action: Action) => {

  switch (action.type) {

    case '[AUTH] Login':
      return {
        ...state,
        isLoggedIn: true,
        name: action.payload.name
      }

    case '[AUTH] Logout':
      return {
        isLoggedIn: false
      }

    default:
      return state

  }

}

export default authReducer
