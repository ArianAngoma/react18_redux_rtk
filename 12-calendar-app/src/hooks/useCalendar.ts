import { createDraftSafeSelector } from '@reduxjs/toolkit'

import {
  RootState,
  eventsAdapter,
  extendedCalendarSlice,
  initialCalendarState,
} from '../store'
import { useAppSelector } from './useAppSelector'

const selectEventsResult = extendedCalendarSlice.endpoints.getEvents.select()

const selectEventsData = createDraftSafeSelector(
  [selectEventsResult],
  eventsResult => eventsResult.data
)

const {
  selectAll: selectAllEvents,
  selectById
} = eventsAdapter.getSelectors<RootState>(state => selectEventsData(state) ?? initialCalendarState)

export const useCalendar = () => {

  const events = useAppSelector(selectAllEvents).map(event => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end)
  }))
  
  const selectEventById = (id: string) => useAppSelector(state => selectById(state, id))

  return {
    events,
    selectEventById,
  }

}