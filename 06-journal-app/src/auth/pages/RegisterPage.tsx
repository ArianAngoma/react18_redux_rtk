import { FC, FormEvent } from 'react'

import { Link as RouterLink } from 'react-router-dom'

import { TextField, Typography, Grid, Button, Link } from '@mui/material'

import { AuthLayout } from '../layout'
import { useForm } from '../../hooks'

interface RegisterForm {
  displayName: string
  email: string
  password: string
}

const formData: RegisterForm = {
  displayName: 'Arian Angoma',
  email: 'arian.angoma.js@gmail.com',
  password: '123123'
}

const RegisterPage: FC = () => {

  const {
    displayName,
    email,
    password,
    onInputChange
  } = useForm<RegisterForm>(formData)


  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ displayName, email, password })
  }

  return (
    <AuthLayout title="Register">
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
              label="Name"
              type="text"
              placeholder="Name"
              fullWidth
              name="displayName"
              value={displayName}
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
            >
              <Button
                variant="contained"
                fullWidth
                type="submit"
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
