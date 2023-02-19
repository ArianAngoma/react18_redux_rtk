import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

import { apiSlice } from '../../api'

interface AuthLoginParams {
  email: string,
  password: string,
}

interface AuthRegisterParams {
  name: string,
  email: string,
  password: string,
}

export interface AuthSuccessResponse {
  ok: true,
  uid: string,
  name: string,
  token: string,
}

interface AuthRenewTokenSuccessResponse extends AuthSuccessResponse {
  token: string
}

interface AuthLoginErrorFields {
  email?: {
    location: 'body' | 'query' | 'params' | 'headers',
    msg: string,
    param: 'email',
    value: string
  },
  password?: {
    location: 'body' | 'query' | 'params' | 'headers',
    msg: string,
    param: 'password',
    value: string
  }
}

interface AuthRegisterErrorFields extends AuthLoginErrorFields {
  name?: {
    location: 'body' | 'query' | 'params' | 'headers',
    msg: string,
    param: 'name',
    value: string
  } 
}

interface AuthErrorResponse {
  ok: false,
  msg?: string,
  errors?: AuthRegisterErrorFields extends AuthLoginErrorFields ? AuthRegisterErrorFields : AuthLoginErrorFields
}

type CustomErrorData<T> = T 

interface CustomError<T> {
  ok: boolean,
  errorStatus: number | string,
  errorMessage?: string,
  errorData?: CustomErrorData<T>
}

export const isCustomError = (error: unknown): error is CustomError<AuthLoginErrorFields> => {
  return ['ok', 'errorStatus'].every(key => key in (error as CustomError<AuthLoginErrorFields>))
}

export const extendedAuthApiSlice = apiSlice.injectEndpoints({

  endpoints: builder => ({

    login: builder.mutation<AuthSuccessResponse, AuthLoginParams>({

      query: credentials => ({
        url: '/auth',
        method: 'POST',
        body: credentials
      }),

      transformErrorResponse: (errorResponse: FetchBaseQueryError, meta, args): CustomError<AuthLoginErrorFields>  => {
        const { status, data } = errorResponse
        const { ok, msg, errors } = data as AuthErrorResponse

        let errorMessage = msg

        if (errors) errorMessage = Object.values(errors).map(error => error.msg).join(' ')
        
        return {
          ok,
          errorStatus: status,
          errorMessage,
          errorData: errors
        }
      }
      
    }),

    register: builder.mutation<AuthSuccessResponse, AuthRegisterParams>({

      query: credentials => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials
      }),

      transformErrorResponse: (errorResponse: FetchBaseQueryError, meta, args): CustomError<AuthRegisterErrorFields>  => {
        const { status, data } = errorResponse
        const { ok, msg, errors } = data as AuthErrorResponse

        let errorMessage = msg

        if (errors) errorMessage = Object.values(errors).map(error => error.msg).join(' ')
        
        return {
          ok,
          errorStatus: status,
          errorMessage,
          errorData: errors
        }
      }

    }),

    renewToken: builder.query<AuthSuccessResponse, void>({
      query: () => '/auth/renew-token',

      transformResponse: (response: AuthRenewTokenSuccessResponse) => {
        const { ok, uid, name, token } = response
        return { ok, uid, name, token }
      },

      transformErrorResponse: (errorResponse: FetchBaseQueryError, meta, args): CustomError<void>  => {
        const { status, data } = errorResponse
        const { ok, msg, errors } = data as AuthErrorResponse

        let errorMessage = msg

        if (errors) errorMessage = Object.values(errors).map(error => error.msg).join(' ')
        
        return {
          ok,
          errorStatus: status,
          errorMessage,
        }
      }

    })

  })
})

export const {
 useLoginMutation,
 useRegisterMutation,
 useRenewTokenQuery
} = extendedAuthApiSlice