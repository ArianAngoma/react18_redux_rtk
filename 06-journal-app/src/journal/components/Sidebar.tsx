import { FC } from 'react'

import {
  Box,
  Divider,
  Drawer,
  List,
  Toolbar,
  Typography,
} from '@mui/material'

import { useAppSelector } from '../../hooks'
import SideBarItem from './SideBarItem'

interface SidebarProps {
  drawerWidth: number
}

const Sidebar: FC<SidebarProps> = ({ drawerWidth }) => {

  const { displayName } = useAppSelector(state => state.auth)
  const { notes } = useAppSelector(state => state.journal)

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 }
      }}
    >

      <Drawer
        variant="permanent" // permanent | persistent | temporary
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          }
        }}
      >

        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            {displayName}
          </Typography>
        </Toolbar>

        <Divider/>

        <List>

          {
            notes.map(note => (
              <SideBarItem 
                key={note.id} 
                id={note.id}
                title={note.title}
                body={note.body}
                imagesURLs={note.imagesURLs}
                date={note.date}
              /> 
            ))
          }

        </List>

      </Drawer>

    </Box>
  )

}

export default Sidebar
