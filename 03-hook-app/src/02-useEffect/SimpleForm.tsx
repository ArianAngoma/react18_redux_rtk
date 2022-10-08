import React, { FC, useEffect, useState } from 'react'

interface FormState {
  username: string
  email: string
}

const SimpleForm: FC = () => {

  const [{
    username,
    email
  }, setFormState] = useState<FormState>({
    username: 'arian123',
    email: 'arian.angoma.js@gmail.com'
  })

  const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {

    setFormState(prevState => ({
      ...prevState,
      [target.name]: target.value
    }))

  }

  useEffect(() => {

    console.log('hey')

  }, [])

  useEffect(() => {

    console.log('username changed')

  }, [username])

  useEffect(() => {

    console.log('email changed')

  }, [email])

  return (
    <>

      <h1>Simple Form</h1>
      <hr/>

      <input
        type="text"
        className="form-control"
        placeholder="Username"
        name="username"
        value={username}
        onChange={handleInputChange}
      />

      <input
        type="email"
        className="form-control mt-2"
        placeholder="arian.angoma.js@gmail.com"
        name="email"
        value={email}
        onChange={handleInputChange}
      />

    </>
  )

}

export default SimpleForm
