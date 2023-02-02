import { FC, CSSProperties, useState } from 'react'

import { Calendar, Event, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'

import { 
  Navbar,
  CalendarEventBox,
  CalendarModal 
} from '../components'
import { getMessages, localizer } from '../helper'
import { useUIStore } from '../../hooks'

export type CustomEvent = Event & { note: string, bgColor: string, user: { _id: string, name: string } }

const events: CustomEvent[] = [
  {
    title: 'All Day Event very long title',
    note: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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

  const { onOpenDateModal } = useUIStore()

  const [lastView, setLastView] = useState<View>((localStorage.getItem('lastView') || 'month') as View)

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

  const onDoubleClick = (event: CustomEvent) => onOpenDateModal()

  const onSelect = (event: CustomEvent) => {
    console.log({click: event})
  }

  const onViewChange = (event: View) => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  return (
    <>

      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
        messages={getMessages()}
        components={{
          event: CalendarEventBox
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />

      <CalendarModal />

    </>
  )

}

export default CalendarPage