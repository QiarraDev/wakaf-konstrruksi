"use client";
import { useRouter } from "next/navigation";
export default function AssessmentPage() {
  const router = useRouter();
  const checklists = [
    { title: "Status Lahan / Tanah", desc: "Sertifikat Hak Milik atau Akta Ikrar Wakaf tersedia dan tidak dalam sengketa.", checked: true },
    { title: "Kesesuaian Tata Ruang", desc: "Lokasi pembangunan sesuai dengan peruntukan Rencana Tata Ruang Wilayah (RTRW).", checked: true },
    { title: "Kondisi Tanah", desc: "Tanah keras, tidak berada di area rawan longsor atau banjir.", checked: false },
    { title: "Akses Jalan Keluar Masuk", desc: "Terdapat akses jalan yang memadai untuk mobilisasi material berat.", checked: false },
    { title: "Sumber Air & Listrik", desc: "Tersedia akses sambungan air bersih dan aliran listrik untuk proses konstruksi.", checked: false },
  ];

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Brief Assessment Bangunan</h1>
        <p className="text-gray-500 mt-2">Daftar periksa (checklist) kelayakan dan mitigasi risiko sebelum proyek disetujui.</p>
      </div>

      <div className="space-y-4">
        {checklists.map((item, i) => (
          <label key={i} className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${item.checked ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}>
            <div className="mt-1 flex-shrink-0">
              <input type="checkbox" className="w-5 h-5 rounded text-primary focus:ring-primary border-gray-300" defaultChecked={item.checked} />
            </div>
            <div>
              <h3 className={`font-bold ${item.checked ? 'text-emerald-900' : 'text-gray-900'}`}>{item.title}</h3>
              <p className={`text-sm mt-1 ${item.checked ? 'text-emerald-700' : 'text-gray-500'}`}>{item.desc}</p>
            </div>
          </label>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        <h3 className="font-bold text-gray-900">Catatan Tambahan Assessment</h3>
        <textarea className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none min-h-[120px]" placeholder="Masukkan kondisi khusus yang perlu diperhatikan oleh vendor (cth: jalanan sempit saat pagi hari)..." />
      </div>

      <div className="mt-8 flex justify-end">
        <button onClick={() => { alert("Hasil Assessment berhasil disimpan!"); router.push("/pengelola"); }} className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30">
          Simpan Hasil Assessment
        </button>
      </div>
    </div>
  );
}
