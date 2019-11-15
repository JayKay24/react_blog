import React, { useReducer, useEffect, useState } from 'react'

import PostList from './post/PostList'
import CreatePost from './post/CreatePost'
import UserBar from './user/UserBar'
import appReducer from './reducers'
import Header from './Header'
import ChangeTheme from './ChangeTheme'

import { ThemeContext, StateContext } from './contexts'


const headerTitle = 'React Hooks Blog'

export default function App() {
  const [state, dispatch] = useReducer(appReducer, { user: '', posts: []})
  const [theme, setTheme] = useState({ primaryColor: 'deepskyblue', secondaryColor: 'coral' })
  const { user } = state

  useEffect(() => {
    fetch('/api/posts')
      .then(result => result.json())
      .then(posts => dispatch({ type: 'FETCH_POSTS', posts }))
  }, [])
  
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