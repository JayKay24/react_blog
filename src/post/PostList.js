import React from 'react'

import Post from './Post'

export default function PostList({ posts = [] }) {
  return (
    <div>
      {posts.map((p, i) =>
        <>
          <Post {...p} key={'post-' + i}/>
          <hr />
        </>
      )}
    </div>
  )
}