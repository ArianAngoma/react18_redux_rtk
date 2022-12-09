import { FC } from 'react'

import { Link as RouterLink } from 'react-router-dom'

import { TextField, Typography, Grid, Button, Link } from '@mui/material'

import { AuthLayout } from '../layout'

const RegisterPage: FC = () => {

  return (
    <AuthLayout title="Register">
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
              label="Name"
              type="text"
              placeholder="Name"
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
            >
              <Button
                variant="contained"
                fullWidth
              >
                Register
              </Button>
            </Grid>

          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="end"
          >

            <Typography
              sx={{
                mr: 1
              }}
            >
              Already registered?
            </Typography>

            <Link
              color="inherit"
              component={RouterLink}
              to="/auth/login"
            >
              Login
            </Link>

          </Grid>

        </Grid>

      </form>
    </AuthLayout>
  )

}

export default RegisterPage
