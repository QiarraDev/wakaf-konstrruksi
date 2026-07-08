



export default function AdminDashboard() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Selamat datang, Admin!</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Ringkasan aktivitas platform Wakaf Konstruksi hari ini.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Menunggu Kurasi</h3>
            <p className="text-3xl font-bold text-primary mt-2">12 Proyek</p>
          </div>
          <div className="stat-card">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Vendor Baru</h3>
            <p className="text-3xl font-bold text-secondary mt-2">5 Pengajuan</p>
          </div>
          <div className="stat-card">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Donasi Hari Ini</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Rp 45.5M</p>
          </div>
        </div>

        <div className="card overflow-hidden mt-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Proyek Terbaru Membutuhkan Persetujuan</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-sm">ID Proyek</th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-sm">Nama Pengajuan</th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-sm">Kategori</th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-sm">Dana Dibutuhkan</th>
                  <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-sm">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {[
                  { id: "PRJ-001", name: "Pembangunan Masjid Jami'", cat: "Masjid", dana: "Rp 1.2M", status: "Menunggu Kurasi" },
                  { id: "PRJ-002", name: "Renovasi Pesantren Al-Huda", cat: "Pesantren", dana: "Rp 500Jt", status: "Revisi RAB" },
                  { id: "PRJ-003", name: "Pembangunan Klinik Desa", cat: "Sosial", dana: "Rp 800Jt", status: "Menunggu Kurasi" },
                  { id: "PRJ-004", name: "Sumur Wakaf Air Bersih", cat: "Infrastruktur", dana: "Rp 150Jt", status: "Disetujui" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="p-4 text-gray-500 dark:text-gray-400 text-sm font-medium">{row.id}</td>
                    <td className="p-4 font-bold text-gray-900 dark:text-white">{row.name}</td>
                    <td className="p-4">
                      <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-md text-xs font-bold border border-blue-100 dark:border-blue-800">{row.cat}</span>
                    </td>
                    <td className="p-4 font-semibold text-gray-700 dark:text-gray-300">{row.dana}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                        row.status === 'Disetujui' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' :
                        row.status === 'Revisi RAB' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800' :
                        'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
