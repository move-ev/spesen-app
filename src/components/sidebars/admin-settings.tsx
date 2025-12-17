import { ADMIN_SETTINGS_ROUTES } from "@/lib/routes";
import { Building2Icon } from "lucide-react";
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
    href: ADMIN_SETTINGS_ROUTES.BUSINESS_UNIT,
    label: "Geschäftseinheiten",
    icon: Building2Icon,
  },
];

export default async function AdminSettingsSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Einstellungen</SidebarGroupLabel>
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
