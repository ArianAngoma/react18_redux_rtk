import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { firebaseAuth } from '../firebase/config'
import { login, logout, startLoadingNotes } from '../store'

const useCheckAuth = () => {

    const { status } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
  
    useEffect(() => {
  
      onAuthStateChanged(firebaseAuth, async (user) => {
        
        if (!user) return dispatch(logout({ errorMessage: null }))
  
        dispatch(login({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        }))

        dispatch(startLoadingNotes())
  
      })
  
    }, [])

    return { status }

}

export default useCheckAuth