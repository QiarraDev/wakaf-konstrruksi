"use client";
import { useState, useRef } from "react";

export default function LaporanPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    project: "Masjid Jami' An-Nur",
    milestone: "60",
    kondisi: "Baik",
    catatan: "",
    photos: [] as string[],
  });
  const [gps] = useState({ lat: "-6.917464", lng: "107.619123", acc: "±3m" });

  const photoInputRef = useRef<HTMLInputElement>(null);

  const addFakePhoto = () => {
    if (form.photos.length >= 5) return;
    const colors = ['bg-emerald-200', 'bg-blue-200', 'bg-amber-200', 'bg-rose-200', 'bg-violet-200'];
    const labels = ['Tampak Depan', 'Struktur Kubah', 'Dinding Bata', 'Pondasi', 'Area Kerja'];
    const idx = form.photos.length;
    setForm(f => ({...f, photos: [...f.photos, `${labels[idx]}||${colors[idx]}`]}));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-5xl border-4 border-emerald-200 shadow-lg">
          ✅
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-900">Laporan Berhasil Dikirim!</h2>
          <p className="text-gray-500 mt-2">Laporan real-time Anda telah masuk ke sistem dan sedang diproses oleh Admin & Pengelola.</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 w-full max-w-sm text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">ID Laporan</span>
            <span className="font-bold text-gray-900">#RPT-{Math.floor(Math.random()*9000)+1000}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Proyek</span>
            <span className="font-bold text-gray-900">{form.project}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Milestone</span>
            <span className="font-bold text-primary">{form.milestone}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Foto Diunggah</span>
            <span className="font-bold text-gray-900">{form.photos.length} Foto</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Koordinat GPS</span>
            <span className="font-bold text-gray-900">{gps.lat}, {gps.lng}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Timestamp</span>
            <span className="font-bold text-gray-900">{new Date().toLocaleTimeString('id-ID')} WIB</span>
          </div>
        </div>
        <button onClick={() => { setSubmitted(false); setStep(1); setForm({project: "Masjid Jami' An-Nur", milestone:"60", kondisi:"Baik", catatan:"", photos:[]}); }} className="bg-primary text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-primary-dark transition-all">
          Buat Laporan Baru
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">📸 Kirim Laporan Real-Time</h1>
        <p className="text-gray-500 mt-1">Dokumentasikan kondisi pembangunan dari lokasi secara langsung.</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-2">
        {[1,2,3].map((s) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors ${step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
            <span className={`text-xs font-medium hidden sm:block ${step >= s ? 'text-primary' : 'text-gray-400'}`}>
              {s === 1 ? 'Info Proyek' : s === 2 ? 'Foto & Kondisi' : 'Kirim Laporan'}
            </span>
            {s < 3 && <div className={`flex-1 h-0.5 rounded ${step > s ? 'bg-primary' : 'bg-gray-200'}`}></div>}
          </div>
        ))}
      </div>

      {/* Step 1: Pilih Proyek */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
          <h2 className="text-lg font-bold text-gray-900">Langkah 1: Pilih Proyek & Milestone</h2>
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Proyek yang Dilaporkan</label>
            <select value={form.project} onChange={e => setForm(f=>({...f, project: e.target.value}))} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20">
              <option>Masjid Jami' An-Nur</option>
              <option>Pesantren Tahfidz Al-Ikhlas</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Persentase Milestone Saat Ini</label>
            <div className="grid grid-cols-4 gap-2">
              {['20','40','60','80'].map(val => (
                <button key={val} onClick={() => setForm(f=>({...f, milestone: val}))} className={`py-3 rounded-xl font-bold text-sm transition-colors border-2 ${form.milestone === val ? 'bg-primary text-white border-primary shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:border-primary/50'}`}>
                  {val}%
                </button>
              ))}
            </div>
          </div>

          {/* GPS Tag */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <p className="text-sm font-bold text-emerald-800">Lokasi GPS Terdeteksi</p>
              <p className="text-xs text-emerald-600 font-mono mt-0.5">Lat: {gps.lat} • Long: {gps.lng} • Akurasi: {gps.acc}</p>
            </div>
            <span className="ml-auto text-xs bg-emerald-200 text-emerald-800 font-bold px-2 py-1 rounded">Aktif</span>
          </div>
          
          <button onClick={() => setStep(2)} className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-md hover:bg-primary-dark transition-all">
            Lanjut ke Dokumentasi →
          </button>
        </div>
      )}

      {/* Step 2: Upload Foto & Kondisi */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
          <h2 className="text-lg font-bold text-gray-900">Langkah 2: Dokumentasi Foto & Kondisi</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-gray-700">Foto Dokumentasi Lapangan ({form.photos.length}/5)</label>
              {form.photos.length < 5 && (
                <button onClick={addFakePhoto} className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                  + Tambah Foto
                </button>
              )}
            </div>
            
            {form.photos.length === 0 ? (
              <button onClick={addFakePhoto} className="w-full border-2 border-dashed border-gray-200 rounded-xl py-12 flex flex-col items-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-colors">
                <span className="text-4xl">📷</span>
                <p className="text-gray-500 font-medium">Klik untuk ambil / upload foto</p>
                <p className="text-xs text-gray-400">Simulasi: Klik untuk menambahkan foto</p>
              </button>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {form.photos.map((photo, i) => {
                  const [label, color] = photo.split('||');
                  return (
                    <div key={i} className={`${color} rounded-xl aspect-square relative overflow-hidden flex items-end p-2`}>
                      <div className="absolute top-2 right-2 bg-black/40 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                        📍 GPS
                      </div>
                      <span className="text-white text-[10px] font-bold bg-black/50 px-2 py-1 rounded w-full text-center">{label}</span>
                    </div>
                  );
                })}
                {form.photos.length < 5 && (
                  <button onClick={addFakePhoto} className="border-2 border-dashed border-gray-200 rounded-xl aspect-square flex items-center justify-center hover:border-primary/50 hover:bg-gray-50 transition-colors">
                    <span className="text-3xl text-gray-400">+</span>
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Kondisi Pembangunan</label>
            <div className="grid grid-cols-3 gap-2">
              {[{val:'Baik', icon:'✅', color:'emerald'}, {val:'Perlu Perhatian', icon:'⚠️', color:'orange'}, {val:'Terhenti', icon:'🚫', color:'red'}].map(opt => (
                <button key={opt.val} onClick={() => setForm(f=>({...f, kondisi: opt.val}))} className={`py-3 px-2 rounded-xl font-bold text-xs transition-colors border-2 text-center ${form.kondisi === opt.val ? `bg-${opt.color}-100 text-${opt.color}-700 border-${opt.color}-400` : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'}`}>
                  {opt.icon}<br/>{opt.val}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Catatan Lapangan</label>
            <textarea value={form.catatan} onChange={e => setForm(f=>({...f, catatan: e.target.value}))} placeholder="Tulis catatan kondisi di lapangan, kendala, atau informasi penting lainnya..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none" rows={4} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setStep(1)} className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all">
              ← Kembali
            </button>
            <button onClick={() => setStep(3)} className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-md hover:bg-primary-dark transition-all">
              Lanjut →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Kirim */}
      {step === 3 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">
          <h2 className="text-lg font-bold text-gray-900">Langkah 3: Review & Kirim</h2>
          
          <div className="bg-gray-50 rounded-xl border border-gray-200 divide-y divide-gray-200">
            {[
              { label: "Proyek", value: form.project },
              { label: "Milestone Dilaporkan", value: `${form.milestone}%` },
              { label: "Kondisi", value: form.kondisi },
              { label: "Jumlah Foto", value: `${form.photos.length} foto` },
              { label: "Koordinat GPS", value: `${gps.lat}, ${gps.lng}` },
              { label: "Akurasi GPS", value: gps.acc },
              { label: "Timestamp", value: new Date().toLocaleString('id-ID') },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center px-4 py-3 text-sm">
                <span className="text-gray-500">{item.label}</span>
                <span className={`font-bold ${item.label === 'Milestone Dilaporkan' ? 'text-primary' : item.label === 'Kondisi' && form.kondisi !== 'Baik' ? 'text-orange-500' : 'text-gray-900'}`}>{item.value}</span>
              </div>
            ))}
          </div>

          {form.catatan && (
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-blue-800">
              <p className="font-bold mb-1">Catatan:</p>
              <p className="italic">{form.catatan}</p>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-sm text-amber-800">
            <p className="font-bold">⚠️ Pernyataan Validator</p>
            <p className="mt-1">Dengan mengirim laporan ini, saya menyatakan bahwa data yang dilaporkan adalah benar dan sesuai dengan kondisi aktual di lapangan.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setStep(2)} className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all">
              ← Kembali
            </button>
            <button onClick={handleSubmit} className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all hover:-translate-y-0.5">
              🚀 Kirim Laporan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
