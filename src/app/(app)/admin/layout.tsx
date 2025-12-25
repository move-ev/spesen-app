import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { APP_ROUTES } from '@/lib/routes'
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

  // The main app layout will check if the user is logged in
  // and redirect to the login page if not. We can safely assume that
  // the user is logged in at this point.

  //   if (!session?.user) {
  //     redirect(AUTH_ROUTES.LOGIN);
  //   }

  if (session?.user?.role !== 'admin') {
    redirect(APP_ROUTES.HOME)
  }

  return children
}
