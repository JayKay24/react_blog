import React, { useEffect } from 'react'
import { useNavigation } from 'react-navi'
import { useInput } from 'react-hookedup'

import { useDispatch, useUserState, useAPICreatePost, useDebouncedUndo } from '../hooks'

export default function CreatePost() {
  const { value: title, bindToInput: bindTitle } = useInput('')

  const dispatch = useDispatch()
  const [post ,createPost] = useAPICreatePost()

  const navigation = useNavigation()

  useEffect(() => {
    if(post && post.data) {
      dispatch({ type: 'CREATE_POST', ...post.data })
      navigation.navigate(`/view/${post.data.id}`)
    }
  })
  const user = useUserState()

  const [content, setContent, { undo, redo, canUndo, canRedo }] = useDebouncedUndo()

  function handleContent(evt) {
    const { value } = evt.target
    setContent(value)
  }

  function handleCreate() {
    const newPost = { title, content, author: user }
    // here, we are not handling the failure of post creation, but it is good practice to 
    // always handle error states in real-world applications
    createPost({ ...newPost })
  }

  return (
    <form onSubmit={e => { e.preventDefault(); handleCreate() }}>
      <div>Author: {user}</div>
      <div>
        <label htmlFor="create-title">Title:</label>
        <input 
          type="text" 
          name="create-title" 
          id="create-title" 
          value={title}
          {...bindTitle}
        />
      </div>
      <textarea value={content} onChange={handleContent }></textarea>
      <button type="button" onClick={undo} disabled={!canUndo}>
        Undo
      </button>
      <button type="button" onClick={redo} disabled={!canRedo}>
        Redo
      </button>
      <input type="submit" value="Create" />
    </form>
  )
}