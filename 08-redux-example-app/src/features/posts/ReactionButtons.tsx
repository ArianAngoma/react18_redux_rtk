import { FC } from 'react'
import { PostState as Post, reactionAdded } from './postSlice'
import { useAppDispatch } from '../hooks/useAppDispatch'

const reactionEmoji = {
  thumbUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕'
}

interface ReactionButtonsProps {
  post: Post
}

const ReactionButtons: FC<ReactionButtonsProps> = ({ post }) => {

  const dispatch = useAppDispatch()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() => {
          dispatch(
            reactionAdded({
              postId: post.id,
              reaction: name as keyof typeof reactionEmoji
            })
          )
        }}
      >
        {emoji} {post.reactions[name as keyof typeof reactionEmoji]}
      </button>
    )
  })

  return (
    <div>
      {reactionButtons}
    </div>
  )

}

export default ReactionButtons
