import React, { useState, useContext, useEffect } from 'react'
import { useResource   } from 'react-request-hook'
import { useNavigation } from 'react-navi'

import { StateContext } from '../contexts'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { state, dispatch } = useContext(StateContext)
  const [post ,createPost] = useResource(({ title, content, author }) => ({
    url: '/posts',
    method: 'post',
    data: { title, content, author }
  }))

  const navigation = useNavigation()

  useEffect(() => {
    if(post && post.data) {
      dispatch({ type: 'CREATE_POST', ...post.data })
      navigation.navigate(`/view/${post.data.id}`)
    }
  })
  const { user } = state

  function handleTitle(evt) {
    setTitle(evt.target.value)
  }

  function handleContent(evt) {
    setContent(evt.target.value)
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
          onChange={handleTitle}
        />
      </div>
      <textarea value={content} onChange={handleContent}></textarea>
      <input type="submit" value="Create" />
    </form>
  )
}