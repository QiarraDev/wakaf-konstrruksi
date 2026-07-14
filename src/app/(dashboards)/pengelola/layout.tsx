import { DashboardLayout } from "@/components/layout/DashboardLayout";

const sidebarItems = [
  {
    "name": "Proposal Baru",
    "href": "/pengelola/proposal",
    "icon": "📝"
  },
  {
    "name": "Brief Assessment",
    "href": "/pengelola/assessment",
    "icon": "🔍"
  }
];

export default function PengelolaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout roleName="Pengelola Aset" sidebarItems={sidebarItems}>
      {children}
    </DashboardLayout>
  );
}
