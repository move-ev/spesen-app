import type { User } from 'better-auth'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function UserAvatar({
  user,
  ...props
}: React.ComponentProps<typeof Avatar> & {
  user: User
}) {
  const initials = React.useMemo(() => {
    if (!user.name) return '?'

    const [firstName, lastName] = user.name.split(' ')

    if (!firstName && !lastName) return '?'

    let initials = ''

    if (firstName) {
      initials += firstName.charAt(0).toUpperCase()
    }

    if (lastName) {
      initials += lastName.charAt(0).toUpperCase()
    }

    return initials
  }, [user.name])

  return (
    <Avatar {...props}>
      <AvatarImage src={user.image ?? ''} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  )
}
