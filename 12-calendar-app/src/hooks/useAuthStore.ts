import {
  RootState,
  User,
  onLogoutReducer,
  onResetUIReducer,
  onSetCredentialsReducer,
  store
} from '../store'
import { useAppSelector } from './useAppSelector'

interface OnSetCredentialsParams {
  user: User,
  token: string
}

const getUser = (state: RootState) => state.auth.user

export const onSetCredentials = ({ user, token }: OnSetCredentialsParams) => store.dispatch(onSetCredentialsReducer({
  user,
  token
}))

export const onLogout = () => {
  store.dispatch(onResetUIReducer())
  store.dispatch(onLogoutReducer())
  // store.dispatch(apiSlice.util.resetApiState())
}

export const useAuthStore = () => {
  
  const user = useAppSelector(getUser)

  return {
    user,
    onSetCredentials,
    onLogout
  }

}