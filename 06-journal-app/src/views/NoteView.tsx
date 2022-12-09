import { FC } from 'react'

import { Button, Grid, TextField, Typography } from '@mui/material'
import { SaveOutlined } from '@mui/icons-material'
import { ImageGallery } from '../journal'

const NoteView: FC = () => {

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        mb: 1
      }}
    >

      <Grid item>
        <Typography
          fontSize={39}
          fontWeight="lighter"
        >
          Ago 29, 2021
        </Typography>
      </Grid>

      <Grid item>
        <Button
          color="primary"
          sx={{
            padding: 2
          }}
        >
          <SaveOutlined
            sx={{
              fontSize: 30,
              mr: 1
            }}
          />
          Save
        </Button>
      </Grid>

      <Grid container>

        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Title"
          label="Title"
          sx={{
            border: 'none',
            mb: 1
          }}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today?"
          minRows={5}
        />

      </Grid>

      <ImageGallery/>

    </Grid>
  )

}

export default NoteView
