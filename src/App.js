import React, { useReducer, useEffect, useState } from 'react'
import { Router, View } from 'react-navi'
import { mount, route } from 'navi'

import HeaderBar from './pages/HeaderBar'
import HomePage from './pages/HomePage'
import appReducer from './reducers'

import { ThemeContext, StateContext } from './contexts'
import PostPage from './pages/PostPage'


const headerTitle = 'React Hooks Blog'

const routes = mount({
  '/': route({ view: <HomePage /> }),
  '/view/:id': route(req => ({ view: <PostPage id={req.params.id} /> }))
})

export default function App() {
  const [state, dispatch] = useReducer(appReducer, { user: '', posts: [], error: '' })
  const [theme, setTheme] = useState({ primaryColor: 'deepskyblue', secondaryColor: 'coral' })
  const { user } = state

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
        <Router routes={routes}>
          <div style={{ padding: 8 }}>
            <HeaderBar setTheme={setTheme} />
            <hr />
            <View />
          </div>
        </Router>
      </ThemeContext.Provider>
    </StateContext.Provider>
  )
}