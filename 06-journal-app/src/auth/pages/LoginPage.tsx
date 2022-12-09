import { FC } from 'react'

import { TextField, Typography, Grid, Button, Link } from '@mui/material'
import { Google } from '@mui/icons-material'

import { Link as RouterLink } from 'react-router-dom'

import { AuthLayout } from '../layout'

const LoginPage: FC = () => {

  return (
    <AuthLayout title="Login">
      <form>

        <Grid container>

          <Grid
            item
            xs={12}
            sx={{
              mt: 2
            }}
          >
            <TextField
              label="Email"
              type="email"
              placeholder="Email"
              fullWidth
            />
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              mt: 2
            }}
          >
            <TextField
              label="Password"
              type="password"
              placeholder="Password"
              fullWidth
            />
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{
              mb: 2,
              mt: 1
            }}
          >

            <Grid
              item
              xs={12}
              sm={6}
            >
              <Button
                variant="contained"
                fullWidth
              >
                Login
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
            >
              <Button
                variant="contained"
                fullWidth
              >

                <Google/>

                <Typography
                  sx={{
                    ml: 1
                  }}
                >
                  Google
                </Typography>

              </Button>
            </Grid>

          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="end"
          >

            <Link
              color="inherit"
              component={RouterLink}
              to="/auth/register"
            >
              Create new account
            </Link>

          </Grid>

        </Grid>

      </form>
    </AuthLayout>
  )

}

export default LoginPage
