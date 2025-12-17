import type React from "react";



export default async function ServerLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <main className="flex min-h-svh items-center justify-center py-12">
      <section className="mx-auto w-full max-w-md px-8">{children}</section>
    </main>
  );
}
