import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { APP_ROUTES, AUTH_ROUTES } from '@/lib/routes'
import { auth } from '@/server/better-auth'

/**
 * Checks if the user is logged in an if they are allowed to access
 * the admin area
 */
export default async function ServerLayout({
  children,
}: React.PropsWithChildren) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user) {
    redirect(AUTH_ROUTES.LOGIN)
  }

  if (session.user.role !== 'admin') {
    redirect(APP_ROUTES.HOME)
  }

  return children
}
