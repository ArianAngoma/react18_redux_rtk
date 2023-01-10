import { FC, useMemo } from 'react'

import { Button, Grid, TextField, Typography } from '@mui/material'
import { SaveOutlined } from '@mui/icons-material'

import { ImageGallery } from '../journal'
import { useAppSelector, useForm } from '../hooks'
import { Note } from '../store'

const NoteView: FC = () => {

  const { activeNote } = useAppSelector(state => state.journal)

  const { title, body, date, onInputChange } = useForm<Note | null>(activeNote)

  const dateString = useMemo(() => {

    if (date) {
      const dateObj = new Date(date)
      return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
    }
    
    return ''

  }, [date])

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
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
          {dateString}
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
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="What happened today?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />

      </Grid>

      <ImageGallery/>

    </Grid>
  )

}

export default NoteView
