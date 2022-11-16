export interface AuthState {
  isLoggedIn: boolean
  user?: string
}

export type Action =
  | { type: '[AUTH] Login'; payload: Pick<AuthState, 'user'> }
  | { type: '[AUTH] Logout' }

const authReducer = (state: AuthState, action: Action): AuthState => {

  switch (action.type) {

    case '[AUTH] Login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user
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
