import React, { useContext } from 'react'

import Login from './Login'
import Register from './Register'

import { StateContext } from '../contexts'

const Logout = React.lazy(() => import('./Logout'))

export default function UserBar() {
  const { state } = useContext(StateContext)
  const { user } = state

  if (user) {
    return <Logout />
  } else {
    return (
      <>
        <Login />
        <Register />
      </>
    )
  }
}