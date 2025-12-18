import AdminStats from "@/components/admin-stats";
import { PageTitle } from "@/components/page-title";

export default async function ServerPage() {
  return (
    <>
      <header className="mx-auto w-full max-w-4xl px-8">
        <PageTitle>Admin</PageTitle>
      </header>
      <section className="mx-auto mt-12 w-full max-w-4xl px-8">
        <AdminStats />
      </section>
    </>
  );
}
