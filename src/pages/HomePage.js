import React, { useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook'

import PostList from '../post/PostList'

import { StateContext } from '../contexts'

export default function HomePage() {
  const [posts, getPosts] = useResource(() => ({ url: '/posts', method: 'get' }))
  const { state, dispatch } = useContext(StateContext)
  const { error } = state

  useEffect(getPosts, [])
  useEffect(() => {
    if(posts && posts.error) dispatch({ type: 'POSTS_ERROR' })
    if(posts && posts.data) dispatch({ type: 'FETCH_POSTS', posts: posts.data.reverse() })
  }, [dispatch, posts])

  return (
    <div>
      {error && <b>{error}</b>}
      <PostList />
    </div>
  )
}