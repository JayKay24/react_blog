import { useResource } from 'react-request-hook'

export function useAPILogin() {
  return useResource((username, password) => ({
    // in a real world application, use a POST request for login instead and send the password as part of the POST data
    // Also, make sure to use HTTPS so that the POST data will be encrypted
    url: `/login/${encodeURI(username)}/${encodeURI(password)}`,
    method: 'get'
  }))
}

export function useAPIRegister() {
  return useResource((username, password) => ({
    url: '/users',
    method: 'post',
    data: { username, password }
  }))
}

export function useAPICreatePost() {
  return useResource(({ title, content, author }) => ({
    url: '/posts',
    method: 'post',
    data: { title, content, author }
  }))
}

export function useAPIThemes() {
  return useResource(() => ({ url: '/themes', method: 'get' }))
}
