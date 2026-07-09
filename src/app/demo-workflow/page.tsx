"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface WorkflowStep {
  id: number;
  title: string;
  role: string;
  description: string;
  actions: string[];
  status: "pending" | "in_progress" | "completed";
  icon: string;
  duration: string;
  details?: string[];
}

export default function DemoWorkflowPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTimeline, setShowTimeline] = useState(false);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [animateCards, setAnimateCards] = useState(false);

  const workflowSteps: WorkflowStep[] = [
    {
      id: 1,
      title: "Pengajuan Proposal",
      role: "Pengelola Aset",
      description: "Pengelola aset (Takmir Masjid/Pesantren) mengajukan proposal proyek",
      actions: [
        "Login ke dashboard Pengelola",
        "Buka menu 'Proposal Baru'",
        "Isi form proposal dengan detail proyek",
        "Upload dokumen AIW (Akta Ikrar Wakaf)",
        "Submit proposal",
      ],
      status: "completed",
      icon: "📝",
      duration: "1 hari",
      details: [
        "Nama Proyek: Pembangunan Masjid Jami' An-Nur",
        "Kategori: Masjid",
        "Estimasi Dana: Rp 1.2 Miliar",
        "Lokasi: Jawa Barat",
        "PIC: Budi Santoso",
      ],
    },
    {
      id: 2,
      title: "Brief Assessment",
      role: "Pengelola Aset",
      description: "Pengelola melengkapi assessment awal dan penyusunan RAB",
      actions: [
        "Isi form assessment singkat",
        "Upload sketsa/gambar awal",
        "Tentukan target pengguna",
        "Review dan submit assessment",
      ],
      status: "completed",
      icon: "🔍",
      duration: "2 hari",
      details: [
        "Kondisi Lahan: Terbuka, 500m²",
        "Akses Jalan: Tersedia",
        "Keamanan Legal: Terverifikasi",
        "Target Pengguna: 300+ jamaah",
      ],
    },
    {
      id: 3,
      title: "Penyusunan RAB & Desain",
      role: "Pengelola Aset + Arsitek",
      description: "Tim merancang detail proyek dan menyusun Rencana Anggaran Biaya",
      actions: [
        "Buka menu 'Penyusunan RAB'",
        "Input detail biaya per item",
        "Upload desain arsitektur",
        "Finalisasi dan submit RAB",
      ],
      status: "completed",
      icon: "💰",
      duration: "3 hari",
      details: [
        "Total RAB: Rp 1.2 Miliar",
        "Material: Rp 650 Juta",
        "Tenaga Kerja: Rp 400 Juta",
        "Overhead: Rp 150 Juta",
        "Desain: 5 lembar detail teknis",
      ],
    },
    {
      id: 4,
      title: "Kurasi & Validasi Admin",
      role: "Admin Operasional",
      description: "Admin melakukan kurasi kelengkapan dokumen dan kesesuaian RAB",
      actions: [
        "Login sebagai Admin",
        "Buka dashboard 'Kurasi Proyek'",
        "Review proposal dan RAB",
        "Validasi kelengkapan dokumen",
        "Dispatch ke Validator Lapangan",
      ],
      status: "completed",
      icon: "✅",
      duration: "1 hari",
      details: [
        "✅ Proposal lengkap",
        "✅ AIW valid",
        "✅ RAB sesuai standar",
        "✅ Desain jelas",
        "Status: Tugas Di-dispatch ke Validator",
      ],
    },
    {
      id: 5,
      title: "Inspeksi Lapangan & Validasi",
      role: "Validator Lapangan",
      description: "Validator melakukan survei lapangan dan verifikasi legalitas lahan",
      actions: [
        "Login sebagai Validator",
        "Terima tugas inspeksi",
        "Kunjungi lokasi proyek",
        "Ambil foto dokumentasi + GPS",
        "Lakukan face check-in",
        "Input hasil inspeksi",
      ],
      status: "completed",
      icon: "🔍",
      duration: "1 hari",
      details: [
        "📸 15 foto dokumentasi dengan GPS",
        "✅ Legalitas AIW: Terverifikasi",
        "✅ Lahan: Bersih dari sengketa",
        "✅ Akses: Jalan tersedia",
        "👤 Validator: Ahmad Fauzi",
        "⭐ Skor Kepatuhan: 95/100",
      ],
    },
    {
      id: 6,
      title: "Penerimaan Laporan Admin",
      role: "Admin Operasional",
      description: "Admin menerima laporan validator dan meneruskan ke Super Admin",
      actions: [
        "Lihat notifikasi laporan masuk",
        "Review hasil inspeksi",
        "Verifikasi kelayakan publikasi",
        "Forward ke Super Admin untuk approval",
      ],
      status: "completed",
      icon: "📋",
      duration: "1 hari",
      details: [
        "📊 Laporan Validator diterima",
        "✅ Inspeksi: LULUS",
        "✅ Status: Inspeksi Selesai",
        "→ Siap diteruskan ke Super Admin",
      ],
    },
    {
      id: 7,
      title: "Final Approval Super Admin",
      role: "Super Admin / Pimpinan",
      description: "Super Admin memberikan persetujuan final untuk publikasi",
      actions: [
        "Login sebagai Super Admin",
        "Buka dashboard Approval",
        "Lihat notifikasi proyek menunggu",
        "Review semua dokumen & laporan",
        "Berikan keputusan: Setujui & Publikasikan",
      ],
      status: "in_progress",
      icon: "👑",
      duration: "1 hari",
      details: [
        "📋 Ringkasan Laporan: LENGKAP",
        "⭐ Skor Validator: 95/100 ✅",
        "📊 Semua Standar Terpenuhi",
        "→ Keputusan: DISETUJUI & DIPUBLIKASI",
      ],
    },
    {
      id: 8,
      title: "Publikasi ke Portal Publik",
      role: "Sistem Platform",
      description: "Proyek dipublikasikan di portal Wakif dan mencari donatur",
      actions: [
        "Proyek muncul di halaman 'Proyek Aktif'",
        "Wakif (Donatur) dapat melihat proyek",
        "Informasi real-time dan transparan",
        "Donatur dapat memilih dan berkomitmen",
      ],
      status: "pending",
      icon: "🌐",
      duration: "Real-time",
      details: [
        "📱 Proyek terlihat di aplikasi publik",
        "💰 Target penggalangan: Rp 1.2 Miliar",
        "👥 Donatur dapat berkomitmen",
        "📊 Progress update real-time",
        "🎉 Proyek LIVE di portal!",
      ],
    },
    {
      id: 9,
      title: "Penggalangan Dana",
      role: "Wakif (Donatur)",
      description: "Donatur melihat dan berkomitmen dana untuk proyek",
      actions: [
        "Wakif membuka 'Cari Proyek'",
        "Lihat detail Masjid Jami' An-Nur",
        "Baca transparansi & jadwal",
        "Pilih nominal wakaf",
        "Confirm donasi",
      ],
      status: "pending",
      icon: "🤲",
      duration: "Berkelanjutan",
      details: [
        "👥 Target: 1000+ donatur",
        "💰 Total terkumpul: Real-time update",
        "📊 Progress bar visual",
        "🎯 Target: Rp 1.2 Miliar",
      ],
    },
    {
      id: 10,
      title: "Eksekusi & Monitoring",
      role: "Vendor + Validator",
      description: "Vendor melaksanakan pembangunan dengan monitoring validator",
      actions: [
        "Vendor mulai pekerjaan konstruksi",
        "Validator memantau progress",
        "Laporan progress mingguan/bulanan",
        "Transparansi update ke Wakif",
      ],
      status: "pending",
      icon: "🏗️",
      duration: "6-12 bulan",
      details: [
        "📅 Timeline: 6 bulan",
        "👷 Tim Konstruksi: CV. Bangun Bersama",
        "📸 Update foto mingguan",
        "✅ Milestone: 20%, 40%, 60%, 80%, 100%",
        "👥 Wakif melihat progress real-time",
      ],
    },
    {
      id: 11,
      title: "Serah Terima & Penutupan",
      role: "Nazhir + Wakif + Validator",
      description: "Proyek selesai, diserah terima, dan didokumentasikan",
      actions: [
        "Final inspection oleh validator",
        "Serah terima ke Nazhir Masjid",
        "Dokumentasi akhir & aset register",
        "Laporan final ke Wakif",
      ],
      status: "pending",
      icon: "🎉",
      duration: "1 bulan",
      details: [
        "✅ Pembangunan: 100% SELESAI",
        "📋 Serah terima: Resmi dicatat",
        "🏛️ Aset masjid: Terdaftar",
        "📊 Laporan final ke semua pihak",
        "👏 Acara penutupan & syukuran",
      ],
    },
  ];

  const getStepStatus = (index: number) => {
    if (index < currentStep) return "completed";
    if (index === currentStep) return "in_progress";
    return "pending";
  };

  const nextStep = () => {
    if (currentStep < workflowSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setAnimateCards(false);
      setTimeout(() => setAnimateCards(true), 100);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setAnimateCards(false);
      setTimeout(() => setAnimateCards(true), 100);
    }
  };

  const step = workflowSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline mb-6"
        >
          ← Kembali ke Beranda
        </Link>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
            🎬 Demo Workflow Lengkap
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Simulasi lengkap dari pengajuan proposal hingga publikasi di portal publik dan penggalangan dana
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
              Progress: {currentStep + 1} dari {workflowSteps.length} tahap
            </span>
            <button
              onClick={() => setShowTimeline(!showTimeline)}
              className="text-xs font-bold px-3 py-1.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition"
            >
              {showTimeline ? "Sembunyikan Timeline" : "Lihat Timeline Lengkap"}
            </button>
          </div>

          {/* Progress Bar Visual */}
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
            <motion.div
              layoutId="progress"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / workflowSteps.length) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Timeline */}
          {showTimeline && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="lg:col-span-1"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sticky top-6">
                <h2 className="font-black text-gray-900 dark:text-white mb-4">📋 Timeline Lengkap</h2>
                <div className="space-y-2 max-h-[70vh] overflow-y-auto">
                  {workflowSteps.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentStep(idx)}
                      className={`w-full text-left p-3 rounded-lg transition-all text-sm ${
                        idx === currentStep
                          ? "bg-primary/20 border-2 border-primary text-primary font-bold"
                          : idx < currentStep
                            ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200"
                            : "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{s.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold truncate">{s.title}</p>
                          <p className="text-xs opacity-70">{s.role}</p>
                        </div>
                        {idx < currentStep && <span className="text-lg">✅</span>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Right: Current Step Details */}
          <div className={showTimeline ? "lg:col-span-2" : "lg:col-span-3"}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Step Card Header */}
                <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-2 border-primary/30 rounded-2xl p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-5xl">{step.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-primary uppercase tracking-wide">
                            Tahap {currentStep + 1} dari {workflowSteps.length}
                          </div>
                          <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                            {step.title}
                          </h2>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{step.description}</p>
                    </div>
                    <div className="shrink-0">
                      <motion.div
                        animate={{
                          rotate: step.status === "in_progress" ? 360 : 0,
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${
                          step.status === "completed"
                            ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400"
                            : step.status === "in_progress"
                              ? "bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                        }`}
                      >
                        {step.status === "completed" ? "✅" : step.status === "in_progress" ? "⏳" : "⏱"}
                      </motion.div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <div className="px-4 py-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 text-sm font-bold">
                      👤 {step.role}
                    </div>
                    <div className="px-4 py-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 text-sm font-bold">
                      ⏱️ {step.duration}
                    </div>
                  </div>
                </div>

                {/* Actions List */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4">
                    📝 Langkah-Langkah Yang Dilakukan:
                  </h3>
                  <div className="space-y-3">
                    {step.actions.map((action, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary/50 transition"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold flex items-center justify-center flex-shrink-0 text-sm">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 pt-0.5">{action}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                {step.details && (
                  <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4">
                      📊 Detail & Data:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {step.details.map((detail, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-800/50 rounded-lg text-sm text-gray-700 dark:text-gray-300"
                        >
                          {detail}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex-1 py-4 px-6 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ← Tahap Sebelumnya
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === workflowSteps.length - 1}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-primary to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Tahap Selanjutnya →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
