import { FC } from 'react'

import { JournalLayout } from '../layout'
import { NothingSelectedView } from '../../views'

const JournalPage: FC = () => {

  return (
    <JournalLayout>

      <NothingSelectedView/>

    </JournalLayout>
  )

}

export default JournalPage
