import { FC } from 'react'

import { JournalLayout } from '../layout'
import { NoteView, NothingSelectedView } from '../../views'

const JournalPage: FC = () => {

  return (
    <JournalLayout>

      {/* <NothingSelectedView/> */}

      <NoteView/>

    </JournalLayout>
  )

}

export default JournalPage
