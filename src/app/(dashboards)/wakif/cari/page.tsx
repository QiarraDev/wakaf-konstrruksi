"use client";
import { useState } from "react";

type ModalType = 'blueprint' | 'rab' | null;

export default function CariPage() {
  const [modalState, setModalState] = useState<{isOpen: boolean, type: ModalType, projectTitle: string, image?: string}>({isOpen: false, type: null, projectTitle: ""});

  const openModal = (type: ModalType, projectTitle: string, image?: string) => {
    setModalState({isOpen: true, type, projectTitle, image});
  }

  const closeModal = () => {
    setModalState({isOpen: false, type: null, projectTitle: ""});
  }

  return (
    <div className="bg-transparent mt-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Katalog Proyek Konstruksi</h1>
          <p className="text-gray-500 mt-2">Eksplorasi blueprint, detail RAB, dan kebutuhan material proyek wakaf yang akan dibangun.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            title: "Masjid Jami' Al-Ikhlas", 
            loc: "Bandung, Jawa Barat", 
            phase: "Penyusunan RAB", 
            specs: "Luas 500m² • 2 Lantai",
            needs: "Vendor Baja Ringan, Semen",
            img: "/news/news_masjid_1783408714337.png" 
          },
          { 
            title: "Asrama Tahfidz Qur'an", 
            loc: "Malang, Jawa Timur", 
            phase: "Seleksi Vendor", 
            specs: "Luas 350m² • 3 Lantai",
            needs: "Kontraktor Utama",
            img: "/news/news_pesantren_1783408727331.png" 
          },
          { 
            title: "Klinik Wakaf Umat", 
            loc: "Surabaya, Jawa Timur", 
            phase: "Desain Arsitektur", 
            specs: "Luas 200m² • 1 Lantai",
            needs: "Arsitek & Perencana",
            img: "🏥" 
          },
        ].map((p, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
            <div className="bg-emerald-50 h-48 flex items-center justify-center text-6xl relative overflow-hidden">
              {p.img.startsWith('/') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <span className="group-hover:scale-110 transition-transform duration-500">{p.img}</span>
              )}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-800 shadow-sm border border-gray-100 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></div>
                Fase: {p.phase}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-bold text-xl text-gray-900 leading-tight">{p.title}</h3>
              <p className="text-sm text-gray-500 mt-2 mb-5 flex items-center gap-1.5">
                <span className="text-gray-400">📍</span> {p.loc}
              </p>
              
              <div className="space-y-3 mt-auto bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Spesifikasi</span>
                  <span className="font-bold text-gray-900">{p.specs}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-1">
                  <span className="text-gray-500">Kebutuhan</span>
                  <span className="font-bold text-primary text-right">{p.needs}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button onClick={() => openModal('blueprint', p.title, p.img)} className="w-full bg-white text-gray-700 border-2 border-gray-200 py-2.5 rounded-xl text-sm font-bold hover:border-gray-300 hover:bg-gray-50 transition-all">Lihat Blueprint</button>
                <button onClick={() => openModal('rab', p.title)} className="w-full bg-primary text-white py-2.5 rounded-xl text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary-dark transition-all hover:-translate-y-0.5">Detail RAB</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Interactive Modals */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
          <div className={`bg-white rounded-2xl p-6 ${modalState.type === 'blueprint' ? 'max-w-4xl' : 'max-w-2xl'} w-full shadow-2xl transform transition-all border border-gray-100 max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">{modalState.projectTitle}</h3>
                <p className="text-emerald-600 font-medium text-sm mt-1">{modalState.type === 'blueprint' ? '📐 Tinjauan Blueprint & Denah Arsitektur' : '📋 Detail Rencana Anggaran Biaya (RAB)'}</p>
              </div>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 text-3xl leading-none bg-gray-50 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">&times;</button>
            </div>

            {/* BLUEPRINT SIMULATION */}
            {modalState.type === 'blueprint' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden relative group">
                  {/* Blueprint Image Placeholder/Render */}
                  {modalState.image && modalState.image.startsWith('/') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={modalState.image} alt="Blueprint" className="w-full h-[400px] object-cover mix-blend-multiply opacity-90" style={{ filter: 'grayscale(30%) contrast(120%)' }} />
                  ) : (
                    <div className="w-full h-[400px] flex items-center justify-center text-8xl opacity-50 bg-[#e0eaf5]">
                      {modalState.image}
                    </div>
                  )}
                  {/* Blueprint Overlay Grids */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-20 pointer-events-none"></div>
                  
                  {/* Interactive UI Tools */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="w-10 h-10 bg-white rounded-lg shadow-md font-bold text-gray-700 hover:text-primary">+</button>
                    <button className="w-10 h-10 bg-white rounded-lg shadow-md font-bold text-gray-700 hover:text-primary">-</button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Spesifikasi Bangunan</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex justify-between border-b border-emerald-200/50 pb-1"><span>Luas Tanah</span><span className="font-bold">500 m²</span></li>
                      <li className="flex justify-between border-b border-emerald-200/50 pb-1"><span>Luas Bangunan</span><span className="font-bold">420 m²</span></li>
                      <li className="flex justify-between border-b border-emerald-200/50 pb-1"><span>Jumlah Lantai</span><span className="font-bold">2 Lantai</span></li>
                      <li className="flex justify-between border-b border-emerald-200/50 pb-1"><span>Kapasitas</span><span className="font-bold">1,200 Orang</span></li>
                      <li className="flex justify-between pb-1"><span>Gaya Desain</span><span className="font-bold text-right">Modern Tropis</span></li>
                    </ul>
                  </div>

                  <div>
                    <button className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold shadow-md hover:bg-black transition-colors flex items-center justify-center gap-2 mb-3">
                      <span>⬇️</span> Unduh PDF (.dwg/.pdf)
                    </button>
                    <button className="w-full bg-white text-gray-700 border-2 border-gray-200 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                      <span>👁️</span> Mode 3D Render
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* RAB SIMULATION */}
            {modalState.type === 'rab' && (
              <div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 flex justify-between items-center">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Estimasi Biaya</p>
                    <p className="text-3xl font-bold text-primary">Rp 495.000.000</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Estimasi Waktu</p>
                    <p className="text-xl font-bold text-gray-900">4 Bulan</p>
                  </div>
                </div>

                <div className="overflow-hidden border border-gray-200 rounded-xl">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 text-gray-600 font-bold uppercase text-xs">
                      <tr>
                        <th className="px-4 py-3 border-b">Uraian Pekerjaan</th>
                        <th className="px-4 py-3 border-b text-center">Bobot</th>
                        <th className="px-4 py-3 border-b text-right">Harga Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { title: "I. Pekerjaan Persiapan & Tanah", weight: "5%", price: "24.750.000" },
                        { title: "II. Pekerjaan Pondasi Cakar Ayam", weight: "15%", price: "74.250.000" },
                        { title: "III. Pekerjaan Struktur (Beton & Kolom)", weight: "35%", price: "173.250.000" },
                        { title: "IV. Pekerjaan Atap & Plafon", weight: "20%", price: "99.000.000" },
                        { title: "V. Pekerjaan Finishing & Arsitektur", weight: "25%", price: "123.750.000" },
                      ].map((item, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4 font-medium text-gray-800">{item.title}</td>
                          <td className="px-4 py-4 text-center">
                            <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold">{item.weight}</span>
                          </td>
                          <td className="px-4 py-4 text-right font-bold text-gray-700">Rp {item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button className="bg-white border-2 border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-50">Cetak Excel</button>
                  <button onClick={closeModal} className="bg-primary text-white px-8 py-2.5 rounded-xl font-bold shadow-md shadow-primary/20 hover:bg-primary-dark">Tutup</button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}