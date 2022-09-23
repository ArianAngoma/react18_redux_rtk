import { memo } from 'react'

import { getGifs } from '../helpers/getGifs'

interface GifGridProps {
  category: string
}

const GifGrid = ({ category }: GifGridProps) => {

  getGifs({ category })

  return (
    <>
      <h3>{category}</h3>
    </>
  )
}

export default memo(GifGrid)
