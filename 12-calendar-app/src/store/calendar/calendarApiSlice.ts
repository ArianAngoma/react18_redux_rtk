import { EntityState, createEntityAdapter } from '@reduxjs/toolkit'

import { apiSlice } from '../../api'

export interface User {
  uid: string,
  name: string,
}

export interface Event {
  id: string,
  title: string,
  note: string,
  start: Date | string,
  end: Date | string,
  bgColor: string,
  user: User
}

interface EventResponse {
  ok: boolean,
  events: Event[]
}

export const eventsAdapter = createEntityAdapter<Event>({
  selectId: event => event.id,
})

export const initialCalendarState: EntityState<Event> = eventsAdapter.getInitialState()

export const extendedCalendarSlice = apiSlice.injectEndpoints({

  endpoints: builder => ({

    getEvents: builder.query<EntityState<Event>, void>({

      query: () => '/events',

      transformResponse: (response: EventResponse) => {
        
        return eventsAdapter.setAll(initialCalendarState, response.events)

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

    addNewEvent: builder.mutation<Event, Omit<Event, 'id' | 'user'>>({
      
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

    }),

    updateEvent: builder.mutation<Event, Omit<Event, 'user'>>({

      query: event => ({
        url: `/events/${event.id}`,
        method: 'PUT',
        body: {
          ...event
        }
      }),

      invalidatesTags: (result, error, arg) => [{
        type: 'Event',
        id: arg.id
      }]

    }),

    deleteEvent: builder.mutation<Event, Pick<Event, 'id'>>({

      query: ({ id }) => ({
        url: `/events/${id}`,
        method: 'DELETE'
      }),

      invalidatesTags: (result, error, arg) => [{
        type: 'Event',
        id: arg.id
      }]

    })

  })

})

export const {
  useGetEventsQuery,
  useAddNewEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation
} = extendedCalendarSlice