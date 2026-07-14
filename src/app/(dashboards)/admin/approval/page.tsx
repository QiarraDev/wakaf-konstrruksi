"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "@/context/NotificationContext";
import { ReportDetailPanel } from "@/components/ReportDetailPanel";

type PendingProjectType = {
  id: string;
  name: string;
  cat: string;
  dana: string;
  region: string;
  pic: string;
  validatorName: string;
  validatorScore: number;
  summary: string;
  status: string;
};

const PENDING_PROJECTS: PendingProjectType[] = [];

export default function SuperAdminApprovalPage() {
  const [showLoginNotif, setShowLoginNotif] = useState(false);
  const [projects, setProjects] = useState(PENDING_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<typeof PENDING_PROJECTS[0] | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"approval" | "reports">("approval");
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const { notifications, dismissNotification, markAsRead } = useNotification();

  // Baca antrian Super Admin dari localStorage (dikirim oleh Admin Kurasi)
  useEffect(() => {
    const saved = localStorage.getItem('superadmin_queue');
    if (saved) {
      try {
        const queue: any[] = JSON.parse(saved);
        if (queue.length > 0) {
          setProjects(prev => {
            const merged = [...prev];
            queue.forEach(p => {
              if (!merged.find(m => m.id === p.id)) merged.unshift(p);
            });
            return merged;
          });
          setShowLoginNotif(true);
        }
      } catch (e) {}
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  const handleApprove = (project: typeof PENDING_PROJECTS[0]) => {
    setProjects(prev => prev.map(p => p.id === project.id ? { ...p, status: "Dipublikasikan" } : p));
    setSelectedProject(null);
    showToast(`🎉 Proyek ${project.id} resmi disetujui dan telah tayang di Portal Wakif!`);
  };

  const handleReject = (project: typeof PENDING_PROJECTS[0]) => {
    setProjects(prev => prev.filter(p => p.id !== project.id));
    setSelectedProject(null);
    showToast(`❌ Proyek ${project.id} dikembalikan ke Admin untuk perbaikan.`);
  };

  const handleApproveReport = (notif: any) => {
    markAsRead(notif.id);
    dismissNotification(notif.id);
    showToast(`✅ Laporan ${notif.projectId} dari validator telah divalidasi!`);
    setSelectedNotification(null);
  };

  const handlePublish = (notif: any) => {
    markAsRead(notif.id);
    dismissNotification(notif.id);
    showToast(`🎉 Proyek ${notif.projectName} telah dipublikasikan di portal!`);
    setSelectedNotification(null);
  };

  const pendingCount = projects.filter(p => p.status === "Menunggu Approval Pimpinan").length;
  const pendingReports = notifications.filter(n => n.type === "validator_report" && n.unread);

  return (
    <div className="bg-transparent mt-6 space-y-6">

      {/* === LOGIN NOTIFICATION OVERLAY === */}
      <AnimatePresence>
        {showLoginNotif && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              transition={{ type: "spring", stiffness: 250, damping: 22 }}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 max-w-md w-full overflow-hidden"
            >
              {/* Header Gradien */}
              <div className="bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 p-8 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  {[...Array(8)].map((_, i) => (
                    <motion.div key={i} className="absolute w-20 h-20 rounded-full border border-white"
                      style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%` }}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                    />
                  ))}
                </div>
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 0.6, delay: 0.4, repeat: 3 }}
                  className="text-6xl mb-3 relative z-10"
                >
                  🔔
                </motion.div>
                <h2 className="text-2xl font-black relative z-10">Notifikasi Penting!</h2>
                <p className="text-orange-50 text-sm mt-1 relative z-10">Selamat datang, Bapak/Ibu Pimpinan</p>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4 rounded-r-xl">
                  <p className="text-orange-900 dark:text-orange-300 font-black text-lg">
                    {pendingCount + pendingReports.length} Item Menunggu Persetujuan Anda
                  </p>
                  <p className="text-orange-700 dark:text-orange-400 text-sm mt-1">
                    Admin Operasional telah menyelesaikan kurasi dan proses validator lapangan. Proposal siap untuk keputusan final Pimpinan.
                  </p>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {projects.filter(p => p.status === 'Menunggu Approval Pimpinan').map((p, i) => (
                    <div key={i} className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="w-9 h-9 rounded-full bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center text-lg flex-shrink-0">📋</div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{p.name}</p>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">{p.region} · {p.dana}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowLoginNotif(false)}
                  className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-orange-500/30 text-base"
                >
                  Tinjau & Berikan Keputusan 👑
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === PAGE HEADER === */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">👑</span>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Final Approval — Super Admin</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Wewenang tertinggi untuk menyetujui proyek dan mempublikasikannya kepada Wakif.</p>
        </div>
        {(pendingCount > 0 || pendingReports.length > 0) && (
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 px-4 py-2 rounded-2xl text-center">
            <p className="text-xs text-red-700 dark:text-red-400 font-bold">Menunggu Keputusan</p>
            <p className="text-3xl font-black text-red-600 dark:text-red-400">{pendingCount + pendingReports.length}</p>
          </motion.div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab("approval")}
          className={`px-4 py-3 font-bold text-sm border-b-2 transition-colors ${
            activeTab === "approval"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          📋 Approval Proyek ({pendingCount})
        </button>
        <button
          onClick={() => setActiveTab("reports")}
          className={`px-4 py-3 font-bold text-sm border-b-2 transition-colors relative ${
            activeTab === "reports"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          📊 Laporan Validator
          {pendingReports.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {pendingReports.length}
            </span>
          )}
        </button>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 rounded-xl p-4 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* === TAB 1: APPROVAL PROYEK === */}
      {activeTab === "approval" && (
        <div className="space-y-4">
          <h2 className="text-base font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">Antrian Persetujuan</h2>

          {projects.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">Tidak Ada Antrean</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Semua proyek telah diproses. Kerja bagus!</p>
            </div>
          ) : (
            projects.map((project, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                <div className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-400 dark:text-gray-500">{project.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        project.status === "Dipublikasikan"
                          ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400"
                          : "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400"
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white">{project.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">📍 {project.region} · PIC Nazhir: {project.pic}</p>

                    <div className="mt-3 flex flex-wrap gap-3">
                      <div className="bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300">
                        💰 Dana: {project.dana}
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800 text-xs font-bold text-blue-700 dark:text-blue-400">
                        🔍 Validator: {project.validatorName}
                      </div>
                      <div className={`px-3 py-1.5 rounded-lg border text-xs font-bold ${project.validatorScore >= 80 ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400' : 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800 text-amber-700 dark:text-amber-400'}`}>
                        ⭐ Skor Inspeksi: {project.validatorScore}/100
                      </div>
                    </div>
                  </div>

                  {project.status !== "Dipublikasikan" ? (
                    <button onClick={() => setSelectedProject(project)} className="shrink-0 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 text-sm">
                      👑 Beri Keputusan
                    </button>
                  ) : (
                    <div className="shrink-0 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold px-6 py-3 rounded-xl text-sm text-center border border-emerald-200 dark:border-emerald-800">
                      ✅ Sudah Disetujui
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* === TAB 2: LAPORAN VALIDATOR === */}
      {activeTab === "reports" && (
        <div className="space-y-4">
          <h2 className="text-base font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider">Laporan Dari Validator</h2>

          {pendingReports.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">Semua Laporan Terproses</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Tidak ada laporan validator yang menunggu validasi.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Daftar Laporan */}
              <div className="lg:col-span-2 space-y-3">
                {pendingReports.map((notif) => (
                  <motion.button
                    key={notif.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelectedNotification(notif)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      selectedNotification?.id === notif.id
                        ? "bg-orange-50 dark:bg-orange-900/20 border-orange-400 dark:border-orange-600 shadow-md"
                        : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-700"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl mt-1">{notif.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 dark:text-white">{notif.title}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{notif.projectName}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-2 py-1 rounded">
                            {notif.projectId}
                          </span>
                          <span className="text-xs text-gray-400">
                            {notif.timestamp.toLocaleTimeString("id-ID")}
                          </span>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-3 h-3 rounded-full bg-red-500"
                        />
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Detail Panel */}
              <AnimatePresence mode="wait">
                {selectedNotification && (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 h-fit sticky top-6"
                  >
                    <ReportDetailPanel
                      notification={selectedNotification}
                      onApprove={() => handleApproveReport(selectedNotification)}
                      onPublish={() => handlePublish(selectedNotification)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      )}

      {/* === DECISION MODAL === */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👑</span>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white">Final Approval — Pimpinan</h3>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{selectedProject.name} ({selectedProject.id})</p>
                </div>
                <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none">&times;</button>
              </div>

              <div className="p-6 space-y-5">

                {/* Rangkuman Laporan */}
                <div>
                  <h4 className="text-sm font-black text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">Rangkuman Laporan Lapangan</h4>
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-xl text-sm text-blue-900 dark:text-blue-200">
                    {selectedProject.summary}
                  </div>
                </div>

                {/* Skor Inspeksi */}
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Skor Kepatuhan Validator</span>
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{selectedProject.validatorScore}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedProject.validatorScore}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                    />
                  </div>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2">✅ Memenuhi standar minimum (≥ 75) untuk dipublikasikan</p>
                </div>

                {/* Info Dana */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Total Dana RAB</p>
                    <p className="font-black text-gray-900 dark:text-white">{selectedProject.dana}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Kategori</p>
                    <p className="font-black text-gray-900 dark:text-white">{selectedProject.cat}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Wilayah</p>
                    <p className="font-black text-gray-900 dark:text-white">{selectedProject.region}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleReject(selectedProject)}
                    className="flex-1 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-bold rounded-xl py-3 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm"
                  >
                    ✕ Kembalikan & Revisi
                  </button>
                  <button
                    onClick={() => handleApprove(selectedProject)}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-black shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    ✅ Setujui & Publikasikan ke Wakif
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
