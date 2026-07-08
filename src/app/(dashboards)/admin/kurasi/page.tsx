"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_PROPOSALS = [
  {
    id: "PRJ-004",
    name: "Pembangunan Masjid Jami' An-Nur (Proposal Baru)",
    cat: "Masjid",
    dana: "Rp 1.2M",
    status: "Menunggu Kurasi",
    region: "Jawa Barat",
    pic: "Budi Santoso",
  },
  {
    id: "PRJ-002",
    name: "Renovasi Pesantren Al-Huda",
    cat: "Pesantren",
    dana: "Rp 500Jt",
    status: "Inspeksi Selesai",
    region: "Jawa Tengah",
    pic: "Kyai Hasyim",
  },
];

export default function AdminKurasiPage() {
  const [proposals, setProposals] = useState(INITIAL_PROPOSALS);
  const [selectedProject, setSelectedProject] = useState<typeof INITIAL_PROPOSALS[0] | null>(null);
  
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleDispatch = (project: typeof INITIAL_PROPOSALS[0]) => {
    setProposals(prev => prev.map(p => p.id === project.id ? { ...p, status: "Tugas Di-dispatch" } : p));
    setSelectedProject(prev => prev ? { ...prev, status: "Tugas Di-dispatch" } : null);
    showToast(`Tugas inspeksi untuk ${project.id} telah dikirim ke Validator Lapangan.`);
  };

  const handleTerimaLaporan = (project: typeof INITIAL_PROPOSALS[0]) => {
    setProposals(prev => prev.map(p => p.id === project.id ? { ...p, status: "Inspeksi Selesai" } : p));
    setSelectedProject(prev => prev ? { ...prev, status: "Inspeksi Selesai" } : null);
    showToast(`Laporan inspeksi untuk ${project.id} telah diterima dari Validator.`);
  };

  const handlePublish = (project: typeof INITIAL_PROPOSALS[0]) => {
    setProposals(prev => prev.map(p => p.id === project.id ? { ...p, status: "Dipublikasikan" } : p));
    setSelectedProject(prev => prev ? { ...prev, status: "Dipublikasikan" } : null);
    showToast(`Proyek ${project.id} berhasil dipublikasikan ke halaman Wakif!`);
  };



  return (
    <div className="bg-transparent mt-6 space-y-6">
      
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Kurasi & Approval Proyek</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Lakukan verifikasi administrasi dan lapangan sebelum menyetujui proyek konstruksi.</p>
      </div>

      <AnimatePresence>
        {toastMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 rounded-xl p-4 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-sm">ID Proyek</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-sm">Nama Pengajuan</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-sm">Kategori</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-sm">Dana Dibutuhkan</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-sm">Status Alur</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-sm text-center">Aksi Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {proposals.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="p-4 text-gray-500 dark:text-gray-400 text-sm font-bold">{row.id}</td>
                  <td className="p-4 font-bold text-gray-900 dark:text-white">
                    {row.name}
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-normal mt-0.5">📍 {row.region} · PIC: {row.pic}</p>
                  </td>
                  <td className="p-4">
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-md text-xs font-bold border border-blue-100 dark:border-blue-800">{row.cat}</span>
                  </td>
                  <td className="p-4 font-bold text-gray-700 dark:text-gray-300">{row.dana}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                      row.status === 'Menunggu Kurasi' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800' :
                      row.status === 'Inspeksi Selesai' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800' :
                      row.status === 'Dipublikasikan' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' :
                      'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => setSelectedProject(row)} 
                      className="btn-primary px-4 py-1.5 text-xs rounded-lg"
                    >
                      Detail & Aksi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Tindakan Kurasi Proyek</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">{selectedProject.name} ({selectedProject.id})</p>
                </div>
                <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none">&times;</button>
              </div>

              <div className="p-6 space-y-6">
                
                {selectedProject.status === "Menunggu Kurasi" && (
                  <div className="space-y-4">
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-xl">
                      <p className="text-amber-800 dark:text-amber-400 text-sm font-medium">
                        Proposal ini baru saja diajukan oleh Nazhir. Anda perlu menugaskan Validator Lapangan untuk memverifikasi dokumen fisik dan lokasi tanah secara langsung.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Pilih Validator Lapangan</label>
                      <select className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none">
                        <option>Ahmad - Validator Area {selectedProject.region}</option>
                      </select>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={() => handleDispatch(selectedProject)} className="flex-1 btn-primary py-3 flex items-center justify-center gap-2">
                        📋 Tugaskan Validator (Dispatch)
                      </button>
                    </div>
                  </div>
                )}

                {selectedProject.status === "Tugas Di-dispatch" && (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">⏳</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Menunggu Laporan Lapangan</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto mb-6">Tugas inspeksi telah dikirim. Sistem sedang menunggu Validator mengisi form laporan dari aplikasi mobile mereka.</p>
                    
                    <button onClick={() => handleTerimaLaporan(selectedProject)} className="bg-blue-100 text-blue-700 px-6 py-2 rounded-xl font-bold hover:bg-blue-200 transition-colors">
                      [Simulasi] Terima Laporan Validator
                    </button>
                  </div>
                )}

                {selectedProject.status === "Inspeksi Selesai" && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-xl flex items-start gap-3">
                      <span className="text-2xl">📋</span>
                      <div>
                        <p className="font-bold text-blue-900 dark:text-blue-400">Laporan Validator Telah Diterima</p>
                        <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">Validator Ahmad telah mengunggah bukti survei (5 foto terlampir, legalitas AIW diverifikasi). Proyek dinilai layak dibangun.</p>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button className="flex-1 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl py-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                        Minta Revisi Proposal
                      </button>
                      <button onClick={() => handlePublish(selectedProject)} className="flex-1 btn-primary py-3 shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                        📢 Setujui & Publikasikan ke Wakif
                      </button>
                    </div>
                  </div>
                )}

                {selectedProject.status === "Dipublikasikan" && (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 border-4 border-emerald-200 dark:border-emerald-800">✅</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Proyek Telah Tayang!</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto">Proyek ini sekarang sudah tampil di Dashboard Wakif dan siap menerima dana crowdfunding.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}