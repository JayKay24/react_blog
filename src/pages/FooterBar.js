import React from 'react'
import { useCurrentRoute, Link } from 'react-navi'

export default function FooterBar() {
  const { url } = useCurrentRoute()

  return (
    <footer>
      <Link href={url.href}>{url.href}</Link>
    </footer>
  )
}