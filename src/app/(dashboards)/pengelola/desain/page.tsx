"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type BuildingType = "masjid" | "pesantren" | "madrasah" | "sosial";

type BuildingSpec = {
  label: string;
  emoji: string;
  rooms: { name: string; pct: number; color: string }[];
  features: string[];
  style: string;
};

const BUILDING_SPECS: Record<BuildingType, BuildingSpec> = {
  masjid: {
    label: "Masjid / Mushola",
    emoji: "🕌",
    style: "Arsitektur Islam Modern",
    rooms: [
      { name: "Ruang Sholat Utama", pct: 55, color: "#d1fae5" },
      { name: "Selasar & Teras", pct: 15, color: "#a7f3d0" },
      { name: "Tempat Wudhu", pct: 12, color: "#6ee7b7" },
      { name: "Mihrab & Mimbar", pct: 8, color: "#34d399" },
      { name: "Ruang Imam", pct: 10, color: "#10b981" },
    ],
    features: [
      "Ruang sholat utama berkapasitas jamaah",
      "Area wudhu pria & wanita terpisah",
      "Mihrab & mimbar terintegrasi",
      "Selasar & teras keliling",
      "Ventilasi alami & pencahayaan optimal",
    ],
  },
  pesantren: {
    label: "Pondok Pesantren",
    emoji: "🏫",
    style: "Pendidikan Islam Terpadu",
    rooms: [
      { name: "Asrama Santri", pct: 40, color: "#dbeafe" },
      { name: "Kelas & Aula", pct: 25, color: "#bfdbfe" },
      { name: "Masjid Pesantren", pct: 15, color: "#93c5fd" },
      { name: "Dapur & Kantin", pct: 10, color: "#60a5fa" },
      { name: "Kantor & Fasilitas", pct: 10, color: "#3b82f6" },
    ],
    features: [
      "Asrama pria & wanita terpisah",
      "Ruang kelas berkapasitas 30 orang",
      "Aula serbaguna",
      "Masjid pesantren",
      "Dapur & fasilitas bersama",
    ],
  },
  madrasah: {
    label: "Madrasah / Sekolah",
    emoji: "📚",
    style: "Pendidikan Modern Islami",
    rooms: [
      { name: "Ruang Kelas", pct: 50, color: "#fef3c7" },
      { name: "Perpustakaan", pct: 15, color: "#fde68a" },
      { name: "Lab & Komputer", pct: 15, color: "#fcd34d" },
      { name: "Kantor & Guru", pct: 10, color: "#f59e0b" },
      { name: "Koridor & Fasilitas", pct: 10, color: "#d97706" },
    ],
    features: [
      "Ruang kelas berventilasi baik",
      "Perpustakaan & ruang baca",
      "Laboratorium komputer",
      "Ruang guru & kepala sekolah",
      "Toilet & fasilitas sanitasi lengkap",
    ],
  },
  sosial: {
    label: "Fasilitas Sosial",
    emoji: "🏥",
    style: "Fasilitas Komunitas",
    rooms: [
      { name: "Aula Serbaguna", pct: 45, color: "#ede9fe" },
      { name: "Klinik / Posyandu", pct: 20, color: "#ddd6fe" },
      { name: "Ruang Pertemuan", pct: 15, color: "#c4b5fd" },
      { name: "Gudang & Logistik", pct: 10, color: "#a78bfa" },
      { name: "Toilet & Fasilitas", pct: 10, color: "#8b5cf6" },
    ],
    features: [
      "Aula serbaguna kapasitas besar",
      "Ruang klinik & kesehatan dasar",
      "Ruang pertemuan & rapat",
      "Gudang penyimpanan logistik",
      "Akses ramah difabel",
    ],
  },
};

