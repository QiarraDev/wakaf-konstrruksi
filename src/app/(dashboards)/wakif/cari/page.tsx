"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ModalType = 'blueprint' | 'rab' | null;

export default function CariPage() {
  const [modalState, setModalState] = useState<{isOpen: boolean, type: ModalType, projectTitle: string, image?: string}>({isOpen: false, type: null, projectTitle: ""});
  const [donateModal, setDonateModal] = useState<{isOpen: boolean, projectTitle: string}>({isOpen: false, projectTitle: ""});
  const [isSuccess, setIsSuccess] = useState(false);

  const openModal = (type: ModalType, projectTitle: string, image?: string) => {
    setModalState({isOpen: true, type, projectTitle, image});
  }

  const closeModal = () => {
    setModalState({isOpen: false, type: null, projectTitle: ""});
  }

  const handleDonate = (projectTitle: string) => {
    setDonateModal({isOpen: true, projectTitle});
    setIsSuccess(false);
  }

  return (
    <div className="bg-transparent mt-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Katalog Proyek Konstruksi (Crowdfunding)</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Bantu wujudkan fasilitas ibadah dan pendidikan melalui wakaf uang untuk pembangunan.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { 
            title: "Pembangunan Masjid Jami' An-Nur (Baru)", 
            loc: "Bandung, Jawa Barat", 
            phase: "Penggalangan Dana", 
            specs: "Luas 800m² • 2 Lantai",
            needs: "Target: Rp 1.200.000.000",
            img: "/news/news_masjid_1783408714337.png",
            isNew: true
          },
          { 
            title: "Asrama Tahfidz Qur'an", 
            loc: "Malang, Jawa Timur", 
            phase: "Penggalangan Dana", 
            specs: "Luas 350m² • 3 Lantai",
            needs: "Target: Rp 500.000.000",
            img: "/news/news_pesantren_1783408727331.png" 
          },
          { 
            title: "Klinik Wakaf Umat", 
            loc: "Surabaya, Jawa Timur", 
            phase: "Terkumpul 60%", 
            specs: "Luas 200m² • 1 Lantai",
            needs: "Kekurangan: Rp 320.000.000",
            img: "🏥" 
          }
        ].map((item, i) => (
          <div key={i} className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col ${item.isNew ? 'ring-2 ring-emerald-500' : ''}`}>
            <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-5xl overflow-hidden">
              {item.isNew && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl z-10 uppercase tracking-wider shadow-md">
                  Baru Dipublikasikan
                </div>
              )}
              {item.img.startsWith('/') ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <span className="opacity-50 group-hover:scale-110 transition-transform">{item.img}</span>
              )}
              <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
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
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Spesifikasi</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.specs}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-3 rounded-xl border border-emerald-100 dark:border-emerald-800">
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mb-1">Kebutuhan Dana</p>
                  <p className="text-sm font-black text-emerald-800 dark:text-emerald-300">{item.needs}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-auto">
                <button 
                  onClick={() => openModal('rab', item.title)}
                  className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-2.5 rounded-xl font-bold text-xs hover:bg-gray-50 dark:hover:gray-700 transition-colors"
                >
                  Lihat RAB
                </button>
                <button 
                  onClick={() => handleDonate(item.title)}
                  className="btn-primary py-2.5 text-xs shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform"
                >
                  Mulai Berwakaf 💚
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Interactive Modals */}
      <AnimatePresence>
        {modalState.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={closeModal}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`bg-white dark:bg-gray-900 rounded-2xl p-6 ${modalState.type === 'blueprint' ? 'max-w-4xl' : 'max-w-2xl'} w-full shadow-2xl border border-gray-100 dark:border-gray-800 max-h-[90vh] overflow-y-auto`} onClick={e => e.stopPropagation()}>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">{modalState.projectTitle}</h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm mt-1">{modalState.type === 'blueprint' ? '📐 Tinjauan Blueprint & Denah Arsitektur' : '📋 Detail Rencana Anggaran Biaya (RAB)'}</p>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-3xl leading-none bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center">&times;</button>
              </div>

              {/* BLUEPRINT SIMULATION */}
              {modalState.type === 'blueprint' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden relative group">
                    <div className="w-full h-[400px] flex items-center justify-center text-8xl opacity-50 bg-[#e0eaf5]">
                      📐
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                      <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wider">Spesifikasi Bangunan</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex justify-between border-b border-emerald-200/50 pb-1"><span>Luas Tanah</span><span className="font-bold">500 m²</span></li>
                        <li className="flex justify-between border-b border-emerald-200/50 pb-1"><span>Luas Bangunan</span><span className="font-bold">420 m²</span></li>
                        <li className="flex justify-between border-b border-emerald-200/50 pb-1"><span>Jumlah Lantai</span><span className="font-bold">2 Lantai</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* RAB SIMULATION */}
              {modalState.type === 'rab' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 flex items-start gap-4 text-sm text-blue-900 dark:text-blue-200">
                    <div className="text-2xl mt-0.5">ℹ️</div>
                    <p>
                      <strong>Transparansi Dana:</strong> Rencana anggaran ini telah diverifikasi oleh QS (Quantity Surveyor) independen dan disetujui oleh tim kurasi Admin Wakaf Konstruksi.
                    </p>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 text-sm border-b border-gray-200 dark:border-gray-700">Uraian Pekerjaan</th>
                          <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 text-sm border-b border-gray-200 dark:border-gray-700 text-right">Volume</th>
                          <th className="p-3 font-semibold text-gray-600 dark:text-gray-300 text-sm border-b border-gray-200 dark:border-gray-700 text-right">Estimasi Biaya</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100 dark:divide-gray-800 text-gray-800 dark:text-gray-200">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Pekerjaan Persiapan &amp; Tanah</td><td className="p-3 text-right">1 ls</td><td className="p-3 text-right">Rp 45.000.000</td></tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Pekerjaan Struktur Bawah (Pondasi)</td><td className="p-3 text-right">24 ttk</td><td className="p-3 text-right">Rp 120.000.000</td></tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="p-3">Pekerjaan Beton &amp; Dinding</td><td className="p-3 text-right">450 m²</td><td className="p-3 text-right">Rp 350.000.000</td></tr>
                        <tr className="bg-emerald-50 dark:bg-emerald-900/20 font-bold border-t-2 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-400">
                          <td className="p-3" colSpan={2}>Estimasi Total Kebutuhan</td>
                          <td className="p-3 text-right">Rp 515.000.000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Donate Modal */}
        {donateModal.isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setDonateModal({isOpen:false, projectTitle:""})}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-900 rounded-3xl p-0 max-w-md w-full shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 transform transition-all" onClick={e => e.stopPropagation()}>
              {!isSuccess ? (
                <>
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 text-center text-white relative">
                    <button onClick={() => setDonateModal({isOpen:false, projectTitle:""})} className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl leading-none">&times;</button>
                    <div className="text-4xl mb-2">💚</div>
                    <h3 className="text-xl font-black">Wakaf Jariyah</h3>
                    <p className="text-emerald-50 text-sm mt-1">{donateModal.projectTitle}</p>
                  </div>
                  <div className="p-6 space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Pilih Nominal Wakaf</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Rp 100.000', 'Rp 250.000', 'Rp 500.000', 'Rp 1.000.000'].map(nom => (
                          <button key={nom} className="py-2.5 border-2 border-gray-200 dark:border-gray-700 rounded-xl font-bold text-gray-700 dark:text-gray-300 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-sm transition-colors">
                            {nom}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Nominal Lainnya</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3.5 text-gray-500 font-bold">Rp</span>
                        <input type="number" className="w-full pl-12 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-gray-900 dark:text-white outline-none focus:border-emerald-500" placeholder="0" />
                      </div>
                    </div>
                    <button onClick={() => setIsSuccess(true)} className="w-full bg-emerald-600 text-white font-black py-4 rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all text-lg">
                      Lanjutkan Pembayaran
                    </button>
                  </div>
                </>
              ) : (
                <div className="p-10 text-center space-y-4">
                  <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-5xl mx-auto mb-2 border-4 border-emerald-200 dark:border-emerald-800">✅</div>
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white">Alhamdulillah!</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Proses pembayaran wakaf Anda sedang diproses oleh Virtual Account BSI. Semoga menjadi pahala jariyah yang mengalir selamanya.
                  </p>
                  <button onClick={() => setDonateModal({isOpen:false, projectTitle:""})} className="btn-primary w-full mt-4">
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