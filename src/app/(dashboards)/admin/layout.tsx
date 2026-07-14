import { DashboardLayout } from "@/components/layout/DashboardLayout";

const sidebarItems = [
  {
    "name": "Kurasi Proyek",
    "href": "/admin/kurasi",
    "icon": "📋"
  },
  {
    "name": "Final Approval 👑",
    "href": "/admin/approval",
    "icon": "🏆"
  },
  {
    "name": "Validasi Vendor",
    "href": "/admin/vendor",
    "icon": "✅"
  },
  {
    "name": "Distribusi Area",
    "href": "/admin/distribusi",
    "icon": "🗺️"
  },
  {
    "name": "Edukasi LMS",
    "href": "/admin/lms",
    "icon": "📚"
  }
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout roleName="Admin" sidebarItems={sidebarItems}>
      {children}
    </DashboardLayout>
  );
}
