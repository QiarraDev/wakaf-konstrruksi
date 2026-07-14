"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function VendorRegisterPage() {
  const [step, setStep] = useState(1);
  const [vendorData, setVendorData] = useState({
    type: "PT",
    name: "",
    pic: "",
    phone: "",
    region: "",
    address: "",
  });
  const [docs, setDocs] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call and saving to localStorage for Admin / Validator to see
    setTimeout(() => {
      const newVendor = {
        id: `VND-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        ...vendorData,
        status: "Perlu Verifikasi Lapangan", // Langsung minta verifikasi
        docs: docs.map(d => d.name),
        kycScore: Math.floor(Math.random() * 20) + 70, // 70-90 score
      };
      
      const existing = JSON.parse(localStorage.getItem('vendor_registrations') || '[]');
      localStorage.setItem('vendor_registrations', JSON.stringify([newVendor, ...existing]));
      
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
          <div className="text-7xl mb-4">🎉</div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Pendaftaran Berhasil!</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
            Data Anda telah kami terima. Tim Admin dan Validator Lapangan akan segera meninjau dan mengunjungi lokasi usaha Anda untuk verifikasi fisik.
          </p>
          <Link href="/auth" className="btn-primary block w-full py-3 rounded-xl font-bold">
            Kembali ke Halaman Utama
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white text-center">
          <h1 className="text-2xl font-black mb-2">Pendaftaran Mitra Vendor</h1>
          <p className="text-emerald-100 text-sm">Bergabunglah dalam ekosistem Wakaf Konstruksi dan ambil bagian dalam pembangunan umat.</p>
        </div>

        {/* Progress */}
        <div className="px-8 pt-6 pb-2">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10 -translate-y-1/2"></div>
            <div className="absolute left-0 top-1/2 h-1 bg-emerald-500 transition-all duration-300 -z-10 -translate-y-1/2" style={{ width: step === 1 ? '50%' : '100%' }}></div>
            
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>1</div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>2</div>
          </div>
          <div className="flex justify-between mt-2 text-xs font-bold text-gray-500">
            <span>Profil Usaha</span>
            <span>Dokumen Legal</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Bentuk Badan Usaha</label>
                    <select value={vendorData.type} onChange={e => setVendorData({...vendorData, type: e.target.value})} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-900 dark:text-white" required>
                      <option value="PT">PT (Perseroan Terbatas)</option>
                      <option value="CV">CV (Commanditaire Vennootschap)</option>
                      <option value="Swakelola">Swakelola / Kelompok Masyarakat</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Nama Perusahaan / Kelompok</label>
                    <input type="text" value={vendorData.name} onChange={e => setVendorData({...vendorData, name: e.target.value})} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-900 dark:text-white" placeholder="Cth: PT. Maju Konstruksi" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Nama PIC (Penanggung Jawab)</label>
                    <input type="text" value={vendorData.pic} onChange={e => setVendorData({...vendorData, pic: e.target.value})} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-900 dark:text-white" placeholder="Nama lengkap" required />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">No. Handphone (WhatsApp)</label>
                    <input type="tel" value={vendorData.phone} onChange={e => setVendorData({...vendorData, phone: e.target.value})} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-900 dark:text-white" placeholder="08..." required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Wilayah Operasional</label>
                    <select value={vendorData.region} onChange={e => setVendorData({...vendorData, region: e.target.value})} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-900 dark:text-white" required>
                      <option value="">-- Pilih Provinsi --</option>
                      <option value="Jawa Barat">Jawa Barat</option>
                      <option value="Jawa Tengah">Jawa Tengah</option>
                      <option value="Jawa Timur">Jawa Timur</option>
                      <option value="Banten">Banten</option>
                      <option value="DKI Jakarta">DKI Jakarta</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Alamat Lengkap Kantor</label>
                    <textarea value={vendorData.address} onChange={e => setVendorData({...vendorData, address: e.target.value})} rows={2} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-900 dark:text-white" placeholder="Jl. Raya..." required />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-between items-center">
                  <Link href="/auth" className="text-gray-500 font-bold text-sm hover:text-gray-700 dark:hover:text-gray-300">Batal</Link>
                  <button type="button" onClick={handleNext} disabled={!vendorData.name || !vendorData.pic || !vendorData.region} className="btn-primary px-8 py-3 rounded-xl shadow-lg disabled:opacity-50">Selanjutnya ➔</button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-xl flex gap-3 text-sm">
                  <span className="text-xl">ℹ️</span>
                  <p className="text-blue-900 dark:text-blue-300 font-medium">Sebagai {vendorData.type}, Anda diwajibkan mengunggah dokumen legalitas. Dokumen ini akan diverifikasi secara digital (KYC) dan disurvei langsung oleh Validator Lapangan.</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Upload Dokumen Legalitas (NIB, SIUJK, NPWP)</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center bg-gray-50 dark:bg-gray-900 relative">
                    <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => {
                      if (e.target.files) {
                        setDocs(Array.from(e.target.files));
                      }
                    }} />
                    <div className="text-4xl mb-2">📁</div>
                    <p className="font-bold text-gray-700 dark:text-gray-300 mb-1">Pilih File Dokumen</p>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG (Max 5MB)</p>
                  </div>
                  {docs.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {docs.map((d, i) => (
                        <div key={i} className="flex justify-between items-center bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg border border-emerald-200 dark:border-emerald-800">
                          <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300 truncate">📄 {d.name}</span>
                          <button type="button" onClick={() => setDocs(docs.filter((_, idx) => idx !== i))} className="text-red-500 text-lg font-bold">&times;</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <button type="button" onClick={handleBack} className="text-gray-500 font-bold text-sm hover:text-gray-700 dark:hover:text-gray-300">⬅ Kembali</button>
                  <button type="submit" disabled={docs.length === 0 || isSubmitting} className="btn-primary px-8 py-3 rounded-xl shadow-lg shadow-primary/20 flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Memproses...
                      </>
                    ) : (
                      "Kirim Pengajuan ✅"
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
