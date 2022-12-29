import { FC } from 'react'
import { Post, Reaction, useAddReactionMutation } from './postSlice'

const reactionEmoji: Record<keyof Reaction, string> = {
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

  const [addReaction] = useAddReactionMutation()

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() => {
          // @ts-ignore
          const newValue = post.reactions[name] + 1
          addReaction({
            postId: post.id,
            reactions: {
              ...post.reactions,
              [name]: newValue
            }
          })
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
