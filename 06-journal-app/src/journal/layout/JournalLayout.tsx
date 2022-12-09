import { FC } from 'react'

import { Box } from '@mui/material'

import { Navbar } from '../components'

interface JournalLayoutProps {
  children: JSX.Element | JSX.Element[]
}

const drawerWidth = 240

const JournalLayout: FC<JournalLayoutProps> = ({ children }) => {

  return (
    <Box sx={{
      display: 'flex',
    }}>

      <Navbar drawerWidth={drawerWidth}/>

      {/* Sidebar drawerWidth */}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >

        {/* Toolbar */}

        {children}

      </Box>

    </Box>
  )

}

export default JournalLayout
