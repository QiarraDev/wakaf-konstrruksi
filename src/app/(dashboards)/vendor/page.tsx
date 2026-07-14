"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type BriefingType = {
  id: string;
  proposalId: string;
  proposalName: string;
  region: string;
  category: string;
  estimatedBudget: string;
  pic: string;
  vendorId: string;
  vendorName: string;
  note: string;
  sentAt: string;
  status: string;
};

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
  const [isVerified, setIsVerified] = useState(false);
  const [kycModal, setKycModal] = useState(false);
  const [kycSubmitted, setKycSubmitted] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState<{[key: string]: boolean}>({});
  const [briefings, setBriefings] = useState<BriefingType[]>([]);
  const [selectedBriefing, setSelectedBriefing] = useState<BriefingType | null>(null);

  const [modal, setModal] = useState<{ projectId: number; milestone: number } | null>(null);
  const [submitted, setSubmitted] = useState<number[]>([]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    // Baca arahan dari Admin
    const saved = localStorage.getItem('vendor_briefings');
    if (saved) {
      try { setBriefings(JSON.parse(saved)); } catch(e) {}
    }
  }, []);

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
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Dashboard Vendor & Kontraktor</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola eksekusi proyek, laporkan milestone, dan ajukan termin pembayaran.</p>
          </div>
          {isVerified && <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span>Vendor Terverifikasi</span>}
          {kycSubmitted && !isVerified && <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>Menunggu Review Admin</span>}
        </motion.div>

        {/* ===== INBOX ARAHAN DARI ADMIN ===== */}
        {briefings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border-2 border-teal-400 dark:border-teal-700 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 overflow-hidden shadow-lg shadow-teal-200/40 dark:shadow-teal-900/30"
          >
            <div className="px-5 py-4 flex items-center justify-between border-b border-teal-200 dark:border-teal-700 bg-teal-600 dark:bg-teal-800">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="text-2xl">📨</span>
                  {briefings.filter(b => b.status === 'Baru').length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">{briefings.filter(b => b.status === 'Baru').length}</span>
                  )}
                </div>
                <div>
                  <h3 className="font-black text-white text-sm">Arahan dari Admin</h3>
                  <p className="text-teal-100 text-xs">{briefings.length} arahan masuk — Anda telah ditunjuk untuk proyek spesifik</p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-teal-100 dark:divide-teal-800">
              {briefings.map((b, i) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="p-4 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedBriefing(b)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        {b.status === 'Baru' && <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded uppercase">BARU</span>}
                        <p className="font-black text-gray-900 dark:text-white text-sm truncate">{b.proposalName}</p>
                      </div>
                      <p className="text-xs text-teal-700 dark:text-teal-400 font-medium">📍 {b.region} · {b.category} · RAB {b.estimatedBudget}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{b.note}</p>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-[10px] text-gray-400">{b.sentAt}</p>
                      <button className="mt-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline">Baca Detail →</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {!isVerified && !kycSubmitted && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-sm">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center text-3xl flex-shrink-0">⚠️</div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-lg font-black text-red-900 dark:text-red-400">Akun Vendor Belum Terverifikasi (KYC Required)</h2>
              <p className="text-red-700 dark:text-red-300 text-sm mt-1 mb-4 md:mb-0">Anda tidak dapat melihat tender atau melaporkan progres sebelum menyelesaikan proses verifikasi profil perusahaan dan mengunggah dokumen legalitas (NIB, SIUJK).</p>
            </div>
            <button onClick={() => setKycModal(true)} className="w-full md:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-600/20 whitespace-nowrap">
              Lengkapi Data Legalitas &rarr;
            </button>
          </motion.div>
        )}

        {kycSubmitted && !isVerified && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 flex items-center gap-5 shadow-sm">
            <div className="text-3xl animate-bounce">⏳</div>
            <div>
              <h2 className="font-bold text-amber-900 dark:text-amber-400">Dokumen Sedang Direview oleh Admin</h2>
              <p className="text-sm text-amber-700 dark:text-amber-300/80 mt-1">Terima kasih telah melengkapi data. Tim admin sedang melakukan pengecekan keabsahan dokumen legalitas Anda. Mohon tunggu maksimal 1x24 jam.</p>
              <button onClick={() => setIsVerified(true)} className="mt-3 text-xs bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 px-3 py-1 rounded font-bold hover:opacity-80">(Simulasi) Setujui Admin</button>
            </div>
          </motion.div>
        )}

        {/* Dashboard Content (Only visible if verified) */}
        <div className={`space-y-8 transition-opacity duration-500 ${!isVerified ? 'opacity-30 pointer-events-none blur-[2px]' : 'opacity-100'}`}>

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
        {/* Bottom wrapper closure */}
        </div>
      </div>

      {/* KYC Modal */}
      {kycModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white">Verifikasi Profil Vendor (KYC)</h2>
                <p className="text-sm text-gray-500 mt-1">Harap isi form ini dengan data asli untuk diverifikasi oleh tim legal kami.</p>
              </div>
              <button onClick={() => setKycModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Bentuk Badan Usaha</label>
                  <select className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none">
                    <option>PT (Perseroan Terbatas)</option>
                    <option>CV (Commanditaire Vennootschap)</option>
                    <option>Swakelola / Perorangan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Nama Perusahaan</label>
                  <input type="text" className="w-full p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none" placeholder="PT..." />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Upload Dokumen Legalitas (PDF/JPG)</label>
                <div className="grid grid-cols-2 gap-3">
                  {['NIB / TDP', 'SIUJK (Bila Ada)', 'NPWP Perusahaan', 'KTP Direktur Utama'].map((doc, i) => (
                    <label key={i} className={`border ${uploadedDocs[doc] ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-dashed border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'} rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-colors text-center gap-2 relative overflow-hidden`}>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          if(e.target.files && e.target.files.length > 0) {
                            setUploadedDocs(prev => ({...prev, [doc]: true}));
                          }
                        }} 
                      />
                      <span className="text-2xl">{uploadedDocs[doc] ? '✅' : '📄'}</span>
                      <span className={`text-xs font-semibold ${uploadedDocs[doc] ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400'}`}>
                        {uploadedDocs[doc] ? `${doc} Diunggah` : `Upload ${doc}`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Informasi Rekening (Pencairan Termin)</label>
                <div className="flex gap-2">
                  <select className="p-2.5 w-1/3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none">
                    <option>Bank BSI</option><option>BCA</option><option>Mandiri</option>
                  </select>
                  <input type="text" className="w-2/3 p-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm outline-none" placeholder="Nomor Rekening" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
              <button onClick={() => setKycModal(false)} className="px-5 py-2 font-bold text-gray-500">Batal</button>
              <button onClick={() => { setKycSubmitted(true); setKycModal(false); }} className="btn-primary">Kirim & Verifikasi</button>
            </div>
          </motion.div>
        </div>
      )}

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

      {/* ===== MODAL DETAIL ARAHAN ADMIN ===== */}
      <AnimatePresence>
        {selectedBriefing && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedBriefing(null)}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-800 overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-6 py-5 flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">📨</span>
                    <span className="text-white/70 text-xs font-bold uppercase tracking-wider">Arahan dari Admin</span>
                  </div>
                  <h2 className="font-black text-white text-lg leading-tight">{selectedBriefing.proposalName}</h2>
                </div>
                <button onClick={() => setSelectedBriefing(null)} className="text-white/60 hover:text-white text-2xl leading-none">&times;</button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                {/* Info Proyek */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {[
                    { label: 'Wilayah', value: selectedBriefing.region, icon: '📍' },
                    { label: 'Kategori', value: selectedBriefing.category, icon: '🏗️' },
                    { label: 'Estimasi RAB', value: selectedBriefing.estimatedBudget, icon: '💰' },
                    { label: 'PIC Pengelola', value: selectedBriefing.pic, icon: '👤' },
                  ].map(item => (
                    <div key={item.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 border border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-400 mb-0.5">{item.icon} {item.label}</p>
                      <p className="font-bold text-gray-900 dark:text-white">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Pesan Arahan */}
                <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-xl p-4">
                  <p className="text-xs font-black text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-2">📝 Pesan Arahan Admin</p>
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{selectedBriefing.note}</p>
                </div>

                {/* Info pengiriman */}
                <p className="text-xs text-gray-400 text-center">Dikirim oleh Admin pada {selectedBriefing.sentAt}</p>

                <div className="flex gap-3 pt-1">
                  <button
                    onClick={() => setSelectedBriefing(null)}
                    className="flex-1 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
                  >
                    Tutup
                  </button>
                  <button
                    onClick={() => { setSelectedBriefing(null); setKycModal(true); }}
                    className="flex-1 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition-colors text-sm shadow-lg shadow-teal-600/20"
                  >
                    ✅ Konfirmasi & Lengkapi KYC
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
