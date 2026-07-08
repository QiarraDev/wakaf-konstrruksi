"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ModalType = 'blueprint' | 'rab' | 'monitoring' | null;

export default function TransparansiPenyaluranPage() {
  const [modalState, setModalState] = useState<{isOpen: boolean, type: ModalType, projectTitle: string, image?: string}>({isOpen: false, type: null, projectTitle: ""});
  const [allocateModal, setAllocateModal] = useState<{isOpen: boolean, projectTitle: string}>({isOpen: false, projectTitle: ""});
  const [isSuccess, setIsSuccess] = useState(false);

  const INSTITUTIONAL_BALANCE = 5000000000; // 5 Miliar

  const openModal = (type: ModalType, projectTitle: string, image?: string) => {
    setModalState({isOpen: true, type, projectTitle, image});
  }

  const closeModal = () => {
    setModalState({isOpen: false, type: null, projectTitle: ""});
  }

  const handleAllocate = (projectTitle: string) => {
    setAllocateModal({isOpen: true, projectTitle});
    setIsSuccess(false);
  }

  return (
    <div className="bg-transparent mt-6">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Portofolio Penyaluran Dana</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-2xl">Pantau transparansi anggaran dan laporan validator lapangan sebelum menyalurkan dana institusi ke proyek konstruksi.</p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 px-6 py-3 rounded-2xl flex flex-col justify-center shadow-sm">
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Saldo Wakaf Tersedia</span>
          <span className="text-xl font-black text-emerald-900 dark:text-emerald-300">Rp 5.000.000.000</span>
        </div>
      </div>
      
      {/* Project Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            title: "Pembangunan Masjid Jami' An-Nur", 
            loc: "Bandung, Jawa Barat", 
            phase: "Menunggu Penyaluran", 
            specs: "Luas 800m² • 2 Lantai",
            needs: "Anggaran: Rp 1.200.000.000",
            img: "/news/news_masjid_1783408714337.png",
            isNew: true
          },
          { 
            title: "Asrama Tahfidz Qur'an", 
            loc: "Malang, Jawa Timur", 
            phase: "Menunggu Penyaluran", 
            specs: "Luas 350m² • 3 Lantai",
            needs: "Anggaran: Rp 500.000.000",
            img: "/news/news_pesantren_1783408727331.png" 
          },
          { 
            title: "Klinik Wakaf Umat", 
            loc: "Surabaya, Jawa Timur", 
            phase: "Konstruksi Berjalan (60%)", 
            specs: "Luas 200m² • 1 Lantai",
            needs: "Tersalurkan: Rp 480.000.000",
            img: "🏥" 
          }
        ].map((item, i) => (
          <div key={i} className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col ${item.isNew ? 'ring-2 ring-emerald-500' : ''}`}>
            
            <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-5xl overflow-hidden">
              {item.isNew && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl z-10 uppercase tracking-wider shadow-md">
                  Proyek Baru Disetujui Admin
                </div>
              )}
              {item.img.startsWith('/') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <span className="opacity-50 group-hover:scale-110 transition-transform">{item.img}</span>
              )}
              <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700">
                {item.phase}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-1">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight mb-1">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium flex items-center gap-1">
                <span>📍</span> {item.loc}
              </p>
              
              <div className="space-y-3 mb-6 flex-1">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Spesifikasi Bangunan</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.specs}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800">
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-1">Total RAB Disetujui</p>
                  <p className="text-sm font-black text-emerald-800 dark:text-emerald-300">{item.needs}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-auto">
                {item.phase.includes("Konstruksi") ? (
                  <button 
                    onClick={() => openModal('monitoring', item.title)}
                    className="col-span-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-blue-200 py-2.5 rounded-xl font-bold text-xs transition-colors"
                  >
                    📸 Lihat Bukti CCTV/Foto Lapangan
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => openModal('rab', item.title)}
                      className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-2.5 rounded-xl font-bold text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Detail RAB & Legalitas
                    </button>
                    <button 
                      onClick={() => handleAllocate(item.title)}
                      className="btn-primary py-2.5 text-xs shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform"
                    >
                      Salurkan Dana 📥
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Interactive Modals */}
      <AnimatePresence>
        {modalState.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`bg-white dark:bg-gray-900 rounded-2xl p-6 ${modalState.type === 'monitoring' ? 'max-w-4xl' : 'max-w-2xl'} w-full shadow-2xl border border-gray-100 dark:border-gray-800 max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">{modalState.projectTitle}</h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mt-1">
                    {modalState.type === 'rab' ? '📋 Transparansi Anggaran & Legalitas Lahan' : '📸 Monitoring Konstruksi Real-Time'}
                  </p>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl leading-none bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center">&times;</button>
              </div>

              {/* RAB SIMULATION */}
              {modalState.type === 'rab' && (
                <div className="space-y-6">
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800 flex items-start gap-4 text-sm text-emerald-900 dark:text-emerald-200">
                    <div className="text-2xl mt-0.5">✅</div>
                    <div>
                      <p className="font-bold">Verifikasi Legalitas Tanah: Lolos Uji</p>
                      <p className="mt-1">Validator lapangan telah memverifikasi Akta Ikrar Wakaf (AIW) secara langsung. Lahan terjamin tidak dalam sengketa.</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 flex items-start gap-4 text-sm text-blue-900 dark:text-blue-200">
                    <div className="text-2xl mt-0.5">ℹ️</div>
                    <p>
                      <strong>Transparansi RAB:</strong> Anggaran di bawah ini telah dikurasi ketat oleh QS independen dan Admin Pusat Wakaf Konstruksi.
                    </p>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 text-sm border-b border-gray-200 dark:border-gray-700">Tahap Konstruksi</th>
                          <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 text-sm border-b border-gray-200 dark:border-gray-700 text-right">Vendor Terpilih</th>
                          <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 text-sm border-b border-gray-200 dark:border-gray-700 text-right">Estimasi Biaya</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-800 text-gray-800 dark:text-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Persiapan & Pondasi</td><td className="p-3 text-right">PT. Maju Jaya</td><td className="p-3 text-right">Rp 45.000.000</td></tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Struktur Utama & Dinding</td><td className="p-3 text-right">CV. Bangun Sentosa</td><td className="p-3 text-right">Rp 120.000.000</td></tr>
                        <tr className="bg-emerald-50 dark:bg-emerald-900/20 font-bold border-t-2 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-400">
                          <td className="p-3" colSpan={2}>Estimasi Total Kebutuhan</td>
                          <td className="p-3 text-right">Rp 1.200.000.000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* LIVE MONITORING SIMULATION */}
              {modalState.type === 'monitoring' && (
                <div className="space-y-6">
                  <div className="aspect-video bg-gray-900 rounded-xl relative overflow-hidden flex items-center justify-center">
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse flex items-center gap-1"><span className="w-2 h-2 bg-white rounded-full"></span> LIVE</span>
                      <span className="bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">CCTV Kamera 1 - Area Depan</span>
                    </div>
                    {/* Placeholder for CCTV stream */}
                    <span className="text-6xl opacity-30">🏗️</span>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">Laporan Progres Fisik Berdasarkan Bukti (Validator)</h4>
                    <div className="space-y-4">
                      {/* Timeline Items */}
                      <div className="flex gap-4 items-start">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-xl shrink-0">✅</div>
                        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h5 className="font-bold text-gray-900 dark:text-white">Pemasangan Rangka Atap</h5>
                            <span className="text-xs text-gray-500">2 hari yang lalu</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Pemasangan baja ringan telah selesai 100%. Laporan foto telah divalidasi dengan GPS/Geotagging lokasi.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Allocate (Penyaluran) Modal */}
        {allocateModal.isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setAllocateModal({isOpen:false, projectTitle:""})}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-900 rounded-3xl p-0 max-w-md w-full shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transform transition-all" onClick={e => e.stopPropagation()}>
              {!isSuccess ? (
                <>
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-center text-white relative">
                    <button onClick={() => setAllocateModal({isOpen:false, projectTitle:""})} className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none">&times;</button>
                    <div className="text-4xl mb-2">📥</div>
                    <h3 className="text-xl font-black">Alokasi Dana Penyaluran</h3>
                    <p className="text-emerald-50 text-sm mt-1">{allocateModal.projectTitle}</p>
                  </div>
                  <div className="p-6 space-y-5">
                    
                    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-xl text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Saldo Institusi Anda</p>
                      <p className="text-2xl font-black text-gray-900 dark:text-white">Rp 5.000.000.000</p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tentukan Nominal Penyaluran</label>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {['Rp 100 Juta', 'Rp 250 Juta', 'Rp 500 Juta', 'Full (1.2 M)'].map(nom => (
                          <button key={nom} className="py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-bold text-gray-700 dark:text-gray-300 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-sm transition-colors">
                            {nom}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-3.5 text-gray-500 font-bold">Rp</span>
                        <input type="number" className="w-full pl-12 p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl font-bold text-gray-900 dark:text-white outline-none focus:border-emerald-500" placeholder="0" />
                      </div>
                    </div>
                    
                    <button onClick={() => setIsSuccess(true)} className="w-full bg-emerald-600 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all text-lg">
                      Konfirmasi Penyaluran
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-10 text-center space-y-4">
                  <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-5xl mx-auto mb-2 border-4 border-emerald-200 dark:border-emerald-800">✅</div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">Penyaluran Berhasil!</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Dana instansi Anda telah berhasil dialokasikan ke proyek ini. Anda bisa memantau progres fisik pembangunannya secara real-time pada Dashboard.
                  </p>
                  <button onClick={() => setAllocateModal({isOpen:false, projectTitle:""})} className="btn-primary w-full mt-4">
                    Tutup & Kembali
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}