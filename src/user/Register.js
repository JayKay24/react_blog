import React, { useState, useContext } from 'react'

import { StateContext } from '../contexts'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const { dispatch } = useContext(StateContext)

  function handleUsername(evt) {
    setUsername(evt.target.value)
  }

  function handlePassword(evt) {
    setPassword(evt.target.value)
  }

  function handlePasswordRepeat(evt) {
    setPasswordRepeat(evt.target.value)
  }

  return (
    <form onSubmit={e => { e.preventDefault(); dispatch({ type: 'REGISTER', username })}}>
      <label htmlFor="register-username">Username:</label>
      <input 
        type="text" 
        name="register-username" 
        id="register-username"
        value={username}
        onChange={handleUsername}
      />
      <label htmlFor="register-password">Password:</label>
      <input 
        type="password" 
        name="register-password" 
        id="register-password"
        value={password}
        onChange={handlePassword}
      />
      <label htmlFor="register-password-repeat">Repeat Password:</label>
      <input 
        type="password" 
        name="register-password-repeat" 
        id="register-password-repeat"
        value={passwordRepeat}
        onChange={handlePasswordRepeat}
      />
      <input 
        type="submit" 
        value="Register" 
        disabled={username.length === 0 || password.length === 0 || password !== passwordRepeat} />
    </form>
  )
}