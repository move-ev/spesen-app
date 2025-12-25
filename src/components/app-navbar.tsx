import { cn } from '@/lib/utils'
import { api } from '@/trpc/server'
import { AppCommand } from './app-command'
import { SidebarTrigger } from './ui/sidebar'
import { UserMenu } from './user-menu'

export default async function AppNavbar({
  className,
  ...props
}: React.ComponentProps<'nav'>) {
  void api.auth.getCurrentSession.prefetch()

  return (
    <nav
      data-slot="app-navbar"
      className={cn(
        'mx-auto flex w-full max-w-384 items-center justify-start gap-1 px-8 py-6',
        className,
      )}
      {...props}
    >
      <SidebarTrigger className="me-3 text-zinc-600" />
      <AppCommand className="mr-auto" />
      <UserMenu />
    </nav>
  )
}
