"use client";

import { useRouter } from "next/navigation";

export default function ProposalPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Berhasil! Proposal pengajuan pembangunan Anda telah terkirim dan sedang menunggu kurasi oleh Admin.");
    router.push("/pengelola");
  };
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pengajuan Proposal Baru</h1>
        <p className="text-gray-500 mt-2">Isi detail awal rencana pembangunan fasilitas. Informasi ini akan di-review oleh Tim Kurasi Admin.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Nama Proyek</label>
            <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none" placeholder="Cth: Pembangunan Masjid An-Nur" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Kategori Bangunan</label>
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none">
              <option>Pilih Kategori...</option>
              <option>Masjid / Mushola</option>
              <option>Pondok Pesantren</option>
              <option>Madrasah / Sekolah</option>
              <option>Infrastruktur Desa (Sumur, Jalan)</option>
              <option>Fasilitas Sosial Lainnya</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Alamat Lengkap Lokasi</label>
          <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none min-h-[100px]" placeholder="Masukkan alamat detail..." />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Estimasi Total Kebutuhan Dana (Rupiah)</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-500 font-medium">Rp</span>
            <input type="number" className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="0" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Latar Belakang & Urgensi Pembangunan</label>
          <textarea className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none min-h-[150px]" placeholder="Jelaskan mengapa fasilitas ini penting untuk dibangun..." />
        </div>

        <div className="pt-6 flex items-center justify-end gap-4 border-t border-gray-100">
          <button type="button" onClick={() => alert("Draft proposal berhasil disimpan!")} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
            Simpan Draft
          </button>
          <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark font-medium shadow-lg shadow-primary/30 transition-all hover:-translate-y-1">
            Ajukan Proposal &rarr;
          </button>
        </div>
      </form>
    </div>
  );
}
