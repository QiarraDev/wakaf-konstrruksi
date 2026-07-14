"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type VendorType = {
  id: string;
  name: string;
  type: string;
  region: string;
  status: string;
  pic: string;
  phone: string;
  address: string;
  docs: string[];
  kycScore: number;
};

const VENDOR_LIST: VendorType[] = [];
export default function ValidatorDashboard() {
  const [vendors, setVendors] = useState<typeof VENDOR_LIST>(VENDOR_LIST);
  const [selectedProject, setSelectedProject] = useState("Masjid Jami' An-Nur");
  const [activeTab, setActiveTab] = useState<"proyek" | "vendor" | "kurasi">("proyek");
  const [selectedVendor, setSelectedVendor] = useState<typeof VENDOR_LIST[0] | null>(null);

  // States for Kurasi Proyek Baru
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const [surveyStatus, setSurveyStatus] = useState("Pending");
  const [vendorStatuses, setVendorStatuses] = useState<{[id: string]: string}>({});
  const [inspectNote, setInspectNote] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [opiniText, setOpiniText] = useState("Lokasi tanah sudah bersih dan siap bangun. Masyarakat sekitar sangat mendukung. Dokumen AIW asli sudah saya cek dan fotokopi diamankan.");
  const [dispatchedProposal, setDispatchedProposal] = useState<any>(null);
  const surveyPhotoRef = useRef<HTMLInputElement>(null);
  const [surveyPhotos, setSurveyPhotos] = useState<{name: string; url: string}[]>([]);

  // --- Selfie / Absensi Wajah ---
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selfieUrl, setSelfieUrl] = useState<string | null>(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraOn(true);
      setCameraError(null);
    } catch (e) {
      setCameraError('Kamera tidak dapat diakses. Pastikan izin kamera sudah diberikan di browser.');
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    setCameraOn(false);
  };

  const captureSelfie = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx?.drawImage(videoRef.current, 0, 0);
    const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.85);
    setSelfieUrl(dataUrl);
    stopCamera();
  };

  const resetSelfie = () => {
    setSelfieUrl(null);
    startCamera();
  };

  useEffect(() => {
    // Baca proposal yang di-dispatch Admin ke Validator
    const saved = localStorage.getItem('simulated_proposal');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setDispatchedProposal(parsed);
      } catch (e) {}
    }
    // Cek apakah laporan sudah pernah dikirim
    const reportSent = localStorage.getItem('validator_report_sent');
    if (reportSent === '1') setSurveyStatus('Selesai');
  }, []);

  const projects: string[] = [];

  const stats = [
    { label: "Proyek Dipantau", value: "0", icon: "🏗️", color: "text-primary" },
    { label: "Laporan Bulan Ini", value: "0", icon: "📸", color: "text-blue-600" },
    { label: "Inspeksi Menunggu", value: dispatchedProposal && surveyStatus === 'Pending' ? "1" : "0", icon: "⏳", color: "text-orange-500" },
    { label: "Skor Kepatuhan", value: "0%", icon: "✅", color: "text-emerald-600" },
  ];

  const recentActivity: any[] = [];

  const handleVerifVendor = (id: string, action: "setujui" | "tolak") => {
    const label = action === "setujui" ? "Terverifikasi Lapangan" : "Ditolak";
    setVendorStatuses(prev => ({ ...prev, [id]: label }));
    setSuccessMsg(action === "setujui"
      ? `✅ Vendor ${selectedVendor?.name} telah berhasil diverifikasi!`
      : `❌ Vendor ${selectedVendor?.name} ditolak. Notifikasi dikirim ke Admin.`);
    setSelectedVendor(null);
    setInspectNote("");
    setVendorDocs([]);
    setSelfieUrl(null);
    stopCamera();
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const [vendorDocs, setVendorDocs] = useState<{name: string; url: string}[]>([]);
  const vendorDocRef = useRef<HTMLInputElement>(null);

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
          { id: "kurasi", label: `📝 Inspeksi Proposal${surveyStatus === "Pending" && dispatchedProposal ? " 🔴" : ""}` },
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
            {vendors.map(vendor => {
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
                <div>
                  <h2 className="font-black text-white">Form Inspeksi Vendor Lapangan</h2>
                  <p className="text-gray-400 text-xs mt-0.5">Lengkapi absensi wajah dan unggah dokumen pendukung</p>
                </div>
                <button onClick={() => { setSelectedVendor(null); stopCamera(); setSelfieUrl(null); setVendorDocs([]); }} className="text-gray-400 hover:text-white text-2xl">&times;</button>
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

                {/* ===== ABSENSI WAJAH ===== */}
                <div className="border border-purple-200 dark:border-purple-800 rounded-xl overflow-hidden">
                  <div className="bg-purple-50 dark:bg-purple-900/20 px-4 py-3 flex items-center gap-2">
                    <span className="text-xl">🤳</span>
                    <div>
                      <p className="font-black text-purple-900 dark:text-purple-300 text-sm">Absensi Wajah Real-Time (Wajib)</p>
                      <p className="text-xs text-purple-700 dark:text-purple-400">Selfie sebagai bukti kehadiran fisik Anda di kantor vendor</p>
                    </div>
                    {selfieUrl && <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">✅ Terverifikasi</span>}
                  </div>

                  <div className="p-4">
                    {!selfieUrl ? (
                      <div className="space-y-3">
                        {/* Camera Preview */}
                        <div className="relative bg-black rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                          {cameraOn ? (
                            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center text-white p-6">
                              <div className="text-5xl mb-3">📷</div>
                              <p className="text-sm font-bold">{cameraError || 'Kamera belum aktif'}</p>
                              {cameraError && <p className="text-xs text-gray-400 mt-1">{cameraError}</p>}
                            </div>
                          )}
                          {cameraOn && (
                            <div className="absolute inset-0 pointer-events-none">
                              <div className="absolute inset-4 border-2 border-white/30 rounded-xl"></div>
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-40 border-2 border-purple-400 rounded-full opacity-60"></div>
                            </div>
                          )}
                        </div>
                        <canvas ref={canvasRef} className="hidden" />

                        <div className="flex gap-2">
                          {!cameraOn ? (
                            <button onClick={startCamera} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                              📷 Aktifkan Kamera
                            </button>
                          ) : (
                            <>
                              <button onClick={stopCamera} className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                Batal
                              </button>
                              <button onClick={captureSelfie} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                                🤳 Ambil Foto Sekarang
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="relative">
                          <img src={selfieUrl} alt="Selfie" className="w-full rounded-xl object-cover aspect-video" />
                          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg font-bold">
                            📍 {new Date().toLocaleString('id-ID')} · Validator Lapangan
                          </div>
                          <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-lg font-bold">✅ Verified</div>
                        </div>
                        <button onClick={resetSelfie} className="w-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold py-2 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          🔄 Ulang Foto
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upload Dokumen Penunjang */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Upload Dokumen Fisik Tambahan (Jika Ada)</label>
                  <div
                    onClick={() => vendorDocRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 text-center cursor-pointer hover:border-primary hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors"
                  >
                    <div className="text-2xl mb-1">📁</div>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Klik untuk upload dokumen / foto lapangan</p>
                    <input ref={vendorDocRef} type="file" multiple className="hidden" onChange={e => {
                      if (e.target.files?.length) {
                        const files = Array.from(e.target.files).map(f => ({ name: f.name, url: URL.createObjectURL(f) }));
                        setVendorDocs(prev => [...prev, ...files]);
                      }
                    }} />
                  </div>
                  {vendorDocs.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-3">
                      {vendorDocs.map((p, i) => (
                        <div key={i} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
                          <span className="text-sm truncate max-w-[150px]">{p.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
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

              <div className="px-6 py-4 flex flex-col gap-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                {!selfieUrl && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-bold bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
                    <span>⚠️</span>
                    <span>Absensi wajah belum dilakukan. Aktifkan kamera dan ambil selfie terlebih dahulu.</span>
                  </div>
                )}
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => handleVerifVendor(selectedVendor.id, "tolak")}
                    disabled={!selfieUrl}
                    className="px-5 py-2.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 font-bold rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ✕ Tolak & Beri Revisi
                  </button>
                  <button
                    onClick={() => handleVerifVendor(selectedVendor.id, "setujui")}
                    disabled={!selfieUrl}
                    className="btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    ✓ Setujui & Verifikasi
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Tab Content: Kurasi Proyek Baru */}
      {activeTab === "kurasi" && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {!dispatchedProposal && surveyStatus === 'Pending' ? (
            <div className="card p-12 text-center">
              <div className="text-5xl mb-3">⏳</div>
              <h3 className="font-bold text-gray-700 dark:text-gray-300">Belum Ada Tugas Inspeksi</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Admin belum men-dispatch proposal apapun ke Anda. Tunggu pemberitahuan dari Admin.</p>
            </div>
          ) : (
            <>
              <div className="card p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                  ℹ️ <strong>Tugas Inspeksi dari Admin:</strong> Lakukan kroscek fisik lokasi dan verifikasi kelayakan proposal berikut.
                </p>
              </div>

              <div className="card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white">{dispatchedProposal?.name || "Pembangunan Masjid Jami' An-Nur"}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">📍 {dispatchedProposal?.region || 'Jawa Barat'} · PIC: {dispatchedProposal?.pic || 'Budi Santoso'}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                    surveyStatus === "Pending" ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800" :
                    "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                  }`}>
                    {surveyStatus === "Pending" ? "⏳ Menunggu Survei" : "✅ Laporan Terkirim"}
                  </span>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 text-sm space-y-2 mb-4">
                  <p><strong>Kategori:</strong> {dispatchedProposal?.cat || 'Masjid / Mushola'}</p>
                  <p><strong>Estimasi Dana RAB:</strong> {dispatchedProposal?.dana || 'Rp 1.200.000.000'}</p>
                  <p><strong>Catatan Admin:</strong> "Pastikan lahan sudah diwakafkan (cek AIW) dan tidak dalam sengketa."</p>
                </div>

                {surveyStatus === "Pending" ? (
                  <button onClick={() => setIsSurveyModalOpen(true)} className="btn-primary w-full sm:w-auto">
                    🔍 Mulai Inspeksi Lapangan
                  </button>
                ) : (
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl">
                    <p className="font-bold text-emerald-800 dark:text-emerald-400">✅ Laporan inspeksi telah dikirim ke Admin.</p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">Admin akan meneruskan ke Super Admin untuk Final Approval.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      )}

      {/* Survey Modal */}
      <AnimatePresence>
        {isSurveyModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4 flex justify-between items-center">
                <div>
                  <h2 className="font-black text-white">Form Inspeksi Lapangan</h2>
                  <p className="text-gray-400 text-xs mt-0.5">Lengkapi semua bagian termasuk absensi wajah sebelum mengirim</p>
                </div>
                <button onClick={() => { setIsSurveyModalOpen(false); stopCamera(); }} className="text-gray-400 hover:text-white text-2xl">&times;</button>
              </div>

              <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">

                {/* ===== ABSENSI WAJAH ===== */}
                <div className="border border-purple-200 dark:border-purple-800 rounded-xl overflow-hidden">
                  <div className="bg-purple-50 dark:bg-purple-900/20 px-4 py-3 flex items-center gap-2">
                    <span className="text-xl">🤳</span>
                    <div>
                      <p className="font-black text-purple-900 dark:text-purple-300 text-sm">Absensi Wajah Real-Time (Wajib)</p>
                      <p className="text-xs text-purple-700 dark:text-purple-400">Selfie sebagai bukti kehadiran fisik Validator di lokasi</p>
                    </div>
                    {selfieUrl && <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">✅ Terverifikasi</span>}
                  </div>

                  <div className="p-4">
                    {!selfieUrl ? (
                      <div className="space-y-3">
                        {/* Camera Preview */}
                        <div className="relative bg-black rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                          {cameraOn ? (
                            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center text-white p-6">
                              <div className="text-5xl mb-3">📷</div>
                              <p className="text-sm font-bold">{cameraError || 'Kamera belum aktif'}</p>
                              {cameraError && <p className="text-xs text-gray-400 mt-1">{cameraError}</p>}
                            </div>
                          )}
                          {cameraOn && (
                            <div className="absolute inset-0 pointer-events-none">
                              <div className="absolute inset-4 border-2 border-white/30 rounded-xl"></div>
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-40 border-2 border-purple-400 rounded-full opacity-60"></div>
                            </div>
                          )}
                        </div>
                        <canvas ref={canvasRef} className="hidden" />

                        <div className="flex gap-2">
                          {!cameraOn ? (
                            <button onClick={startCamera} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                              📷 Aktifkan Kamera
                            </button>
                          ) : (
                            <>
                              <button onClick={stopCamera} className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                Batal
                              </button>
                              <button onClick={captureSelfie} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                                🤳 Ambil Foto Sekarang
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="relative">
                          <img src={selfieUrl} alt="Selfie" className="w-full rounded-xl object-cover aspect-video" />
                          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg font-bold">
                            📍 {new Date().toLocaleString('id-ID')} · Validator Lapangan
                          </div>
                          <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-lg font-bold">✅ Verified</div>
                        </div>
                        <button onClick={resetSelfie} className="w-full border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold py-2 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          🔄 Ulang Foto
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-xl flex items-start gap-3">
                  <span className="text-2xl">📷</span>
                  <div className="text-sm">
                    <p className="font-bold text-amber-900 dark:text-amber-400">Upload Foto Bukti Lapangan (min. 3 foto)</p>
                    <p className="text-amber-800 dark:text-amber-300 mt-1">Foto tapak tanah, batas lahan, jalan akses, dan dokumen AIW.</p>
                  </div>
                </div>

                {/* Upload Foto */}
                <div>
                  <div
                    onClick={() => surveyPhotoRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-primary hover:bg-emerald-50 dark:hover:bg-emerald-900/10 transition-colors"
                  >
                    <div className="text-3xl mb-1">📸</div>
                    <p className="text-sm font-bold text-gray-600 dark:text-gray-400">Klik untuk upload foto bukti</p>
                    <input ref={surveyPhotoRef} type="file" accept="image/*" className="hidden" onChange={e => {
                      if (e.target.files?.length) {
                        const file = e.target.files[0];
                        setSurveyPhotos(prev => [...prev, { name: file.name, url: URL.createObjectURL(file) }]);
                      }
                    }} />
                  </div>
                  {surveyPhotos.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-3">
                      {surveyPhotos.map((p, i) => (
                        <img key={i} src={p.url} alt={p.name} className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                      ))}
                    </div>
                  )}
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
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Opini & Rekomendasi Validator</label>
                  <textarea
                    rows={3}
                    value={opiniText}
                    onChange={e => setOpiniText(e.target.value)}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm outline-none text-gray-900 dark:text-white"
                    placeholder="Tulis hasil pengamatan lapangan, kondisi lahan, dan rekomendasi..."
                  />
                </div>
              </div>

              <div className="px-6 py-4 flex flex-col gap-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                {!selfieUrl && (
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-xs font-bold bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg px-3 py-2">
                    <span>⚠️</span>
                    <span>Absensi wajah belum dilakukan. Aktifkan kamera dan ambil selfie terlebih dahulu.</span>
                  </div>
                )}
                <div className="flex justify-end gap-3">
                  <button onClick={() => { setIsSurveyModalOpen(false); stopCamera(); }} className="px-5 py-2.5 font-bold text-gray-500 text-sm">
                    Batal
                  </button>
                  <button
                    disabled={!selfieUrl}
                    onClick={() => {
                      // Kirim laporan ke antrian Super Admin
                      const proposal = dispatchedProposal;
                      if (!proposal) return;
                      const existing = JSON.parse(localStorage.getItem('superadmin_queue') || '[]');
                      if (!existing.find((p: any) => p.id === proposal.id)) {
                        localStorage.setItem('superadmin_queue', JSON.stringify([
                          { ...proposal, status: 'Menunggu Approval Pimpinan', validatorName: 'Ahmad Fauzi', validatorScore: 92, summary: opiniText },
                          ...existing
                        ]));
                      }
                      localStorage.setItem('validator_report_sent', '1');
                      setSurveyStatus('Selesai');
                      setIsSurveyModalOpen(false);
                      stopCamera();
                      setSuccessMsg('✅ Absensi wajah & laporan inspeksi berhasil dikirim ke Admin!');
                      setTimeout(() => setSuccessMsg(null), 5000);
                    }}
                    className="btn-primary text-sm shadow-lg shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    🚀 Kirim Laporan Inspeksi
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
