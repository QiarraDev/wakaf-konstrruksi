export default function RabPage() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Penyusunan RAB</h1>
          <p className="text-gray-500 mt-2">Detail Rencana Anggaran Biaya konstruksi.</p>
        </div>
        <button onClick={() => alert("Membuka form tambah item...")} className="bg-primary text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-primary-dark transition-colors">
          <span>+</span> Tambah Item Biaya
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-gray-600">Kategori</th>
              <th className="p-4 font-semibold text-gray-600">Nama Item</th>
              <th className="p-4 font-semibold text-gray-600">Kuantitas</th>
              <th className="p-4 font-semibold text-gray-600">Harga Satuan</th>
              <th className="p-4 font-semibold text-gray-600">Total Harga</th>
              <th className="p-4 font-semibold text-gray-600 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { cat: 'Material', name: 'Semen Portland (50kg)', qty: '100 Sak', price: 'Rp 65.000', total: 'Rp 6.500.000' },
              { cat: 'Material', name: 'Besi Beton (12mm)', qty: '50 Batang', price: 'Rp 120.000', total: 'Rp 6.000.000' },
              { cat: 'Jasa', name: 'Tukang Batu (Harian)', qty: '30 Hari', price: 'Rp 150.000', total: 'Rp 4.500.000' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50/50">
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${row.cat === 'Material' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {row.cat}
                  </span>
                </td>
                <td className="p-4 font-medium">{row.name}</td>
                <td className="p-4 text-gray-600">{row.qty}</td>
                <td className="p-4 text-gray-600">{row.price}</td>
                <td className="p-4 font-bold text-gray-900">{row.total}</td>
                <td className="p-4 text-center">
                  <button onClick={() => alert("Item dihapus")} className="text-gray-400 hover:text-red-500 transition-colors">🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-end">
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 w-full md:w-1/3">
          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal Material</span>
            <span>Rp 12.500.000</span>
          </div>
          <div className="flex justify-between mb-4 text-gray-600">
            <span>Subtotal Jasa</span>
            <span>Rp 4.500.000</span>
          </div>
          <div className="flex justify-between pt-4 border-t border-gray-200 font-bold text-lg text-gray-900">
            <span>Total Estimasi RAB</span>
            <span className="text-primary">Rp 17.000.000</span>
          </div>
          
          <button onClick={() => { alert("RAB berhasil diajukan untuk divalidasi!"); router.push("/pengelola"); }} className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-bold shadow-md hover:bg-primary-dark transition-colors">
            Ajukan Validasi RAB
          </button>
        </div>
      </div>
    </div>
  );
}
