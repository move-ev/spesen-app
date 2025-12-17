import AppNavbar from "@/components/app-navbar";
import AppSidebar from "@/components/sidebars/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AUTH_ROUTES } from "@/lib/routes";
import { auth } from "@/server/better-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ServerLayout({
  children,
}: React.PropsWithChildren) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // If the user is not logged in, redirect to the login page
  if (!session?.user) {
    redirect(AUTH_ROUTES.LOGIN);
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <AppNavbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
