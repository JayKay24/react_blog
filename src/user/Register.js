import React, { useEffect } from 'react'
import { useInput } from 'react-hookedup'

import { useDispatch, useAPIRegister } from '../hooks'

function useRegisterEffect(user, dispatch) {
  useEffect(() => {
    if(user && user.data) dispatch({ type: 'REGISTER', username: user.data.username })
  }, [dispatch, user])
}

export default function Register() {
  const { value: username, bindToInput: bindUsername } = useInput('')
  const { value: password, bindToInput: bindPassword } = useInput('')
  const { value: passwordRepeat, bindToInput: bindPasswordRepeat } = useInput('')
  const [user, register] = useAPIRegister()
  const dispatch = useDispatch()

  useRegisterEffect(user, dispatch)

  return (
    <form onSubmit={e => { e.preventDefault(); register(username, password)}}>
      <label htmlFor="register-username">Username:</label>
      <input 
        type="text" 
        name="register-username" 
        id="register-username"
        value={username}
        {...bindUsername}
      />
      <label htmlFor="register-password">Password:</label>
      <input 
        type="password" 
        name="register-password" 
        id="register-password"
        value={password}
        {...bindPassword}
      />
      <label htmlFor="register-password-repeat">Repeat Password:</label>
      <input 
        type="password" 
        name="register-password-repeat" 
        id="register-password-repeat"
        value={passwordRepeat}
        {...bindPasswordRepeat}
      />
      <input 
        type="submit" 
        value="Register" 
        disabled={username.length === 0 || password.length === 0 || password !== passwordRepeat} />
    </form>
  )
}