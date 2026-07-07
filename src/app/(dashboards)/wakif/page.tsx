"use client";

import { useState } from "react";

export default function WakifDashboard() {
  const [modalContent, setModalContent] = useState<{title: string, msg: string} | null>(null);

  return (
    <>
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setModalContent(null)}>
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold mb-2">{modalContent.title}</h3>
            <p className="text-gray-600 mb-6">{modalContent.msg}</p>
            <button onClick={() => setModalContent(null)} className="w-full bg-primary text-white py-2 rounded-lg font-medium">Tutup</button>
          </div>
        </div>
      )}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Wakif</h1>
          <p className="text-gray-500 mt-1">Pantau dampak dari wakaf jariyah yang telah Anda berikan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
            <h3 className="text-gray-500 font-medium">Total Wakaf Tersalurkan</h3>
            <p className="text-4xl font-bold text-primary mt-2">Rp 25.000.000</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
            <h3 className="text-gray-500 font-medium">Proyek Didukung</h3>
            <p className="text-4xl font-bold text-secondary mt-2">3 Masjid</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-bold">Proyek Sedang Berjalan</h2>
            <span className="text-sm text-primary font-medium cursor-pointer hover:underline" onClick={() => setModalContent({title: "Semua Proyek Berjalan", msg: "Memuat daftar lengkap semua proyek wakaf konstruksi yang sedang dalam tahap pengerjaan..."})}>Lihat Semua</span>
          </div>
          <div className="p-0 sm:p-6">
            {/* Timeline for Masjid Jami' An-Nur */}
            <div className="mb-10 px-6 sm:px-0">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Pembangunan Masjid Jami' An-Nur</h3>
                  <p className="text-sm text-gray-500 mt-1">Estimasi Selesai: Oktober 2026</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-2xl text-primary">60%</span>
                  <p className="text-xs text-gray-500 font-medium">Selesai</p>
                </div>
              </div>

              {/* Vertical Timeline */}
              <div className="relative pl-4 sm:pl-0">
                {/* Connecting Line */}
                <div className="absolute left-[11px] sm:left-1/2 top-2 bottom-2 w-0.5 bg-gray-200 transform sm:-translate-x-1/2"></div>
                
                {/* Timeline Items */}
                <div className="space-y-8">
                  {/* Item 1 - Completed */}
                  <div className="relative flex items-center justify-between sm:flex-row flex-col sm:even:flex-row-reverse group">
                    <div className="sm:w-5/12 w-full pl-8 sm:pl-0 sm:text-right pr-0 sm:pr-8 mb-2 sm:mb-0">
                      <h4 className="font-bold text-gray-900">Peletakan Batu Pertama &amp; Pondasi</h4>
                      <p className="text-sm text-gray-500 mt-1">Pengecoran cakar ayam dan struktur bawah selesai.</p>
                      <div className="mt-2 flex flex-col sm:items-end gap-1.5">
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-block w-fit">12 Mei 2026</span>
                        <span className="text-[11px] font-bold text-gray-700 bg-gray-100 border border-gray-200 px-2 py-1 rounded inline-flex items-center gap-1.5 w-fit">
                          💰 Anggaran: Rp 120.000.000
                        </span>
                      </div>
                    </div>
                    <div className="absolute left-0 sm:left-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow flex items-center justify-center transform sm:-translate-x-1/2 mt-1 sm:mt-0 z-10">
                      <span className="text-white text-[10px]">✓</span>
                    </div>
                    <div className="sm:w-5/12 w-full pl-8 sm:pl-8 hidden sm:block"></div>
                  </div>

                  {/* Item 2 - Completed */}
                  <div className="relative flex items-center justify-between sm:flex-row flex-col sm:even:flex-row-reverse group">
                    <div className="sm:w-5/12 w-full pl-8 sm:pl-8 hidden sm:block"></div>
                    <div className="absolute left-0 sm:left-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow flex items-center justify-center transform sm:-translate-x-1/2 mt-1 sm:mt-0 z-10">
                      <span className="text-white text-[10px]">✓</span>
                    </div>
                    <div className="sm:w-5/12 w-full pl-8 sm:pl-8 sm:text-left mb-2 sm:mb-0">
                      <h4 className="font-bold text-gray-900">Struktur Tiang &amp; Dinding</h4>
                      <p className="text-sm text-gray-500 mt-1">Pemasangan bata merah dan tiang penyangga utama.</p>
                      <div className="mt-2 flex flex-col sm:items-start gap-1.5">
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-block w-fit">28 Juni 2026</span>
                        <span className="text-[11px] font-bold text-gray-700 bg-gray-100 border border-gray-200 px-2 py-1 rounded inline-flex items-center gap-1.5 w-fit">
                          💰 Anggaran: Rp 350.000.000
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Item 3 - Current */}
                  <div className="relative flex items-center justify-between sm:flex-row flex-col sm:even:flex-row-reverse group">
                    <div className="sm:w-5/12 w-full pl-8 sm:pl-0 sm:text-right pr-0 sm:pr-8 mb-2 sm:mb-0">
                      <h4 className="font-bold text-primary">Pemasangan Atap Kubah</h4>
                      <p className="text-sm text-gray-600 mt-1">Kerangka kubah selesai, persiapan pelapisan material.</p>
                      <div className="mt-2 flex flex-col sm:items-end gap-1.5">
                        <span className="text-xs font-semibold text-primary bg-emerald-50 px-2 py-1 rounded border border-emerald-200 inline-block shadow-sm w-fit">Sedang Berjalan (Hari ini)</span>
                        <span className="text-[11px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-1 rounded inline-flex items-center gap-1.5 w-fit">
                          💰 Est. Anggaran: Rp 215.000.000
                        </span>
                      </div>
                    </div>
                    <div className="absolute left-0 sm:left-1/2 w-6 h-6 bg-white rounded-full border-4 border-primary shadow flex items-center justify-center transform sm:-translate-x-1/2 mt-1 sm:mt-0 z-10">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    </div>
                    <div className="sm:w-5/12 w-full pl-8 sm:pl-8 hidden sm:block"></div>
                  </div>

                  {/* Item 4 - Upcoming */}
                  <div className="relative flex items-center justify-between sm:flex-row flex-col sm:even:flex-row-reverse group opacity-50">
                    <div className="sm:w-5/12 w-full pl-8 sm:pl-8 hidden sm:block"></div>
                    <div className="absolute left-0 sm:left-1/2 w-6 h-6 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center transform sm:-translate-x-1/2 mt-1 sm:mt-0 z-10">
                    </div>
                    <div className="sm:w-5/12 w-full pl-8 sm:pl-8 sm:text-left mb-2 sm:mb-0">
                      <h4 className="font-bold text-gray-500">Finishing Interior &amp; Eksterior</h4>
                      <p className="text-sm text-gray-400 mt-1">Pengecatan, keramik, dan instalasi listrik/air.</p>
                      <div className="mt-2 flex flex-col sm:items-start gap-1.5">
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block w-fit">Bulan Depan</span>
                        <span className="text-[11px] font-bold text-gray-500 border border-gray-200 px-2 py-1 rounded inline-flex items-center gap-1.5 w-fit">
                          💰 Est. Anggaran: Rp 180.000.000
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <hr className="border-gray-100 my-8 mx-6" />
            
            {/* Timeline for Pesantren Tahfidz */}
            <div className="px-6 sm:px-0">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Pesantren Tahfidz Al-Ikhlas</h3>
                  <p className="text-sm text-gray-500 mt-1">Estimasi Selesai: Januari 2027</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-2xl text-secondary">20%</span>
                  <p className="text-xs text-gray-500 font-medium">Selesai</p>
                </div>
              </div>

              {/* Vertical Detailed Timeline for Secondary Item */}
              <div className="relative pl-4 sm:pl-0 pt-6">
                <div className="absolute left-[11px] sm:left-1/2 top-8 bottom-2 w-0.5 bg-gray-200 transform sm:-translate-x-1/2"></div>
                
                <div className="space-y-8">
                  {/* Item 1 - Completed */}
                  <div className="relative flex items-center justify-between sm:flex-row flex-col sm:even:flex-row-reverse group">
                    <div className="sm:w-5/12 w-full pl-8 sm:pl-0 sm:text-right pr-0 sm:pr-8 mb-2 sm:mb-0">
                      <h4 className="font-bold text-gray-900">Peletakan Batu Pertama &amp; Pondasi</h4>
                      <p className="text-sm text-gray-500 mt-1">Penggalian lahan dan pemasangan pondasi tapak utama.</p>
                      <div className="mt-2 flex flex-col sm:items-end gap-1.5">
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-block w-fit">1 Minggu yang lalu</span>
                        <span className="text-[11px] font-bold text-gray-700 bg-gray-100 border border-gray-200 px-2 py-1 rounded inline-flex items-center gap-1.5 w-fit">
                          💰 Anggaran: Rp 85.000.000
                        </span>
                      </div>
                    </div>
                    <div className="absolute left-0 sm:left-1/2 w-6 h-6 bg-secondary rounded-full border-4 border-white shadow flex items-center justify-center transform sm:-translate-x-1/2 mt-1 sm:mt-0 z-10">
                      <span className="text-white text-[10px]">✓</span>
                    </div>
                    <div className="sm:w-5/12 w-full pl-8 sm:pl-8 hidden sm:block"></div>
                  </div>

                  {/* Item 2 - Current */}
                  <div className="relative flex items-center justify-between sm:flex-row flex-col sm:even:flex-row-reverse group">
                    <div className="sm:w-5/12 w-full pl-8 sm:pl-8 hidden sm:block"></div>
                    <div className="absolute left-0 sm:left-1/2 w-6 h-6 bg-white rounded-full border-4 border-secondary shadow flex items-center justify-center transform sm:-translate-x-1/2 mt-1 sm:mt-0 z-10">
                      <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                    </div>
                    <div className="sm:w-5/12 w-full pl-8 sm:pl-8 sm:text-left mb-2 sm:mb-0">
                      <h4 className="font-bold text-secondary">Pengecoran Struktur Bawah</h4>
                      <p className="text-sm text-gray-600 mt-1">Pengerjaan sloof lantai dasar dan tiang kolom asrama.</p>
                      <div className="mt-2 flex flex-col sm:items-start gap-1.5">
                        <span className="text-xs font-semibold text-secondary bg-orange-50 px-2 py-1 rounded border border-orange-200 inline-block shadow-sm w-fit">Sedang Berjalan (Hari ini)</span>
                        <span className="text-[11px] font-bold text-secondary bg-secondary/10 border border-secondary/20 px-2 py-1 rounded inline-flex items-center gap-1.5 w-fit">
                          💰 Est. Anggaran: Rp 240.000.000
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Item 3 - Upcoming */}
                  <div className="relative flex items-center justify-between sm:flex-row flex-col sm:even:flex-row-reverse group opacity-50">
                    <div className="sm:w-5/12 w-full pl-8 sm:pl-0 sm:text-right pr-0 sm:pr-8 mb-2 sm:mb-0">
                      <h4 className="font-bold text-gray-500">Struktur Dinding &amp; Rangka Atap</h4>
                      <p className="text-sm text-gray-400 mt-1">Pemasangan dinding lantai 1 &amp; 2, serta konstruksi rangka baja.</p>
                      <div className="mt-2 flex flex-col sm:items-end gap-1.5">
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block w-fit">Dijadwalkan: Agustus</span>
                        <span className="text-[11px] font-bold text-gray-500 border border-gray-200 px-2 py-1 rounded inline-flex items-center gap-1.5 w-fit">
                          💰 Est. Anggaran: Rp 450.000.000
                        </span>
                      </div>
                    </div>
                    <div className="absolute left-0 sm:left-1/2 w-6 h-6 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center transform sm:-translate-x-1/2 mt-1 sm:mt-0 z-10">
                    </div>
                    <div className="sm:w-5/12 w-full pl-8 sm:pl-8 hidden sm:block"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Berita Terkini &amp; Laporan Proyek</h2>
            <span className="text-sm text-primary font-medium cursor-pointer hover:underline" onClick={() => setModalContent({title: "Arsip Laporan Lengkap", msg: "Membuka repositori dokumen laporan proyek sebelumnya untuk diunduh."})}>Arsip Laporan</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* News Card 1 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group">
              <div className="relative h-48 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/news/news_masjid_1783408714337.png" 
                  alt="Progress Masjid" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                  Update Pembangunan
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs text-gray-500 mb-2">2 Hari yang lalu &bull; Pembangunan Masjid Jami' An-Nur</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">Pemasangan Atap Kubah Utama Telah Selesai</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  Alhamdulillah, berkat dukungan para wakif, proses pemasangan kerangka kubah utama telah berjalan lancar sesuai jadwal. Saat ini tim sedang mempersiapkan pelapisan penutup atap.
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <button className="text-primary font-semibold text-sm hover:underline" onClick={() => setModalContent({title: "Detail Berita", msg: "Membuka artikel lengkap tentang Pemasangan Atap Kubah Utama Masjid Jami' An-Nur beserta galeri foto..."})}>Baca Selengkapnya</button>
                  <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-lg border border-gray-200 transition-colors" onClick={() => setModalContent({title: "Mengunduh PDF", msg: "Mempersiapkan dokumen Laporan_Masjid_AnNur_Minggu3.pdf untuk diunduh..."})}>
                    <span>📄</span> Laporan PDF
                  </button>
                </div>
              </div>
            </div>

            {/* News Card 2 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group">
              <div className="relative h-48 w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/news/news_pesantren_1783408727331.png" 
                  alt="Progress Pesantren" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-secondary">
                  Laporan Kuartal
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs text-gray-500 mb-2">1 Minggu yang lalu &bull; Pesantren Tahfidz Al-Ikhlas</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 leading-tight">Peletakan Batu Pertama dan Pengecoran Pondasi</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  Pembangunan tahap pertama asrama santri resmi dimulai. Proses pengecoran pondasi cakar ayam berjalan dengan lancar didukung cuaca yang cerah.
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                  <button className="text-primary font-semibold text-sm hover:underline" onClick={() => setModalContent({title: "Detail Berita", msg: "Membuka liputan lengkap acara Peletakan Batu Pertama Pesantren Tahfidz Al-Ikhlas..."})}>Baca Selengkapnya</button>
                  <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-lg border border-gray-200 transition-colors" onClick={() => setModalContent({title: "Mengunduh PDF", msg: "Mempersiapkan dokumen Laporan_Pesantren_Kuartal1.pdf untuk diunduh..."})}>
                    <span>📄</span> Laporan PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Interactive Modal */}
      {modalContent && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all shadow-primary/10 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-xl">ℹ️</div>
              <button onClick={() => setModalContent(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">{modalContent.title}</h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm">{modalContent.msg}</p>
            <div className="flex justify-end">
              <button 
                onClick={() => setModalContent(null)}
                className="w-full bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all hover:-translate-y-0.5"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
