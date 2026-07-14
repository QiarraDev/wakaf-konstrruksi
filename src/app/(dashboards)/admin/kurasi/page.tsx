"use client";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const saved = localStorage.getItem('simulated_proposal');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProposals(prev => {
          if (!prev.find(p => p.id === parsed.id)) {
            return [parsed, ...prev];
          }
          return prev;
        });
      } catch (e) {}
    }
  }, []);
  const [selectedProject, setSelectedProject] = useState<typeof INITIAL_PROPOSALS[0] | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleDispatch = (project: typeof INITIAL_PROPOSALS[0]) => {
    setProposals(prev => prev.map(p => p.id === project.id ? { ...p, status: "Tugas Di-dispatch" } : p));
    setSelectedProject(prev => prev ? { ...prev, status: "Tugas Di-dispatch" } : null);
    showToast(`Tugas inspeksi untuk ${project.id} telah dikirim ke Validator Lapangan.`);
  };

  const handleTerimaLaporan = (project: typeof INITIAL_PROPOSALS[0]) => {
    setProposals(prev => prev.map(p => p.id === project.id ? { ...p, status: "Inspeksi Selesai" } : p));
    setSelectedProject(prev => prev ? { ...prev, status: "Inspeksi Selesai" } : null);
    showToast(`Laporan inspeksi ${project.id} diterima. Siap diteruskan ke Super Admin.`);
  };

  const handleForwardToSuperAdmin = (project: typeof INITIAL_PROPOSALS[0]) => {
    const updated = { ...project, status: "Menunggu Approval Pimpinan" };
    setProposals(prev => prev.map(p => p.id === project.id ? updated : p));
    setSelectedProject(prev => prev ? { ...prev, status: "Menunggu Approval Pimpinan" } : null);
    // Simpan ke localStorage agar Super Admin bisa melihat notifikasi
    const existing = JSON.parse(localStorage.getItem('superadmin_queue') || '[]');
    if (!existing.find((p: any) => p.id === project.id)) {
      localStorage.setItem('superadmin_queue', JSON.stringify([
        { ...updated, validatorName: 'Ahmad Fauzi', validatorScore: 92, summary: 'Validator Ahmad Fauzi telah menyelesaikan survei lapangan. Legalitas AIW terverifikasi, lahan bersih dari sengketa. Proyek dinilai layak dibangun.' },
        ...existing
      ]));
    }
    showToast(`✅ Proyek ${project.id} telah diteruskan ke Super Admin. Notifikasi terkirim.`);
  };

  const STATUS_STYLES: Record<string, string> = {
    'Menunggu Kurasi': 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    'Tugas Di-dispatch': 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800',
    'Inspeksi Selesai': 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    'Menunggu Approval Pimpinan': 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
    'Dipublikasikan': 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  };

  return (
    <div className="bg-transparent mt-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Kurasi & Dispatch Proyek</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Tugas Admin: verifikasi dokumen awal dan penugasan Validator. <span className="font-bold text-orange-600 dark:text-orange-400">Final Approval dilakukan oleh Super Admin (Pimpinan).</span></p>
      </div>

      <AnimatePresence>
        {toastMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 rounded-xl p-4 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pipeline Visual */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-1 min-w-[600px]">
          {[
            { label: "Pengajuan Nazhir", icon: "📝", active: true },
            { label: "Kurasi Admin", icon: "🔍", active: true },
            { label: "Dispatch Validator", icon: "🚀", active: true },
            { label: "Laporan Lapangan", icon: "📋", active: false },
            { label: "Final Approval (Super Admin)", icon: "👑", active: false },
            { label: "Tayang ke Wakif", icon: "📢", active: false },
          ].map((step, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className={`flex flex-col items-center text-center px-2 ${step.active ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 ${step.active ? 'border-primary bg-primary/10' : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'}`}>
                  {step.icon}
                </div>
                <span className="text-[10px] font-bold mt-1 text-gray-600 dark:text-gray-400 leading-tight">{step.label}</span>
              </div>
              {i < 5 && <div className={`h-0.5 flex-1 mx-1 ${step.active ? 'bg-primary/40' : 'bg-gray-200 dark:bg-gray-700'}`}></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-sm">ID Proyek</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-sm">Nama Pengajuan</th>
                <th className="p-4 font-semibold text-gray-600 dark:text-gray-400 text-sm">Dana</th>
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
                  <td className="p-4 font-bold text-gray-700 dark:text-gray-300">{row.dana}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${STATUS_STYLES[row.status] || 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700'}`}>
                      {row.status === 'Menunggu Approval Pimpinan' ? '👑 ' : ''}{row.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {row.status === 'Menunggu Approval Pimpinan' || row.status === 'Dipublikasikan' ? (
                      <span className="text-xs text-gray-400 dark:text-gray-500 italic">Diteruskan ke Super Admin</span>
                    ) : (
                      <button onClick={() => setSelectedProject(row)} className="btn-primary px-4 py-1.5 text-xs rounded-lg">
                        Detail & Aksi
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">Detail & Tindakan Kurasi</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">{selectedProject.name} · <span className="font-bold text-primary">{selectedProject.id}</span></p>
                </div>
                <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none">&times;</button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
                {/* ===== RINGKASAN PROPOSAL (selalu tampil) ===== */}
                <div>
                  <h4 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">📄 Ringkasan Isi Proposal</h4>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700 text-sm">
                    <div className="flex justify-between p-3">
                      <span className="text-gray-500 dark:text-gray-400">Nama Proyek</span>
                      <span className="font-bold text-gray-900 dark:text-white text-right max-w-[60%]">{selectedProject.name}</span>
                    </div>
                    <div className="flex justify-between p-3">
                      <span className="text-gray-500 dark:text-gray-400">Kategori</span>
                      <span className="font-bold text-gray-900 dark:text-white">{selectedProject.cat}</span>
                    </div>
                    <div className="flex justify-between p-3">
                      <span className="text-gray-500 dark:text-gray-400">Wilayah</span>
                      <span className="font-bold text-gray-900 dark:text-white">{selectedProject.region}</span>
                    </div>
                    <div className="flex justify-between p-3">
                      <span className="text-gray-500 dark:text-gray-400">PIC Pengelola</span>
                      <span className="font-bold text-gray-900 dark:text-white">{selectedProject.pic}</span>
                    </div>
                    <div className="flex justify-between p-3">
                      <span className="text-gray-500 dark:text-gray-400">Estimasi Dana (RAB)</span>
                      <span className="font-bold text-primary text-base">{selectedProject.dana}</span>
                    </div>
                    <div className="flex justify-between p-3">
                      <span className="text-gray-500 dark:text-gray-400">Status</span>
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${STATUS_STYLES[selectedProject.status] || ''}`}>{selectedProject.status}</span>
                    </div>
                  </div>
                </div>

                {/* ===== AKSI BERDASARKAN STATUS ===== */}
                {selectedProject.status === "Menunggu Kurasi" && (
                  <div className="space-y-4 border-t border-gray-100 dark:border-gray-800 pt-5">
                    <h4 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">🚀 Tindakan Admin</h4>
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-xl">
                      <p className="text-amber-800 dark:text-amber-400 text-sm font-medium">
                        Proposal sudah Anda telaah. Tugaskan Validator Lapangan untuk melakukan survei fisik dan verifikasi dokumen di lokasi.
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Pilih Validator Lapangan</label>
                      <select className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none text-gray-900 dark:text-white">
                        <option>Ahmad Fauzi — Validator Area {selectedProject.region}</option>
                        <option>Budi Setiawan — Validator Senior Nasional</option>
                      </select>
                    </div>
                    <button onClick={() => handleDispatch(selectedProject)} className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                      🚀 Tugaskan Validator (Dispatch)
                    </button>
                  </div>
                )}

                {selectedProject.status === "Tugas Di-dispatch" && (
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-5 text-center py-8">
                    <div className="text-6xl mb-4">⏳</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Menunggu Laporan Lapangan</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto mb-6">Tugas inspeksi telah dikirim ke Validator. Validator sedang melakukan survei di lapangan.</p>
                    <button onClick={() => handleTerimaLaporan(selectedProject)} className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-6 py-2.5 rounded-xl font-bold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                      [Simulasi] Terima Laporan Validator
                    </button>
                  </div>
                )}

                {selectedProject.status === "Inspeksi Selesai" && (
                  <div className="space-y-4 border-t border-gray-100 dark:border-gray-800 pt-5">
                    <h4 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider">📋 Hasil Inspeksi Validator</h4>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-xl flex items-start gap-3">
                      <span className="text-2xl">📋</span>
                      <div>
                        <p className="font-bold text-blue-900 dark:text-blue-400">Laporan Validator Telah Diterima</p>
                        <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">Validator Ahmad telah mengunggah bukti survei (5 foto terlampir, legalitas AIW diverifikasi). Proyek dinilai layak dibangun.</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Validator</span><span className="font-bold">Ahmad Fauzi</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Skor Inspeksi</span><span className="font-bold text-emerald-600">92 / 100 ✅</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Jumlah Foto</span><span className="font-bold">5 Foto Bukti</span></div>
                    </div>
                    <button
                      onClick={() => handleForwardToSuperAdmin(selectedProject)}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      👑 Teruskan ke Super Admin (Final Approval)
                    </button>
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