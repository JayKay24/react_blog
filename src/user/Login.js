import React, { useState, useEffect } from 'react'
import { useInput } from 'react-hookedup'

import { useDispatch, useAPILogin } from '../hooks'

function useLoginEffect(user, dispatch, setLoginfailed) {
  useEffect(() => {
    if(user && user.data) {
      if(user.data.length > 0) {
        setLoginfailed(false)
        dispatch({ type: 'LOGIN', username: user.data[0].username })
      } else {
        setLoginfailed(true)
      }
    }

    if(user && user.error) {
      setLoginfailed(true)
    }
  }, [dispatch, setLoginfailed, user])
}

export default function Login() {
  const { value: username, bindToInput: bindUsername } = useInput('')
  const [loginFailed, setLoginfailed] = useState(false)
  const { value: password, bindToInput: bindPassword } = useInput('')
  const dispatch = useDispatch()
  const [user, login] = useAPILogin()

  useLoginEffect(user, dispatch, setLoginfailed)

  return (
    <form onSubmit={e => { e.preventDefault(); login(username, password)}}>
      <label htmlFor="login-username">Username:</label>
      <input 
        type="text"
        name="login-username"
        id="login-username"
        value={username}
        {...bindUsername}
       />
      <label htmlFor="login-password">Password:</label>
      <input 
        type="password" 
        name="login-password" 
        id="login-password"
        value={password}
        {...bindPassword}
      />
      <input type="submit" value="Login" disabled={username.length === 0} />
      {
        loginFailed && 
        <span style={{ color: 'red' }}>Invalid username or password</span>
      }
    </form>
  )
}