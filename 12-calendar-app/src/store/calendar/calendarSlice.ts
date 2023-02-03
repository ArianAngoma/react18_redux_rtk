import { EntityState, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from '../../api'

export interface User {
  id: string,
  name: string,
}

export interface Event {
  id: string,
  title: string,
  note: string,
  start: string,
  end: string,
  bgColor: string,
  user: User,
}

type EventResponse = Omit<Event, 'bgColor'>

export const eventsAdapter = createEntityAdapter<Event>()

export const initialCalendarState: EntityState<Event> = eventsAdapter.getInitialState()

export const extendedCalendarSlice = apiSlice.injectEndpoints({

  endpoints: builder => ({

    getEvents: builder.query<EntityState<Event>, void>({

      query: () => '/events',

      transformResponse: (response: EventResponse[]) => {

        const loadedEvents: Event[] = response.map(event => ({
          ...event,
          bgColor: '#A435F0'
        }))

        return eventsAdapter.setAll(initialCalendarState, loadedEvents)

      },

      providesTags: (result, error, ar) => 
        result
          ? [...result.ids.map(id => ({ 
            type: 'Event' as const,
            id 
          })), {
            type: 'Event',
             id: 'LIST'
          }]
          : [{ 
              type: 'Event',
             id: 'LIST' 
          }]

    })

  })

})

export const {
  useGetEventsQuery
} = extendedCalendarSlice