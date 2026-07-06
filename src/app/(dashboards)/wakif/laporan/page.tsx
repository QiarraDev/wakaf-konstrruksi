export default function LaporanPage() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Laporan Real-time Pembangunan</h1>
      <div className="relative border-l-2 border-emerald-200 ml-3 space-y-8 py-4">
        {[
          { date: "Hari Ini", title: "Pengecoran Atap Lantai 2", desc: "Alhamdulillah pengecoran atap lantai 2 telah selesai dikerjakan oleh tim vendor.", status: "80%" },
          { date: "1 Minggu yang lalu", title: "Pemasangan Dinding Bata", desc: "Pemasangan dinding bata merah untuk keseluruhan lantai 1.", status: "60%" },
          { date: "1 Bulan yang lalu", title: "Pembuatan Pondasi", desc: "Penggalian dan pengecoran pondasi cakar ayam.", status: "20%" },
        ].map((log, i) => (
          <div key={i} className="pl-6 relative">
            <div className="absolute w-4 h-4 bg-emerald-500 rounded-full -left-[9px] top-1 border-4 border-white"></div>
            <p className="text-xs font-bold text-gray-400">{log.date}</p>
            <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl mt-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-900">{log.title}</h3>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded">Progres: {log.status}</span>
              </div>
              <p className="text-gray-600 text-sm">{log.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}