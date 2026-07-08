"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const VENDOR_LIST = [
  {
    id: "VND-001",
    name: "PT. Maju Jaya Konstruksi",
    type: "PT",
    region: "Jawa Barat",
    status: "Perlu Verifikasi Lapangan",
    pic: "Budi Santoso",
    phone: "081234567890",
    address: "Jl. Sudirman No.45, Bandung",
    docs: ["NIB_PT_Maju_Jaya.pdf", "SIUJK_2024.pdf", "NPWP.pdf"],
    kycScore: 85,
  },
  {
    id: "VND-002",
    name: "CV. Bangun Bersama",
    type: "CV",
    region: "Jawa Tengah",
    status: "Perlu Verifikasi Lapangan",
    pic: "Ahmad Fauzi",
    phone: "082345678901",
    address: "Jl. Pemuda No.12, Semarang",
    docs: ["NIB_CV_Bangun.pdf", "KTP_Direktur.jpg"],
    kycScore: 60,
  },
  {
    id: "VND-003",
    name: "Kelompok Swakelola An-Nur",
    type: "Swakelola",
    region: "Jawa Timur",
    status: "Terverifikasi",
    pic: "Pak Hasyim",
    phone: "083456789012",
    address: "Desa Kebonsari, Jombang",
    docs: ["NIB_Swakelola.pdf"],
    kycScore: 92,
  },
];

