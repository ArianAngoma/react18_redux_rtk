import { FC, CSSProperties } from 'react'

import { Calendar, Event } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'

import { Navbar } from '../components'
import { localizer } from '../helper'

type CustomEvent = Event & { notes: string, bgColor: string, user: { _id: string, name: string } }

const events: CustomEvent[] = [
  {
    title: 'All Day Event very long title',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: 'blue',
    user: {
      _id: '123',
      name: 'Arian Angoma',
    }
  }
]

const CalendarPage: FC = () => {

  const eventStyleGetter = (event: CustomEvent, start: Date, end: Date, isSelected: boolean) => {
    
    const style: CSSProperties = {
      backgroundColor: event.bgColor,
      borderRadius: '0',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }

  }

  return (
    <>

      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
      />

    </>
  )

}

export default CalendarPage