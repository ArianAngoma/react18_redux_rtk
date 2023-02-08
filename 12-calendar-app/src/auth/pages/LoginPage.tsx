import { FC, FormEvent } from 'react'

import './LoginPage.css'

import { useForm } from '../../hooks'

interface LoginFields {
  loginEmail: string
  loginPassword: string
}

interface RegisterFields {
  registerName: string
  registerEmail: string
  registerPassword: string
  registerPassword2: string
}

const loginFormFields: LoginFields = {
  loginEmail: '',
  loginPassword: '',
}

const registerFormFields: RegisterFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: '',
}

const LoginPage: FC = () => {

  const {
    loginEmail,
    loginPassword, 
    onInputChange: onLoginInputChange
  } = useForm<LoginFields>(loginFormFields)

  const {
    registerEmail, 
    registerName,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange
  } = useForm<RegisterFields>(registerFormFields)

  const onLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log({ loginEmail, loginPassword })
  }

  const onRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log({ registerEmail, registerName, registerPassword, registerPassword2 })
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={onLoginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={onRegisterSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="d-grid gap-2">
              <input 
                type="submit"
                className="btnSubmit"
                value="Crear cuenta"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )

}

export default LoginPage;