import { ChangeEvent, FC, useEffect, useMemo, useRef } from 'react'

import { Button, Grid, IconButton, TextField, Typography } from '@mui/material'
import { SaveOutlined, UploadOutlined } from '@mui/icons-material'

import Swal from 'sweetalert2'

import 'sweetalert2/dist/sweetalert2.min.css'

import { ImageGallery } from '../journal'
import { useAppDispatch, useAppSelector, useForm } from '../hooks'
import { Note, startSaveNote, startUploadingFiles } from '../store'


const NoteView: FC = () => {

  const { activeNote, messageSaved, isSaving } = useAppSelector(state => state.journal)
  const dispatch = useAppDispatch()

  const { title, body, date, onInputChange, formState } = useForm<Note | null>(activeNote)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const dateString = useMemo(() => {

    if (date) {
      const dateObj = new Date(date)
      return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`
    }
    
    return ''

  }, [date])

  useEffect(() => {

    if (messageSaved.length > 0) {
      Swal.fire('Saved', messageSaved, 'success')
    }

  }, [messageSaved])

  const onSaveNote = () => {
    if (formState) dispatch(startSaveNote(formState)) 
  }

  const onFileInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
   
    if (!target.files) return

    dispatch(startUploadingFiles(target.files))

  }

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

        <input 
          type="file"
          multiple
          onChange={onFileInputChange}
          style={{
            display: 'none'
          }}
          ref={fileInputRef}
        />

        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadOutlined/>
        </IconButton>

        <Button
          color="primary"
          sx={{
            padding: 2
          }}
          onClick={onSaveNote}
          disabled={isSaving}
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
