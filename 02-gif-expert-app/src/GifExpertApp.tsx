import React, { useCallback, useState } from 'react'
import AddCategory from './components/AddCategory'

const GifExpertApp = () => {
  const [categories, setCategories] = useState<string[]>(['One Punch'])

  const handleAddCategory = useCallback((category: string) => {
    setCategories(prev => [category, ...prev])
  }, [])

  return (
    <>
      <h1>GifApp</h1>

      <AddCategory
        // handleAddCategory={setCategories}
        handleAddCategory={handleAddCategory}
      />

      <ol>

        {
          categories.map((category, index) => (
            <li key={index}>{category}</li>
          ))
        }

      </ol>
    </>
  )
}

export default GifExpertApp
