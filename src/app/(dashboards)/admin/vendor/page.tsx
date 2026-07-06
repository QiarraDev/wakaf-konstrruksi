export default function VendorPage() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Validasi Mitra Vendor</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "PT. Maju Jaya Konstruksi", type: "Vendor Resmi", region: "Jawa Barat", status: "Verified" },
          { name: "CV. Bangun Bersama", type: "Swakelola / Lokal", region: "Jawa Tengah", status: "Pending Review" },
        ].map((vendor, i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-6 flex items-start justify-between">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{vendor.name}</h3>
              <p className="text-sm text-gray-500 mt-1">Tipe: {vendor.type} • Area: {vendor.region}</p>
              <div className="mt-4 flex gap-2">
                <button onClick={() => alert("Membuka viewer dokumen PDF...")} className="text-sm font-medium text-primary hover:underline">Lihat Dokumen Legalitas</button>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${vendor.status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {vendor.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}