import { FC } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import purpleTheme from './purpleTheme'

interface AppThemeProps {
  children: JSX.Element | JSX.Element[]
}

const AppTheme: FC<AppThemeProps> = ({ children }) => {

  return (

    <ThemeProvider theme={purpleTheme}>

      <CssBaseline/>

      {children}

    </ThemeProvider>

  )

}

export default AppTheme
