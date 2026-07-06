"use client";
export default function LmsPage() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">LMS: Edukasi Konstruksi</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Standar Keselamatan (K3) Proyek Masjid", duration: "45 Menit", thumb: "👷‍♂️" },
          { title: "Sertifikasi Material Halal & SNI", duration: "1 Jam", thumb: "🧱" },
          { title: "Prosedur Swakelola Berstandar", duration: "30 Menit", thumb: "📜" },
        ].map((module, i) => (
          <div key={i} onClick={() => alert("Membuka pemutar video edukasi LMS...")} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
            <div className="bg-gray-100 h-32 flex items-center justify-center text-4xl">{module.thumb}</div>
            <div className="p-4">
              <h3 className="font-bold text-gray-900">{module.title}</h3>
              <p className="text-sm text-gray-500 mt-2">Durasi: {module.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}