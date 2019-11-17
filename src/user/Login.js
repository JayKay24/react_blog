import React, { useState, useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook'
import { useInput } from 'react-hookedup'

import { StateContext } from '../contexts'

export default function Login() {
  const { value: username, bindToInput: bindUsername } = useInput('')
  const [loginFailed, setLoginfailed] = useState(false)
  const { value: password, bindToInput: bindPassword } = useInput('')
  const { dispatch } = useContext(StateContext)
  const [user, login] = useResource((username, password) => ({
    // in a real world application, use a POST request for login instead and send the password as part of the POST data
    // Also, make sure to use HTTPS so that the POST data will be encrypted
    url: `/login/${encodeURI(username)}/${encodeURI(password)}`,
    method: 'get'
  }))

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
  }, [dispatch, user])

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