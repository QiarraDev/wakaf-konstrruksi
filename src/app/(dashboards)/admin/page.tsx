



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
          <div className="p-6 text-center text-gray-500 dark:text-gray-400 py-12">
            Belum ada data pengajuan proyek terbaru.
          </div>
        </div>
      </div>
    </>
  );
}
