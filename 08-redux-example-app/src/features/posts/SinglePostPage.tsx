import { FC } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useAppSelector } from '../hooks/useAppSelector'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { selectGetPostsIsLoading, selectPostById } from './postSlice'

const SinglePostPage: FC = () => {

  const { postId } = useParams()

  const isLoadingPosts = useAppSelector(selectGetPostsIsLoading)
  const post = useAppSelector(state => selectPostById(state, Number(postId)))

  let content
  if (isLoadingPosts) {

    content = <p>Loading...</p>

  } else if (post) {

    content = <article>

      <h2>{post.title}</h2>

      <p>{post.body.substring(0, 100)}</p>

      <p className="postCredit">

        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>

        <PostAuthor userId={post.userId}/>

        <TimeAgo timestamp={post.date}/>

      </p>

      <ReactionButtons post={post}/>

    </article>

  } else {
    content = <p>Post not found!</p>
  }

  return (
    <section>
      {content}
    </section>
  )
}

export default SinglePostPage
