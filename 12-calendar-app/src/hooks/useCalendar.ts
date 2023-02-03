import { createDraftSafeSelector } from '@reduxjs/toolkit'

import {
  RootState,
  eventsAdapter,
  extendedCalendarSlice,
  initialCalendarState
} from '../store'
import { useAppSelector } from './useAppSelector'

const selectEventsResult = extendedCalendarSlice.endpoints.getEvents.select()

const selectEventsData = createDraftSafeSelector(
  [selectEventsResult],
  eventsResult => eventsResult.data
)

const {
  selectAll: selectAllEvents,
} = eventsAdapter.getSelectors<RootState>(state => selectEventsData(state) ?? initialCalendarState)

export const useCalendar = () => {

  const events = useAppSelector(selectAllEvents)

  return {
    events
  }

}