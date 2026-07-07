import { DashboardLayout } from "@/components/layout/DashboardLayout";

const sidebarItems = [
  {
    "name": "Dashboard",
    "href": "/validator",
    "icon": "📊"
  },
  {
    "name": "Laporan Progres",
    "href": "/validator/laporan",
    "icon": "📸"
  },
  {
    "name": "Checklist Inspeksi",
    "href": "/validator/inspeksi",
    "icon": "✅"
  },
  {
    "name": "Riwayat Laporan",
    "href": "/validator/riwayat",
    "icon": "📋"
  }
];

export default function ValidatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout roleName="Validator Lapangan" sidebarItems={sidebarItems}>
      {children}
    </DashboardLayout>
  );
}
