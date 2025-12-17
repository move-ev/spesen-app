import AdminSettingsSidebar from "@/components/sidebars/admin-settings";
import { SidebarProvider } from "@/components/ui/sidebar";
import type React from "react";

/**
 * This layout is only responsible for wrapping the admin settings routes.
 * We separate this layout from the default admin app since the settings
 * routes have their own sidebar
 */
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
