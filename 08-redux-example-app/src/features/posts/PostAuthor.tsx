import { FC } from 'react'
import { useAppSelector } from '../hooks/useAppSelector'

interface PostAuthorProps {
  userId?: string
}

const PostAuthor: FC<PostAuthorProps> = ({ userId }) => {

  const users = useAppSelector(state => state.users)

  const author = users.find(user => user.id === userId)

  return (
    <span>by {author ? author.name : 'Unknown author'}</span>
  )

}

export default PostAuthor
