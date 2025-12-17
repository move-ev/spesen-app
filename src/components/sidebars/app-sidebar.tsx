import { APP_ROUTES } from "@/lib/routes";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
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
      </SidebarContent>
    </Sidebar>
  );
}
