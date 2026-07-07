"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const milestones = [
  {
    id: 1,
    title: "Pembangunan Masjid Jami' An-Nur",
    currentProgress: 60,
    nextMilestone: 80,
    dueDate: "20 Jul 2026",
    status: "berjalan",
  },
  {
    id: 2,
    title: "Pesantren Tahfidz Al-Ikhlas",
    currentProgress: 20,
    nextMilestone: 40,
    dueDate: "5 Agt 2026",
    status: "berjalan",
  },
];

export default function VendorDashboard() {
  const [modal, setModal] = useState<{ projectId: number; milestone: number } | null>(null);
  const [submitted, setSubmitted] = useState<number[]>([]);
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (modal) {
      setSubmitted([...submitted, modal.projectId]);
      setModal(null);
      setNotes("");
    }
  };

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Dashboard Vendor & Kontraktor</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola eksekusi proyek, laporkan milestone, dan ajukan termin pembayaran.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { label: "Proyek Aktif", value: "2", icon: "🏗️", color: "text-primary" },
            { label: "Payment Pending", value: "1 Termin", icon: "💳", color: "text-amber-500" },
            { label: "Validasi RAB Menunggu", value: "3 Dokumen", icon: "📋", color: "text-red-500" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="stat-card flex items-center gap-4"
            >
              <div className="text-3xl">{s.icon}</div>
              <div>
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Milestone Reporting */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="card overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-lg font-black text-gray-900 dark:text-white">Milestone Reporting</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Laporkan setiap kelipatan progres 20% untuk pencairan termin anggaran.</p>
          </div>
          <div className="p-6 space-y-5">
            {milestones.map((m) => (
              <div key={m.id} className="rounded-2xl border border-gray-100 dark:border-gray-800 p-5 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{m.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Target milestone: <strong className="text-primary">{m.nextMilestone}%</strong> · Tenggat: {m.dueDate}</p>
                  </div>
                  {submitted.includes(m.id) ? (
                    <span className="badge badge-success text-xs flex-shrink-0">✓ Dikirim</span>
                  ) : (
                    <button
                      onClick={() => setModal({ projectId: m.id, milestone: m.nextMilestone })}
                      className="btn-primary text-xs px-4 py-2 flex-shrink-0"
                    >
                      Laporkan {m.nextMilestone}%
                    </button>
                  )}
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-gray-600 dark:text-gray-400">
                    <span>Progres Saat Ini</span>
                    <span className="text-primary">{m.currentProgress}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${m.currentProgress}%` }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full"
                    />
                    {/* Target marker */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-amber-400"
                      style={{ left: `${m.nextMilestone}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>Saat ini: {m.currentProgress}%</span>
                    <span className="text-amber-500 font-bold">Target: {m.nextMilestone}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { label: "Upload Foto Progres", icon: "📸", desc: "Dokumentasi harian", action: () => setModal({ projectId: 0, milestone: 0 }) },
            { label: "Ajukan Termin", icon: "💳", desc: "Pencairan anggaran", action: () => setModal({ projectId: 0, milestone: 0 }) },
            { label: "Laporan Mingguan", icon: "📊", desc: "Rekap pekerjaan", action: () => setModal({ projectId: 0, milestone: 0 }) },
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="card p-5 flex items-center gap-4 text-left hover:-translate-y-1 transition-all group"
            >
              <div className="w-11 h-11 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              </div>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Milestone Submit Modal */}
      {modal && modal.milestone > 0 && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 border border-gray-100 dark:border-gray-800"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-xl">📊</div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white">Laporan Milestone {modal.milestone}%</h2>
              </div>
              <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none">×</button>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Deskripsi Pekerjaan yang Selesai</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Contoh: Pengecoran sloof lantai 1 selesai 100%. Material besi Ø16 terpasang sesuai spesifikasi..."
                  className="w-full h-32 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Upload Foto Dokumentasi</label>
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center cursor-pointer hover:border-primary transition-colors">
                  <div className="text-3xl mb-2">📷</div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Klik untuk upload foto (maks. 5 foto)</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setModal(null)} className="flex-1 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                Batal
              </button>
              <button onClick={handleSubmit} className="flex-1 btn-primary">
                Kirim Laporan
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
