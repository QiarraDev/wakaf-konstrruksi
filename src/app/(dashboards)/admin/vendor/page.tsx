"use client";
import { useState } from "react";

export default function VendorPage() {
  const [viewDoc, setViewDoc] = useState<{name: string, vendorName: string} | null>(null);

  return (
    <div className="bg-transparent mt-6">
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Validasi Mitra Vendor</h1>
        <p className="text-gray-500 mb-6">Tinjau legalitas dan dokumen Nomor Induk Berusaha (NIB) calon vendor proyek wakaf.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "PT. Maju Jaya Konstruksi", type: "Vendor Resmi", region: "Jawa Barat", status: "Verified" },
            { name: "CV. Bangun Bersama", type: "Swakelola / Lokal", region: "Jawa Tengah", status: "Pending Review" },
          ].map((vendor, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition-shadow bg-gray-50/50">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{vendor.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Tipe: {vendor.type} • Area: {vendor.region}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${vendor.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                  {vendor.status}
                </span>
              </div>
              <div className="mt-6 flex gap-3 pt-4 border-t border-gray-200">
                <button onClick={() => setViewDoc({name: 'Profil_Perusahaan_NIB.pdf', vendorName: vendor.name})} className="text-sm font-bold text-primary hover:underline flex items-center gap-2">
                  <span>📄</span> Lihat Dokumen Legalitas
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Viewer Modal */}
      {viewDoc && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md" onClick={() => setViewDoc(null)}>
          <div className="bg-gray-100 rounded-xl max-w-4xl w-full h-full sm:h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-gray-600 transform transition-all" onClick={e => e.stopPropagation()}>
            <div className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-3">
                <span className="bg-gray-800 p-1.5 rounded">📄</span>
                <span className="font-medium text-sm tracking-wide">{viewDoc.name} - {viewDoc.vendorName}</span>
              </div>
              <div className="flex gap-3 sm:gap-4 items-center">
                <button className="text-gray-400 hover:text-white transition-colors text-xs font-bold bg-gray-800 px-3 py-1.5 rounded hidden sm:block">⬇️ Unduh</button>
                <button className="text-gray-400 hover:text-white transition-colors text-xs font-bold bg-gray-800 px-3 py-1.5 rounded hidden sm:block">🖨️ Cetak</button>
                <div className="w-px h-5 bg-gray-700 mx-1 hidden sm:block"></div>
                <button onClick={() => setViewDoc(null)} className="text-gray-400 hover:text-white text-2xl leading-none w-8 h-8 flex items-center justify-center rounded hover:bg-red-500 hover:text-white transition-colors">&times;</button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center relative document-container">
              <div className="bg-white w-full max-w-2xl min-h-[800px] shadow-xl p-8 sm:p-12 font-serif text-gray-800 relative">
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                  <span className="text-7xl font-bold transform -rotate-45 text-center leading-tight">LEMBAGA<br/>OSS RI</span>
                </div>
                
                <div className="border-b-4 border-gray-900 pb-4 mb-8 text-center">
                  <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">Pemerintah Republik Indonesia</h1>
                  <h2 className="text-lg font-bold uppercase mt-1">Lembaga Pengelola dan Penyelenggara OSS</h2>
                </div>
                
                <h2 className="text-lg sm:text-xl font-bold text-center underline mb-8">NOMOR INDUK BERUSAHA (NIB)</h2>
                
                <div className="space-y-4 leading-relaxed text-sm sm:text-base">
                  <p className="text-justify">Berdasarkan ketentuan Undang-Undang Nomor 11 Tahun 2020 tentang Cipta Kerja, Pemerintah Republik Indonesia menerbitkan Nomor Induk Berusaha (NIB) kepada pelaku usaha berikut ini:</p>
                  
                  <table className="w-full mb-4 ml-4 mt-6">
                    <tbody>
                      <tr><td className="w-1/3 py-2 font-semibold align-top">Nama Perusahaan</td><td className="align-top">: <strong className="text-lg uppercase">{viewDoc.vendorName}</strong></td></tr>
                      <tr><td className="w-1/3 py-2 font-semibold align-top">Nomor Induk Berusaha</td><td className="align-top">: <strong>8120004561234</strong></td></tr>
                      <tr><td className="w-1/3 py-2 font-semibold align-top">Status Penanaman Modal</td><td className="align-top">: PMDN (Penanaman Modal Dalam Negeri)</td></tr>
                      <tr><td className="w-1/3 py-2 font-semibold align-top">Alamat Perusahaan</td><td className="align-top">: Gedung Sentra Bisnis Lt. 4, Jakarta Pusat</td></tr>
                      <tr><td className="w-1/3 py-2 font-semibold align-top">KBLI / Bidang Usaha</td><td className="align-top">: 41011 (Konstruksi Gedung Hunian)<br/>  41019 (Konstruksi Gedung Lainnya)</td></tr>
                    </tbody>
                  </table>

                  <p className="text-justify mt-8">NIB ini berlaku sebagai Tanda Daftar Perusahaan (TDP), Angka Pengenal Importir (API), dan Hak Akses Kepabeanan. Perusahaan tersebut dinyatakan sah untuk melakukan kegiatan usaha dan menerima tender pekerjaan konstruksi sesuai dengan bidang usaha yang tertera.</p>
                  
                  <div className="mt-16 flex justify-between px-4">
                    <div className="text-center w-1/2">
                      <br/><br/><br/>
                      <p className="text-[10px] text-gray-500 italic text-left">Dokumen ini sah dan diterbitkan secara elektronik oleh sistem OSS, tidak memerlukan stempel/tanda tangan basah.</p>
                    </div>
                    <div className="text-center w-1/2 relative flex flex-col items-center">
                      {/* Fake QR Code - Using CSS Grid as a fake QR */}
                      <div className="w-24 h-24 border-2 border-gray-800 mb-3 grid grid-cols-5 grid-rows-5 gap-0.5 p-1">
                         <div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div>
                         <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div>
                         <div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-white"></div>
                         <div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div>
                         <div className="bg-black"></div><div className="bg-black"></div><div className="bg-white"></div><div className="bg-black"></div><div className="bg-black"></div>
                      </div>
                      <p className="text-xs font-bold">Ditandatangani secara elektronik</p>
                      <p className="text-xs mt-1">Menteri Investasi / Kepala BKPM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}