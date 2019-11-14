import React, { useReducer, useEffect, useState } from 'react'

import PostList from './post/PostList'
import CreatePost from './post/CreatePost'
import UserBar from './user/UserBar'
import appReducer from './reducers'
import Header from './Header'
import ChangeTheme from './ChangeTheme'
import { ThemeContext, StateContext } from './contexts'

const defaultPosts = [
  {
    title: 'React Hooks',
    content: 'The greatest thing since sliced bread!',
    author: 'James Kinyua'
  },
  {
    title: 'Using React Fragments',
    content: 'Keeping the DOM tree clean!',
    author: 'James Kinyua'
  }
]

const headerTitle = 'React Hooks Blog'

export default function App() {
  const [state, dispatch] = useReducer(appReducer, { user: '', posts: defaultPosts })
  const [theme, setTheme] = useState({ primaryColor: 'deepskyblue', secondaryColor: 'coral' })
  const { user, posts } = state
  
  useEffect(() => {
    if(user) {
      document.title = `${user} - ${headerTitle}`
    } else {
      document.title = headerTitle
    }
  }, [user])

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>
        <div style={{ padding: 8 }}>
          <Header text={headerTitle} />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <br />
          <UserBar />
          <br />
          { user && <CreatePost /> }
          <br />
          <hr />
          <PostList />
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  )
}