import { DashboardLayout } from "@/components/layout/DashboardLayout";

const sidebarItems = [
  { name: "Kontrak Legal", href: "/vendor/kontrak", icon: "📄" },
  { name: "Eksekusi Proyek", href: "/vendor/eksekusi", icon: "🔨" },
  { name: "Pengajuan Payment", href: "/vendor/payment", icon: "💳" },
  { name: "Validasi RAB", href: "/vendor/rab", icon: "✅" },
];

export default function VendorDashboard() {
  return (
    <DashboardLayout roleName="Mitra Vendor" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor & Kontraktor</h1>
          <p className="text-gray-500 mt-1">Kelola eksekusi proyek, laporkan milestone 20%, dan ajukan termin pembayaran.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Proyek Aktif</h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">2</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Payment Pending</h3>
            <p className="text-3xl font-bold text-secondary mt-2">1 Termin</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Validasi RAB Menunggu</h3>
            <p className="text-3xl font-bold text-red-500 mt-2">3 Dokumen</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mt-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold">Milestone Reporting (Kelipatan 20%)</h2>
          </div>
          <div className="p-6">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900">Pembangunan Masjid Jami' An-Nur</h4>
                <p className="text-sm text-gray-500 mt-1">Target Milestone Saat Ini: 80%</p>
              </div>
              <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                Laporkan Progres 80%
              </button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex items-center justify-between mt-4">
              <div>
                <h4 className="font-bold text-gray-900">Pesantren Tahfidz Al-Ikhlas</h4>
                <p className="text-sm text-gray-500 mt-1">Target Milestone Saat Ini: 40%</p>
              </div>
              <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                Laporkan Progres 40%
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
