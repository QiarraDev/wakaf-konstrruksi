
"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// --- DATA: LOKASI ---
const LOCATION_DATA = {
  "Jawa Barat": {
    "Bandung": { "Cicendo": ["Arjuna", "Husen"], "Coblong": ["Cipaganti", "Dago"] },
    "Bogor": { "Bogor Tengah": ["Babakan", "Cibogor"], "Bogor Utara": ["Bantarjati", "Cibuluh"] }
  },
  "Jawa Tengah": {
    "Semarang": { "Semarang Tengah": ["Bangunharjo", "Gabahan"], "Tembalang": ["Mangunharjo", "Tembalang"] }
  },
  "Jawa Timur": {
    "Surabaya": { "Gubeng": ["Airlangga", "Baratajaya"], "Wonokromo": ["Darmo", "Jagir"] }
  }
};

// --- DATA: DESAIN ---
type BuildingType = "masjid" | "pesantren" | "madrasah" | "sosial";
type BuildingSpec = { label: string; emoji: string; rooms: { name: string; pct: number; color: string }[]; features: string[]; style: string; };

const BUILDING_SPECS: Record<BuildingType, BuildingSpec> = {
  masjid: {
    label: "Masjid / Mushola", emoji: "🕌", style: "Arsitektur Islam Modern",
    rooms: [
      { name: "Ruang Sholat Utama", pct: 55, color: "#d1fae5" },
      { name: "Selasar & Teras", pct: 15, color: "#a7f3d0" },
      { name: "Tempat Wudhu", pct: 12, color: "#6ee7b7" },
      { name: "Mihrab & Mimbar", pct: 8, color: "#34d399" },
      { name: "Ruang Imam", pct: 10, color: "#10b981" },
    ],
    features: ["Ruang sholat utama", "Area wudhu terpisah", "Selasar keliling", "Ventilasi alami"],
  },
  pesantren: {
    label: "Pondok Pesantren", emoji: "🏫", style: "Pendidikan Islam Terpadu",
    rooms: [
      { name: "Asrama Santri", pct: 40, color: "#dbeafe" },
      { name: "Kelas & Aula", pct: 25, color: "#bfdbfe" },
      { name: "Masjid Pesantren", pct: 15, color: "#93c5fd" },
      { name: "Dapur & Kantin", pct: 10, color: "#60a5fa" },
      { name: "Kantor & Fasilitas", pct: 10, color: "#3b82f6" },
    ],
    features: ["Asrama terpisah", "Ruang kelas", "Masjid pesantren", "Dapur bersama"],
  },
  madrasah: {
    label: "Madrasah / Sekolah", emoji: "📚", style: "Pendidikan Modern Islami",
    rooms: [
      { name: "Ruang Kelas", pct: 50, color: "#fef3c7" },
      { name: "Perpustakaan", pct: 15, color: "#fde68a" },
      { name: "Lab & Komputer", pct: 15, color: "#fcd34d" },
      { name: "Kantor & Guru", pct: 10, color: "#f59e0b" },
      { name: "Koridor & Fasilitas", pct: 10, color: "#d97706" },
    ],
    features: ["Ruang kelas", "Perpustakaan", "Laboratorium", "Ruang guru"],
  },
  social: {
    label: "Fasilitas Sosial", emoji: "🏥", style: "Fasilitas Komunitas",
    rooms: [
      { name: "Aula Serbaguna", pct: 45, color: "#ede9fe" },
      { name: "Klinik / Posyandu", pct: 20, color: "#ddd6fe" },
      { name: "Ruang Pertemuan", pct: 15, color: "#c4b5fd" },
      { name: "Gudang & Logistik", pct: 10, color: "#a78bfa" },
      { name: "Toilet & Fasilitas", pct: 10, color: "#8b5cf6" },
    ],
    features: ["Aula serbaguna", "Klinik dasar", "Ruang pertemuan", "Akses difabel"],
  }
} as any;

function FloorPlanSVG({ type }: { type: BuildingType }) {
  const imageUrls: Record<BuildingType, string> = {
    masjid: "/blueprints/blueprint_masjid_1783407761994.png",
    pesantren: "/blueprints/blueprint_pesantren_1783407974450.png",
    madrasah: "/blueprints/blueprint_madrasah_1783407986915.png",
    sosial: "/blueprints/blueprint_sosial_1783407997737.png",
  };
  return (
    <div className="w-full rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white aspect-[4/3] relative flex items-center justify-center p-2">
      <img src={imageUrls[type] || imageUrls.masjid} alt="Denah" className="max-w-full max-h-full object-contain" />
    </div>
  );
}

