import { FC, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import AppRouter from './router/AppRouter'
import { AppTheme } from './theme'
import { useAppDispatch, useAppSelector } from './hooks'
import { CheckingAuth } from './ui'
import { firebaseAuth } from './firebase/config'
import { login, logout } from './store'


const JournalApp: FC = () => {

  const { status } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {

    onAuthStateChanged(firebaseAuth, async (user) => {
      
      if (!user) return dispatch(logout({errorMessage: 'No user'}))

      dispatch(login({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      }))

    })

  }, [])

  if (status === 'checking') return <CheckingAuth/>

  return (
    <AppTheme>
      <AppRouter/>
    </AppTheme>
  )

}

export default JournalApp
