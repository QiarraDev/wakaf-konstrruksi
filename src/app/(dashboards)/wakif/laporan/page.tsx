import Link from 'next/link';

export default function LaporanPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Laporan Real-time Pembangunan</h1>
            <p className="text-gray-500">Pantau progres detail dari proyek wakaf yang Anda dukung secara transparan.</p>
          </div>
          <select className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm">
            <option>Semua Proyek (2)</option>
            <option>Masjid Jami' An-Nur</option>
            <option>Pesantren Tahfidz Al-Ikhlas</option>
          </select>
        </div>

        <div className="space-y-12">
          {/* Project 1 Report */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                🕌 Masjid Jami' An-Nur
              </h2>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold border border-primary/20 shadow-sm">Progres Keseluruhan: 60%</span>
            </div>
            
            <div className="relative border-l-2 border-emerald-200 ml-3 space-y-8 py-4">
              {/* Timeline Item 1 - Lates */}
              <div className="pl-8 relative">
                <div className="absolute w-5 h-5 bg-emerald-500 rounded-full -left-[11px] top-1 border-4 border-white shadow-sm flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                </div>
                <div className="flex gap-2 items-center mb-2">
                  <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Hari Ini</p>
                  <p className="text-xs font-medium text-gray-500">Tahap: Pemasangan Atap Kubah</p>
                </div>
                
                <div className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-gray-900 leading-tight">Pemasangan Rangka Atap Kubah Utama Selesai</h3>
                        <span className="bg-gray-100 text-gray-700 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded flex-shrink-0">Update Terbaru</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Alhamdulillah, pekerjaan pemasangan rangka baja ringan untuk kubah utama telah dirampungkan lebih cepat dari jadwal. Saat ini para pekerja mulai mempersiapkan lapisan penutup kubah berbahan enamel anti-karat.
                      </p>
                      
                      <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex gap-4 text-sm mt-4">
                        <div className="flex-1">
                          <p className="text-gray-500 text-xs mb-1 font-medium">Anggaran Tahap Ini</p>
                          <p className="font-bold text-gray-900">Rp 215.000.000</p>
                        </div>
                        <div className="flex-1 border-l border-gray-200 pl-4">
                          <p className="text-gray-500 text-xs mb-1 font-medium">Status Pekerjaan</p>
                          <p className="font-bold text-emerald-600">Selesai 100%</p>
                        </div>
                        <div className="flex-1 border-l border-gray-200 pl-4 hidden sm:block">
                          <p className="text-gray-500 text-xs mb-1 font-medium">Laporan Dokumen</p>
                          <button className="font-bold text-primary hover:underline text-xs flex items-center gap-1">
                            <span>📄</span> Unduh BAST
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/news/news_masjid_1783408714337.png" alt="Progress Masjid" className="w-full h-full object-cover rounded-xl border border-gray-200 shadow-sm min-h-[160px] hover:scale-[1.02] transition-transform" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 - Older */}
              <div className="pl-8 relative opacity-80 hover:opacity-100 transition-opacity">
                <div className="absolute w-5 h-5 bg-gray-300 rounded-full -left-[11px] top-1 border-4 border-white shadow-sm flex items-center justify-center z-10">
                  <span className="text-white text-[10px]">✓</span>
                </div>
                <div className="flex gap-2 items-center mb-2">
                  <p className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">28 Juni 2026</p>
                  <p className="text-xs font-medium text-gray-500">Tahap: Struktur Tiang &amp; Dinding</p>
                </div>
                
                <div className="bg-gray-50/50 border border-gray-100 p-5 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-800">Pemasangan Dinding Bata dan Kolom Utama Selesai</h3>
                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Tuntas</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">Pemasangan dinding bata merah untuk keseluruhan lantai 1 telah dirampungkan beserta pengecoran 12 kolom tiang penyangga utama untuk persiapan lantai 2.</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                    <span className="flex items-center gap-1">💰 <strong className="text-gray-700">Dana Terpakai: Rp 350.000.000</strong></span>
                    <span className="text-gray-300">|</span>
                    <span>👷‍♂️ 15 Pekerja Aktif</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <hr className="border-gray-100" />
          
          {/* Project 2 Report */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                🏫 Pesantren Tahfidz Al-Ikhlas
              </h2>
              <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-bold border border-secondary/20 shadow-sm">Progres Keseluruhan: 20%</span>
            </div>
            
            <div className="relative border-l-2 border-emerald-200 ml-3 space-y-8 py-4">
              {/* Timeline Item 1 - Lates */}
              <div className="pl-8 relative">
                <div className="absolute w-5 h-5 bg-emerald-500 rounded-full -left-[11px] top-1 border-4 border-white shadow-sm flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                </div>
                <div className="flex gap-2 items-center mb-2">
                  <p className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Kemarin</p>
                  <p className="text-xs font-medium text-gray-500">Tahap: Struktur Bawah</p>
                </div>
                
                <div className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 rounded-xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg text-gray-900 leading-tight">Pengecoran Pondasi Cakar Ayam dan Sloof</h3>
                        <span className="bg-gray-100 text-gray-700 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded flex-shrink-0">Update Terbaru</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Pembangunan tahap pertama asrama santri resmi dimulai. Proses pengecoran pondasi cakar ayam berjalan dengan lancar didukung cuaca yang cerah. Tim saat ini sedang mempersiapkan bekisting untuk kolom.
                      </p>
                      
                      <div className="bg-gray-50 border border-gray-100 p-4 rounded-xl flex gap-4 text-sm mt-4">
                        <div className="flex-1">
                          <p className="text-gray-500 text-xs mb-1 font-medium">Anggaran Tersalurkan</p>
                          <p className="font-bold text-gray-900">Rp 85.000.000</p>
                        </div>
                        <div className="flex-1 border-l border-gray-200 pl-4">
                          <p className="text-gray-500 text-xs mb-1 font-medium">Status Pekerjaan</p>
                          <p className="font-bold text-orange-500">Sedang Berjalan (40%)</p>
                        </div>
                        <div className="flex-1 border-l border-gray-200 pl-4 hidden sm:block">
                          <p className="text-gray-500 text-xs mb-1 font-medium">Laporan Harian</p>
                          <button className="font-bold text-primary hover:underline text-xs flex items-center gap-1">
                            <span>📷</span> Lihat Galeri
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/news/news_pesantren_1783408727331.png" alt="Progress Pesantren" className="w-full h-full object-cover rounded-xl border border-gray-200 shadow-sm min-h-[160px] hover:scale-[1.02] transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}