export default function ValidatorDashboard() {
  const [selectedProject, setSelectedProject] = useState("Masjid Jami' An-Nur");
  const [activeTab, setActiveTab] = useState<"proyek" | "vendor" | "kurasi">("proyek");
  const [selectedVendor, setSelectedVendor] = useState<typeof VENDOR_LIST[0] | null>(null);

  // States for Kurasi Proyek Baru
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const [surveyStatus, setSurveyStatus] = useState("Pending");
  const [vendorStatuses, setVendorStatuses] = useState<{[id: string]: string}>({});
  const [inspectNote, setInspectNote] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const projects = ["Masjid Jami' An-Nur", "Pesantren Tahfidz Al-Ikhlas"];

  const stats = [
    { label: "Proyek Dipantau", value: "2", icon: "🏗️", color: "text-primary" },
    { label: "Laporan Bulan Ini", value: "8", icon: "📸", color: "text-blue-600" },
    { label: "Inspeksi Menunggu", value: "1", icon: "⏳", color: "text-orange-500" },
    { label: "Skor Kepatuhan", value: "94%", icon: "✅", color: "text-emerald-600" },
  ];

  const recentActivity = [
    { time: "09:15 WIB", action: "Laporan progres 60% Masjid An-Nur dikirim", status: "success" },
    { time: "Kemarin, 14:30", action: "Checklist inspeksi lantai 2 diselesaikan", status: "success" },
    { time: "Kemarin, 11:00", action: "Foto dokumentasi 12 gambar diunggah", status: "success" },
    { time: "2 Hari lalu", action: "Laporan revisi RAB diterima dari Vendor", status: "warning" },
  ];

  const handleVerifVendor = (id: string, action: "setujui" | "tolak") => {
    const label = action === "setujui" ? "Terverifikasi Lapangan" : "Ditolak";
    setVendorStatuses(prev => ({ ...prev, [id]: label }));
    setSuccessMsg(action === "setujui"
      ? `✅ Vendor ${selectedVendor?.name} telah berhasil diverifikasi!`
      : `❌ Vendor ${selectedVendor?.name} ditolak. Notifikasi dikirim ke Admin.`);
    setSelectedVendor(null);
    setInspectNote("");
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const pendingVendors = VENDOR_LIST.filter(v =>
    (vendorStatuses[v.id] || v.status) === "Perlu Verifikasi Lapangan"
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Dashboard Validator Lapangan</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Pantau progres proyek dan verifikasi mitra vendor di lapangan.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 px-4 py-2 rounded-xl">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Aktif • GPS On</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="stat-card flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl">{s.icon}</span>
              <span className={`text-2xl font-black ${s.color}`}>{s.value}</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 rounded-xl p-4 font-bold text-emerald-800 dark:text-emerald-300 text-sm"
          >
            {successMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Action: Submit Report */}
      <div className="bg-gradient-to-r from-primary to-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-primary/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold">Kirim Laporan Real-Time Sekarang</h2>
            <p className="text-white/80 text-sm mt-1">Laporkan kondisi terkini dari lokasi konstruksi lengkap dengan foto & data GPS.</p>
          </div>
          <Link href="/validator/laporan" className="flex-shrink-0 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-md">
            📸 Buat Laporan
          </Link>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
        {[
          { id: "proyek", label: "🏗️ Status Proyek" },
          { id: "vendor", label: `🔍 Validasi Vendor${pendingVendors.length > 0 ? ` (${pendingVendors.length})` : ""}` },
          { id: "kurasi", label: `📝 Inspeksi Proyek Baru ${surveyStatus === "Pending" ? "(1)" : ""}` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as "proyek" | "vendor" | "kurasi")}
            className={`px-5 py-2.5 font-bold text-sm rounded-t-xl transition-colors ${
              activeTab === tab.id
                ? "bg-primary/10 dark:bg-primary/20 text-primary border-b-2 border-primary"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "proyek" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Selector & Status */}
          <div className="card overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
              <h2 className="font-bold text-gray-900 dark:text-white">Status Proyek Aktif</h2>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="border border-gray-200 dark:border-gray-700 bg-transparent rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 outline-none focus:border-primary"
              >
                {projects.map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2 font-medium">
                  <span className="text-gray-600 dark:text-gray-400">Progres Keseluruhan</span>
                  <span className="text-primary font-bold">{selectedProject.includes("Masjid") ? "60%" : "20%"}</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3">
                  <div className="bg-primary h-3 rounded-full transition-all duration-700" style={{ width: selectedProject.includes("Masjid") ? "60%" : "20%" }}></div>
                </div>
              </div>
              <div className="space-y-3 pt-2">
                {[
                  { label: "Tahap Saat Ini", value: selectedProject.includes("Masjid") ? "Pemasangan Kubah" : "Pengecoran Struktur" },
                  { label: "Estimasi Selesai", value: selectedProject.includes("Masjid") ? "Oktober 2026" : "Januari 2027" },
                  { label: "Laporan Terakhir", value: "Hari ini, 09:15 WIB" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-sm border-b border-gray-50 dark:border-gray-800/50 pb-2 last:border-0">
                    <span className="text-gray-500 dark:text-gray-400">{item.label}</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Log */}
          <div className="card overflow-hidden">
            <div className="p-5 border-b border-gray-100 dark:border-gray-800">
              <h2 className="font-bold text-gray-900 dark:text-white">Log Aktivitas Terkini</h2>
            </div>
            <div className="p-5">
              <ul className="space-y-4">
                {recentActivity.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className={`mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.status === "success" ? "bg-emerald-500" : "bg-orange-500"}`}></div>
                    <div>
                      <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{item.action}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === "vendor" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="card p-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">
              ⚠️ <strong>Tugas dari Admin:</strong> Vendor-vendor berikut telah mengajukan KYC dan memerlukan verifikasi kunjungan lapangan dari Anda. Pastikan dokumen fisik cocok dengan data digital.
            </p>
          </div>

          <div className="space-y-4">
            {VENDOR_LIST.map(vendor => {
              const currentStatus = vendorStatuses[vendor.id] || vendor.status;
              const isVerified = currentStatus === "Terverifikasi" || currentStatus === "Terverifikasi Lapangan";
              const isRejected = currentStatus === "Ditolak";

              return (
                <div key={vendor.id} className="card p-5 flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-2xl flex-shrink-0">🏢</div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-gray-900 dark:text-white">{vendor.name}</h3>
                        <span className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-800">{vendor.type}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">📍 {vendor.region} · PIC: <strong className="text-gray-700 dark:text-gray-300">{vendor.pic}</strong> · {vendor.phone}</p>
                      <p className="text-xs text-gray-400 mt-1">{vendor.address}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                      isVerified ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800" :
                      isRejected ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800" :
                      "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
                    }`}>
                      {currentStatus}
                    </span>
                    {!isVerified && !isRejected && (
                      <button
                        onClick={() => setSelectedVendor(vendor)}
                        className="btn-primary text-xs px-4 py-2"
                      >
                        Inspeksi
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Vendor Inspection Modal */}
      <AnimatePresence>
        {selectedVendor && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex justify-between items-center">
                <h2 className="font-black text-white">Form Inspeksi Vendor Lapangan</h2>
                <button onClick={() => setSelectedVendor(null)} className="text-gray-400 hover:text-white text-2xl">&times;</button>
              </div>

              <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
                {/* Vendor Info */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-2">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{selectedVendor.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Tipe Usaha</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedVendor.type}</span>
                    <span className="text-gray-500 dark:text-gray-400">PIC</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedVendor.pic}</span>
                    <span className="text-gray-500 dark:text-gray-400">No. Telp</span>
                    <span className="font-semibold text-primary">{selectedVendor.phone}</span>
                    <span className="text-gray-500 dark:text-gray-400">Alamat</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{selectedVendor.address}</span>
                  </div>
                </div>

                {/* Docs Checklist */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Verifikasi Dokumen Fisik</label>
                  <div className="space-y-2">
                    {selectedVendor.docs.map((doc, i) => (
                      <label key={i} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <input type="checkbox" className="w-4 h-4 accent-emerald-600" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">📄 {doc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* KYC Score */}
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Skor KYC Dokumen Digital</span>
                    <span className={selectedVendor.kycScore >= 80 ? "text-emerald-600" : "text-amber-600"}>{selectedVendor.kycScore}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${selectedVendor.kycScore >= 80 ? "bg-emerald-500" : "bg-amber-500"}`}
                      style={{ width: `${selectedVendor.kycScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Catatan Inspeksi Lapangan</label>
                  <textarea
                    rows={3}
                    value={inspectNote}
                    onChange={e => setInspectNote(e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none text-gray-900 dark:text-white"
                    placeholder="Tulis temuan, catatan, atau kondisi vendor di lapangan..."
                  />
                </div>
              </div>

              <div className="px-6 py-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <button
                  onClick={() => handleVerifVendor(selectedVendor.id, "tolak")}
                  className="px-5 py-2.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 font-bold rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm"
                >
                  ✕ Tolak & Beri Revisi
                </button>
                <button
                  onClick={() => handleVerifVendor(selectedVendor.id, "setujui")}
                  className="btn-primary text-sm"
                >
                  ✓ Setujui & Verifikasi
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tab Content: Kurasi Proyek Baru */}
      {activeTab === "kurasi" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="card p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
              ℹ️ <strong>Tugas Inspeksi Baru:</strong> Admin telah mengirimkan tugas untuk mengecek kelayakan lokasi proyek baru.
            </p>
          </div>

          <div className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white">Pembangunan Masjid Jami' An-Nur (Proposal Baru)</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">📍 Jawa Barat · PIC: Budi Santoso</p>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                surveyStatus === "Pending" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800" :
                "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
              }`}>
                {surveyStatus === "Pending" ? "⏳ Menunggu Survei" : "✅ Selesai Survei"}
              </span>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-sm space-y-2 mb-4">
              <p><strong>Kategori:</strong> Masjid / Mushola</p>
              <p><strong>Dana Dibutuhkan:</strong> Rp 1.200.000.000</p>
              <p><strong>Catatan Admin:</strong> "Tolong pastikan lahan sudah diwakafkan (cek AIW) dan tidak dalam sengketa."</p>
            </div>

            {surveyStatus === "Pending" ? (
              <button onClick={() => setIsSurveyModalOpen(true)} className="btn-primary w-full sm:w-auto">
                Mulai Inspeksi Lapangan
              </button>
            ) : (
              <button disabled className="bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-4 py-2.5 rounded-xl font-bold cursor-not-allowed w-full sm:w-auto">
                Laporan Telah Dikirim ke Admin
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* Survey Modal */}
      <AnimatePresence>
        {isSurveyModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex justify-between items-center">
                <h2 className="font-black text-white">Form Kelayakan Proyek</h2>
                <button onClick={() => setIsSurveyModalOpen(false)} className="text-gray-400 hover:text-white text-2xl">&times;</button>
              </div>

              <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-xl flex items-start gap-3">
                  <span className="text-2xl">📷</span>
                  <div className="text-sm">
                    <p className="font-bold text-amber-900 dark:text-amber-400">Bukti 5 Foto Wajib</p>
                    <p className="text-amber-800 dark:text-amber-300 mt-1">Anda harus mengambil foto tapak batas tanah, jalan akses, plang tanah, dan form serah terima. (Simulasi: 5 foto telah disiapkan otomatis).</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Daftar Periksa Lapangan</label>
                  <div className="space-y-2">
                    {[
                      "Tanah kosong sesuai dengan ukuran di dokumen",
                      "Terdapat akses jalan masuk untuk material bangunan",
                      "Dokumen Akta Ikrar Wakaf (AIW) asli ditunjukkan oleh Nazhir",
                      "Warga sekitar mendukung dan sudah ada izin RT/RW",
                      "Sumber air atau listrik tersedia di dekat lokasi"
                    ].map((item, i) => (
                      <label key={i} className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 accent-emerald-600" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Opini Validator</label>
                  <textarea
                    rows={3}
                    defaultValue="Lokasi tanah sudah bersih dan siap bangun. Masyarakat sekitar sangat mendukung. Dokumen AIW asli sudah saya cek dan fotokopi diamankan."
                    className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="px-6 py-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <button onClick={() => setIsSurveyModalOpen(false)} className="px-5 py-2.5 font-bold text-gray-500 text-sm">
                  Batal
                </button>
                <button
                  onClick={() => {
                    setSurveyStatus("Selesai");
                    setIsSurveyModalOpen(false);
                    setSuccessMsg("Laporan survei proyek baru telah dikirim ke Admin!");
                    setTimeout(() => setSuccessMsg(null), 4000);
                  }}
                  className="btn-primary text-sm shadow-lg shadow-primary/20"
                >
                  🚀 Kirim Laporan ke Admin
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
