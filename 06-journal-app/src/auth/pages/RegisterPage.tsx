import { FC, FormEvent, useMemo, useState } from 'react'

import { Link as RouterLink } from 'react-router-dom'

import { TextField, Typography, Grid, Button, Link, Alert } from '@mui/material'

import { AuthLayout } from '../layout'
import { useAppDispatch, useAppSelector, useForm } from '../../hooks'
import { startCreatingUserWithEmailPassword } from '../../store'

interface RegisterForm {
  displayName: string
  email: string
  password: string
}

const formData: RegisterForm = {
  displayName: '',
  email: '',
  password: ''
}

type FormValidations = {
  [key in keyof RegisterForm]?: [(value: typeof formData[key]) => boolean, string]
}

const formValidations: FormValidations = {
  email: [(value) => value.includes('@'), 'Email is not valid'],
  displayName: [(value) => value.length > 1, 'Name is required'],
  password: [(value) => value.length >= 6, 'Password must be at least 6 characters'],
}

const RegisterPage: FC = () => {

  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false)

  const { status, errorMessage } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const {
    displayName,
    email,
    password,
    onInputChange,
    displayNameValid,
    emailValid,
    passwordValid,
    isFormValid
  } = useForm<RegisterForm>(formData, formValidations)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault()

    setIsFormSubmitted(true)

    if (!isFormValid) return
  
    dispatch(startCreatingUserWithEmailPassword({
      displayName,
      email,
      password
    }))

  }

  return (
    <AuthLayout title="Register">
      <form 
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster"
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
              label="Name"
              type="text"
              placeholder="Name"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={Boolean(displayNameValid && isFormSubmitted)}
              helperText={isFormSubmitted && displayNameValid}
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
              name="email"
              value={email}
              onChange={onInputChange}
              error={Boolean(emailValid && isFormSubmitted)}
              helperText={isFormSubmitted && emailValid}
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
              error={Boolean(passwordValid && isFormSubmitted)}
              helperText={isFormSubmitted && passwordValid}
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
            >
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isCheckingAuthentication}
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
