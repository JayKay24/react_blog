import React, { useContext } from 'react'
import useWindowSize from '@rehooks/window-size'

import { ThemeContext, StateContext } from '../contexts'

import Header from '../Header'
import ChangeTheme from '../ChangeTheme'
import UserBar from '../user/UserBar'
import CreatePost from '../post/CreatePost'

export default function HeadeBar({ setTheme }) {
  const theme = useContext(ThemeContext)
  const { innerWidth } = useWindowSize()
  const mobilePhone = innerWidth < 640

  const { state } = useContext(StateContext)
  const { user } = state
  return (
    <div>
      <Header text="React Hooks Blog" />
      {!mobilePhone && <ChangeTheme theme={theme} setTheme={setTheme} />}
      {!mobilePhone && <br />}
      {!mobilePhone && 
      <React.Suspense fallback={"Loading..."}>
        <UserBar />
      </React.Suspense>
      }
      {!mobilePhone && <br />}
      { user && <CreatePost /> }
    </div>
  )
}