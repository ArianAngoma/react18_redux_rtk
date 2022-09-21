import React, { Dispatch, SetStateAction, useState } from 'react'

interface AddCategoryProps {
  handleAddCategory: Dispatch<SetStateAction<string[]>>
}

const AddCategory = ({ handleAddCategory }: AddCategoryProps) => {

  const [inputValue, setInputValue] = useState<string>('')

  const handleChangeInputValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {

    setInputValue(target.value)

  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    if (inputValue.trim().length > 2) {
      handleAddCategory(prev => [inputValue, ...prev])
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
