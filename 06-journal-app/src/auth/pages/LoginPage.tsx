import { FC, FormEvent, useMemo } from 'react'

import { Link as RouterLink } from 'react-router-dom'

import { TextField, Typography, Grid, Button, Link } from '@mui/material'
import { Google } from '@mui/icons-material'

import { AuthLayout } from '../layout'
import { useAppDispatch, useAppSelector, useForm } from '../../hooks'
import { checkingAuthentication, startGoogleSignIn } from '../../store'

interface FormState {
  email: string
  password: string
}

const LoginPage: FC = () => {

  const { status } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const {
    email,
    password,
    onInputChange
  } = useForm<FormState>({
    email: 'arian.angoma.js@gmail.com',
    password: '123123'
  })

  const isAuthenticating = useMemo(() => status === "checking", [status])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    dispatch(checkingAuthentication({
      email,
      password
    }))

  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>

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
              name="email"
              value={email}
              onChange={onInputChange}
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
              name="password"
              value={password}
              onChange={onInputChange}
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
                type="submit"
                disabled={isAuthenticating}
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
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
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
