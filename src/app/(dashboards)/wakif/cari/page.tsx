export default function CariPage() {
  return (
    <div className="bg-transparent mt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Cari Peluang Wakaf Jariyah</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Masjid Jami' Al-Ikhlas", loc: "Bandung, Jawa Barat", total: 500, current: 350, img: "🕌" },
          { title: "Sumur Wakaf Desa Mandiri", loc: "Gunung Kidul, DIY", total: 50, current: 50, img: "💧" },
          { title: "Asrama Yatim Piatu", loc: "Malang, Jawa Timur", total: 800, current: 120, img: "🏫" },
        ].map((p, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-emerald-50 h-40 flex items-center justify-center text-6xl">{p.img}</div>
            <div className="p-6">
              <h3 className="font-bold text-lg text-gray-900">{p.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{p.loc}</p>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-emerald-700">Terkumpul Rp {p.current} Juta</span>
                  <span className="text-gray-500">dari Rp {p.total} Juta</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{width: `${(p.current/p.total)*100}%`}}></div>
                </div>
              </div>
              
              <button onClick={() => { alert("Diarahkan ke Payment Gateway (Midtrans/OVO/BSI)..."); router.push("/wakif/portofolio"); }} className="w-full mt-6 bg-primary text-white py-2 rounded-lg font-bold hover:bg-primary-dark">Wakaf Sekarang</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}