import { FC } from 'react'
import { Link } from 'react-router-dom'

import { useGetUsersQuery } from './usersApiSlice'

const UsersList: FC = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery()

  let content
  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    content = (
      <section className="users">
        <h1>Users List</h1>

        <ul>
          {
            users.map(user => (
              <li key={user.id}>
                {user.username}
              </li>
            ))
          }
        </ul>

        <Link to="/welcome">Back to Welcome</Link>
      </section>
    )
  } else if (isError) {
    if ('status' in error) {
      const errMessage = 'error' in error ? error.error : JSON.stringify(error)
      content = <p>{errMessage}</p>
    } else {
      content = <p>{error.message}</p>
    }
  }

  return (
    <div>
      {content}
    </div>
  )

}

export default UsersList
