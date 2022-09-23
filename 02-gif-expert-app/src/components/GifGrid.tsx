import { memo, useCallback, useEffect, useState } from 'react'

import { getGifs, GetGigsReturn } from '../helpers/getGifs'

interface GifGridProps {
  category: string
}

const GifGrid = ({ category }: GifGridProps) => {

  const [gifs, setGifs] = useState<GetGigsReturn[]>([])

  const getGifsFromCategory = useCallback(async () => {

    const gifs = await getGifs({ category })
    setGifs(gifs)

  }, [])

  useEffect(() => {

    getGifsFromCategory()

  }, [])

  return (
    <>
      <h3>{category}</h3>

      <ol>
        {

          gifs.map(gif => (
            <li key={gif.id}>
              <img src={gif.url} alt={gif.title}/>
            </li>
          ))

        }
      </ol>
    </>
  )
}

export default memo(GifGrid)
