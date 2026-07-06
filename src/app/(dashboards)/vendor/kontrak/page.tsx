"use client";
import { useRouter } from "next/navigation";
export default function KontrakPage() {
  const router = useRouter();
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Kontrak Legal Proyek</h1>
      <div className="border border-gray-200 rounded-xl p-8 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold uppercase underline">Surat Perjanjian Pemborongan Pekerjaan</h2>
          <p className="text-gray-500 mt-2">No. 014/SPK/WKF/VII/2026</p>
        </div>
        <div className="space-y-4 text-sm text-gray-700 leading-relaxed font-serif">
          <p>Pada hari ini, Senin tanggal enam bulan Juli tahun dua ribu dua puluh enam, kami yang bertanda tangan di bawah ini sepakat untuk mengikatkan diri dalam kontrak pelaksanaan pembangunan fasilitas wakaf.</p>
          <div className="bg-gray-50 p-4 rounded border border-gray-100">
            <p><strong>Pihak Pertama (Platform):</strong> Admin Wakaf Konstruksi</p>
            <p><strong>Pihak Kedua (Vendor):</strong> PT. Maju Jaya Konstruksi</p>
          </div>
          <p>Dengan total nilai proyek sebesar Rp 1.200.000.000 yang akan dicairkan berdasarkan termin pencapaian (milestone) per 20% pengerjaan.</p>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 flex justify-end">
          <button onClick={() => { alert("Tanda tangan e-Meterai berhasil diaplikasikan!"); router.push("/vendor"); }} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/30">
            ✍️ Tanda Tangani Digital (e-Meterai)
          </button>
        </div>
      </div>
    </div>
  );
}