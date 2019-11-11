import React, { useState } from 'react'

export default function CreatePost({ user, posts, setPosts }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  function handleTitle(evt) {
    setTitle(evt.target.value)
  }

  function handleContent(evt) {
    setContent(evt.target.value)
  }

  function handleCreate() {
    const newPost = { title, content, author: user }
    setPosts([newPost, ...posts])
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