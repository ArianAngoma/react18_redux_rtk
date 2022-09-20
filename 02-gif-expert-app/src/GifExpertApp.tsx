import React, { useState } from 'react'

const GifExpertApp = () => {
  const [categories, setCategories] = useState<string[]>(['One Punch'])

  const handleAddCategory = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault()

    setCategories(prev => ['HunterXHunter', ...prev])
  }

  return (
    <>
      <h1>GifApp</h1>

      <button
        onClick={handleAddCategory}
        type="submit"
      >
        Agregar
      </button>

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
