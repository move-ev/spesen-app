import { CreateReport } from '@/components/create-report'
import { HydrateClient } from '@/trpc/server'

export default async function Home() {
  return (
    <HydrateClient>
      <main className="py-12">
        <p>Hello World</p>
        <CreateReport />
      </main>
    </HydrateClient>
  )
}
