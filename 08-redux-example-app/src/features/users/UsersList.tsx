import { FC } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import { Link } from 'react-router-dom'

const UsersList: FC = () => {

  const users = useAppSelector(state => state.users)

  const renderedUsers = users.map(user => (
    <li key={user.id}>
      <Link to={`/user/${user.id}`}>
        {user.name}
      </Link>
    </li>
  ))

  return (
    <section>

      <h2>Users</h2>

      <ul>
        {renderedUsers}
      </ul>

    </section>
  )

}

export default UsersList
