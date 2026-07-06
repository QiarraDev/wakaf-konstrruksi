import { DashboardLayout } from "@/components/layout/DashboardLayout";

const sidebarItems = [
  {
    "name": "Kontrak Legal",
    "href": "/vendor/kontrak",
    "icon": "📄"
  },
  {
    "name": "Eksekusi Proyek",
    "href": "/vendor/eksekusi",
    "icon": "🔨"
  },
  {
    "name": "Pengajuan Payment",
    "href": "/vendor/payment",
    "icon": "💳"
  },
  {
    "name": "Validasi RAB",
    "href": "/vendor/rab",
    "icon": "✅"
  }
];

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayout roleName="Mitra Vendor" sidebarItems={sidebarItems}>
      {children}
    </DashboardLayout>
  );
}
