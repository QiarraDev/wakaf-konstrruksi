"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function DesainPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      alert(`File "\${e.target.files[0].name}" berhasil dipilih!`);
    }
  };

  const handleSubmit = () => {
    alert("Dokumen desain berhasil dikirim ke Admin untuk ditinjau!");
    router.push("/pengelola");
  };
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm mt-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Arsitektur & Desain Bangunan</h1>
        <p className="text-gray-500 mt-2">Unggah cetak biru (blueprint) dan desain 3D fasad bangunan yang telah disetujui.</p>
      </div>

      {/* Drag & Drop Upload Area Mock */}
      <div 
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors cursor-pointer group \${isDragging ? 'border-primary bg-emerald-50/50' : 'border-gray-300 hover:border-primary hover:bg-emerald-50/50'}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragging(false); alert("File berhasil di-drop!"); }}
        onClick={handleUploadClick}
      >
        <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📁</div>
        <h3 className="text-lg font-bold text-gray-700">Tarik dan lepas file desain di sini</h3>
        <p className="text-gray-500 mt-2 text-sm">Mendukung format PDF, DWG, PNG, atau JPG (Maks. 25MB)</p>
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleFileChange}
          accept=".pdf,.dwg,.png,.jpg,.jpeg"
        />
        <button type="button" className="mt-6 bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-50 shadow-sm pointer-events-none">
          Pilih File
        </button>
      </div>

      {/* Mock Uploaded Files List */}
      <div className="mt-10">
        <h3 className="font-bold text-lg text-gray-900 mb-4">File Terunggah</h3>
        <div className="space-y-3">
          {[
            { name: "Denah_Lantai_1_Masjid_AnNur.pdf", size: "2.4 MB", status: "Selesai" },
            { name: "Fasad_3D_Render_01.jpg", size: "5.1 MB", status: "Selesai" },
          ].map((file, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="text-2xl">{file.name.endsWith('pdf') ? '📄' : '🖼️'}</div>
                <div>
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">{file.status}</span>
                <button className="text-gray-400 hover:text-red-500">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button onClick={handleSubmit} className="bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30">
          Kirim Dokumen Desain
        </button>
      </div>
    </div>
  );
}
