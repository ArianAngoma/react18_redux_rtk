import { FC } from 'react'

import { Calendar, Event, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { 
  addHours,
  format,
  parse,
  startOfWeek,
  getDay,
} from 'date-fns'
import enUS from 'date-fns/locale/en-US'

import { Navbar } from '../components'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// Todo: Type Event
const events: (Event & any)[] = [
  {
    title: 'All Day Event very long title',
    notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Arian Angoma',
    }
  }
]

const CalendarPage: FC = () => {

  return (
    <>

      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
      />

    </>
  )

}

export default CalendarPage