export default function ValidasiRabPage() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Validasi RAB dari Pengelola</h1>
      <p className="text-gray-500 mb-6">Review dan berikan penyesuaian (adjustment) terhadap Rencana Anggaran Biaya yang diajukan oleh Pengelola Aset sebelum disetujui Admin.</p>
      
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 text-gray-600">Item</th>
              <th className="p-4 text-gray-600">Harga Pengajuan</th>
              <th className="p-4 text-gray-600">Harga Penyesuaian Vendor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="p-4 font-medium">Semen Portland (100 Sak)</td>
              <td className="p-4 text-gray-500">Rp 6.500.000</td>
              <td className="p-4"><input type="text" className="border p-2 rounded w-full" defaultValue="Rp 6.700.000" /></td>
            </tr>
            <tr>
              <td className="p-4 font-medium">Besi Beton 12mm (50 Btg)</td>
              <td className="p-4 text-gray-500">Rp 6.000.000</td>
              <td className="p-4"><input type="text" className="border p-2 rounded w-full" defaultValue="Rp 6.000.000" /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-end">
         <button onClick={() => { alert("Validasi RAB berhasil dikirim ke Admin!"); router.push("/vendor"); }} className="bg-primary text-white px-6 py-2 rounded-lg font-bold">Kirim Validasi Final</button>
      </div>
    </div>
  );
}