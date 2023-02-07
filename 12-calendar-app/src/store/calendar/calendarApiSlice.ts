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

    }),

    updateEvent: builder.mutation<Event, Event>({

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