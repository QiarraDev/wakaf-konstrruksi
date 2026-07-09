"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "@/context/NotificationContext";

export default function LaporanPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const { addNotification } = useNotification();
  const [form, setForm] = useState({
    project: "Masjid Jami' An-Nur",
    milestone: "60",
    kondisi: "Baik",
    catatan: "",
    photos: [] as string[],
  });
  const [gps] = useState({ lat: "-6.917464", lng: "107.619123", acc: "±3m" });

  // --- Face Check-in State ---
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedFace, setCapturedFace] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch {
      setCameraError("Kamera tidak dapat diakses. Pastikan izin kamera diaktifkan di browser Anda, atau gunakan simulasi.");
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  }, []);

  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    ctx.restore();
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    setCapturedFace(dataUrl);
    stopCamera();
  };

  const startCountdownCapture = () => {
    setCountdown(3);
    let c = 3;
    const interval = setInterval(() => {
      c--;
      setCountdown(c);
      if (c === 0) {
        clearInterval(interval);
        setCountdown(null);
        capturePhoto();
      }
    }, 1000);
  };

  const simulateFaceCapture = () => {
    stopCamera();
    setCapturedFace("SIMULATED");
  };

  const retakePhoto = () => {
    setCapturedFace(null);
    startCamera();
  };

  const addFakePhoto = () => {
    if (form.photos.length >= 5) return;
    const colors = ["bg-emerald-200", "bg-blue-200", "bg-amber-200", "bg-rose-200", "bg-violet-200"];
    const labels = ["Tampak Depan", "Struktur Kubah", "Dinding Bata", "Pondasi", "Area Kerja"];
    const idx = form.photos.length;
    setForm(f => ({ ...f, photos: [...f.photos, `${labels[idx]}||${colors[idx]}`] }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    
    // Trigger notification to admin/superadmin
    addNotification({
      type: "validator_report",
      icon: "📋",
      title: "Laporan Validator Baru Masuk",
      description: `Laporan dari validator untuk proyek ${form.project}`,
      urgent: true,
      projectId: `PRJ-${Math.floor(Math.random() * 9000) + 1000}`,
      projectName: form.project,
      validatorName: "Ahmad Fauzi",
      validatorScore: parseInt(form.milestone),
      href: "/admin/approval",
      data: {
        milestone: parseInt(form.milestone),
        kondisi: form.kondisi,
        summary: `Validator melaporkan progress ${form.milestone}% - Kondisi: ${form.kondisi}`,
        region: "Jawa Barat",
        dana: "Rp 1.2M",
        photos: form.photos.length,
      },
    });
  };

  const resetAll = () => {
    setSubmitted(false);
    setStep(1);
    setCapturedFace(null);
    setCameraActive(false);
    setForm({ project: "Masjid Jami' An-Nur", milestone: "60", kondisi: "Baik", catatan: "", photos: [] });
  };

  // Steps: 1=Face Check-in, 2=Info Proyek, 3=Foto & Kondisi, 4=Review
  const stepLabels = ["Absensi Wajah", "Info Proyek", "Dokumentasi", "Kirim Laporan"];

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-5xl border-4 border-emerald-200 dark:border-emerald-800 shadow-lg"
        >✅</motion.div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">Laporan Berhasil Dikirim!</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Laporan dan absensi wajah Anda telah terverifikasi & masuk ke sistem.</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 w-full max-w-sm text-left space-y-3">
          {[
            ["ID Laporan", `#RPT-${Math.floor(Math.random() * 9000) + 1000}`],
            ["Proyek", form.project],
            ["Milestone", `${form.milestone}%`],
            ["Foto Diunggah", `${form.photos.length} Foto`],
            ["Absensi Wajah", "✅ Terverifikasi"],
            ["Koordinat GPS", `${gps.lat}, ${gps.lng}`],
            ["Timestamp", new Date().toLocaleTimeString("id-ID") + " WIB"],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">{k}</span>
              <span className="font-bold text-gray-900 dark:text-white">{v}</span>
            </div>
          ))}
        </div>
        <button onClick={resetAll} className="btn-primary px-8 py-3">Buat Laporan Baru</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">📸 Kirim Laporan Real-Time</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Dokumentasikan kondisi pembangunan dari lokasi secara langsung.</p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-1">
        {stepLabels.map((label, idx) => {
          const s = idx + 1;
          return (
            <div key={s} className="flex items-center gap-1 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-all duration-300 ${step >= s ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"}`}>
                {step > s ? "✓" : s}
              </div>
              <span className={`text-[10px] font-bold hidden sm:block whitespace-nowrap ${step >= s ? "text-primary" : "text-gray-400"}`}>{label}</span>
              {s < 4 && <div className={`flex-1 h-0.5 rounded ml-1 ${step > s ? "bg-primary" : "bg-gray-200 dark:bg-gray-700"}`}></div>}
            </div>
          );
        })}
      </div>

      {/* ===================== STEP 1: FACE CHECK-IN ===================== */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-6 space-y-5">
          <div>
            <h2 className="text-lg font-black text-gray-900 dark:text-white">Langkah 1: Absensi Wajah</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Demi transparansi, Anda wajib melakukan <strong>selfie check-in</strong> sebagai bukti kehadiran di lapangan sebelum laporan dapat dikirim.</p>
          </div>

          {/* Info Banner */}
          <div className="flex items-start gap-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <span className="text-xl">🛡️</span>
            <div className="text-sm">
              <p className="font-bold text-blue-900 dark:text-blue-400">Mengapa ini penting?</p>
              <p className="text-blue-700 dark:text-blue-300/80 mt-0.5">Foto wajah dikombinasikan dengan koordinat GPS real-time membuktikan bahwa Anda benar-benar hadir di lokasi saat laporan dibuat. Data ini disimpan sebagai rekam jejak yang tidak dapat dimanipulasi.</p>
            </div>
          </div>

          {/* Camera Area */}
          <div className="relative">
            {capturedFace ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                {/* Preview */}
                <div className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden flex items-center justify-center">
                  {capturedFace === "SIMULATED" ? (
                    <div className="text-center text-white">
                      <div className="text-7xl mb-3">🤳</div>
                      <p className="font-bold">Foto Simulasi Diterima</p>
                      <p className="text-xs text-gray-400 mt-1">Dalam produksi, foto asli wajah validator akan tersimpan di sini</p>
                    </div>
                  ) : (
                    <img src={capturedFace} alt="Selfie Validator" className="w-full h-full object-cover" />
                  )}
                  {/* Overlay badges */}
                  <div className="absolute bottom-3 left-3 flex gap-2 flex-wrap">
                    <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-lg">✅ Wajah Terverifikasi</span>
                    <span className="bg-black/60 text-white text-xs font-mono px-2 py-1 rounded-lg">📍 {gps.lat}, {gps.lng}</span>
                    <span className="bg-black/60 text-white text-xs font-mono px-2 py-1 rounded-lg">🕐 {new Date().toLocaleTimeString("id-ID")}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={retakePhoto} className="flex-1 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-bold rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    🔄 Ambil Ulang
                  </button>
                  <button onClick={() => setStep(2)} className="flex-1 btn-primary text-sm">
                    Lanjut → Info Proyek
                  </button>
                </div>
              </motion.div>
            ) : cameraActive ? (
              <div className="space-y-4">
                <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                    style={{ transform: "scaleX(-1)" }}
                  />
                  {/* Face guide overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-56 border-4 border-emerald-400/70 rounded-full" style={{ boxShadow: "0 0 0 9999px rgba(0,0,0,0.4)" }}></div>
                  </div>
                  {countdown !== null && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl font-black text-white drop-shadow-lg animate-ping">{countdown}</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-0 right-0 flex justify-center">
                    <span className="bg-black/60 text-white text-xs font-medium px-3 py-1 rounded-full">Posisikan wajah di dalam lingkaran</span>
                  </div>
                </div>
                <canvas ref={canvasRef} className="hidden" />
                <div className="flex gap-3">
                  <button onClick={stopCamera} className="flex-1 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-bold rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    Batal
                  </button>
                  <button
                    onClick={startCountdownCapture}
                    disabled={countdown !== null}
                    className="flex-1 btn-primary text-sm disabled:opacity-50"
                  >
                    {countdown !== null ? `📸 Mengambil dalam ${countdown}...` : "📸 Ambil Foto (3 detik)"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-full aspect-video bg-gray-100 dark:bg-gray-800 rounded-2xl flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 dark:border-gray-700">
                  <span className="text-6xl">🤳</span>
                  <p className="font-bold text-gray-700 dark:text-gray-300">Kamera Belum Aktif</p>
                  <p className="text-xs text-gray-400 text-center max-w-xs">Aktifkan kamera untuk mengambil selfie sebagai bukti kehadiran di lokasi</p>
                </div>
                {cameraError && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-sm text-red-700 dark:text-red-400">
                    ⚠️ {cameraError}
                  </div>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={startCamera}
                    className="flex-1 btn-primary text-sm flex items-center justify-center gap-2"
                  >
                    📷 Aktifkan Kamera
                  </button>
                  <button
                    onClick={simulateFaceCapture}
                    className="flex-1 py-2.5 border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 font-bold rounded-xl text-sm hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary transition-colors"
                  >
                    🤳 Gunakan Simulasi
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* GPS Info */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl flex items-center gap-3">
            <span className="text-xl">📍</span>
            <div>
              <p className="text-sm font-bold text-emerald-800 dark:text-emerald-400">Lokasi GPS Terdeteksi</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-500 font-mono mt-0.5">Lat: {gps.lat} • Long: {gps.lng} • Akurasi: {gps.acc}</p>
            </div>
            <span className="ml-auto text-xs bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-1 rounded">Aktif</span>
          </div>
        </motion.div>
      )}

      {/* ===================== STEP 2: PILIH PROYEK ===================== */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-6 space-y-5">
          <h2 className="text-lg font-black text-gray-900 dark:text-white">Langkah 2: Pilih Proyek & Milestone</h2>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Proyek yang Dilaporkan</label>
            <select value={form.project} onChange={e => setForm(f => ({ ...f, project: e.target.value }))} className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm font-medium text-gray-800 dark:text-white outline-none focus:border-primary">
              <option>Masjid Jami&apos; An-Nur</option>
              <option>Pesantren Tahfidz Al-Ikhlas</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Persentase Milestone Saat Ini</label>
            <div className="grid grid-cols-4 gap-2">
              {["20", "40", "60", "80"].map(val => (
                <button key={val} onClick={() => setForm(f => ({ ...f, milestone: val }))} className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${form.milestone === val ? "bg-primary text-white border-primary shadow-md shadow-primary/20" : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary/50"}`}>
                  {val}%
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setStep(1)} className="w-full border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">← Kembali</button>
            <button onClick={() => setStep(3)} className="w-full btn-primary py-3">Lanjut →</button>
          </div>
        </motion.div>
      )}

      {/* ===================== STEP 3: FOTO & KONDISI ===================== */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-6 space-y-5">
          <h2 className="text-lg font-black text-gray-900 dark:text-white">Langkah 3: Dokumentasi Foto & Kondisi</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Foto Dokumentasi Lapangan ({form.photos.length}/5)</label>
              {form.photos.length < 5 && <button onClick={addFakePhoto} className="text-sm font-bold text-primary hover:underline">+ Tambah Foto</button>}
            </div>
            {form.photos.length === 0 ? (
              <button onClick={addFakePhoto} className="w-full border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl py-12 flex flex-col items-center gap-3 hover:border-primary/50 hover:bg-primary/5 transition-colors">
                <span className="text-4xl">📷</span>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Klik untuk ambil / upload foto</p>
                <p className="text-xs text-gray-400">(Simulasi)</p>
              </button>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {form.photos.map((photo, i) => {
                  const [label, color] = photo.split("||");
                  return (
                    <div key={i} className={`${color} rounded-xl aspect-square relative overflow-hidden flex items-end p-2`}>
                      <div className="absolute top-2 right-2 bg-black/40 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">📍 GPS</div>
                      <span className="text-white text-[10px] font-bold bg-black/50 px-2 py-1 rounded w-full text-center">{label}</span>
                    </div>
                  );
                })}
                {form.photos.length < 5 && (
                  <button onClick={addFakePhoto} className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl aspect-square flex items-center justify-center hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <span className="text-3xl text-gray-400">+</span>
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Kondisi Pembangunan</label>
            <div className="grid grid-cols-3 gap-2">
              {[{ val: "Baik", icon: "✅", cls: "emerald" }, { val: "Perlu Perhatian", icon: "⚠️", cls: "orange" }, { val: "Terhenti", icon: "🚫", cls: "red" }].map(opt => (
                <button key={opt.val} onClick={() => setForm(f => ({ ...f, kondisi: opt.val }))} className={`py-3 px-2 rounded-xl font-bold text-xs transition-all border-2 text-center ${form.kondisi === opt.val ? `border-${opt.cls}-400 bg-${opt.cls}-50 dark:bg-${opt.cls}-900/20 text-${opt.cls}-700` : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700"}`}>
                  {opt.icon}<br />{opt.val}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Catatan Lapangan</label>
            <textarea value={form.catatan} onChange={e => setForm(f => ({ ...f, catatan: e.target.value }))} placeholder="Tulis catatan kondisi di lapangan, kendala, atau informasi penting..." className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-white outline-none focus:border-primary resize-none" rows={4} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setStep(2)} className="w-full border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">← Kembali</button>
            <button onClick={() => setStep(4)} className="w-full btn-primary py-3">Lanjut →</button>
          </div>
        </motion.div>
      )}

      {/* ===================== STEP 4: REVIEW & KIRIM ===================== */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card p-6 space-y-5">
          <h2 className="text-lg font-black text-gray-900 dark:text-white">Langkah 4: Review & Kirim</h2>

          {/* Face Proof Preview */}
          <div className="flex items-center gap-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
              {capturedFace && capturedFace !== "SIMULATED" ? (
                <img src={capturedFace} alt="face" className="w-full h-full object-cover rounded-full" />
              ) : "🤳"}
            </div>
            <div>
              <p className="font-bold text-emerald-900 dark:text-emerald-400">Absensi Wajah Terverifikasi ✅</p>
              <p className="text-xs text-emerald-700 dark:text-emerald-500 mt-0.5 font-mono">GPS: {gps.lat}, {gps.lng} · {new Date().toLocaleTimeString("id-ID")} WIB</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
            {[
              ["Proyek", form.project],
              ["Milestone Dilaporkan", `${form.milestone}%`],
              ["Kondisi", form.kondisi],
              ["Jumlah Foto", `${form.photos.length} foto`],
              ["Koordinat GPS", `${gps.lat}, ${gps.lng}`],
              ["Timestamp", new Date().toLocaleString("id-ID")],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between items-center px-4 py-3 text-sm">
                <span className="text-gray-500 dark:text-gray-400">{k}</span>
                <span className={`font-bold ${k === "Milestone Dilaporkan" ? "text-primary" : "text-gray-900 dark:text-white"}`}>{v}</span>
              </div>
            ))}
          </div>

          {form.catatan && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-xl text-sm text-blue-800 dark:text-blue-300">
              <p className="font-bold mb-1">Catatan:</p>
              <p className="italic">{form.catatan}</p>
            </div>
          )}

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4 rounded-xl text-sm text-amber-800 dark:text-amber-300">
            <p className="font-bold">⚠️ Pernyataan Validator</p>
            <p className="mt-1">Dengan mengirim laporan ini, saya menyatakan bahwa data yang dilaporkan adalah benar dan sesuai dengan kondisi aktual di lapangan. Absensi wajah ini merupakan tanda tangan digital kehadiran saya.</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setStep(3)} className="w-full border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">← Kembali</button>
            <button onClick={handleSubmit} className="w-full btn-primary py-3 shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-transform">
              🚀 Kirim Laporan
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
