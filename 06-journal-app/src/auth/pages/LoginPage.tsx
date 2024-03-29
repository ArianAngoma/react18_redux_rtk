import { FC, FormEvent, useMemo } from 'react'

import { Link as RouterLink } from 'react-router-dom'

import { TextField, Typography, Grid, Button, Link, Alert } from '@mui/material'
import { Google } from '@mui/icons-material'

import { AuthLayout } from '../layout'
import { useAppDispatch, useAppSelector, useForm } from '../../hooks'
import { startLoginWithEmailPassword, startGoogleSignIn } from '../../store'

interface FormState {
  email: string
  password: string
}

const formData: FormState = {
  email: '',
  password: ''
}

const LoginPage: FC = () => {

  const { status, errorMessage } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const {
    email,
    password,
    onInputChange
  } = useForm<FormState>(formData)

  const isAuthenticating = useMemo(() => status === "checking", [status])

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {    

    e.preventDefault()

    dispatch(startLoginWithEmailPassword({
      email,
      password
    }))

  }

  const onGoogleSignIn = () => dispatch(startGoogleSignIn())
  
  return (
    <AuthLayout title="Login">
      <form
        className="animate__animated animate__fadeIn animate__faster"
        aria-label="login-form"
        onSubmit={onSubmit}
      >

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
              inputProps={{
                'data-testid': 'password-input'
              }}
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
              display={Boolean(errorMessage) ? 'block' : 'none'}
            >
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>

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
                aria-label="google-button"
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
