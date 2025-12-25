import { HydrateClient } from '@/trpc/server'

export default async function Home() {
  return (
    <HydrateClient>
      <main className="py-12">
        <p>Hello World</p>
      </main>
    </HydrateClient>
  )
}
