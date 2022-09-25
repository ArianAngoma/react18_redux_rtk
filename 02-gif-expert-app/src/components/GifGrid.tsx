import { memo } from 'react'

import { GetGigsReturn } from '../helpers/getGifs'
import GifItem from './GifItem'
import useFetchGifs from '../hooks/useFetchGifs'

interface GifGridProps {
  category: string
}

const GifGrid = ({ category }: GifGridProps) => {

  const {
    gifs,
    isLoading
  } = useFetchGifs({ category })

  return (
    <>
      <h3>{category}</h3>

      {

        isLoading && <p>Loading...</p>

      }

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
