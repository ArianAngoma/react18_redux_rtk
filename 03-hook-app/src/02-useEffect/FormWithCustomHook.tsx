import { useEffect } from 'react'
import useForm from '../hooks/useForm'

interface FormState {
  username: string
  email: string
  password: string
}

const FormWithCustomHook = () => {

  const {
    username,
    email,
    password,
    handleInputChange
  } = useForm<FormState>({
    username: '',
    email: '',
    password: ''
  })

  useEffect(() => {

    // console.log('hey')

  }, [])

  useEffect(() => {

    // console.log('username changed')

  }, [username])

  useEffect(() => {

    // console.log('email changed')

  }, [email])

  return (
    <>

      <h1>Simple Form With Custom Hook</h1>
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

      <input
        type="password"
        className="form-control mt-2"
        placeholder="contraseña"
        name="password"
        value={password}
        onChange={handleInputChange}
      />

    </>
  )

}

export default FormWithCustomHook
