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

                <div className="flex gap-4">
                  <button className="btn-primary text-sm">Unduh Laporan Area (PDF)</button>
                  <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-bold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Kirim Broadcast ke Vendor</button>
                </div>
              </motion.div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}