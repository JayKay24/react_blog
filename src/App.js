import React, { useReducer, useEffect, useState } from 'react'

import HeaderBar from './pages/HeaderBar'
import HomePage from './pages/HomePage'
import appReducer from './reducers'

import { ThemeContext, StateContext } from './contexts'


const headerTitle = 'React Hooks Blog'

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
        <div style={{ padding: 8 }}>
          <HeaderBar setTheme={setTheme} />
          <hr />
          <HomePage />
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  )
}