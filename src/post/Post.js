import React, { useContext } from 'react'

import { ThemeContext } from '../contexts'

function Post({ title, content, author }) {
  const { secondaryColor } = useContext(ThemeContext)

  return (
    <div>
      <h3 style={{ color: secondaryColor }}>{title}</h3>
      <div>{content}</div>
      <br />
      <i>Written by {author}</i>
    </div>
  )
}

export default React.memo(Post)