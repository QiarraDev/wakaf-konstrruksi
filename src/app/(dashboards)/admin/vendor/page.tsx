"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type VendorDataType = {
  id: string;
  name: string;
  type: string;
  region: string;
  pic: string;
  phone: string;
  address: string;
  kycScore: number;
  submittedAt: string;
  docs: string[];
  fieldStatus: string;
  portofolio: string[];
  rekening: string;
};

const VENDOR_DATA: VendorDataType[] = [];

type VendorStatus = "approved" | "rejected" | null;

export default function AdminVendorPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [selectedVendor, setSelectedVendor] = useState<typeof VENDOR_DATA[0] | null>(null);
  const [vendorActions, setVendorActions] = useState<{ [id: string]: VendorStatus }>({});
  const [dispatchModal, setDispatchModal] = useState<typeof VENDOR_DATA[0] | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleAdminApprove = (id: string) => {
    setVendorActions(prev => ({ ...prev, [id]: "approved" }));
    setSelectedVendor(null);
    showToast("✅ Vendor telah disetujui dan dapat mengakses tender proyek.");
  };

  const handleAdminReject = (id: string) => {
    setVendorActions(prev => ({ ...prev, [id]: "rejected" }));
    setSelectedVendor(null);
    showToast("❌ Vendor ditolak. Notifikasi penolakan dikirimkan ke akun vendor.");
  };

  const handleDispatch = (vendor: typeof VENDOR_DATA[0]) => {
    setDispatchModal(null);
    showToast(`📋 Tugas inspeksi lapangan untuk ${vendor.name} telah dikirimkan ke tim Validator.`);
  };

  const getStatusLabel = (vendor: typeof VENDOR_DATA[0]) => {
    const action = vendorActions[vendor.id];
    if (action === "approved") return { label: "✅ Disetujui Admin", color: "emerald" };
    if (action === "rejected") return { label: "❌ Ditolak", color: "red" };
    if (vendor.fieldStatus === "Terverifikasi Lapangan") return { label: "🔍 Terverifikasi Lapangan", color: "blue" };
    if (vendor.fieldStatus === "Menunggu Verifikasi Lapangan") return { label: "⏳ Menunggu Inspeksi", color: "amber" };
    return { label: "📋 KYC Masuk", color: "gray" };
  };

  const filtered = VENDOR_DATA.filter(v => {
    const { label } = getStatusLabel(v);
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.region.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filterStatus === "Semua" || label.includes(filterStatus);
    return matchSearch && matchFilter;
  });

  const stats = [
    { label: "Total Pengajuan", value: VENDOR_DATA.length, icon: "📋", color: "text-gray-900 dark:text-white" },
    { label: "Menunggu Inspeksi", value: VENDOR_DATA.filter(v => v.fieldStatus.includes("Menunggu")).length, icon: "⏳", color: "text-amber-600" },
    { label: "Siap Disetujui", value: VENDOR_DATA.filter(v => v.fieldStatus === "Terverifikasi Lapangan" && !vendorActions[v.id]).length, icon: "🔍", color: "text-blue-600" },
    { label: "Disetujui", value: Object.values(vendorActions).filter(v => v === "approved").length, icon: "✅", color: "text-emerald-600" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Manajemen Mitra Vendor</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Pantau pipeline verifikasi vendor dari pengajuan KYC hingga persetujuan akhir Admin.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="stat-card flex items-center gap-4"
          >
            <span className="text-3xl">{s.icon}</span>
            <div>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-700 rounded-xl p-4 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
            {successToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pipeline Banner */}
      <div className="card p-5">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">Alur Verifikasi Vendor</h3>
        <div className="flex flex-col sm:flex-row items-center gap-2 text-xs font-bold text-center">
          {[
            { step: "1", label: "Vendor Daftar & KYC", color: "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300" },
            { step: "→", label: "", color: "bg-transparent text-gray-400 !px-0" },
            { step: "2", label: "Dispatch ke Validator", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400" },
            { step: "→", label: "", color: "bg-transparent text-gray-400 !px-0" },
            { step: "3", label: "Inspeksi Lapangan", color: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400" },
            { step: "→", label: "", color: "bg-transparent text-gray-400 !px-0" },
            { step: "4", label: "Approval Admin", color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400" },
          ].map((item, i) => (
            item.step === "→" ? (
              <span key={i} className="text-gray-400 text-lg hidden sm:block">→</span>
            ) : (
              <div key={i} className={`flex-1 px-3 py-2 rounded-lg ${item.color}`}>
                <span className="block text-lg font-black">{item.step}</span>
                {item.label}
              </div>
            )
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cari nama vendor atau wilayah..."
          className="flex-1 p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none text-gray-900 dark:text-white"
        />
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none text-gray-900 dark:text-white"
        >
          <option>Semua</option>
          <option>KYC</option>
          <option>Menunggu</option>
          <option>Terverifikasi</option>
          <option>Disetujui</option>
          <option>Ditolak</option>
        </select>
      </div>

      {/* Vendor List */}
      <div className="space-y-4">
        {filtered.map((vendor, i) => {
          const { label, color } = getStatusLabel(vendor);
          const colorMap: { [k: string]: string } = {
            emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
            red: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
            blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
            amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
            gray: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
          };

          return (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card p-5"
            >
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                    {vendor.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-black text-gray-900 dark:text-white">{vendor.name}</h3>
                      <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">{vendor.type}</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">📍 {vendor.region} · PIC: {vendor.pic} · {vendor.phone}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Diajukan: {vendor.submittedAt} · Dokumen: {vendor.docs.length} file · Skor KYC: <span className={vendor.kycScore >= 80 ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>{vendor.kycScore}%</span></p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap self-end md:self-auto">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border ${colorMap[color]}`}>{label}</span>
                  <button onClick={() => setSelectedVendor(vendor)} className="text-xs font-bold px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl transition-colors border border-gray-200 dark:border-gray-700">
                    Detail
                  </button>
                  {vendor.fieldStatus.includes("Menunggu") && !vendorActions[vendor.id] && (
                    <button onClick={() => setDispatchModal(vendor)} className="text-xs font-bold px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors shadow-sm shadow-amber-500/20">
                      📋 Dispatch
                    </button>
                  )}
                  {vendor.fieldStatus === "Terverifikasi Lapangan" && !vendorActions[vendor.id] && (
                    <button onClick={() => handleAdminApprove(vendor.id)} className="text-xs font-bold px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors shadow-sm shadow-emerald-600/20">
                      ✓ Setujui
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedVendor && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-4 flex justify-between items-center">
                <h2 className="font-black text-white">Detail Vendor: {selectedVendor.id}</h2>
                <button onClick={() => setSelectedVendor(null)} className="text-gray-400 hover:text-white text-2xl">&times;</button>
              </div>

              <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    ["Nama Perusahaan", selectedVendor.name],
                    ["Tipe Badan Usaha", selectedVendor.type],
                    ["Wilayah Operasi", selectedVendor.region],
                    ["PIC", selectedVendor.pic],
                    ["No. Telp/WA", selectedVendor.phone],
                    ["Rekening", selectedVendor.rekening],
                  ].map(([k, v]) => (
                    <div key={k} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{k}</p>
                      <p className="font-bold text-gray-900 dark:text-white text-sm">{v}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Dokumen Yang Diupload</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedVendor.docs.map((doc, i) => (
                      <span key={i} className="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-800 px-3 py-1.5 rounded-lg text-xs font-bold">
                        📄 {doc}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Portofolio Proyek</p>
                  <ul className="space-y-1.5">
                    {selectedVendor.portofolio.map((p, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <span className="text-emerald-500">✓</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-gray-700 dark:text-gray-300">Skor KYC Dokumen</span>
                    <span className={selectedVendor.kycScore >= 80 ? "text-emerald-600" : "text-amber-600"}>{selectedVendor.kycScore}%</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3">
                    <div className={`h-3 rounded-full ${selectedVendor.kycScore >= 80 ? "bg-emerald-500" : "bg-amber-500"}`} style={{ width: `${selectedVendor.kycScore}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{selectedVendor.kycScore >= 80 ? "Dokumen lengkap & terverifikasi sistem." : "Perlu kelengkapan dokumen tambahan."}</p>
                </div>
              </div>

              {!vendorActions[selectedVendor.id] && (
                <div className="px-6 py-4 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                  <button onClick={() => handleAdminReject(selectedVendor.id)} className="px-5 py-2.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 font-bold rounded-xl hover:bg-red-200 transition-colors text-sm">
                    ✕ Tolak Vendor
                  </button>
                  <button onClick={() => handleAdminApprove(selectedVendor.id)} className="btn-primary text-sm">
                    ✓ Setujui Vendor
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dispatch to Validator Modal */}
      <AnimatePresence>
        {dispatchModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">Dispatch Tugas ke Validator</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Tugaskan validator lapangan untuk melakukan inspeksi fisik ke lokasi vendor ini.</p>

              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <p className="font-bold text-gray-900 dark:text-white">{dispatchModal.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">📍 {dispatchModal.address}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">👤 PIC: {dispatchModal.pic} · 📞 {dispatchModal.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Pilih Validator</label>
                  <select className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none">
                    <option>Ahmad – Validator Jawa Barat</option>
                    <option>Siti – Validator Jawa Tengah</option>
                    <option>Rahmat – Validator Jawa Timur</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Tenggat Inspeksi</label>
                  <input type="date" className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none text-gray-900 dark:text-white" />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 dark:border-gray-800 pt-4">
                <button onClick={() => setDispatchModal(null)} className="px-5 py-2 font-bold text-gray-500">Batal</button>
                <button onClick={() => handleDispatch(dispatchModal)} className="btn-primary">📋 Kirim Tugas ke Validator</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}