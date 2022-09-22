import { memo } from 'react'

interface GifGridProps {
  category: string
}

const GifGrid = ({ category }: GifGridProps) => {
  return (
    <>
      <h3>{category}</h3>
    </>
  )
}

export default memo(GifGrid)
