import { FC, memo } from 'react'
import { Link } from 'react-router-dom'

import { Post, selectPostById } from './postSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { useAppSelector } from '../hooks/useAppSelector'

interface PostExcerptProps {
  // post: Post
  postId: number
}

let PostExcerpt: FC<PostExcerptProps> = ({ postId }) => {

  const post = useAppSelector(state => selectPostById(state, postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <article>

      <h2>{post.title}</h2>

      <p className="excerpt">{post.body.substring(0, 75)}...</p>

      <p className="postCredit">

        <Link to={`post/${post.id}`}>View Post</Link>

        <PostAuthor userId={post.userId}/>

        <TimeAgo timestamp={post.date}/>

      </p>

      <ReactionButtons post={post}/>

    </article>
  )

}

PostExcerpt = memo(PostExcerpt)

export default PostExcerpt
