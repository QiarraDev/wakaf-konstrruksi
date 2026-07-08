"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const modules = [
  { id: 1, title: "Standar Keselamatan (K3) Proyek Masjid", duration: "45 Menit", thumb: "👷‍♂️", desc: "Panduan lengkap prosedur Keselamatan dan Kesehatan Kerja (K3) khusus untuk lingkungan pembangunan fasilitas ibadah yang sering berdekatan dengan permukiman warga." },
  { id: 2, title: "Sertifikasi Material Halal & SNI", duration: "1 Jam", thumb: "🧱", desc: "Cara memastikan bahwa seluruh material bangunan (seperti cat, kuas, dan semen) terbebas dari unsur non-halal serta memenuhi Standar Nasional Indonesia." },
  { id: 3, title: "Prosedur Swakelola Berstandar", duration: "30 Menit", thumb: "📜", desc: "SOP manajemen keuangan dan pencatatan tenaga kerja lokal (gotong royong) agar tetap akuntabel dan transparan." },
  { id: 4, title: "Manajemen Limbah Konstruksi", duration: "25 Menit", thumb: "♻️", desc: "Pengelolaan sisa material agar tidak merusak lingkungan sekitar dan dapat didaur ulang." },
];

export default function LmsPage() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  const selectedModule = modules.find(m => m.id === activeVideo);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">LMS: Edukasi Konstruksi</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Pusat pelatihan wajib bagi seluruh vendor dan pengelola sebelum memulai proyek.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((module) => (
          <motion.div 
            key={module.id} 
            whileHover={{ y: -5 }}
            onClick={() => setActiveVideo(module.id)} 
            className="card overflow-hidden cursor-pointer group"
          >
            <div className="bg-gray-100 dark:bg-gray-800 h-40 flex items-center justify-center text-5xl relative overflow-hidden">
              {module.thumb}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center pl-1 text-primary shadow-lg">
                  ▶
                </div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-gray-900 dark:text-white leading-tight mb-2 line-clamp-2">{module.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">⏱️ {module.duration}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Video Player Modal Simulation */}
      <AnimatePresence>
        {activeVideo && selectedModule && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="font-bold text-gray-900 dark:text-white truncate pr-4">{selectedModule.title}</h2>
                <button onClick={() => setActiveVideo(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none">&times;</button>
              </div>
              
              {/* Fake Video Player */}
              <div className="w-full aspect-video bg-gray-900 relative flex items-center justify-center group">
                <div className="text-7xl opacity-20">{selectedModule.thumb}</div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-primary/90 text-white rounded-full flex items-center justify-center pl-1 text-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:scale-110 transition-transform">
                    ▶
                  </button>
                </div>

                {/* Progress Bar (Fake) */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-800">
                  <div className="h-full bg-primary w-1/3 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white">{selectedModule.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Modul Wajib • {selectedModule.duration}</p>
                  </div>
                  <button className="btn-primary whitespace-nowrap text-sm">Tandai Selesai ✓</button>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {selectedModule.desc}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}