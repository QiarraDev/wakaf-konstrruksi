import { DashboardLayout } from "@/components/layout/DashboardLayout";

const sidebarItems = [
  {
    "name": "Cari Proyek",
    "href": "/wakif/cari",
    "icon": "🔍"
  },
  {
    "name": "Portofolio Wakaf",
    "href": "/wakif/portofolio",
    "icon": "📁"
  },
  {
    "name": "Laporan Real-time",
    "href": "/wakif/laporan",
    "icon": "📊"
  }
];

export default function WakifLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout roleName="Wakif (Donatur)" sidebarItems={sidebarItems}>
      {children}
    </DashboardLayout>
  );
}
