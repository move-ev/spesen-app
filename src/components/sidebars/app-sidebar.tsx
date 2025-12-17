import { ADMIN_SETTINGS_ROUTES, APP_ROUTES } from "@/lib/routes";
import { auth } from "@/server/better-auth";
import { HomeIcon, SettingsIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "../ui/sidebar";

const routes = [
  {
    href: APP_ROUTES.HOME,
    label: "Dashboard",
    icon: HomeIcon,
  },
];
export default async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <p>Spesen</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {routes.map((route) => (
              <SidebarMenuButton asChild key={route.href}>
                <Link href={route.href}>
                  <route.icon />
                  {route.label}
                </Link>
              </SidebarMenuButton>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <Suspense>
          <AdminSidebarSection />
        </Suspense>
      </SidebarContent>
    </Sidebar>
  );
}

const adminRoutes = [
  {
    href: ADMIN_SETTINGS_ROUTES.BUSINESS_UNIT,
    label: "Einstellungen",
    icon: SettingsIcon,
  },
];

async function AdminSidebarSection({
  ...props
}: React.ComponentProps<typeof SidebarGroup>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user?.role !== "admin") {
    return <p>Keine Berechtigung</p>;
  }

  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel>Administration</SidebarGroupLabel>
      <SidebarMenu>
        {adminRoutes.map((route) => (
          <SidebarMenuButton asChild key={route.href}>
            <Link href={route.href}>
              <route.icon />
              {route.label}
            </Link>
          </SidebarMenuButton>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
