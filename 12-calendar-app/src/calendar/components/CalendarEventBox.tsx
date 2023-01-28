import { FC, memo } from 'react'

import { EventProps } from 'react-big-calendar'

import { CustomEvent } from '../pages';

const CalendarEventBox: FC<EventProps<CustomEvent>> = ({
  event
}) => {

  const { title, user } = event
  
  return (
    <>

      <strong>{title}</strong>
      <span> - {user.name}</span>

    </>
  )

}

export default memo(CalendarEventBox)