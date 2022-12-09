import { FC } from 'react'

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Typography,
  Grid, ListItemText
} from '@mui/material'
import { TurnedInNot } from '@mui/icons-material'

interface SidebarProps {
  drawerWidth: number
}

const Sidebar: FC<SidebarProps> = ({ drawerWidth }) => {

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
            Arian Angoma
          </Typography>
        </Toolbar>

        <Divider/>

        <List>

          {
            ['Notes', 'Tags'].map((text) => (
              <ListItem
                key={text}
                disablePadding
              >
                <ListItemButton>

                  <ListItemIcon>
                    <TurnedInNot/>
                  </ListItemIcon>

                  <Grid container>

                    <ListItemText primary={text}/>

                    <ListItemText secondary={`Lorem ipsum dolor sit amet, consectetur adipisicing elit.`}/>

                  </Grid>

                </ListItemButton>
              </ListItem>
            ))
          }

        </List>

      </Drawer>

    </Box>
  )

}

export default Sidebar
