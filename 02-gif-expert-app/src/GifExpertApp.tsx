import React, { useCallback, useState } from 'react'

import { AddCategory, GifGrid } from './components'

const GifExpertApp = () => {
  const [categories, setCategories] = useState<string[]>(['One Punch'])

  const handleAddCategory = useCallback((category: string) => {

    if (categories.includes(category)) return

    setCategories(prev => [category, ...prev])
  }, [categories])

  return (
    <>
      <h1>GifApp</h1>

      <AddCategory
        // handleAddCategory={setCategories}
        handleAddCategory={handleAddCategory}
      />


      {
        categories.map((category) => (
          <GifGrid category={category} key={category}/>
        ))
      }

    </>
  )
}

export default GifExpertApp
