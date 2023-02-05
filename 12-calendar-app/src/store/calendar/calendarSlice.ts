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
  start: Date | string,
  end: Date | string,
  bgColor: string,
  user: User,
}

export const eventsAdapter = createEntityAdapter<Event>()

export const initialCalendarState: EntityState<Event> = eventsAdapter.getInitialState()

export const extendedCalendarSlice = apiSlice.injectEndpoints({

  endpoints: builder => ({

    getEvents: builder.query<EntityState<Event>, void>({

      query: () => '/events',

      transformResponse: (response: Event[]) => {

        return eventsAdapter.setAll(initialCalendarState, response)

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

    }),

    addNewEvent: builder.mutation<Event, Omit<Event, 'id'>>({
      
      query: initialEvent => ({
        url: '/events',
        method: 'POST',
        body: {
          ...initialEvent
        }
      }),

      invalidatesTags: [
        {
          type: 'Event',
          id: 'LIST'
        }
      ]

    })

  })

})

export const {
  useGetEventsQuery,
  useAddNewEventMutation
} = extendedCalendarSlice