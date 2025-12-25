'use client'

import { LogOutIcon } from 'lucide-react'
import { api } from '@/trpc/react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { UserAvatar } from './user-avatar'

export function UserMenu({ ...props }: React.ComponentProps<typeof Button>) {
  const [session] = api.auth.getCurrentSession.useSuspenseQuery()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={'ghost'} size={'icon'} {...props}>
          <UserAvatar user={session.user} className="size-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 min-w-(--radix-dropdown-menu-trigger-width)"
        align="end"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground max-w-full truncate text-xs">
            {session.user.email}
          </DropdownMenuLabel>
          <DropdownMenuItem variant="destructive">
            <LogOutIcon />
            <span>Abmelden</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
