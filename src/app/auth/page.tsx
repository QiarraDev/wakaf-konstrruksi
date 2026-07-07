"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AuthPage() {
  const roles = [
    {
      id: "pengelola",
      name: "Pengelola Aset",
      description: "Takmir Masjid, Pesantren, Komunitas Desa",
      path: "/pengelola",
      icon: "🕌",
      gradient: "from-emerald-500 to-teal-600",
      glow: "shadow-emerald-200",
      border: "hover:border-emerald-400",
    },
    {
      id: "wakif",
      name: "Wakif (Donatur)",
      description: "Individu & Institusi (LazizMu, Dompet Dhuafa, dll)",
      path: "/wakif",
      icon: "🤲",
      gradient: "from-amber-400 to-orange-500",
      glow: "shadow-amber-200",
      border: "hover:border-amber-400",
    },
    {
      id: "admin",
      name: "Admin Platform",
      description: "Super Admin & Admin Biasa (Verifikasi & Kurasi)",
      path: "/admin",
      icon: "🛡️",
      gradient: "from-blue-500 to-indigo-600",
      glow: "shadow-blue-200",
      border: "hover:border-blue-400",
    },
    {
      id: "vendor",
      name: "Mitra Vendor",
      description: "Vendor Resmi & Swakelola (Eksekusi Proyek)",
      path: "/vendor",
      icon: "🏗️",
      gradient: "from-slate-600 to-gray-700",
      glow: "shadow-slate-200",
      border: "hover:border-slate-400",
    },
    {
      id: "validator",
      name: "Validator Lapangan",
      description: "Tim Inspeksi & Verifikasi Progres di Lokasi Konstruksi",
      path: "/validator",
      icon: "🔍",
      gradient: "from-violet-500 to-purple-600",
      glow: "shadow-violet-200",
      border: "hover:border-violet-400",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0b1f18 0%, #0d2a20 40%, #071510 100%)' }}>

      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-emerald-500/5 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-emerald-500/3 rounded-full"></div>
      </div>

      <div className="w-full max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Logo Mark */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.34,1.56,0.64,1] }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/30">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl font-black text-white tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Wakaf Konstruksi
          </motion.h1>
          <motion.p
            className="text-emerald-400/70 text-lg mt-3 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            Pilih peran Anda untuk masuk ke ekosistem platform
          </motion.p>
        </motion.div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role, i) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.45, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Link
                href={role.path}
                className={`group flex flex-col p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 ${role.border} hover:shadow-xl ${role.glow}`}
              >
                {/* Icon gradient bubble */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {role.icon}
                </div>
                <h3 className="text-lg font-bold text-white">{role.name}</h3>
                <p className="text-sm text-white/50 mt-1.5 leading-relaxed">{role.description}</p>
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Masuk <span className="ml-1">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.p
          className="text-center text-white/30 text-sm mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Platform Digital Wakaf Konstruksi • Simulasi Demo
        </motion.p>
      </div>
    </div>
  );
}
