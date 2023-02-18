import { RootState, User, onLogoutReducer, onSetCredentialsReducer, store } from '../store'
import { useAppSelector } from './useAppSelector'

interface OnSetCredentialsParams {
  user: User,
  token: string
}

const getUser = (state: RootState) => state.auth.user

const onSetCredentials = ({ user, token }: OnSetCredentialsParams) => store.dispatch(onSetCredentialsReducer({
  user,
  token
}))

const onLogout = () => store.dispatch(onLogoutReducer())

export const useAuthStore = () => {
  
  const user = useAppSelector(getUser)

  return {
    user,
    onSetCredentials,
    onLogout
  }

}