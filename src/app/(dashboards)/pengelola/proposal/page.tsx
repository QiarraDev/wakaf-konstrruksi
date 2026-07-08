"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const LOCATION_DATA = {
  "Jawa Barat": {
    "Bandung": {
      "Cicendo": ["Arjuna", "Husen Sastranegara", "Pamoyanan"],
      "Coblong": ["Cipaganti", "Dago", "Lebak Siliwangi"],
    },
    "Bogor": {
      "Bogor Tengah": ["Babakan", "Cibogor", "Paledang"],
      "Bogor Utara": ["Bantarjati", "Cibuluh", "Ciluar"],
    }
  },
  "Jawa Tengah": {
    "Semarang": {
      "Semarang Tengah": ["Bangunharjo", "Gabahan", "Kranggan"],
      "Tembalang": ["Mangunharjo", "Sendangguwo", "Tembalang"],
    }
  },
  "Jawa Timur": {
    "Surabaya": {
      "Gubeng": ["Airlangga", "Baratajaya", "Gubeng"],
      "Wonokromo": ["Darmo", "Jagir", "Wonokromo"],
    }
  }
};

export default function ProposalPage() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Location States
  const [prov, setProv] = useState("");
  const [kota, setKota] = useState("");
  const [kec, setKec] = useState("");
  
  const provList = Object.keys(LOCATION_DATA);
  const kotaList = prov && LOCATION_DATA[prov as keyof typeof LOCATION_DATA] ? Object.keys(LOCATION_DATA[prov as keyof typeof LOCATION_DATA]) : [];
  const kecList = prov && kota && LOCATION_DATA[prov as keyof typeof LOCATION_DATA][kota as keyof (typeof LOCATION_DATA)[keyof typeof LOCATION_DATA]] ? Object.keys(LOCATION_DATA[prov as keyof typeof LOCATION_DATA][kota as keyof (typeof LOCATION_DATA)[keyof typeof LOCATION_DATA]]) : [];
  const desaList = prov && kota && kec && LOCATION_DATA[prov as keyof typeof LOCATION_DATA][kota as keyof (typeof LOCATION_DATA)[keyof typeof LOCATION_DATA]][kec as keyof (typeof LOCATION_DATA)[keyof typeof LOCATION_DATA][keyof (typeof LOCATION_DATA)[keyof typeof LOCATION_DATA]]] ? LOCATION_DATA[prov as keyof typeof LOCATION_DATA][kota as keyof (typeof LOCATION_DATA)[keyof typeof LOCATION_DATA]][kec as keyof (typeof LOCATION_DATA)[keyof typeof LOCATION_DATA][keyof (typeof LOCATION_DATA)[keyof typeof LOCATION_DATA]]] : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-5xl border-4 border-emerald-200 dark:border-emerald-800 shadow-lg"
        >
          ✅
        </motion.div>
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">Proposal Terkirim!</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Proposal pengajuan pembangunan Anda telah masuk ke sistem dan sedang menunggu kurasi oleh Admin.</p>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 w-full max-w-sm text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Status</span>
            <span className="font-bold text-amber-600 dark:text-amber-400">Menunggu Kurasi ⏳</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Langkah Selanjutnya</span>
            <span className="font-bold text-gray-900 dark:text-white text-right">Verifikasi Lapangan<br/>(Oleh Validator)</span>
          </div>
        </div>
        <button onClick={() => router.push("/pengelola")} className="btn-primary px-8 py-3">
          Kembali ke Dashboard
        </button>
      </div>
    );
  }

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
              <select 
                value={prov} 
                onChange={(e) => { setProv(e.target.value); setKota(""); setKec(""); }}
                className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white"
              >
                <option value="">Pilih Provinsi...</option>
                {provList.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kota / Kabupaten</label>
              <select 
                value={kota} 
                onChange={(e) => { setKota(e.target.value); setKec(""); }}
                disabled={!prov}
                className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white disabled:opacity-50"
              >
                <option value="">Pilih Kota/Kab...</option>
                {kotaList.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Kecamatan</label>
              <select 
                value={kec}
                onChange={(e) => setKec(e.target.value)}
                disabled={!kota}
                className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white disabled:opacity-50"
              >
                <option value="">Pilih Kecamatan...</option>
                {kecList.map(k => <option key={k} value={k}>{k}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Desa / Kelurahan</label>
              <select 
                disabled={!kec}
                className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none text-gray-900 dark:text-white disabled:opacity-50"
              >
                <option value="">Pilih Desa/Kelurahan...</option>
                {desaList.map(d => <option key={d as string} value={d as string}>{d as string}</option>)}
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
