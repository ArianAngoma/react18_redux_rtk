import React, { useState } from 'react'

interface AddCategoryProps {
  handleAddCategory: (category: string) => void
}

const AddCategory = ({ handleAddCategory }: AddCategoryProps) => {

  const [inputValue, setInputValue] = useState<string>('')

  const handleChangeInputValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {

    setInputValue(target.value)

  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    const valueWithoutSpaces = inputValue.trim()

    if (valueWithoutSpaces.length > 2) {
      handleAddCategory(valueWithoutSpaces)
      setInputValue('')
    }

  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Search a gif"
        value={inputValue}
        onChange={handleChangeInputValue}
      />

    </form>
  )

}

export default React.memo(AddCategory)
