"use client";
import { motion, useInView } from "framer-motion";
import { PublicNav } from "@/components/layout/PublicNav";
import { useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Pengajuan Proposal & RAB",
    role: "Pengelola Aset",
    icon: "📋",
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-700",
    items: [
      "Upload dokumen legalitas tanah & bangunan",
      "Ajukan Proposal teknis dan gambar rencana",
      "Submit Rencana Anggaran Biaya (RAB) detail",
      "Pilih model pelaksanaan: Vendor atau Swakelola",
    ],
    tools: ["Proposal Builder", "RAB Template", "Dokumen Legalitas"],
  },
  {
    number: "02",
    title: "Verifikasi Teknis & Legalitas",
    role: "Admin Platform & Kurator",
    icon: "🛡️",
    color: "from-blue-500 to-indigo-600",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-700",
    items: [
      "Tim Admin memeriksa kelengkapan dokumen",
      "Kurator teknis validasi gambar blueprint & RAB",
      "Verifikasi sertifikasi vendor yang diusulkan",
      "Keputusan: Disetujui, Revisi, atau Ditolak",
    ],
    tools: ["Sistem Verifikasi", "Checklist Teknis", "Database Vendor"],
  },
  {
    number: "03",
    title: "Eksekusi oleh Vendor Tervalidasi",
    role: "Mitra Vendor",
    icon: "🏗️",
    color: "from-amber-500 to-orange-600",
    bgLight: "bg-amber-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-700",
    items: [
      "Vendor menerima akses dokumen & spesifikasi teknis",
      "Pelaksanaan konstruksi sesuai blueprint & SOP",
      "Submit progress report harian & mingguan",
      "Unggah foto dokumentasi setiap tahap pekerjaan",
    ],
    tools: ["Portal Vendor", "Laporan Harian", "Galeri Dokumentasi"],
  },
  {
    number: "04",
    title: "Laporan Real-Time & Validasi Lapangan",
    role: "Validator Lapangan",
    icon: "🔍",
    color: "from-violet-500 to-purple-600",
    bgLight: "bg-violet-50",
    borderColor: "border-violet-200",
    textColor: "text-violet-700",
    items: [
      "Validator hadir di lapangan sesuai jadwal inspeksi",
      "Isi checklist digital: kualitas material, progres, K3",
      "Upload foto & catatan temuan secara real-time",
      "Hasil validasi otomatis masuk ke dashboard publik",
    ],
    tools: ["Checklist Digital", "Kamera Lapangan", "GPS Verifikasi"],
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Connector line */}
      {index < steps.length - 1 && (
        <div className="absolute left-[39px] top-full w-0.5 h-12 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-700 z-0" />
      )}

      <div
        className="card p-6 md:p-8 cursor-pointer hover:shadow-lg transition-all"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-5">
          {/* Step Icon */}
          <div className={`w-16 h-16 flex-shrink-0 rounded-2xl bg-gradient-to-br ${step.color} flex flex-col items-center justify-center shadow-lg text-white`}>
            <div className="text-2xl">{step.icon}</div>
            <div className="text-[10px] font-black tracking-widest opacity-70">{step.number}</div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4 mb-1">
              <div>
                <div className={`text-xs font-bold uppercase tracking-widest ${step.textColor} dark:opacity-80 mb-1`}>{step.role}</div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white">{step.title}</h3>
              </div>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-400 flex-shrink-0"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m6 9 6 6 6-6"/></svg>
              </motion.div>
            </div>

            {/* Tools Pills */}
            <div className="flex flex-wrap gap-2 mt-3">
              {step.tools.map((tool, t) => (
                <span
                  key={t}
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${step.bgLight} dark:bg-white/10 ${step.textColor} dark:text-white border ${step.borderColor} dark:border-white/10`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Expandable Detail */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <ul className="mt-6 space-y-3 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
            {step.items.map((item, k) => (
              <motion.li
                key={k}
                initial={{ opacity: 0, x: -8 }}
                animate={expanded ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: k * 0.06 }}
                className="flex items-start gap-3 text-gray-700 dark:text-gray-300 text-sm"
              >
                <div className={`w-5 h-5 flex-shrink-0 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mt-0.5`}>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2 6 5 9 10 3"/></svg>
                </div>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function CaraKerja() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNav />

      <main className="flex-1 py-12 px-6 lg:px-12 max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 dark:bg-violet-900/30 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-400 font-bold text-xs uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            SOP Manajemen Konstruksi
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
            Cara Kerja Platform
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Alur kerja 4 tahap yang transparan, terstruktur, dan dapat diaudit — dari pengajuan proposal hingga validasi lapangan secara real-time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 text-center p-10 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-2xl shadow-emerald-900/30"
        >
          <div className="text-4xl mb-4">🕌</div>
          <h2 className="text-2xl font-black mb-3">Siap Memulai Proyek Anda?</h2>
          <p className="text-emerald-100/80 mb-6 max-w-md mx-auto">Daftarkan proyek konstruksi Anda dan nikmati manajemen yang transparan, terstruktur, dan dapat dipertanggungjawabkan.</p>
          <a href="/auth" className="inline-flex items-center gap-2 bg-white text-emerald-700 font-bold px-8 py-3.5 rounded-xl hover:bg-emerald-50 transition-colors shadow-lg">
            Masuk ke Portal
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </motion.div>
      </main>
    </div>
  );
}
