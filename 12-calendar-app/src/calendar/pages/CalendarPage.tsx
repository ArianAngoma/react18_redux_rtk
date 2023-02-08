import { FC, CSSProperties, useState } from 'react'

import { Calendar, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { 
  Navbar,
  CalendarEventBox,
  CalendarModal, 
  Error,
  FabAddNew,
  FabDelete
} from '../components'
import { getMessages, localizer } from '../helper'
import { useUIStore, useCalendarApiStore } from '../../hooks'
import { useGetEventsQuery, Event } from '../../store'
import { Spinner } from '../../ui'

const CalendarPage: FC = () => {

  const { onOpenDateModal, onSetActiveEvent } = useUIStore()

  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetEventsQuery()

  const { events } = useCalendarApiStore()

  const [lastView, setLastView] = useState<View>((localStorage.getItem('lastView') || 'month') as View)

  const eventStyleGetter = (event: Event, start: Date, end: Date, isSelected: boolean) => {
    
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

  const onDoubleClick = (event: Event) => onOpenDateModal()

  const onSelect = (event: Event) => onSetActiveEvent({
    ...event,
    start: event.start.toString(),
    end: event.end.toString()
  })

  const onViewChange = (event: View) => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  return (
    <>

      <Navbar />

      {
        isLoading && (
          <Spinner />
        )
      }

      {
        isSuccess && (
          <>
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

            <FabAddNew />

            <FabDelete />
          </>
        )
      }

      {
        isError && (
          <Error error={error} />
        )
      }

    </>
  )

}

export default CalendarPage