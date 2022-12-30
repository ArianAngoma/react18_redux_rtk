import { ChangeEvent, FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppSelector } from '../hooks/useAppSelector'
import {
  selectGetPostsIsLoading,
  selectPostById,
  useDeletePostMutation,
  useUpdatePostMutation
} from './postSlice'

const EditPostForm: FC = () => {

  const { postId } = useParams()
  const navigate = useNavigate()

  const [updatePost, { isLoading }] = useUpdatePostMutation()
  const [deletePost] = useDeletePostMutation()

  const isLoadingPosts = useAppSelector(selectGetPostsIsLoading)
  const post = useAppSelector(state => selectPostById(state, Number(postId)))
  const users = useAppSelector(state => state.users)

  const [title, setTitle] = useState<string>(post?.title ?? '')
  const [body, setBody] = useState<string>(post?.body ?? '')
  const [userId, setUserId] = useState<number>(post?.userId ?? 0)

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const onBodyChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)
  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) => setUserId(Number(e.target.value))

  const canSave = [title, body, userId].every(Boolean) && !isLoading

  const onSavePostClicked = async () => {

    if (canSave) {

      try {

        await updatePost(
          {
            id: Number(postId),
            title,
            body,
            userId
          }
        ).unwrap()

        setTitle('')
        setBody('')
        setUserId(0)
        navigate(`/post/${postId}`)

      } catch (err) {
        console.error('Failed to save the post: ', err)
      }

    }

  }

  const usersOptions = users.map(user => (
    <option
      key={user.id}
      value={user.id}
    >
      {user.name}
    </option>
  ))

  const onDeletePicClicked = async () => {

    try {

      await deletePost({
        id: Number(postId)
      }).unwrap()

      setTitle('')
      setBody('')
      setUserId(0)

      navigate('/')

    } catch (err) {
      console.error('Failed to delete the post: ', err)
    }

  }

  if (isLoadingPosts) {

    return (
      <section>
        <h2>Loading...</h2>
      </section>
    )

  } else if (!post) {

    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )

  } else {

    console.log(post)

    return (
      <section>

        <h2>Edit Post</h2>

        <form>

          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={!title ? post.title : title}
            onChange={onTitleChanged}
          />

          <label htmlFor="postAuthor">Author:</label>
          <select
            id="postAuthor"
            name="postAuthor"
            value={!userId ? post.userId : userId}
            onChange={onAuthorChanged}
          >
            <option value=""></option>
            {usersOptions}
          </select>

          <label htmlFor="postBody">Content:</label>
          <textarea
            id="postBody"
            name="postBody"
            value={!body ? post.body : body}
            onChange={onBodyChanged}
          />

          <button
            type="button"
            onClick={onSavePostClicked}
            disabled={!canSave}
          >
            Save Post
          </button>

          <button
            className="deleteButton"
            type="button"
            onClick={onDeletePicClicked}
          >
            Delete Post
          </button>

        </form>

      </section>
    )

  }

}

export default EditPostForm
