"use client";
import { motion } from "framer-motion";
import { PublicNav } from "@/components/layout/PublicNav";
import { useState } from "react";

const stats = [
  { label: "Total Anggaran Terkelola", value: "Rp 12.4M", icon: "📊", detail: "Dari 120 proyek aktif" },
  { label: "Laporan Lapangan Valid", value: "3.287", icon: "✅", detail: "Diverifikasi oleh 45 validator" },
  { label: "Vendor Bersertifikat", value: "47", icon: "🏗️", detail: "Terverifikasi & aktif" },
  { label: "Tingkat Kepatuhan SOP", value: "98.2%", icon: "🛡️", detail: "Inspeksi mingguan" },
];

const vendors = [
  { name: "PT Bangun Bersama Nusantara", sertifikat: "ISO 9001:2015", proyek: 14, rating: 4.9, status: "Aktif" },
  { name: "CV Karya Utama Sejahtera", sertifikat: "SNI Kontruksi", proyek: 9, rating: 4.8, status: "Aktif" },
  { name: "PT Griya Konstruksi Indonesia", sertifikat: "ISO 9001:2015", proyek: 8, rating: 4.7, status: "Aktif" },
  { name: "Koperasi Bangun Bersama", sertifikat: "SIUJK Kelas M", proyek: 5, rating: 4.6, status: "Aktif" },
  { name: "CV Karya Mandiri Abadi", sertifikat: "SNI Kontruksi", proyek: 4, rating: 4.5, status: "Review" },
];

const reports = [
  { tanggal: "07 Jul 2026", proyek: "Masjid Raya Al-Hikmah", validator: "Ir. Ahmad Fauzan", status: "Sesuai", temuan: "Tidak ada" },
  { tanggal: "06 Jul 2026", proyek: "Pesantren Nurul Huda", validator: "Budi Santoso, ST", status: "Catatan Minor", temuan: "1 item" },
  { tanggal: "05 Jul 2026", proyek: "Jembatan Akses Desa", validator: "Ir. Ahmad Fauzan", status: "Sesuai", temuan: "Tidak ada" },
  { tanggal: "04 Jul 2026", proyek: "Madrasah Al-Amin", validator: "Sri Rahayu, ST", status: "Sesuai", temuan: "Tidak ada" },
];

export default function Transparansi() {
  const [activeTab, setActiveTab] = useState<"laporan" | "vendor">("laporan");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNav />

      <main className="flex-1 py-12 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Data Diperbarui Setiap Hari
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Transparansi Platform
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Seluruh data teknis, laporan validasi lapangan, dan verifikasi vendor dibuka secara publik demi akuntabilitas penuh.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="stat-card text-center"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">{stat.label}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">{stat.detail}</div>
            </motion.div>
          ))}
        </div>

        {/* RAB Breakdown Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="card p-8 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Distribusi Anggaran per Kategori Proyek</h2>
          <div className="space-y-4">
            {[
              { label: "Masjid & Musalla", pct: 45, color: "bg-emerald-500", amount: "Rp 5.6M" },
              { label: "Pesantren & Madrasah", pct: 30, color: "bg-blue-500", amount: "Rp 3.7M" },
              { label: "Fasilitas Umum", pct: 15, color: "bg-amber-500", amount: "Rp 1.9M" },
              { label: "Rehabilitasi Darurat", pct: 10, color: "bg-rose-500", amount: "Rp 1.2M" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                  <span className="text-gray-900 dark:text-white">{item.amount} ({item.pct}%)</span>
                </div>
                <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.pct}%` }}
                    transition={{ duration: 1, delay: 0.6 + i * 0.15 }}
                    className={`h-full ${item.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          {(["laporan", "vendor"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab
                ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {tab === "laporan" ? "📋 Laporan Inspeksi Terbaru" : "🏗️ Vendor Terverifikasi"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="card overflow-hidden"
        >
          {activeTab === "laporan" ? (
            <table className="w-full data-table text-sm">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Proyek</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Validator</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Temuan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {reports.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{r.tanggal}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{r.proyek}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{r.validator}</td>
                    <td className="px-6 py-4">
                      <span className={`badge ${r.status === "Sesuai" ? "badge-success" : "badge-warning"}`}>{r.status}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{r.temuan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full data-table text-sm">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nama Vendor</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sertifikasi</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Proyek</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {vendors.map((v, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{v.name}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{v.sertifikat}</td>
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{v.proyek}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400">★</span>
                        <span className="font-bold text-gray-900 dark:text-white">{v.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${v.status === "Aktif" ? "badge-success" : "badge-warning"}`}>{v.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </motion.div>
      </main>
    </div>
  );
}
