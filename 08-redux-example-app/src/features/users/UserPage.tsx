import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useAppSelector } from '../hooks/useAppSelector'
import { selectUserById } from './usersSlice'

const UserPage: FC = () => {

  const { userId } = useParams()
  const user = useAppSelector(state => selectUserById(state, Number(userId)))
  const postsForUser = useAppSelector(state => {
    return state.posts.posts.filter(post => post.userId === user?.id)
  })

  const postTitles = postsForUser.map(post => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>
        {post.title}
      </Link>
    </li>
  ))

  return (
    <section>

      <h2>{user?.name}</h2>

      <ol>
        {postTitles}
      </ol>

    </section>
  )

}

export default UserPage
