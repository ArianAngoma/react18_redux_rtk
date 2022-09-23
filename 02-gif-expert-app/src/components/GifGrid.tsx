import { memo, useEffect } from 'react'

import { getGifs } from '../helpers/getGifs'

interface GifGridProps {
  category: string
}

const GifGrid = ({ category }: GifGridProps) => {

  useEffect(() => {

    getGifs({ category })

  }, [])

  return (
    <>
      <h3>{category}</h3>
    </>
  )
}

export default memo(GifGrid)
