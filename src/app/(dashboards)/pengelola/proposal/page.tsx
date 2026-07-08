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
    <div className="card p-8 mt-6 max-w-4xl mx-auto">
      <div className="mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Pengajuan Proposal Baru</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Isi detail awal rencana pembangunan fasilitas. Informasi ini akan di-review oleh Tim Kurasi Admin.</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nama Proyek</label>
            <input type="text" className="w-full p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-gray-900 dark:text-white" placeholder="Cth: Pembangunan Masjid An-Nur" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kategori Bangunan</label>
            <select className="w-full p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white">
              <option>Pilih Kategori...</option>
              <option>Masjid / Mushola</option>
              <option>Pondok Pesantren</option>
              <option>Madrasah / Sekolah</option>
              <option>Infrastruktur Desa (Sumur, Jalan)</option>
              <option>Fasilitas Sosial Lainnya</option>
            </select>
          </div>
        </div>

        {/* Lokasi & PIC */}
        <div className="border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6 bg-gray-50/50 dark:bg-gray-800/20 space-y-5">
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">Informasi Lokasi &amp; Kontak</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Penting untuk mempermudah survei tim validator lapangan.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Provinsi</label>
              <select className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white">
                <option>Pilih Provinsi...</option>
                <option>Jawa Barat</option>
                <option>Jawa Tengah</option>
                <option>Jawa Timur</option>
                <option>DKI Jakarta</option>
                <option>Banten</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kota / Kabupaten</label>
              <select className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white">
                <option>Pilih Kota/Kab...</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kecamatan</label>
              <select className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white">
                <option>Pilih Kecamatan...</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Desa / Kelurahan</label>
              <select className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white">
                <option>Pilih Desa/Kelurahan...</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Detail Jalan / Patokan Lokasi</label>
            <textarea className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none min-h-[80px] text-gray-900 dark:text-white" placeholder="Contoh: Jl. Sudirman No. 12, RT 01/RW 02. Patokan: Samping balai desa..." />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2 mt-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nama PIC (Penanggung Jawab)</label>
              <input type="text" className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="Nama Lengkap" />
            </div>
            <div className="space-y-2 mt-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">No. Telepon / WhatsApp PIC</label>
              <input type="tel" className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="0812xxxxxx" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Estimasi Total Kebutuhan Dana (Rupiah)</label>
          <div className="relative">
            <span className="absolute left-4 top-3 text-gray-500 font-medium">Rp</span>
            <input type="number" className="w-full p-3 pl-12 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white" placeholder="0" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Latar Belakang & Urgensi Pembangunan</label>
          <textarea className="w-full p-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none min-h-[150px] text-gray-900 dark:text-white" placeholder="Jelaskan mengapa fasilitas ini penting untuk dibangun..." />
        </div>

        <div className="pt-6 flex items-center justify-end gap-4 border-t border-gray-100 dark:border-gray-800">
          <button type="button" onClick={() => alert("Draft proposal berhasil disimpan!")} className="px-6 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 font-bold transition-colors">
            Simpan Draft
          </button>
          <button type="submit" className="btn-primary">
            Ajukan Proposal &rarr;
          </button>
        </div>
      </form>
    </div>
  );
}
