import { FC } from 'react'
import AppRouter from './router/AppRouter'
import { AuthProvider } from './auth'

const HeroesApp: FC = () => {
  return (
    <AuthProvider>
      <AppRouter/>
    </AuthProvider>
  )
}

export default HeroesApp
