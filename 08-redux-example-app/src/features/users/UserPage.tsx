import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useAppSelector } from '../hooks/useAppSelector'
import { selectUserById } from './usersSlice'
import { useGetPostsByUserIdQuery } from '../posts/postSlice'

const UserPage: FC = () => {

  const { userId } = useParams()
  const user = useAppSelector(state => selectUserById(state, Number(userId)))

  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsByUserIdQuery(Number(userId))

  let content
  if (isLoading) {

    content = <p>Loading...</p>

  } else if (isSuccess) {

    const {
      ids,
      entities
    } = postsForUser

    content = ids.map(id => (
      <li key={id}>
        <Link to={`/post/${id}`}>
          {entities[id]?.title}
        </Link>
      </li>
    ))

  } else if (isError) {

    if ('status' in error) {
      const errMessage = 'error' in error ? error.error : JSON.stringify(error)
      content = <p>{errMessage}</p>
    } else {
      content = <p>{error.message}</p>
    }

  }

  return (
    <section>

      <h2>{user?.name}</h2>

      <ol>
        {content}
      </ol>

    </section>
  )

}

export default UserPage
