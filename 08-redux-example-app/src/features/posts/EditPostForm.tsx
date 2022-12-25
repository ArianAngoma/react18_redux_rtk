import { ChangeEvent, FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppSelector } from '../hooks/useAppSelector'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { deletePost, selectPostById, updatePost } from './postSlice'

const EditPostForm: FC = () => {

  const { postId } = useParams()
  const navigate = useNavigate()

  const post = useAppSelector(state => selectPostById(state, Number(postId)))
  const users = useAppSelector(state => state.users)

  const [title, setTitle] = useState<string | undefined>(post?.title)
  const [body, setBody] = useState<string | undefined>(post?.body)
  const [userId, setUserId] = useState<number | undefined>(post?.userId)
  const [requestStatus, setRequestStatus] = useState<'idle' | 'pending'>('idle')

  const dispatch = useAppDispatch()

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const onTitleChanged = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
  const onBodyChanged = (e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)
  const onAuthorChanged = (e: ChangeEvent<HTMLSelectElement>) => setUserId(Number(e.target.value))

  const canSave = [title, body, userId].every(Boolean) && requestStatus === 'idle'

  const onSavePostClicked = async () => {

    if (canSave) {

      try {

        setRequestStatus('pending')

        await dispatch(
          updatePost({
            id: post.id,
            title,
            body,
            userId,
          })
        ).unwrap()

        setTitle('')
        setBody('')
        setUserId(undefined)
        navigate(`/post/${postId}`)

      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setRequestStatus('idle')
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

      setRequestStatus('pending')

      await dispatch(
        deletePost({
          id: post.id,
        })
      ).unwrap()

      setTitle('')
      setBody('')
      setUserId(undefined)

      navigate('/')

    } catch (err) {
      console.error('Failed to delete the post: ', err)
    } finally {
      setRequestStatus('idle')
    }

  }

  return (
    <section>

      <h2>Edit Post</h2>

      <form>

        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          name="postAuthor"
          value={userId}
          onChange={onAuthorChanged}
        >
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postBody">Content:</label>
        <textarea
          id="postBody"
          name="postBody"
          value={body}
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

export default EditPostForm
