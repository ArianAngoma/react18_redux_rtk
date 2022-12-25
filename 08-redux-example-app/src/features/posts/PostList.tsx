import { FC, useEffect, useMemo } from 'react'

import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { fetchPosts, getPostsError, getPostsStatus, selectAllPosts, selectPostIds } from './postSlice'
import PostExcerpt from './PostExcerpt'
import { useSelector } from 'react-redux'

const PostList: FC = () => {

  /*
  * This is the best way to obtain some state since we only get the specific state we want, and we don't worry if another state changes and will render the component.
  *  */
  // const posts = useAppSelector(selectAllPosts)
  const orderedPostsIds = useSelector(selectPostIds)

  const status = useAppSelector(getPostsStatus)

  const error = useAppSelector(getPostsError)

  /* const {
    posts,
    status,
    error
  } = useAppSelector(state => state.posts)
  const dispatch = useAppDispatch()

  useEffect(() => {

    if (status === 'idle') {
      dispatch(fetchPosts())
    }

  }, [status]) */

  const content = useMemo(() => {

    if (status === 'loading') {

      return <p>Loading...</p>

    } else if (status === 'succeeded') {

      return orderedPostsIds.map(postId => (
        <PostExcerpt
          key={postId}
          // post={post}
          postId={Number(postId)}
        />
      ))

    } else if (status === 'failed') {

      return <p>{error}</p>

    }

  }, [status, orderedPostsIds, error])

  return (
    <section>
      {content}
    </section>
  )

}

export default PostList
