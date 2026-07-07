"use client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function RabPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<{name: string, size: string, url: string}[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiEstimation, setAiEstimation] = useState<{ time: string, suggestion: string } | null>(null);

  const [items, setItems] = useState([
    { cat: 'Material', name: 'Semen Portland (50kg)', qty: '100 Sak', price: 65000, total: 6500000 },
    { cat: 'Material', name: 'Besi Beton (12mm)', qty: '50 Batang', price: 120000, total: 6000000 },
    { cat: 'Jasa', name: 'Tukang Batu (Harian)', qty: '30 Hari', price: 150000, total: 4500000 },
  ]);

  const [newItem, setNewItem] = useState({ cat: 'Material', name: '', qty: '', price: 0, total: 0 });

  const handleAddItem = () => {
    if (!newItem.name) { alert("Nama item tidak boleh kosong!"); return; }
    setItems([...items, newItem]);
    setNewItem({ cat: 'Material', name: '', qty: '', price: 0, total: 0 });
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleUploadClick = () => { fileInputRef.current?.click(); };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        url: URL.createObjectURL(file),
      }));
      setPhotos([...photos, ...newFiles]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
    setAiEstimation(null);
  };

  const handleAIAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setItems([
        { cat: 'Material', name: 'Batu Bata Merah (Kualitas A)', qty: '15.000 Pcs', price: 900, total: 13500000 },
        { cat: 'Material', name: 'Semen Portland (50kg)', qty: '300 Sak', price: 65000, total: 19500000 },
        { cat: 'Material', name: 'Pasir Cor / Beton', qty: '15 Rit', price: 1200000, total: 18000000 },
        { cat: 'Material', name: 'Besi Beton (10mm & 12mm)', qty: '200 Batang', price: 110000, total: 22000000 },
        { cat: 'Jasa', name: 'Pekerja Borongan (Tukang & Kuli)', qty: '120 HOK', price: 150000, total: 18000000 },
        { cat: 'Jasa', name: 'Sewa Alat Berat (Eskavator Mini)', qty: '3 Hari', price: 1500000, total: 4500000 },
      ]);
      setAiEstimation({
        time: '4 - 5 Bulan',
        suggestion: 'Kondisi lahan datar dan siap bangun. Direkomendasikan menggunakan pondasi cakar ayam standar. Akses material cukup mudah.'
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const subtotalMaterial = items.filter(i => i.cat === 'Material').reduce((acc, curr) => acc + curr.total, 0);
  const subtotalJasa = items.filter(i => i.cat === 'Jasa').reduce((acc, curr) => acc + curr.total, 0);
  const totalRAB = subtotalMaterial + subtotalJasa;
  const formatRp = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  const [showPreview, setShowPreview] = useState(false);
  const today = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Penyusunan RAB</h1>
        <p className="text-gray-500 mt-2">Lengkapi dokumentasi foto lahan terlebih dahulu, lalu susun Rencana Anggaran Biaya konstruksi.</p>
      </div>

      {/* STEP 1: Dokumentasi Foto Lahan */}
      <div className="mb-10 p-6 bg-gray-50 rounded-2xl border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Dokumentasi Foto Lahan</h2>
            <p className="text-gray-500 text-sm">Unggah foto kondisi aktual lahan. AI akan membantu mengisi daftar material secara otomatis.</p>
          </div>
        </div>

        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer group ${isDragging ? 'border-primary bg-emerald-50' : 'border-gray-300 hover:border-primary hover:bg-emerald-50/50'}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              const newFiles = Array.from(e.dataTransfer.files).map(file => ({
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                url: URL.createObjectURL(file),
              }));
              setPhotos([...photos, ...newFiles]);
            }
          }}
          onClick={handleUploadClick}
        >
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">📸</div>
          <h3 className="font-bold text-gray-700">Tarik dan lepas foto di sini</h3>
          <p className="text-gray-500 mt-1 text-sm">Format JPG, PNG (Maks. 10MB per foto)</p>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".png,.jpg,.jpeg" multiple />
          <button type="button" className="mt-4 bg-white border border-gray-300 text-gray-700 px-4 py-1.5 rounded-full font-medium text-sm pointer-events-none shadow-sm">
            Pilih Foto
          </button>
        </div>

        {photos.length > 0 && (
          <div className="mt-5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
              {photos.map((photo, i) => (
                <div key={i} className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-100" style={{aspectRatio: '4/3'}}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photo.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white text-xs font-medium truncate">{photo.name}</p>
                    <p className="text-white/70 text-xs">{photo.size}</p>
                  </div>
                  <button
                    onClick={() => removePhoto(i)}
                    className="absolute top-2 right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {!aiEstimation && (
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-6 rounded-xl text-center">
                <div className="text-3xl mb-2">✨</div>
                <h4 className="font-bold text-emerald-900 mb-1">Gunakan AI untuk Ekstraksi RAB Otomatis</h4>
                <p className="text-emerald-700 text-sm mb-4">Sistem memindai foto lahan untuk memprediksi kebutuhan material, biaya, dan waktu pengerjaan.</p>
                <button
                  onClick={handleAIAnalysis}
                  disabled={isAnalyzing}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-8 rounded-lg shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sedang Menganalisis Gambar...
                    </>
                  ) : "Buat Prediksi RAB & Waktu"}
                </button>
              </div>
            )}

            {aiEstimation && (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🤖</div>
                <h4 className="font-bold text-emerald-900 flex items-center gap-2 mb-4">
                  <span>✅</span> Hasil Analisis AI — RAB Langkah 2 telah diisi otomatis
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Estimasi Waktu Pengerjaan</span>
                    <p className="text-2xl font-bold text-gray-900 mt-1">⏱️ {aiEstimation.time}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-emerald-100 shadow-sm">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Catatan Kondisi Lapangan</span>
                    <p className="text-sm text-gray-700 mt-1 leading-relaxed">{aiEstimation.suggestion}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* STEP 2: Penyusunan RAB */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Penyusunan RAB</h2>
            <p className="text-gray-500 text-sm">Isi atau sesuaikan daftar kebutuhan material dan jasa konstruksi.</p>
          </div>
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
              {/* Input Form Row */}
              <tr className="bg-emerald-50/30">
                <td className="p-4">
                  <select
                    className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary text-sm"
                    value={newItem.cat}
                    onChange={(e) => setNewItem({...newItem, cat: e.target.value})}
                  >
                    <option>Material</option>
                    <option>Jasa</option>
                  </select>
                </td>
                <td className="p-4">
                  <input type="text" placeholder="Cth: Paku Payung" className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary text-sm" value={newItem.name} onChange={(e) => setNewItem({...newItem, name: e.target.value})} />
                </td>
                <td className="p-4">
                  <input type="text" placeholder="Cth: 2 Kg" className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary text-sm" value={newItem.qty} onChange={(e) => setNewItem({...newItem, qty: e.target.value})} />
                </td>
                <td className="p-4">
                  <input type="number" placeholder="Harga Satuan" className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary text-sm" value={newItem.price || ''} onChange={(e) => setNewItem({...newItem, price: Number(e.target.value)})} />
                </td>
                <td className="p-4">
                  <input type="number" placeholder="Total Harga" className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary text-sm" value={newItem.total || ''} onChange={(e) => setNewItem({...newItem, total: Number(e.target.value)})} />
                </td>
                <td className="p-4 text-center">
                  <button onClick={handleAddItem} className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors">+ Simpan</button>
                </td>
              </tr>

              {items.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${row.cat === 'Material' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                      {row.cat}
                    </span>
                  </td>
                  <td className="p-4 font-medium">{row.name}</td>
                  <td className="p-4 text-gray-600">{row.qty}</td>
                  <td className="p-4 text-gray-600">{formatRp(row.price)}</td>
                  <td className="p-4 font-bold text-gray-900">{formatRp(row.total)}</td>
                  <td className="p-4 text-center">
                    <button onClick={() => handleRemoveItem(i)} className="text-gray-400 hover:text-red-500 transition-colors">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && (
            <div className="p-8 text-center text-gray-500">Belum ada item biaya. Isi form di baris atas atau gunakan AI di Langkah 1.</div>
          )}
        </div>

        {/* Subtotal Box */}
        <div className="mt-6 flex justify-end">
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 w-full md:w-1/3">
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Subtotal Material</span>
              <span>{formatRp(subtotalMaterial)}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Subtotal Jasa</span>
              <span>{formatRp(subtotalJasa)}</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-200 font-bold text-lg text-gray-900">
              <span>Total Estimasi RAB</span>
              <span className="text-primary">{formatRp(totalRAB)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Final Submit */}
      <div className="mt-8 flex justify-end pt-8 border-t border-gray-100">
        <button
          onClick={() => setShowPreview(true)}
          className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-primary-dark transition-all hover:-translate-y-1 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          disabled={items.length === 0}
        >
          <span>👁️</span> Preview & Kirim Dokumen &rarr;
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-xs font-semibold uppercase tracking-widest mb-1">Pratinjau Dokumen RAB</p>
                  <h2 className="text-2xl font-bold">Rencana Anggaran Biaya</h2>
                  <p className="text-emerald-100 text-sm mt-1">Dibuat pada: {today}</p>
                </div>
                <button onClick={() => setShowPreview(false)} className="text-white/60 hover:text-white text-2xl transition-colors">&times;</button>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {aiEstimation && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 grid grid-cols-2 gap-4">
                  <div className="text-center border-r border-emerald-200">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Estimasi Waktu</span>
                    <p className="text-xl font-bold text-gray-900 mt-1">⏱️ {aiEstimation.time}</p>
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Total Biaya</span>
                    <p className="text-xl font-bold text-primary mt-1">{formatRp(totalRAB)}</p>
                  </div>
                </div>
              )}

              {photos.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">📸 Foto Lahan ({photos.length} foto)</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {photos.map((p, i) => (
                      <div key={i} className="rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-100" style={{aspectRatio: '4/3'}}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.url}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">📝 Daftar Item RAB</h3>
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3 font-semibold text-gray-600">Kategori</th>
                        <th className="p-3 font-semibold text-gray-600">Nama Item</th>
                        <th className="p-3 font-semibold text-gray-600">Kuantitas</th>
                        <th className="p-3 font-semibold text-gray-600 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {items.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${row.cat === 'Material' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                              {row.cat}
                            </span>
                          </td>
                          <td className="p-3 font-medium text-gray-900">{row.name}</td>
                          <td className="p-3 text-gray-500">{row.qty}</td>
                          <td className="p-3 font-bold text-gray-900 text-right">{formatRp(row.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl border border-gray-200 p-5">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">💰 Ringkasan Biaya</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal Material ({items.filter(i => i.cat === 'Material').length} item)</span>
                    <span className="font-semibold">{formatRp(subtotalMaterial)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal Jasa ({items.filter(i => i.cat === 'Jasa').length} item)</span>
                    <span className="font-semibold">{formatRp(subtotalJasa)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-300 font-bold text-base text-gray-900">
                    <span>TOTAL ESTIMASI RAB</span>
                    <span className="text-primary text-lg">{formatRp(totalRAB)}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  &larr; Kembali & Edit
                </button>
                <button
                  onClick={() => { setShowPreview(false); alert("RAB berhasil diajukan untuk divalidasi oleh Admin!"); router.push("/pengelola"); }}
                  className="flex-1 py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-primary-dark transition-all"
                >
                  ✅ Konfirmasi & Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
