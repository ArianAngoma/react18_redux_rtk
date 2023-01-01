import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useLoginMutation } from './authApiSlice'
import { setCredentials } from './authSlice'
import { isErrorWithMessage, isFetchBaseQueryError } from '../../app/store'

const Login: FC = () => {

  const userRef = useRef<HTMLInputElement | null>(null)
  const errRef = useRef<HTMLInputElement | null>(null)
  const [user, setUser] = useState<string>('')
  const [pwd, setPwd] = useState<string>('')
  const [errMsg, setErrMsg] = useState<string>('')

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {

    userRef.current?.focus()

  }, [])

  useEffect(() => {

    setErrMsg('')

  }, [user, pwd])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {

      const userData = await login({
        user,
        pwd
      }).unwrap()

      dispatch(setCredentials({
        token: userData.accessToken,
        user,
      }))

      setUser('')
      setPwd('')

      navigate('/welcome')

    } catch (err) {

      if (isFetchBaseQueryError(err)) {

        if ('originalStatus' in err) {

          if (!err.data) {
            setErrMsg('No Server Response')
          } else if (err.originalStatus === 400) {
            setErrMsg('Missing Username or Password')
          } else if (err.originalStatus === 401) {
            setErrMsg('Unauthorized')
          } else {
            setErrMsg('Login Failed')
          }

        } else {

          if (!err.data) {
            setErrMsg('No Server Response')
          } else if (err.status === 400) {
            setErrMsg('Missing Username or Password')
          } else if (err.status === 401) {
            setErrMsg('Unauthorized')
          } else {
            setErrMsg('Login Failed')
          }

        }

      } else if (isErrorWithMessage(err)) {

        setErrMsg(err.message)

      }

      errRef.current?.focus()

    }
  }

  const onPwdChange = (e: ChangeEvent<HTMLInputElement>) => setPwd(e.target.value)
  const onUserChange = (e: ChangeEvent<HTMLInputElement>) => setUser(e.target.value)

  return isLoading ? <h1>Loading...</h1> : (
    <section className="login">
      <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">{errMsg}</p>

      <h1>Employee Login</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          value={user}
          onChange={onUserChange}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={onPwdChange}
          value={pwd}
          required
        />
        <button>Sign In</button>
      </form>
    </section>
  )

}

export default Login
