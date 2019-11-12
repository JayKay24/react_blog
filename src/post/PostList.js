import React from 'react'

import Post from './Post'

export default function PostList({ posts = [] }) {
  return (
    <div>
      {posts.map((p, i) =>
        <React.Fragment key={i}>
          <Post {...p} key={'post-' + i}/>
          <hr />
        </ React.Fragment>
      )}
    </div>
  )
}