import React,
{ useState } from 'react'

const AddCategory = () => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleChangeInputValue = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({ inputValue })
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

export default AddCategory
