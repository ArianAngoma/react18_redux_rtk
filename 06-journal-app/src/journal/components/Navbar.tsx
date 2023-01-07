import { FC } from 'react'

import { AppBar, IconButton, Toolbar, Grid, Typography } from '@mui/material'
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'

import { useAppDispatch } from '../../hooks'
import { startLogout } from '../../store'

interface NavbarProps {
  drawerWidth: number
}

const Navbar: FC<NavbarProps> = ({ drawerWidth }) => {

  const dispatch = useAppDispatch()

  const onLogout = () => dispatch(startLogout())

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>

        <IconButton
          color="inherit"
          aria-label="open drawer"
          sx={{
            mr: 2,
            display: { sm: 'none' },
          }}
        >
          <MenuOutlined/>
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >

          <Typography
            variant="h6"
            noWrap
            component="div"
          >
            Journal App
          </Typography>

          <IconButton
           color="error"
           onClick={onLogout}
          >
            <LogoutOutlined/>
          </IconButton>

        </Grid>

      </Toolbar>
    </AppBar>
  )

}

export default Navbar
