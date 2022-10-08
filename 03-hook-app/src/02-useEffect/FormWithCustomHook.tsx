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
    onInputChange,
    onResetForm,
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
        onChange={onInputChange}
      />

      <input
        type="email"
        className="form-control mt-2"
        placeholder="arian.angoma.js@gmail.com"
        name="email"
        value={email}
        onChange={onInputChange}
      />

      <input
        type="password"
        className="form-control mt-2"
        placeholder="contraseña"
        name="password"
        value={password}
        onChange={onInputChange}
      />

      <button
        className="btn btn-primary mt-2"
        onClick={onResetForm}
      >
        Borrar
      </button>

    </>
  )

}

export default FormWithCustomHook
