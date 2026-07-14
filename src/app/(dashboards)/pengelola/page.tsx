"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const stats = [
  { label: "Draft Proposal", value: "2", icon: "📝", color: "border-l-gray-400", iconBg: "bg-gray-50 dark:bg-gray-800" },
  { label: "Sedang Direview", value: "1", icon: "🔍", color: "border-l-blue-400", iconBg: "bg-blue-50 dark:bg-blue-900/30" },
  { label: "Proses Konstruksi", value: "1", icon: "🏗️", color: "border-l-amber-400", iconBg: "bg-amber-50 dark:bg-amber-900/30" },
  { label: "Selesai", value: "3", icon: "✅", color: "border-l-primary", iconBg: "bg-emerald-50 dark:bg-emerald-900/30" },
];

type ProjectType = {
  id: number | string;
  title: string;
  status: string;
  statusLabel: string;
  progress: number;
  vendor: string;
  estimasiSelesai: string;
  budget: string;
  lastUpdate: string;
  stage: string;
};

const INITIAL_PROJECTS: ProjectType[] = [];

export default function PengelolaDashboard() {
  const [modal, setModal] = useState<string | null>(null);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [selectedBlueprint, setSelectedBlueprint] = useState<string | null>("Denah Lantai 1");

  useEffect(() => {
    const saved = localStorage.getItem('simulated_proposal');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProjects([{
          id: parsed.id,
          title: parsed.name,
          status: "review",
          statusLabel: parsed.status || "Sedang Direview",
          progress: 10,
          vendor: "Belum Ditentukan",
          estimasiSelesai: "Menunggu Approval",
          budget: parsed.dana,
          lastUpdate: "Baru saja",
          stage: "Review Admin"
        }]);
      } catch(e) {}
    }
  }, []);

  return (
    <>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Dashboard Pengelola Aset</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Kelola pengajuan pembangunan fasilitas umat Anda di sini.</p>
          </div>
          <Link
            href="/pengelola/proposal"
            className="btn-primary flex items-center gap-2 w-fit text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Buat Proposal Baru
          </Link>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`card p-5 border-l-4 ${stat.color} flex items-center gap-4`}
            >
              <div className={`w-11 h-11 rounded-xl ${stat.iconBg} flex items-center justify-center text-2xl flex-shrink-0`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* First Step Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 flex items-start gap-5 text-white shadow-xl shadow-emerald-500/20"
        >
          <div className="text-4xl flex-shrink-0">💡</div>
          <div className="flex-1">
            <h3 className="font-black text-lg">Langkah Pertama</h3>
            <p className="text-emerald-100/90 mt-1 text-sm leading-relaxed">
              Mulai ajukan pembangunan dengan membuat <strong>Proposal Baru</strong>. Tim arsitek dan konsultan kami siap membantu penyusunan RAB dan Desain.
            </p>
          </div>
          <Link
            href="/pengelola/proposal"
            className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-bold transition-colors text-sm border border-white/20"
          >
            Buat Sekarang →
          </Link>
        </motion.div>

        {/* Active Projects */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          className="card overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
            <h2 className="text-lg font-black text-gray-900 dark:text-white">Proyek Saya</h2>
            <button
              onClick={() => setModal("all_projects")}
              className="text-sm text-primary font-bold hover:underline"
            >
              Lihat Semua
            </button>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {projects.map((project, i) => (
              <div key={project.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="font-bold text-gray-900 dark:text-white">{project.title}</h3>
                      <span className={`badge text-[10px] ${project.status === 'konstruksi' ? 'badge-warning' : 'badge-info'}`}>
                        {project.statusLabel}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Tahap aktif: <span className="font-semibold text-gray-700 dark:text-gray-300">{project.stage}</span></p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-gray-600 dark:text-gray-400">
                        <span>Progres Fisik</span>
                        <span className="text-primary">{project.progress}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ duration: 1, delay: 0.6 + i * 0.2 }}
                          className="h-full bg-gradient-to-r from-primary to-emerald-400 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col gap-2 sm:items-end text-sm shrink-0">
                    <button
                      onClick={() => setModal(`blueprint_${project.id}`)}
                      className="px-4 py-2 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all text-xs"
                    >
                      Lihat Blueprint
                    </button>
                    <button
                      onClick={() => setModal(`rab_${project.id}`)}
                      className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-xs"
                    >
                      Detail RAB
                    </button>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <p className="text-gray-400 mb-0.5">Vendor</p>
                    <p className="font-bold text-gray-700 dark:text-gray-300">{project.vendor}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-0.5">Anggaran</p>
                    <p className="font-bold text-gray-700 dark:text-gray-300">{project.budget}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-0.5">Est. Selesai</p>
                    <p className="font-bold text-gray-700 dark:text-gray-300">{project.estimasiSelesai}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Proposal", icon: "📋", href: "/pengelola/proposal", desc: "Buat & kelola", action: null },
            { label: "Desain & Blueprint", icon: "📐", href: "#", desc: "Gambar teknis", action: "blueprint_1" },
            { label: "RAB", icon: "💰", href: "#", desc: "Anggaran biaya", action: "rab_1" },
            { label: "Penilaian Teknis", icon: "🔍", href: "/pengelola/assessment", desc: "Laporan validator", action: null },
          ].map((item, i) => {
            const content = (
              <>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{item.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                </div>
              </>
            );

            if (item.action) {
              return (
                <button key={i} onClick={() => setModal(item.action)} className="card p-5 flex flex-col gap-3 group hover:-translate-y-1 transition-all text-left">
                  {content}
                </button>
              );
            }

            return (
              <Link key={i} href={item.href} className="card p-5 flex flex-col gap-3 group hover:-translate-y-1 transition-all">
                {content}
              </Link>
            );
          })}
        </motion.div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setModal(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-800"
            onClick={e => e.stopPropagation()}
          >
            {modal.startsWith("blueprint") && (
              <>
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-xl">📐</div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white">Blueprint Proyek</h2>
                  </div>
                  <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none">×</button>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl h-64 flex items-center justify-center mb-4 overflow-hidden relative border border-gray-200 dark:border-gray-700">
                  {selectedBlueprint === "Denah Lantai 1" && (
                    <img src="/images/blueprint_denah.png" alt="Denah Lantai 1" className="w-full h-full object-cover" />
                  )}
                  {selectedBlueprint === "Tampak Depan" && (
                    <img src="/images/blueprint_tampak.png" alt="Tampak Depan" className="w-full h-full object-cover" />
                  )}
                  {selectedBlueprint === "Tampak Samping" && (
                    <img src="/images/blueprint_samping.png" alt="Tampak Samping" className="w-full h-full object-cover" />
                  )}
                  {selectedBlueprint === "Potongan A-A" && (
                    <img src="/images/blueprint_potongan.png" alt="Potongan A-A" className="w-full h-full object-cover" />
                  )}
                  {!selectedBlueprint && (
                    <div className="text-center p-4 bg-gray-100 dark:bg-gray-800 absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-5xl mb-3">📐</div>
                      <p className="font-bold text-gray-600 dark:text-gray-400">Pilih Blueprint</p>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  {["Denah Lantai 1", "Tampak Depan", "Tampak Samping", "Potongan A-A"].map((d, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedBlueprint(d)}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl text-sm font-bold border transition-colors ${selectedBlueprint === d ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:text-primary'}`}
                    >
                      <span>🗂️</span>{d}
                    </button>
                  ))}
                </div>
                <button className="w-full btn-primary">⬇️ Unduh Blueprint (PDF)</button>
              </>
            )}
            {modal.startsWith("rab") && (
              <>
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-xl">💰</div>
                    <h2 className="text-xl font-black text-gray-900 dark:text-white">Detail RAB</h2>
                  </div>
                  <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none">×</button>
                </div>
                <div className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden mb-5">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Item Pekerjaan</th>
                        <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Anggaran</th>
                        <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {[
                        { item: "Pekerjaan Pondasi", val: "Rp 120 Jt", status: "Selesai", s: "success" },
                        { item: "Struktur Dinding", val: "Rp 350 Jt", status: "Selesai", s: "success" },
                        { item: "Atap & Kubah", val: "Rp 215 Jt", status: "Berjalan", s: "warning" },
                        { item: "Finishing", val: "Rp 180 Jt", status: "Belum", s: "info" },
                        { item: "Instalasi M/E", val: "Rp 95 Jt", status: "Belum", s: "info" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">{row.item}</td>
                          <td className="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">{row.val}</td>
                          <td className="px-4 py-3 text-center"><span className={`badge badge-${row.s}`}>{row.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-emerald-50 dark:bg-emerald-900/20">
                      <tr>
                        <td className="px-4 py-3 font-black text-gray-900 dark:text-white">Total RAB</td>
                        <td className="px-4 py-3 text-right font-black text-primary">Rp 960 Jt</td>
                        <td></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <button className="w-full btn-primary">⬇️ Unduh RAB Lengkap (Excel)</button>
              </>
            )}
            {modal === "all_projects" && (
              <>
                <div className="flex justify-between items-start mb-5">
                  <h2 className="text-xl font-black text-gray-900 dark:text-white">Semua Proyek Saya</h2>
                  <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none">×</button>
                </div>
                <div className="space-y-3">
                  {[...projects, { id: 3, title: "Mushola Al-Barokah", statusLabel: "Selesai", progress: 100, vendor: "Swakelola", estimasiSelesai: "Maret 2026", budget: "Rp 120 Jt", status: "selesai", lastUpdate: "4 bulan lalu", stage: "Selesai" }].map((p) => (
                    <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                      <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-xl">🕌</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{p.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{p.statusLabel} • {p.progress}%</p>
                      </div>
                      <span className={`badge badge-${p.status === 'selesai' ? 'success' : p.status === 'konstruksi' ? 'warning' : 'info'} text-xs`}>{p.statusLabel}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </>
  );
}
