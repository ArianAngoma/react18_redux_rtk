import { RootState } from '../store'
import { useAppSelector } from './useAppSelector'

const getUser = (state: RootState) => state.auth.user

export const useAuthStore = () => {
  
  const user = useAppSelector(getUser)

  return {
    user
  }

}