export default function ProposalWizardPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // --- STATE: STEP 1 (INFO) ---
  const [namaProyek, setNamaProyek] = useState("");
  const [prov, setProv] = useState("");
  const [kota, setKota] = useState("");
  const [kec, setKec] = useState("");
  const [jalan, setJalan] = useState("");
  const [picName, setPicName] = useState("");
  const [picPhone, setPicPhone] = useState("");
  const [gmapsLink, setGmapsLink] = useState("");

  const provList = Object.keys(LOCATION_DATA);
  const kotaList = prov && LOCATION_DATA[prov as keyof typeof LOCATION_DATA] ? Object.keys(LOCATION_DATA[prov as keyof typeof LOCATION_DATA]) : [];
  const kecList = prov && kota && LOCATION_DATA[prov as keyof typeof LOCATION_DATA][kota as any] ? Object.keys(LOCATION_DATA[prov as keyof typeof LOCATION_DATA][kota as any]) : [];

  // --- STATE: STEP 2 (DESAIN) ---
  const [panjang, setPanjang] = useState<number | "">("");
  const [lebar, setLebar] = useState<number | "">("");
  const [buildingType, setBuildingType] = useState<BuildingType>("masjid");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const totalArea = panjang !== "" && lebar !== "" ? Number(panjang) * Number(lebar) : 0;
  const spec = BUILDING_SPECS[buildingType] || BUILDING_SPECS.masjid;

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerated(false);
    setTimeout(() => { setIsGenerating(false); setGenerated(true); }, 1500);
  };

  // --- STATE: STEP 3 (RAB) ---
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<{name: string, size: string, url: string}[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiEstimation, setAiEstimation] = useState<{ time: string, suggestion: string } | null>(null);
  const [items, setItems] = useState<any[]>([]);

  const handleAIAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setItems([
        { cat: 'Material', name: 'Batu Bata Merah (Kualitas A)', qty: '15.000 Pcs', price: 900, total: 13500000 },
        { cat: 'Material', name: 'Semen Portland (50kg)', qty: '300 Sak', price: 65000, total: 19500000 },
        { cat: 'Material', name: 'Pasir Cor / Beton', qty: '15 Rit', price: 1200000, total: 18000000 },
        { cat: 'Material', name: 'Besi Beton (10mm & 12mm)', qty: '200 Batang', price: 110000, total: 22000000 },
        { cat: 'Jasa', name: 'Pekerja Borongan (Tukang & Kuli)', qty: '120 HOK', price: 150000, total: 18000000 },
      ]);
      setAiEstimation({ time: '4 - 5 Bulan', suggestion: 'Kondisi lahan datar. Gunakan pondasi cakar ayam standar.' });
      setIsAnalyzing(false);
    }, 1500);
  };

  const subtotalMaterial = items.filter(i => i.cat === 'Material').reduce((acc, curr) => acc + curr.total, 0);
  const subtotalJasa = items.filter(i => i.cat === 'Jasa').reduce((acc, curr) => acc + curr.total, 0);
  const totalRAB = subtotalMaterial + subtotalJasa;
  const formatRp = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  const today = new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-5xl mx-auto mt-6">
      {/* Wizard Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Pengajuan Proposal Wakaf</h1>
          <p className="text-gray-500 mt-1">Selesaikan 4 langkah untuk mengajukan proposal pembangunan secara lengkap.</p>
        </div>
        <div className="flex gap-2">
          {[1,2,3,4].map(step => (
            <div key={step} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${currentStep === step ? 'bg-primary text-white shadow-lg' : currentStep > step ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
              {currentStep > step ? '✓' : step}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm min-h-[60vh]">
        
        {/* ================= STEP 1: INFO PROYEK ================= */}
        {currentStep === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-xl font-bold mb-6 border-b pb-4">1. Informasi Awal Proyek</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Nama Proyek</label>
                  <input type="text" value={namaProyek} onChange={e => setNamaProyek(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="Cth: Masjid An-Nur" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Estimasi Dana (Opsional)</label>
                  <input type="number" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="Rp" />
                </div>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Provinsi</label>
                  <select value={prov} onChange={(e) => { setProv(e.target.value); setKota(""); setKec(""); }} className="w-full p-3 border rounded-lg outline-none">
                    <option value="">Pilih...</option>
                    {provList.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Kota/Kabupaten</label>
                  <select value={kota} onChange={(e) => setKota(e.target.value)} disabled={!prov} className="w-full p-3 border rounded-lg outline-none disabled:opacity-50">
                    <option value="">Pilih...</option>
                    {kotaList.map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Kecamatan</label>
                  <select value={kec} onChange={(e) => setKec(e.target.value)} disabled={!kota} className="w-full p-3 border rounded-lg outline-none disabled:opacity-50">
                    <option value="">Pilih...</option>
                    {kecList.map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold mb-2">Detail Jalan / Patokan & Link GMaps</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <textarea value={jalan} onChange={e => setJalan(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg outline-none min-h-[80px]" placeholder="Contoh: Jl. Sudirman No. 12, RT 01/RW 02. Patokan: Samping balai desa..." />
                  <input type="url" value={gmapsLink} onChange={e => setGmapsLink(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg outline-none h-fit" placeholder="https://goo.gl/maps/... (Opsional tapi disarankan)" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div>
                  <label className="block text-sm font-semibold mb-2">Nama PIC (Penanggung Jawab)</label>
                  <input type="text" value={picName} onChange={e => setPicName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="Nama Lengkap" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">No. Telepon / WhatsApp PIC</label>
                  <input type="tel" value={picPhone} onChange={e => setPicPhone(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg outline-none" placeholder="0812xxxxxx" />
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ================= STEP 2: DESAIN ================= */}
        {currentStep === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-xl font-bold mb-6 border-b pb-4">2. Arsitektur &amp; Desain</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Panjang Tanah (m)</label>
                <input type="number" value={panjang} onChange={e => {setPanjang(Number(e.target.value)); setGenerated(false)}} className="w-full p-3 border border-gray-300 rounded-lg outline-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Lebar Tanah (m)</label>
                <input type="number" value={lebar} onChange={e => {setLebar(Number(e.target.value)); setGenerated(false)}} className="w-full p-3 border border-gray-300 rounded-lg outline-none" />
              </div>
            </div>
            
            <label className="block text-sm font-semibold mb-2">Kategori Bangunan</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {(Object.entries(BUILDING_SPECS) as [BuildingType, BuildingSpec][]).map(([key, val]) => (
                <button key={key} onClick={() => { setBuildingType(key); setGenerated(false); }} className={`p-4 rounded-xl border-2 text-left ${buildingType === key ? "border-primary bg-emerald-50" : "border-gray-200"}`}>
                  <span className="text-2xl block mb-1">{val.emoji}</span>
                  <span className="text-xs font-bold">{val.label}</span>
                </button>
              ))}
            </div>

            <button onClick={handleGenerate} disabled={!panjang || !lebar || isGenerating} className="w-full bg-primary text-white font-bold py-3 px-8 rounded-xl disabled:opacity-50 flex items-center justify-center gap-2">
              {isGenerating ? "Memproses..." : "✨ Generate Desain AI"}
            </button>

            {generated && (
              <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold mb-3">📐 Denah Lantai</h3>
                    <FloorPlanSVG type={buildingType} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-3">📋 Spesifikasi ({totalArea} m²)</h3>
                    <div className="bg-white border rounded-lg divide-y text-sm">
                      <div className="p-3 flex justify-between"><span>Gaya</span><span className="font-bold">{spec.style}</span></div>
                      <div className="p-3 flex justify-between"><span>Lantai</span><span className="font-bold">1 Lantai</span></div>
                      <div className="p-3 flex justify-between"><span>Ruangan</span><span className="font-bold">{spec.rooms.length} zona</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ================= STEP 3: RAB & FOTO ================= */}
        {currentStep === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-xl font-bold mb-6 border-b pb-4">3. Rencana Anggaran Biaya (RAB)</h2>
            
            <div 
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer border-gray-300 hover:border-primary hover:bg-emerald-50 mb-6"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-3xl mb-2">📸</div>
              <h3 className="font-bold text-gray-700">Tarik dan lepas foto lahan di sini</h3>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={e => {
                if (e.target.files?.length) {
                  const file = e.target.files[0];
                  setPhotos([...photos, {
                    name: file.name, 
                    size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
                    url: URL.createObjectURL(file)
                  }]);
                }
              }} />
            </div>

            {/* Display Photos */}
            {photos.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-gray-700 mb-3 text-sm">📸 Foto Lahan Terunggah:</h3>
                <div className="flex flex-wrap gap-2">
                  {photos.map((p, i) => (
                    <div key={i} className="bg-white border border-gray-200 p-2 rounded-xl flex items-center gap-3 shadow-sm min-w-[200px]">
                      <img src={p.url} alt={p.name} className="w-14 h-14 object-cover rounded-lg border border-gray-100" />
                      <div className="text-sm">
                        <p className="font-bold text-gray-800 truncate max-w-[120px]">{p.name}</p>
                        <p className="text-gray-500 text-xs">{p.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {photos.length > 0 && !aiEstimation && (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl text-center mb-6">
                <p className="mb-4">Gunakan AI untuk memindai foto dan mengestimasi RAB otomatis.</p>
                <button onClick={handleAIAnalysis} disabled={isAnalyzing} className="bg-emerald-600 text-white font-bold py-2 px-6 rounded-lg">
                  {isAnalyzing ? "Menganalisis..." : "✨ Ekstrak RAB Otomatis"}
                </button>
              </div>
            )}

            {items.length > 0 && (
              <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 border-b">
                    <tr><th className="p-3">Kategori</th><th className="p-3">Item</th><th className="p-3">Qty</th><th className="p-3 text-right">Total</th></tr>
                  </thead>
                  <tbody>
                    {items.map((r, i) => (
                      <tr key={i} className="border-b"><td className="p-3">{r.cat}</td><td className="p-3">{r.name}</td><td className="p-3">{r.qty}</td><td className="p-3 text-right font-bold">{formatRp(r.total)}</td></tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50">
                      <td colSpan={3} className="p-3 text-right font-bold text-gray-600">TOTAL ESTIMASI RAB:</td>
                      <td className="p-3 text-right font-bold text-primary text-lg">{formatRp(totalRAB)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {/* ================= STEP 4: PREVIEW ================= */}
        {currentStep === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="bg-emerald-50 rounded-xl p-8 text-center mb-8 border border-emerald-200">
              <h2 className="text-2xl font-black text-emerald-900 mb-2">Pratinjau Proposal Dokumen</h2>
              <p className="text-emerald-700">Pastikan seluruh data sudah benar sebelum dikirim untuk kurasi.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-3">Informasi Proyek</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-2"><span>Nama</span><span className="font-bold">{namaProyek || "Masjid An-Nur"}</span></div>
                  <div className="flex justify-between border-b pb-2"><span>Lokasi</span><span className="font-bold">{prov || "Jawa Barat"}, {kota}</span></div>
                  <div className="flex justify-between border-b pb-2"><span>Arsitektur</span><span className="font-bold">{panjang}x{lebar}m ({BUILDING_SPECS[buildingType]?.label})</span></div>
                  <div className="flex justify-between border-b pb-2"><span>PIC</span><span className="font-bold">{picName || "Budi"} ({picPhone || "0812..."})</span></div>
                  {gmapsLink && <div className="flex justify-between border-b pb-2"><span>GMaps</span><a href={gmapsLink} target="_blank" className="font-bold text-blue-600 underline truncate max-w-[150px]">{gmapsLink}</a></div>}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-3">Ringkasan Biaya</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-2"><span>Subtotal Material</span><span className="font-bold">{formatRp(subtotalMaterial)}</span></div>
                  <div className="flex justify-between border-b pb-2"><span>Subtotal Jasa</span><span className="font-bold">{formatRp(subtotalJasa)}</span></div>
                  <div className="flex justify-between pt-2"><span>Total RAB</span><span className="font-bold text-primary text-lg">{formatRp(totalRAB)}</span></div>
                </div>
              </div>
            </div>
            
            {/* Foto & Desain Review */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 border-t border-gray-100 pt-8">
              <div>
                <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-3">Foto Lahan ({photos.length})</h3>
                {photos.length > 0 ? (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {photos.map((p, i) => (
                      <img key={i} src={p.url} alt={p.name} className="w-24 h-24 object-cover rounded-lg border border-gray-200 flex-shrink-0" />
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">Belum ada foto lahan terunggah.</p>
                )}
              </div>
              
              <div>
                <h3 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-3">Desain Arsitektur</h3>
                {generated ? (
                  <div className="w-full max-w-[250px] border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                    <FloorPlanSVG type={buildingType} />
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">Desain belum di-generate.</p>
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 flex flex-col items-center justify-center">
              <button onClick={() => { 
                const newProposal = {
                  id: "PRJ-" + Math.floor(100 + Math.random() * 900),
                  name: namaProyek || "Masjid An-Nur",
                  cat: BUILDING_SPECS[buildingType]?.label || "Masjid",
                  dana: formatRp(totalRAB),
                  status: "Menunggu Kurasi",
                  region: prov || "Jawa Barat",
                  pic: picName || "Budi"
                };
                localStorage.setItem("simulated_proposal", JSON.stringify(newProposal));
                alert("Proposal Lengkap Berhasil Diajukan!"); 
                router.push("/pengelola"); 
              }} className="bg-primary text-white font-bold py-4 px-12 rounded-xl shadow-lg hover:bg-primary-dark transition-all text-lg">
                ✅ Konfirmasi & Kirim Proposal
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button onClick={prevStep} disabled={currentStep === 1} className="px-6 py-3 border border-gray-300 rounded-xl font-bold text-gray-600 disabled:opacity-30">
          &larr; Kembali
        </button>
        {currentStep < 4 ? (
          <button onClick={nextStep} className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold shadow-md hover:bg-black transition-colors">
            Langkah Selanjutnya &rarr;
          </button>
        ) : <div/>}
      </div>
    </div>
  );
}