function FloorPlanSVG({ type }: { type: BuildingType }) {
  const imageUrls: Record<BuildingType, string> = {
    masjid: "/blueprints/blueprint_masjid_1783407761994.png",
    pesantren: "/blueprints/blueprint_pesantren_1783407974450.png",
    madrasah: "/blueprints/blueprint_madrasah_1783407986915.png",
    sosial: "/blueprints/blueprint_sosial_1783407997737.png",
  };

  return (
    <div className="w-full rounded-xl border border-gray-200 shadow-sm overflow-hidden bg-white aspect-[4/3] relative flex items-center justify-center p-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrls[type]}
        alt={`Denah ${type}`}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
}

export default function DesainPage() {
  const router = useRouter();

  const [panjang, setPanjang] = useState<number | "">("");
  const [lebar, setLebar] = useState<number | "">("");
  const [buildingType, setBuildingType] = useState<BuildingType>("masjid");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const totalArea = panjang !== "" && lebar !== "" ? Number(panjang) * Number(lebar) : 0;
  const canGenerate = panjang !== "" && lebar !== "" && Number(panjang) > 0 && Number(lebar) > 0;

  const spec = BUILDING_SPECS[buildingType];

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
    }, 2200);
  };

  const today = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Arsitektur &amp; Desain Bangunan</h1>
        <p className="text-gray-500 mt-2">
          Masukkan ukuran tanah dan kategori bangunan — sistem akan membuat denah dan spesifikasi desain secara otomatis.
        </p>
      </div>

      {/* ─── STEP 1: Input Ukuran Tanah ─── */}
      <div className="mb-10 p-6 bg-gray-50 rounded-2xl border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Data Lahan &amp; Kategori Bangunan</h2>
            <p className="text-gray-500 text-sm">Masukkan panjang, lebar tanah (meter), dan jenis bangunan yang akan dibangun.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Panjang */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Panjang Tanah (m)</label>
            <div className="relative">
              <input
                type="number"
                min={1}
                value={panjang}
                onChange={(e) => { setPanjang(e.target.value === "" ? "" : Number(e.target.value)); setGenerated(false); }}
                placeholder="Cth: 20"
                className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-900 font-medium"
              />
              <span className="absolute right-4 top-3.5 text-gray-400 text-sm font-medium">m</span>
            </div>
          </div>

          {/* Lebar */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Lebar Tanah (m)</label>
            <div className="relative">
              <input
                type="number"
                min={1}
                value={lebar}
                onChange={(e) => { setLebar(e.target.value === "" ? "" : Number(e.target.value)); setGenerated(false); }}
                placeholder="Cth: 15"
                className="w-full p-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-900 font-medium"
              />
              <span className="absolute right-4 top-3.5 text-gray-400 text-sm font-medium">m</span>
            </div>
          </div>

          {/* Total */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Total Luas</label>
            <div className="w-full p-3 border border-gray-200 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-lg flex items-center gap-2">
              <span>📐</span>
              <span>{totalArea > 0 ? `${totalArea.toLocaleString("id-ID")} m²` : "— m²"}</span>
            </div>
          </div>
        </div>

        {/* Building Type */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Kategori Bangunan</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(Object.entries(BUILDING_SPECS) as [BuildingType, BuildingSpec][]).map(([key, val]) => (
              <button
                key={key}
                type="button"
                onClick={() => { setBuildingType(key); setGenerated(false); }}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  buildingType === key
                    ? "border-primary bg-emerald-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-primary/50"
                }`}
              >
                <span className="text-2xl block mb-1">{val.emoji}</span>
                <span className={`text-xs font-semibold leading-tight ${buildingType === key ? "text-primary" : "text-gray-700"}`}>
                  {val.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-6">
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isGenerating}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sistem sedang membuat desain...
              </>
            ) : generated ? (
              <>✏️ Buat Ulang Desain</>
            ) : (
              <>✨ Generate Desain Otomatis</>
            )}
          </button>
        </div>
      </div>

      {/* ─── STEP 2: Hasil Generate ─── */}
      {generated && (
        <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-200 animate-fadeIn">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Hasil Desain Otomatis</h2>
              <p className="text-gray-500 text-sm">Denah dan spesifikasi bangunan yang dihasilkan sistem berdasarkan data lahan Anda.</p>
            </div>
          </div>

          {/* Success banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 mb-6">
            <span className="text-xl mt-0.5">✅</span>
            <div>
              <p className="font-bold text-emerald-900">Desain berhasil digenerate!</p>
              <p className="text-emerald-700 text-sm mt-0.5">
                Denah {spec.label} untuk lahan {panjang} × {lebar} m ({totalArea.toLocaleString("id-ID")} m²) telah dibuat dengan gaya <b>{spec.style}</b>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Floor Plan SVG */}
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">📐 Denah Lantai</h3>
              <FloorPlanSVG type={buildingType} />

              {/* Legend */}
              <div className="mt-3 grid grid-cols-1 gap-1.5">
                {spec.rooms.map((room, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: room.color, border: "1px solid #9ca3af" }} />
                    <span className="text-xs text-gray-600">{room.name}</span>
                    <span className="text-xs text-gray-400 ml-auto">{Math.round((room.pct / 100) * totalArea)} m²</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">📋 Spesifikasi Teknis</h3>
                <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                  {[
                    { label: "Jenis Bangunan", value: `${spec.emoji} ${spec.label}` },
                    { label: "Gaya Arsitektur", value: spec.style },
                    { label: "Luas Tanah", value: `${totalArea.toLocaleString("id-ID")} m²` },
                    { label: "Luas Bangunan (80%)", value: `${Math.round(totalArea * 0.8).toLocaleString("id-ID")} m²` },
                    { label: "Jumlah Ruangan", value: `${spec.rooms.length} zona` },
                    { label: "Perkiraan Lantai", value: totalArea >= 300 ? "2 Lantai" : "1 Lantai" },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between px-4 py-3 text-sm">
                      <span className="text-gray-500">{item.label}</span>
                      <span className="font-semibold text-gray-900">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">✅ Fasilitas Termasuk</h3>
                <ul className="space-y-2">
                  {spec.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Submit ─── */}
      <div className="mt-8 flex justify-end pt-8 border-t border-gray-100">
        <button
          onClick={() => setShowPreview(true)}
          disabled={!generated}
          className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-primary-dark transition-all hover:-translate-y-1 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span>👁️</span> Preview &amp; Kirim Desain &rarr;
        </button>
      </div>

      {/* ─── Preview Modal ─── */}
      {showPreview && generated && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-xs font-semibold uppercase tracking-widest mb-1">Pratinjau Dokumen Desain</p>
                  <h2 className="text-2xl font-bold">Arsitektur &amp; Desain Bangunan</h2>
                  <p className="text-emerald-100 text-sm mt-1">Dibuat pada: {today}</p>
                </div>
                <button onClick={() => setShowPreview(false)} className="text-white/60 hover:text-white text-2xl transition-colors">&times;</button>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* Summary grid */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Jenis Bangunan", value: `${spec.emoji} ${spec.label}` },
                  { label: "Luas Tanah", value: `${totalArea.toLocaleString("id-ID")} m²` },
                  { label: "Ukuran", value: `${panjang} × ${lebar} m` },
                ].map((item, i) => (
                  <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">{item.label}</span>
                    <span className="text-base font-bold text-gray-900 mt-1 block">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Floor plan */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">📐 Denah Lantai</h3>
                <FloorPlanSVG type={buildingType} />
              </div>

              {/* Specs table */}
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">📋 Pembagian Ruang</h3>
                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3 font-semibold text-gray-600">Zona / Ruangan</th>
                        <th className="p-3 font-semibold text-gray-600 text-right">Proporsi</th>
                        <th className="p-3 font-semibold text-gray-600 text-right">Luas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {spec.rooms.map((room, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                          <td className="p-3 font-medium text-gray-900 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-sm inline-block flex-shrink-0" style={{ background: room.color, border: "1px solid #9ca3af" }} />
                            {room.name}
                          </td>
                          <td className="p-3 text-gray-500 text-right">{room.pct}%</td>
                          <td className="p-3 font-bold text-gray-900 text-right">{Math.round((room.pct / 100) * totalArea)} m²</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  &larr; Kembali &amp; Edit
                </button>
                <button
                  onClick={() => {
                    setShowPreview(false);
                    alert("Dokumen desain berhasil diajukan untuk ditinjau oleh Admin!");
                    router.push("/pengelola");
                  }}
                  className="flex-1 py-3 bg-primary text-white rounded-xl font-bold shadow-md hover:bg-primary-dark transition-all"
                >
                  ✅ Konfirmasi &amp; Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
