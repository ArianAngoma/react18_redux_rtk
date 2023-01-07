import { FC } from 'react'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import AppRouter from './router/AppRouter'
import { AppTheme } from './theme'
import { useAppSelector } from './hooks'
import { CheckingAuth } from './ui'

const JournalApp: FC = () => {

  const { status } = useAppSelector(state => state.auth)

  if (status === 'checking') return <CheckingAuth/>

  return (
    <AppTheme>
      <AppRouter/>
    </AppTheme>
  )

}

export default JournalApp
