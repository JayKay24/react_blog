import React, { useEffect } from 'react'
import { useResource } from 'react-request-hook'
import { Link } from 'react-navi'

import FooterBar from './FooterBar'
import Post from '../post/Post'

export default function PostPage({ id }) {
  const [post, getPost] = useResource(() => ({
    url: `/posts/${id}`,
    method: 'get'
  }))

  useEffect(getPost, [id])

  return (
    <div>
      <Link href="/">Go Back</Link>
      {(post && post.data)
        ?  <Post {...post.data} />
        :  'Loading...'
      }
      <br />
      <FooterBar />
    </div>
  )
}