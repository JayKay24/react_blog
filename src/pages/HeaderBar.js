import React, { useContext } from 'react'

import { ThemeContext, StateContext } from '../contexts'

import Header from '../Header'
import ChangeTheme from '../ChangeTheme'
import UserBar from '../user/UserBar'
import CreatePost from '../post/CreatePost'

export default function HeadeBar({ setTheme }) {
  const theme = useContext(ThemeContext)

  const { state } = useContext(StateContext)
  const { user } = state
  return (
    <div>
      <Header text="React Hooks Blog" />
      <ChangeTheme theme={theme} setTheme={setTheme} />
      <br />
      <React.Suspense fallback={"Loading..."}>
        <UserBar />
      </React.Suspense>
      <br />
      { user && <CreatePost /> }
    </div>
  )
}