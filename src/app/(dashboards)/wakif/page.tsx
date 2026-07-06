import { DashboardLayout } from "@/components/layout/DashboardLayout";

const sidebarItems = [
  { name: "Cari Proyek", href: "/wakif/cari", icon: "🔍" },
  { name: "Portofolio Wakaf", href: "/wakif/portofolio", icon: "📁" },
  { name: "Laporan Real-time", href: "/wakif/laporan", icon: "📊" },
];

export default function WakifDashboard() {
  return (
    <DashboardLayout roleName="Wakif (Donatur)" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Wakif</h1>
          <p className="text-gray-500 mt-1">Pantau dampak dari wakaf jariyah yang telah Anda berikan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
            <h3 className="text-gray-500 font-medium">Total Wakaf Tersalurkan</h3>
            <p className="text-4xl font-bold text-primary mt-2">Rp 25.000.000</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
            <h3 className="text-gray-500 font-medium">Proyek Didukung</h3>
            <p className="text-4xl font-bold text-secondary mt-2">3 Masjid</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-bold">Proyek Sedang Berjalan</h2>
            <span className="text-sm text-primary font-medium cursor-pointer hover:underline">Lihat Semua</span>
          </div>
          <div className="p-6 space-y-6">
            {/* Mock Project Progress */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold">Pembangunan Masjid Jami' An-Nur</span>
                <span className="font-bold text-primary">60% Selesai</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-primary h-3 rounded-full" style={{ width: "60%" }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Pembaruan terakhir: Pemasangan atap kubah utama (2 hari yang lalu)</p>
            </div>
            
            <hr className="border-gray-100" />
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-bold">Pesantren Tahfidz Al-Ikhlas</span>
                <span className="font-bold text-secondary">20% Selesai</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-secondary h-3 rounded-full" style={{ width: "20%" }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Pembaruan terakhir: Peletakan batu pertama dan pondasi (1 minggu yang lalu)</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
