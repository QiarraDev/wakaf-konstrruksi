"use client";
import { useRouter } from "next/navigation";
export default function PaymentPage() {
  const router = useRouter();
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Pengajuan Pencairan Dana (Termin)</h1>
      <form className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Pilih Proyek</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg outline-none">
            <option>Pembangunan Masjid Jami' (ID: PRJ-001)</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Pilih Termin Milestone</label>
          <select className="w-full p-3 border border-gray-300 rounded-lg outline-none">
            <option disabled>Termin 1 (20%) - Lunas</option>
            <option disabled>Termin 2 (40%) - Lunas</option>
            <option disabled>Termin 3 (60%) - Lunas</option>
            <option>Termin 4 (80%) - Bisa Diajukan</option>
            <option disabled>Termin 5 (100%) - Terkunci</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Unggah Laporan BAST & Dokumentasi Foto (ZIP/PDF)</label>
          <input type="file" className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div className="p-4 bg-yellow-50 text-yellow-800 border border-yellow-200 rounded-xl text-sm">
          <strong>Perhatian:</strong> Pencairan dana membutuhkan waktu maksimal 3x24 jam kerja setelah laporan divalidasi oleh tim independen dan admin platform.
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button type="button" onClick={() => { alert("Pengajuan pencairan termin terkirim! Menunggu review Admin."); router.push("/vendor"); }} className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark">
            Ajukan Pencairan Termin
          </button>
        </div>
      </form>
    </div>
  );
}