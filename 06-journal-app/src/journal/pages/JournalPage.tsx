import { FC } from 'react'

import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'

import { JournalLayout } from '../layout'
import { NoteView, NothingSelectedView } from '../../views'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { startNewNote } from '../../store'

const JournalPage: FC = () => {

  const { isSaving, activeNote } = useAppSelector(state => state.journal)
  const dispatch = useAppDispatch()

  const onCLickNewNote = () => dispatch(startNewNote())

  return (
    <JournalLayout>

      {
        (Boolean(activeNote))
          ? <NoteView/>
          : <NothingSelectedView/>
      }

      <IconButton
        onClick={onCLickNewNote}
        disabled={isSaving}
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          '&:hover': {
            backgroundColor: 'error.main',
            opacity: 0.9
          },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined
          sx={{
            fontSize: 30
          }}
        />
      </IconButton>

    </JournalLayout>
  )

}

export default JournalPage
