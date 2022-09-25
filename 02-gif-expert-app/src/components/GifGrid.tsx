import { memo, useCallback, useEffect, useState } from 'react'

import { getGifs, GetGigsReturn } from '../helpers/getGifs'
import GifItem from './GifItem'

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

      <div className="card-grid">
        {

          gifs.map((gif: GetGigsReturn) => (

            <GifItem
              key={gif.id}
              {...gif}
            />

          ))

        }
      </div>
    </>
  )
}

export default memo(GifGrid)
