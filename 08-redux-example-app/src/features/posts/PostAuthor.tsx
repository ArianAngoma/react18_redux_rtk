import { FC } from 'react'
import { Link } from 'react-router-dom'

import { useAppSelector } from '../hooks/useAppSelector'

interface PostAuthorProps {
  userId: number
}

const PostAuthor: FC<PostAuthorProps> = ({ userId }) => {

  const users = useAppSelector(state => state.users)

  const author = users.find(user => user.id === userId)

  return (
    <span>
      by {author ? <Link to={`/user/${userId}`}>{author.name}</Link> : 'Unknown author'}
    </span>
  )

}

export default PostAuthor
