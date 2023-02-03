import { FC, memo } from 'react'

import { EventProps } from 'react-big-calendar'

import { Event } from '../../store'

const CalendarEventBox: FC<EventProps<Event>> = ({
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