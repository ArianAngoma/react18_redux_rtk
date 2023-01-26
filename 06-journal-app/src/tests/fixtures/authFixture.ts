import { InitialState as AuthInitialState } from '../../store/auth'

export const notAuthenticatedState: AuthInitialState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
}