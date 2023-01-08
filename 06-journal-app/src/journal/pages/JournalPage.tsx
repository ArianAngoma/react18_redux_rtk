import { FC } from 'react'

import { IconButton } from '@mui/material'
import { AddOutlined } from '@mui/icons-material'

import { JournalLayout } from '../layout'
import { NothingSelectedView } from '../../views'
import { useAppDispatch } from '../../hooks'
import { startNewNate } from '../../store'

const JournalPage: FC = () => {

  const dispatch = useAppDispatch()

  const onCLickNewNote = () => {

    dispatch(startNewNate({
      body: '',
      title: '',
    }))

  }

  return (
    <JournalLayout>

      <NothingSelectedView/>

      {/* <NoteView/> */}

      <IconButton
        onClick={onCLickNewNote}
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
