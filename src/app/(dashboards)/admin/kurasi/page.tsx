export default function KurasiPage() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Kurasi & Approval Proyek</h1>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-600">ID Proyek</th>
              <th className="p-4 font-semibold text-gray-600">Nama Pengajuan</th>
              <th className="p-4 font-semibold text-gray-600">Kategori</th>
              <th className="p-4 font-semibold text-gray-600">Dana Dibutuhkan</th>
              <th className="p-4 font-semibold text-gray-600">Status</th>
              <th className="p-4 font-semibold text-gray-600 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { id: "PRJ-001", name: "Pembangunan Masjid Jami'", cat: "Masjid", dana: "Rp 1.2M", status: "Menunggu Review" },
              { id: "PRJ-002", name: "Renovasi Pesantren Al-Huda", cat: "Pesantren", dana: "Rp 500Jt", status: "Menunggu Review" },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 text-gray-500 text-sm">{row.id}</td>
                <td className="p-4 font-bold text-gray-900">{row.name}</td>
                <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">{row.cat}</span></td>
                <td className="p-4 text-gray-700">{row.dana}</td>
                <td className="p-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">{row.status}</span></td>
                <td className="p-4 text-center space-x-2">
                  <button onClick={() => alert("Proposal disetujui!")} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded text-sm hover:bg-emerald-200 font-bold">Terima</button>
                  <button onClick={() => alert("Proposal ditolak!")} className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200 font-bold">Tolak</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}