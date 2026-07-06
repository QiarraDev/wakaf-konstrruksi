export default function PortofolioPage() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Portofolio Wakaf Anda</h1>
      <div className="space-y-4">
        {[
          { date: "12 Ags 2026", project: "Masjid Jami' Al-Ikhlas", amount: "Rp 5.000.000", cert: true },
          { date: "01 Feb 2026", project: "Sumur Wakaf Desa Mandiri", amount: "Rp 1.500.000", cert: true },
        ].map((h, i) => (
          <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-100 bg-gray-50 rounded-xl">
            <div>
              <p className="text-xs font-bold text-gray-400">{h.date}</p>
              <h3 className="font-bold text-gray-900 mt-1">{h.project}</h3>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-6">
              <span className="font-bold text-emerald-600">{h.amount}</span>
              {h.cert && <button onClick={() => alert("Mengunduh Sertifikat_Wakaf.pdf...")} className="flex items-center gap-2 border border-emerald-200 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg text-sm hover:bg-emerald-100 font-medium">📜 Unduh Sertifikat</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}