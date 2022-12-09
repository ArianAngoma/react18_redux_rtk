import { FC } from 'react'
import { Typography, Grid } from '@mui/material'

interface AuthLayoutProps {
  children: JSX.Element | JSX.Element[]
  title: string
}

const AuthLayout: FC<AuthLayoutProps> = ({
  children,
  title
}) => {

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        padding: 4
      }}
    >

      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{
          width: { md: 450 },
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
        }}
      >

        <Typography
          variant="h5"
          sx={{
            mb: 1
          }}
        >

          {title}

        </Typography>

        {children}

      </Grid>

    </Grid>
  )

}

export default AuthLayout
