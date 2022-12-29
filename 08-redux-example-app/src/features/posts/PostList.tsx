import { FC } from 'react'

import { useAppSelector } from '../hooks/useAppSelector'
import { selectPostIds, useGetPostsQuery } from './postSlice'
import PostExcerpt from './PostExcerpt'

const PostList: FC = () => {

  const {
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery()

  const orderedPostsIds = useAppSelector(selectPostIds)

  let content

  if (isLoading) {

    content = <p>Loading...</p>

  } else if (isSuccess) {

    content = orderedPostsIds.map(postId => (
      <PostExcerpt
        key={postId}
        postId={Number(postId)}
      />
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
      {content}
    </section>
  )

}

export default PostList
