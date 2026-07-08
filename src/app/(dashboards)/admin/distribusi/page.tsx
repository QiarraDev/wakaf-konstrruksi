"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const regions = [
  { id: 1, name: "Jawa Barat", projects: 12, vendors: 45, alert: false },
  { id: 2, name: "Jawa Tengah", projects: 8, vendors: 20, alert: true },
  { id: 3, name: "Jawa Timur", projects: 15, vendors: 50, alert: false },
  { id: 4, name: "Banten", projects: 5, vendors: 12, alert: false },
  { id: 5, name: "DKI Jakarta", projects: 3, vendors: 30, alert: false },
  { id: 6, name: "Sumatera Barat", projects: 6, vendors: 4, alert: true },
];

export default function DistribusiPage() {
  const [selectedRegion, setSelectedRegion] = useState<number | null>(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const [broadcastModal, setBroadcastModal] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert("Simulasi: File Laporan_Distribusi_Area.pdf berhasil diunduh.");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Distribusi Area & Pemetaan Vendor</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Sistem cerdas mendeteksi rasio ketersediaan vendor terhadap jumlah proyek di suatu wilayah.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Region List */}
        <div className="card p-6 lg:col-span-1 h-[600px] flex flex-col">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">Daftar Wilayah Operasional</h2>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {regions.map((r) => (
              <div 
                key={r.id} 
                onClick={() => setSelectedRegion(r.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedRegion === r.id ? 'border-primary bg-primary/5 dark:bg-primary/10 shadow-sm' : 'border-gray-200 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-700 bg-gray-50 dark:bg-gray-800/50'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white">{r.name}</h3>
                  {r.alert && <span className="flex h-3 w-3 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span></span>}
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Proyek: <strong className="text-gray-900 dark:text-gray-200">{r.projects}</strong></span>
                  <span>Vendor: <strong className="text-gray-900 dark:text-gray-200">{r.vendors}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Map & Details Mockup */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-2 h-[350px] relative overflow-hidden bg-gray-100 dark:bg-gray-800/50 flex flex-col items-center justify-center">
            {/* Map Mockup Background */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #10b981 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            <div className="text-6xl mb-4 relative z-10">🗺️</div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white relative z-10">Peta Interaktif (Simulasi)</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 relative z-10">Area yang dipilih: <strong className="text-primary">{regions.find(r => r.id === selectedRegion)?.name || 'Semua'}</strong></p>
            
            {/* Animated Pingers simulating map markers */}
            {selectedRegion && (
              <>
                <motion.div initial={{scale:0}} animate={{scale:1}} className="absolute top-[30%] left-[40%] w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/50 flex items-center justify-center text-[8px] text-white font-bold">P</motion.div>
                <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.2}} className="absolute top-[45%] left-[55%] w-4 h-4 bg-primary rounded-full shadow-lg shadow-primary/50 flex items-center justify-center text-[8px] text-white font-bold">P</motion.div>
                <motion.div initial={{scale:0}} animate={{scale:1}} transition={{delay:0.4}} className="absolute top-[60%] left-[30%] w-3 h-3 bg-secondary rounded-full shadow-lg shadow-secondary/50 flex items-center justify-center text-[6px] text-white font-bold">V</motion.div>
              </>
            )}
          </div>

          {selectedRegion && (() => {
            const region = regions.find(r => r.id === selectedRegion);
            if(!region) return null;
            const ratio = region.vendors / region.projects;
            const isDeficit = ratio < 2;

            return (
              <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="card p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Analisis Rasio {region.name}</h3>
                
                {isDeficit ? (
                   <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-xl mb-6">
                     <div className="flex items-start gap-3">
                       <span className="text-red-500 text-xl">⚠️</span>
                       <div>
                         <h4 className="font-bold text-red-900 dark:text-red-400">Defisit Vendor Terdeteksi</h4>
                         <p className="text-sm text-red-700 dark:text-red-300 mt-1">Rasio vendor terhadap proyek terlalu rendah ({ratio.toFixed(1)} vendor/proyek). Disarankan untuk membuka rekrutmen vendor baru secara agresif di wilayah ini untuk mencegah penundaan proyek wakaf.</p>
                       </div>
                     </div>
                   </div>
                ) : (
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 p-4 rounded-r-xl mb-6">
                     <div className="flex items-start gap-3">
                       <span className="text-emerald-500 text-xl">✅</span>
                       <div>
                         <h4 className="font-bold text-emerald-900 dark:text-emerald-400">Rasio Vendor Sehat</h4>
                         <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">Terdapat cukup banyak vendor lokal terverifikasi ({ratio.toFixed(1)} vendor/proyek) untuk menangani tender di wilayah ini.</p>
                       </div>
                     </div>
                   </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <button 
                    onClick={handleDownload} 
                    disabled={isDownloading}
                    className={`btn-primary text-sm flex items-center justify-center gap-2 ${isDownloading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isDownloading ? (
                      <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span> Mengunduh...</>
                    ) : (
                      <>📄 Unduh Laporan Area (PDF)</>
                    )}
                  </button>
                  <button 
                    onClick={() => { setBroadcastSent(false); setBroadcastModal(true); }}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                  >
                    📢 Kirim Broadcast ke Vendor
                  </button>
                </div>
              </motion.div>
            );
          })()}
        </div>
      </div>

      {/* Broadcast Modal Simulation */}
      {broadcastModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-gray-100 dark:border-gray-800">
            {!broadcastSent ? (
              <>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white">Broadcast Rekrutmen Vendor</h2>
                    <p className="text-sm text-gray-500 mt-1">Kirimkan undangan rekrutmen ke mitra potensial di {regions.find(r => r.id === selectedRegion)?.name}.</p>
                  </div>
                  <button onClick={() => setBroadcastModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Target Wilayah</label>
                    <input type="text" disabled value={regions.find(r => r.id === selectedRegion)?.name || ""} className="w-full p-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Isi Pesan Broadcast</label>
                    <textarea rows={4} className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none text-gray-900 dark:text-white" defaultValue={`Kami mendeteksi adanya kekurangan vendor konstruksi tersertifikasi di wilayah Anda. 

Mari bergabung menjadi Mitra Konstruksi Wakaf untuk mendapatkan akses ke tender eksklusif pembangunan fasilitas ibadah dan pendidikan.`} />
                  </div>
                </div>
                <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
                  <button onClick={() => setBroadcastModal(false)} className="px-5 py-2 font-bold text-gray-500">Batal</button>
                  <button onClick={() => setBroadcastSent(true)} className="btn-primary">Kirim Pesan &rarr;</button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">✅</div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Broadcast Terkirim!</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Pesan penawaran kemitraan telah disebar ke 120+ kontak vendor potensial di area {regions.find(r => r.id === selectedRegion)?.name}.</p>
                <button onClick={() => setBroadcastModal(false)} className="btn-primary">Selesai</button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}