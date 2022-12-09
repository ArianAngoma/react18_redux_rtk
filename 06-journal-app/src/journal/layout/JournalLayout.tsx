import { FC } from 'react'

import { Box, Toolbar } from '@mui/material'

import { Navbar, Sidebar } from '../components'

interface JournalLayoutProps {
  children: JSX.Element | JSX.Element[]
}

const drawerWidth = 280

const JournalLayout: FC<JournalLayoutProps> = ({ children }) => {

  return (
    <Box sx={{
      display: 'flex',
    }}>

      <Navbar drawerWidth={drawerWidth}/>

      <Sidebar drawerWidth={drawerWidth}/>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >

        <Toolbar/>

        {children}

      </Box>

    </Box>
  )

}

export default JournalLayout
