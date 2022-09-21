import React, { useState } from 'react'
import AddCategory from './components/AddCategory'

const GifExpertApp = () => {
  const [categories, setCategories] = useState<string[]>(['One Punch'])

  return (
    <>
      <h1>GifApp</h1>

      <AddCategory handleAddCategory={setCategories}/>

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
