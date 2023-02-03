import { FC } from 'react'

import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'

interface ErrorProps {
  error: FetchBaseQueryError | SerializedError
}

const Error: FC<ErrorProps> = ({ error }) => {

  if ('status' in error) {
    const errMessage = 'error' in error 
      ? error.error 
      : JSON.stringify(error)
    return <p>{errMessage}</p>
  } else {
    return <p>{error.message}</p>
  }

}

export default Error