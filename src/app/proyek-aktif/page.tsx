"use client";
import { motion } from "framer-motion";
import { PublicNav } from "@/components/layout/PublicNav";
import Link from "next/link";
import { useState } from "react";

export default function ProyekAktif() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const filters = ["Semua", "Masjid", "Pesantren", "Fasilitas Umum"];

  const projects = [
    {
      id: 1,
      title: "Pembangunan Masjid Raya Al-Hikmah",
      category: "Masjid",
      location: "Bandung, Jawa Barat",
      progress: 65,
      stage: "Pengecoran Atap",
      budget: "Rp 1.2M",
      vendor: "PT Bangun Bersama",
      lastUpdate: "2 hari lalu",
    },
    {
      id: 2,
      title: "Rehabilitasi Pesantren Nurul Huda",
      category: "Pesantren",
      location: "Bantul, DI Yogyakarta",
      progress: 30,
      stage: "Pondasi & Dinding",
      budget: "Rp 850 Jt",
      vendor: "CV Karya Utama",
      lastUpdate: "5 jam lalu",
    },
    {
      id: 3,
      title: "Pembangunan Jembatan Akses Desa",
      category: "Fasilitas Umum",
      location: "Lebak, Banten",
      progress: 85,
      stage: "Finishing",
      budget: "Rp 420 Jt",
      vendor: "Swakelola Desa",
      lastUpdate: "1 hari lalu",
    },
  ];

  const filteredProjects = activeFilter === "Semua" ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNav />

      <main className="flex-1 py-12 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Proyek Aktif
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Pantau langsung progres pembangunan fisik dan validitas teknis dari proyek wakaf konstruksi di seluruh Indonesia.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeFilter === filter 
                ? "bg-primary text-white shadow-md shadow-primary/20" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card overflow-hidden group flex flex-col"
            >
              <div className="h-48 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <div className="absolute top-4 left-4 z-20">
                  <span className="badge badge-success backdrop-blur-md bg-white/90 dark:bg-black/80">{project.category}</span>
                </div>
                {/* Mock Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                  {project.location}
                </div>

                <div className="space-y-4 mb-6 flex-1">
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span className="text-gray-700 dark:text-gray-300">Progres Fisik</span>
                      <span className="text-primary">{project.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                        className="h-full bg-primary rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 font-medium">Tahap: {project.stage}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Anggaran RAB</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{project.budget}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Pelaksana</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{project.vendor}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2.5 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors text-sm">
                    Lihat Blueprint
                  </button>
                  <button className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm">
                    Log Harian
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
