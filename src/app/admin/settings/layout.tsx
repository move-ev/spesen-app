import AdminSettingsSidebar from "@/components/sidebars/admin-settings";
import { SidebarProvider } from "@/components/ui/sidebar";
import type React from "react";

export default async function ServerLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <SidebarProvider>
      <AdminSettingsSidebar />
      <main className="min-h-screen flex-1 py-12">
        <section className="mx-auto w-full max-w-4xl px-8">{children}</section>
      </main>
    </SidebarProvider>
  );
}
