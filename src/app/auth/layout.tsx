import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import type React from 'react'
import { APP_ROUTES } from '@/lib/routes'
import { auth } from '@/server/better-auth'

export default async function ServerLayout({
  children,
}: React.PropsWithChildren) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // When the user is already logged in, redirect to the home page
  if (session?.user) {
    redirect(APP_ROUTES.HOME)
  }

  return (
    <main className="flex min-h-svh items-center justify-center py-12">
      <section className="mx-auto w-full max-w-md px-8">{children}</section>
    </main>
  )
}
