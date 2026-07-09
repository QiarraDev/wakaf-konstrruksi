"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DemoPage() {
  const demos = [
    {
      title: "📖 Workflow Timeline",
      description: "Lihat timeline lengkap dari awal pengajuan sampai publikasi dengan penjelasan detail setiap tahap",
      href: "/demo-workflow",
      icon: "📋",
      color: "from-blue-500 to-indigo-600",
      features: ["11 tahap workflow", "Timeline visual", "Detail setiap tahap"],
    },
    {
      title: "🎮 Simulasi Interaktif",
      description: "Coba jalankan simulasi sebagai berbagai role dan lihat bagaimana workflow bekerja dari perspektif masing-masing",
      href: "/demo-simulasi",
      icon: "🎬",
      color: "from-purple-500 to-pink-600",
      features: ["5 role berbeda", "Progress tracking", "Interactive experience"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4">
            🚀 Demo Workflow Lengkap
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Jelajahi simulasi lengkap dari pengajuan proposal sampai publikasi di portal publik dan penggalangan dana
          </p>
        </motion.div>

        {/* Demo Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {demos.map((demo, idx) => (
            <motion.div
              key={demo.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="group"
            >
              <Link href={demo.href}>
                <div className={`relative overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-gray-800 hover:border-primary transition-all cursor-pointer h-full bg-white dark:bg-gray-900 shadow-lg hover:shadow-2xl`}>
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${demo.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  {/* Content */}
                  <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                    {/* Top */}
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-5xl">{demo.icon}</div>
                        <motion.div
                          className={`w-12 h-12 rounded-full bg-gradient-to-br ${demo.color} flex items-center justify-center text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity`}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, repeatType: "loop" }}
                        >
                          →
                        </motion.div>
                      </div>

                      <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                        {demo.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {demo.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                      <div className="flex flex-wrap gap-2">
                        {demo.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1.5 text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <motion.div
                    className={`absolute bottom-4 right-4 text-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Workflow Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 mb-12"
        >
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
            📊 Alur Workflow Lengkap
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-11 gap-2 mb-6">
            {[
              { icon: "📝", label: "Pengajuan", role: "Pengelola" },
              { icon: "🔍", label: "Assessment", role: "Pengelola" },
              { icon: "💰", label: "RAB & Desain", role: "Pengelola" },
              { icon: "✅", label: "Kurasi", role: "Admin" },
              { icon: "🔍", label: "Inspeksi", role: "Validator" },
              { icon: "📋", label: "Terima Laporan", role: "Admin" },
              { icon: "👑", label: "Approval", role: "Super Admin" },
              { icon: "🌐", label: "Publikasi", role: "Sistem" },
              { icon: "🤲", label: "Penggalangan", role: "Wakif" },
              { icon: "🏗️", label: "Eksekusi", role: "Vendor" },
              { icon: "🎉", label: "Selesai", role: "Nazhir" },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white font-bold text-lg mb-2">
                  {step.icon}
                </div>
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 text-center">{step.label}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-500 text-center mt-0.5">{step.role}</p>
                {idx < 10 && (
                  <div className="text-primary font-black mt-1 text-lg">→</div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="font-bold text-blue-900 dark:text-blue-400 mb-1">⏱️ Waktu Total</p>
              <p className="text-blue-700 dark:text-blue-300">3-6 bulan (dari proposal hingga publikasi)</p>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
              <p className="font-bold text-emerald-900 dark:text-emerald-400 mb-1">👥 Stakeholder</p>
              <p className="text-emerald-700 dark:text-emerald-300">5 role utama terlibat dalam proses</p>
            </div>
            <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
              <p className="font-bold text-orange-900 dark:text-orange-400 mb-1">📊 Transparansi</p>
              <p className="text-orange-700 dark:text-orange-300">Real-time update untuk semua pihak</p>
            </div>
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-primary/5 to-emerald-500/5 border-2 border-primary/20 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">
            ✨ Fitur Utama Sistem
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: "🔔", title: "Notifikasi Real-time", desc: "Semua stakeholder dapat notifikasi saat ada update" },
              { icon: "📊", title: "Dashboard Interaktif", desc: "Setiap role memiliki dashboard sesuai kebutuhan" },
              { icon: "📸", title: "Dokumentasi Visual", desc: "Foto, GPS, dan face recognition untuk transparansi" },
              { icon: "⭐", title: "Skor Validasi", desc: "Sistem scoring otomatis untuk penilaian kualitas" },
              { icon: "🛡️", title: "Multi-layer Approval", desc: "Approval dari multiple roles untuk keamanan" },
              { icon: "📱", title: "Mobile Ready", desc: "Aplikasi responsif untuk semua perangkat" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-white dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <p className="font-bold text-gray-900 dark:text-white mb-1">{feature.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:border-primary hover:text-primary transition"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
