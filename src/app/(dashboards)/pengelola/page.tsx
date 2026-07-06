import { DashboardLayout } from "@/components/layout/DashboardLayout";

const sidebarItems = [
  { name: "Proposal Baru", href: "/pengelola/proposal", icon: "📝" },
  { name: "Penyusunan RAB", href: "/pengelola/rab", icon: "💰" },
  { name: "Arsitek & Desain", href: "/pengelola/desain", icon: "📐" },
  { name: "Brief Assessment", href: "/pengelola/assessment", icon: "🔍" },
];

export default function PengelolaDashboard() {
  return (
    <DashboardLayout roleName="Pengelola Aset" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Pengelola Aset</h1>
          <p className="text-gray-500 mt-1">Kelola pengajuan pembangunan fasilitas umat Anda di sini.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm border-l-4 border-l-gray-400">
            <h3 className="text-sm font-medium text-gray-500">Draft Proposal</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">2</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm border-l-4 border-l-blue-400">
            <h3 className="text-sm font-medium text-gray-500">Sedang Direview</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">1</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm border-l-4 border-l-secondary">
            <h3 className="text-sm font-medium text-gray-500">Proses Konstruksi</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">1</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm border-l-4 border-l-primary">
            <h3 className="text-sm font-medium text-gray-500">Selesai</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">3</p>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-6 flex items-start gap-4">
          <div className="text-3xl">💡</div>
          <div>
            <h3 className="font-bold text-emerald-800">Langkah Pertama</h3>
            <p className="text-emerald-700 mt-1">Mulai ajukan pembangunan dengan membuat <b>Proposal Baru</b>. Tim arsitek dan konsultan kami siap membantu penyusunan RAB dan Desain.</p>
            <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Buat Proposal
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
