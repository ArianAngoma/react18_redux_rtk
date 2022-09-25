import { useCallback, useEffect, useState } from 'react'

import { getGifs, GetGigsReturn } from '../helpers/getGifs'

interface UseFetchGifsArguments {
  category: string;
}

const useFetchGifs = ({ category }: UseFetchGifsArguments) => {

  const [gifs, setGifs] = useState<GetGigsReturn[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getGifsFromCategory = useCallback(async () => {

    const gifs = await getGifs({ category })
    setGifs(gifs)

    setIsLoading(false)

  }, [])

  useEffect(() => {

    getGifsFromCategory()

  }, [])

  return {
    gifs,
    isLoading
  }

}

export default useFetchGifs
