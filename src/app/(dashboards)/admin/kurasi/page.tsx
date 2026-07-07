"use client";
import { useState } from "react";

export default function KurasiPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  
  // Secondary Modal States
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [techModalOpen, setTechModalOpen] = useState(false);
  
  // Tertiary Modal (Document Viewer)
  const [viewDoc, setViewDoc] = useState<{name: string, type: 'pdf' | 'img'} | null>(null);

  const handleVerifikasi = (project: any) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  return (
    <div className="bg-transparent mt-6">
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Kurasi &amp; Approval Proyek</h1>
        <p className="text-gray-500 mb-6">Lakukan verifikasi administrasi dan lapangan sebelum menyetujui proyek konstruksi.</p>
        
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-gray-600">ID Proyek</th>
                <th className="p-4 font-semibold text-gray-600">Nama Pengajuan</th>
                <th className="p-4 font-semibold text-gray-600">Kategori</th>
                <th className="p-4 font-semibold text-gray-600">Dana Dibutuhkan</th>
                <th className="p-4 font-semibold text-gray-600">Status Dokumen</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Aksi Verifikasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                { id: "PRJ-001", name: "Pembangunan Masjid Jami'", cat: "Masjid", dana: "Rp 1.2M", status: "Lengkap 4/4" },
                { id: "PRJ-002", name: "Renovasi Pesantren Al-Huda", cat: "Pesantren", dana: "Rp 500Jt", status: "Lengkap 4/4" },
                { id: "PRJ-003", name: "Pembangunan Klinik Desa", cat: "Klinik", dana: "Rp 800Jt", status: "Revisi 2/4" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-gray-500 text-sm font-medium">{row.id}</td>
                  <td className="p-4 font-bold text-gray-900">{row.name}</td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold border border-blue-100">{row.cat}</span>
                  </td>
                  <td className="p-4 font-semibold text-gray-700">{row.dana}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${row.status.includes('Revisi') ? 'bg-orange-50 text-orange-700 border-orange-100' : 'bg-emerald-50 text-emerald-700 border-emerald-100'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => handleVerifikasi(row)} 
                      className="bg-white border-2 border-primary text-primary px-4 py-1.5 rounded-lg text-sm hover:bg-primary hover:text-white transition-colors font-bold shadow-sm"
                    >
                      Detail Validasi
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Primary Modal: Verifikasi & Validasi */}
      {modalOpen && selectedProject && (
        <div className="fixed inset-0 z-[40] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl p-0 max-w-2xl w-full shadow-2xl transform transition-all border border-gray-100 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            
            <div className="p-6 border-b border-gray-100 bg-gray-50 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Validasi &amp; Verifikasi Lapangan</h3>
                <p className="text-gray-500 text-sm font-medium mt-1">{selectedProject.name} ({selectedProject.id})</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Verifikasi Legalitas Tanah</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">✓</div>
                      <span className="text-sm text-gray-700 font-medium">Sertifikat Tanah Wakaf (AIW)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">✓</div>
                      <span className="text-sm text-gray-700 font-medium">Surat Izin Lingkungan (RT/RW)</span>
                    </li>
                  </ul>
                  <button onClick={() => setDocModalOpen(true)} className="text-primary text-xs font-bold mt-4 hover:underline flex items-center gap-1">
                    <span>📄</span> Lihat Dokumen Terlampir
                  </button>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                  <h4 className="text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Validasi Perencanaan</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">✓</div>
                      <span className="text-sm text-gray-700 font-medium">Kelayakan RAB oleh Surveyor</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${selectedProject.status.includes('Revisi') ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {selectedProject.status.includes('Revisi') ? '!' : '✓'}
                      </div>
                      <span className="text-sm text-gray-700 font-medium">Blueprint &amp; Analisa Struktur</span>
                    </li>
                  </ul>
                  <button onClick={() => setTechModalOpen(true)} className="text-primary text-xs font-bold mt-4 hover:underline flex items-center gap-1">
                    <span>📐</span> Cek Analisa Teknis
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <h4 className="text-sm font-bold text-gray-900 mb-2">Catatan Verifikator Lapangan:</h4>
                <p className="text-sm text-gray-600 italic">"Lokasi tanah sudah bersih dan siap bangun. Masyarakat sekitar sangat mendukung. Vendor yang diajukan memiliki track record baik dalam 3 proyek sebelumnya. {selectedProject.status.includes('Revisi') ? 'Namun RAB perlu sedikit penyesuaian pada harga material baja.' : 'Semua dokumen telah sesuai standar.'}"</p>
              </div>

              <div className="flex gap-4 pt-2">
                <button 
                  onClick={() => { alert("Catatan revisi telah dikirim ke Pengelola/Vendor."); setModalOpen(false); }} 
                  className="flex-1 bg-white border-2 border-orange-200 text-orange-600 py-3 rounded-xl font-bold hover:bg-orange-50 transition-colors"
                >
                  Minta Revisi
                </button>
                <button 
                  onClick={() => { alert("Proyek disetujui untuk mulai dipublikasikan ke Wakif."); setModalOpen(false); }} 
                  className="flex-1 bg-primary text-white py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all hover:-translate-y-0.5"
                >
                  Setujui Proyek
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}

      {/* Secondary Modal 1: Dokumen Terlampir */}
      {docModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setDocModalOpen(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl transform transition-all border border-gray-100" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-2xl border border-emerald-100">📋</div>
              <button onClick={() => setDocModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Arsip Dokumen Legalitas</h3>
            <p className="text-gray-600 mb-6 text-sm">Dokumen berikut telah diautentikasi oleh sistem OSS dan Kemenag RI.</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Akta Ikrar Wakaf (AIW).pdf</p>
                    <p className="text-xs text-gray-500">2.4 MB • Disahkan: 12 Jan 2026</p>
                  </div>
                </div>
                <button onClick={() => setViewDoc({name: 'Akta Ikrar Wakaf (AIW)', type: 'pdf'})} className="text-primary font-bold text-sm hover:underline">Buka</button>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Surat_Pernyataan_Ahli_Waris.pdf</p>
                    <p className="text-xs text-gray-500">1.1 MB • Disahkan: 15 Jan 2026</p>
                  </div>
                </div>
                <button onClick={() => setViewDoc({name: 'Surat Pernyataan Ahli Waris', type: 'pdf'})} className="text-primary font-bold text-sm hover:underline">Buka</button>
              </div>
              <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🖼️</span>
                  <div>
                    <p className="font-bold text-sm text-gray-900">Foto_Papan_Nama_Tanah.jpg</p>
                    <p className="text-xs text-gray-500">4.5 MB • Diunggah: 18 Jan 2026</p>
                  </div>
                </div>
                <button onClick={() => setViewDoc({name: 'Foto Papan Nama Tanah', type: 'img'})} className="text-primary font-bold text-sm hover:underline">Lihat</button>
              </div>
            </div>

            <button onClick={() => setDocModalOpen(false)} className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-md hover:bg-primary-dark">Tutup Dokumen</button>
          </div>
        </div>
      )}

      {/* Secondary Modal 2: Analisa Teknis */}
      {techModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setTechModalOpen(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl transform transition-all border border-gray-100" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-2xl border border-blue-100">📐</div>
              <button onClick={() => setTechModalOpen(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Analisa Struktur &amp; Standar Keselamatan</h3>
            <p className="text-gray-600 mb-6 text-sm">Hasil simulasi komputasi untuk daya tahan bangunan yang diajukan.</p>
            
            <div className="space-y-4 mb-8">
              <div>
                <div className="flex justify-between text-sm mb-1 font-medium">
                  <span className="text-gray-700">Kekuatan Struktur (Beban Gempa)</span>
                  <span className="text-emerald-600 font-bold">92% (Aman)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1 font-medium">
                  <span className="text-gray-700">Efisiensi Material (RAB vs Pasar)</span>
                  <span className="text-emerald-600 font-bold">85% (Optimal)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{width: '85%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1 font-medium">
                  <span className="text-gray-700">Dampak Lingkungan (Amdal)</span>
                  <span className="text-orange-500 font-bold">78% (Perlu Perhatian)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-400 h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1 italic">*Sistem drainase perlu diperbesar 15% dari desain awal.</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex justify-between items-center mb-6">
              <div>
                <p className="font-bold text-gray-900 text-sm">Laporan Lengkap Auditor.pdf</p>
                <p className="text-xs text-gray-500">Oleh: Ir. Sudirman (Sertifikasi LPJK)</p>
              </div>
              <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-gray-50">Unduh</button>
            </div>

            <button onClick={() => setTechModalOpen(false)} className="w-full bg-primary text-white py-3 rounded-xl font-bold shadow-md hover:bg-primary-dark">Tutup Analisa</button>
          </div>
        </div>
      )}

      {/* Tertiary Modal: Document Viewer */}
      {viewDoc && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md" onClick={() => setViewDoc(null)}>
          <div className="bg-gray-100 rounded-xl max-w-4xl w-full h-full sm:h-[85vh] flex flex-col overflow-hidden shadow-2xl border border-gray-600 transform transition-all" onClick={e => e.stopPropagation()}>
            <div className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center shadow-md z-10">
              <div className="flex items-center gap-3">
                <span className="bg-gray-800 p-1.5 rounded">{viewDoc.type === 'pdf' ? '📄' : '🖼️'}</span>
                <span className="font-medium text-sm tracking-wide">{viewDoc.name}.{viewDoc.type === 'pdf' ? 'pdf' : 'jpg'}</span>
              </div>
              <div className="flex gap-3 sm:gap-4 items-center">
                <button className="text-gray-400 hover:text-white transition-colors text-xs font-bold bg-gray-800 px-3 py-1.5 rounded hidden sm:block">⬇️ Unduh</button>
                <button className="text-gray-400 hover:text-white transition-colors text-xs font-bold bg-gray-800 px-3 py-1.5 rounded hidden sm:block">🖨️ Cetak</button>
                <div className="w-px h-5 bg-gray-700 mx-1 hidden sm:block"></div>
                <button onClick={() => setViewDoc(null)} className="text-gray-400 hover:text-white text-2xl leading-none w-8 h-8 flex items-center justify-center rounded hover:bg-red-500 hover:text-white transition-colors">&times;</button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center relative document-container">
              {viewDoc.type === 'pdf' ? (
                <div className="bg-white w-full max-w-2xl min-h-[800px] shadow-xl p-8 sm:p-12 font-serif text-gray-800 relative">
                  {/* Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                    <span className="text-8xl font-bold transform -rotate-45">WAKAF KONSTRUKSI</span>
                  </div>
                  
                  <div className="border-b-4 border-gray-900 pb-4 mb-8 text-center">
                    <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide">Kementerian Agama Republik Indonesia</h1>
                    <p className="text-sm mt-1 text-gray-600">Kantor Urusan Agama Kecamatan Setempat</p>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-center underline mb-8">{viewDoc.name.toUpperCase()}</h2>
                  <div className="space-y-4 text-justify leading-relaxed text-sm sm:text-base">
                    <p>Yang bertanda tangan di bawah ini:</p>
                    <table className="w-full mb-4 ml-4">
                      <tbody>
                        <tr><td className="w-1/3 py-1 align-top">Nama</td><td className="align-top">: <strong>H. Abdullah bin Umar</strong></td></tr>
                        <tr><td className="w-1/3 py-1 align-top">Nomor Induk Kependudukan</td><td className="align-top">: 3273000000000001</td></tr>
                        <tr><td className="w-1/3 py-1 align-top">Pekerjaan</td><td className="align-top">: Wiraswasta</td></tr>
                        <tr><td className="w-1/3 py-1 align-top">Alamat</td><td className="align-top">: Jl. Merdeka No. 123, Kel. Sukamaju, Bandung</td></tr>
                      </tbody>
                    </table>
                    <p>Dengan ini menyatakan secara sadar dan tanpa paksaan dari pihak manapun untuk mewakafkan sebidang tanah milik saya pribadi yang terletak di:</p>
                    <div className="bg-gray-50 p-5 border border-gray-200 mt-4 rounded">
                      <table className="w-full text-sm">
                        <tbody>
                          <tr><td className="w-1/3 py-1 font-semibold">Alamat Objek Wakaf</td><td>: Jl. Pembangunan, Desa Makmur, Bandung</td></tr>
                          <tr><td className="w-1/3 py-1 font-semibold">Luas Tanah</td><td>: 500 m²</td></tr>
                          <tr><td className="w-1/3 py-1 font-semibold align-top">Batas-batas Tanah</td><td className="align-top">: 
                            <ul className="list-disc pl-4 mt-1 space-y-1">
                              <li>Utara: Jalan Raya Utama</li>
                              <li>Selatan: Tanah Kosong Milik Adat</li>
                              <li>Timur: Pemukiman Warga</li>
                              <li>Barat: Aliran Sungai</li>
                            </ul>
                          </td></tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="mt-6">Tanah tersebut diwakafkan untuk tujuan pembangunan <strong>Fasilitas Ibadah dan Pendidikan Islam</strong> agar dapat dikelola dan dimanfaatkan sebesar-besarnya untuk kemaslahatan umat melalui yayasan/nadzir yang ditunjuk.</p>
                    <p>Demikian surat pernyataan ini dibuat agar dapat dipergunakan sebagaimana mestinya.</p>
                    
                    <div className="mt-16 flex justify-between px-4">
                      <div className="text-center">
                        <p>Nadzir (Penerima Wakaf)</p>
                        <br/><br/><br/>
                        <p className="underline font-bold">Ust. Ahmad Syauqi</p>
                      </div>
                      <div className="text-center">
                        <p>Bandung, 12 Januari 2026</p>
                        <p>Wakif (Pemberi Wakaf)</p>
                        <br/><br/>
                        {/* Fake Stamp/Signature */}
                        <div className="w-16 h-16 border-2 border-red-500 text-red-500 rounded-full flex items-center justify-center font-bold text-xs transform -rotate-12 mx-auto mb-2 opacity-50">CAP<br/>RESMI</div>
                        <p className="underline font-bold">H. Abdullah bin Umar</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <div className="relative border-[12px] border-white shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="w-[300px] sm:w-[600px] h-[200px] sm:h-[400px] bg-emerald-800 flex items-center justify-center relative overflow-hidden">
                      {/* Fake grass/outdoor texture */}
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                      
                      {/* Signboard */}
                      <div className="bg-white p-4 sm:p-6 border-4 border-yellow-500 shadow-xl z-10 transform rotate-2 text-center w-3/4 sm:w-auto">
                        <h2 className="text-lg sm:text-2xl font-black text-green-800 tracking-wider">TANAH WAKAF</h2>
                        <div className="w-full h-1 sm:h-2 bg-green-800 my-2 sm:my-3"></div>
                        <p className="font-bold text-gray-800 text-sm sm:text-lg">Milik Umat Islam</p>
                        <p className="text-xs sm:text-sm mt-1 sm:mt-2 text-gray-600">Dikelola oleh Nadzir: Wakaf Konstruksi</p>
                        <p className="text-[10px] sm:text-xs mt-3 sm:mt-5 text-red-600 font-bold bg-red-50 py-1">DILARANG MEMPERJUALBELIKAN TANAH INI</p>
                      </div>
                      
                      {/* Fake poles */}
                      <div className="absolute top-1/2 left-4 sm:left-12 bottom-[-20%] w-2 sm:w-4 bg-gray-400 z-0"></div>
                      <div className="absolute top-1/2 right-4 sm:right-12 bottom-[-20%] w-2 sm:w-4 bg-gray-400 z-0"></div>
                      
                      {/* Geotag */}
                      <div className="absolute bottom-2 right-2 text-white/60 text-[8px] sm:text-xs font-mono bg-black/40 px-2 py-1 rounded">
                        Lat: -6.917464, Long: 107.619123<br/>18 Jan 2026 10:15 WIB
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}