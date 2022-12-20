import { FC } from 'react'

import { useAppSelector } from '../hooks/useAppSelector'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

const SinglePostPage: FC = () => {

  const post = useAppSelector(state => state.posts.posts.find(post => post.id === post.id))

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

      <p>{post.body.substring(0, 100)}</p>

      <p className="postCredit">

        <PostAuthor userId={post.userId}/>

        <TimeAgo timestamp={post.date}/>

      </p>

      <ReactionButtons post={post}/>

    </article>
  )

}

export default SinglePostPage
