import React from 'react'

import Login from './Login'
import Register from './Register'

import { useUserState } from '../hooks'

const Logout = React.lazy(() => import('./Logout'))

export default function UserBar() {
  const user = useUserState()

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