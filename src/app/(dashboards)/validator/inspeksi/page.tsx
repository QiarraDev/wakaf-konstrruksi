"use client";
import { useState } from "react";

const checklistItems = [
  { category: "Keselamatan Kerja (K3)", items: [
    "Seluruh pekerja menggunakan APD (helm, rompi, sepatu)",
    "Jalur evakuasi darurat tersedia dan tidak terhalang",
    "P3K dan APAR tersedia di lokasi",
  ]},
  { category: "Kualitas Material", items: [
    "Semen sesuai spesifikasi RAB (tipe & merek)",
    "Besi tulangan SNI (ada label / sertifikat)",
    "Material tidak basah atau rusak",
  ]},
  { category: "Kualitas Pengerjaan", items: [
    "Campuran beton sesuai rasio yang ditentukan",
    "Sambungan tulangan memenuhi standar panjang penjangkaran",
    "Tidak ada retakan pada elemen struktur yang sudah kering",
  ]},
  { category: "Administrasi Lapangan", items: [
    "Buku tamu/log harian diisi",
    "Jumlah tenaga kerja sesuai kontrak",
    "Tidak ada pekerjaan di luar scope RAB",
  ]},
];

export default function InspeksiPage() {
  const totalItems = checklistItems.reduce((acc, cat) => acc + cat.items.length, 0);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const toggleCheck = (key: string) => {
    setChecked(prev => ({...prev, [key]: !prev[key]}));
  };
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const score = Math.round((checkedCount / totalItems) * 100);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-5xl border-4 border-blue-200 shadow-lg">
          📋
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900">Checklist Inspeksi Tersimpan!</h2>
          <p className="text-gray-500 mt-2">Hasil inspeksi telah dikirim ke Admin untuk ditinjau.</p>
        </div>
        <div className={`text-5xl font-black ${score >= 75 ? 'text-emerald-600' : score >= 50 ? 'text-orange-500' : 'text-red-500'}`}>
          {score}%
        </div>
        <p className="text-gray-600 font-medium">Skor Kepatuhan Lapangan</p>
        <button onClick={() => { setSubmitted(false); setChecked({}); }} className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-primary-dark transition-all">
          Mulai Inspeksi Baru
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">✅ Checklist Inspeksi</h1>
          <p className="text-gray-500 mt-1">Lakukan inspeksi lapangan berdasarkan standar keselamatan dan kualitas.</p>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-black ${score >= 75 ? 'text-emerald-600' : score >= 50 ? 'text-orange-500' : 'text-red-500'}`}>{score}%</div>
          <p className="text-xs text-gray-400 font-medium">{checkedCount}/{totalItems} item</p>
        </div>
      </div>

      {/* Score Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex justify-between text-sm mb-2 font-medium text-gray-600">
          <span>Skor Kepatuhan Saat Ini</span>
          <span className={`font-bold ${score >= 75 ? 'text-emerald-600' : score >= 50 ? 'text-orange-500' : 'text-red-500'}`}>{score >= 75 ? 'Lulus' : score >= 50 ? 'Perlu Perbaikan' : 'Tidak Lulus'}</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div className={`h-3 rounded-full transition-all duration-500 ${score >= 75 ? 'bg-emerald-500' : score >= 50 ? 'bg-orange-400' : 'bg-red-400'}`} style={{width: `${score}%`}}></div>
        </div>
      </div>

      {/* Checklist Categories */}
      <div className="space-y-6">
        {checklistItems.map((cat, catIdx) => {
          // Calculate the starting index for this category's items to make it 1-12 globally
          const startingItemNumber = checklistItems.slice(0, catIdx).reduce((acc, curr) => acc + curr.items.length, 0);

          return (
            <div key={catIdx} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800 px-5 py-3 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{cat.category}</h3>
              </div>
            <ul className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {cat.items.map((item, itemIdx) => {
                const key = `${catIdx}-${itemIdx}`;
                const globalItemNumber = startingItemNumber + itemIdx + 1;
                
                return (
                  <li key={itemIdx} className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <label className="flex items-start gap-4 cursor-pointer group">
                      <div className="text-gray-400 dark:text-gray-500 font-bold text-sm min-w-[20px] pt-1">
                        {globalItemNumber}.
                      </div>
                      <div className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${checked[key] ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 dark:border-gray-600 group-hover:border-primary'}`}>
                        {checked[key] && <span className="text-white text-sm font-bold">✓</span>}
                      </div>
                      <input type="checkbox" className="sr-only" checked={!!checked[key]} onChange={() => toggleCheck(key)} />
                      <span className={`text-sm leading-relaxed transition-colors pt-0.5 ${checked[key] ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-800 dark:text-gray-200 font-medium'}`}>{item}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
          );
        })}
      </div>

      <button onClick={() => setSubmitted(true)} className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all hover:-translate-y-0.5 text-lg">
        🚀 Kirim Hasil Inspeksi ({checkedCount}/{totalItems})
      </button>
    </div>
  );
}
