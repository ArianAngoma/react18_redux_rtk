import { useCallback, useEffect, useState } from 'react'

interface UseFetchProps {
  url: string;
}

interface UseFetchResponse<T> {
  data?: T | null
  error?: Error | null
  isLoading: boolean
}

const useFetch = <T = unknown> ({ url }: UseFetchProps): UseFetchResponse<T> => {

  const [{
    data,
    error,
    isLoading
  }, setState] = useState<UseFetchResponse<T>>({
    data: null,
    error: null,
    isLoading: true
  })

  const getFetch = useCallback(async () => {

    setState(prevState => ({
      ...prevState,
      isLoading: true
    }))

    const response = await fetch(url)
    const data = await response.json()

    setState(prevState => ({
      ...prevState,
      data,
      isLoading: false
    }))

  }, [])

  useEffect(() => {

    void getFetch()

  }, [url])

  return {
    data,
    error,
    isLoading
  }

}

export default useFetch
