import { FC } from 'react'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../../hooks/useAppSelector'
import { selectCurrentToken, selectCurrentUser } from './authSlice'

const Welcome: FC = () => {

  const user = useAppSelector(selectCurrentUser)
  const token = useAppSelector(selectCurrentToken)

  const welcome = user ? `Welcome ${user}!` : 'Welcome!'
  const tokenAbbr = `${token?.slice(0, 9)}...`

  return (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <p><Link to="/userslist">Go to the Users List</Link></p>
    </section>
  )

}

export default Welcome
