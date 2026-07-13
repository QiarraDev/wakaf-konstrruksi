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
  },
  {
    "name": "Edit Proposal (Manual)",
    "href": "/admin/proposal",
    "icon": "📝"
  },
  {
    "name": "Edit RAB (Manual)",
    "href": "/admin/rab",
    "icon": "💰"
  },
  {
    "name": "Edit Desain (Manual)",
    "href": "/admin/desain",
    "icon": "📐"
  },
  {
    "name": "Edit Assessment (Manual)",
    "href": "/admin/assessment",
    "icon": "🔍"
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
