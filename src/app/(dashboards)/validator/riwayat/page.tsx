"use client";
import { useState } from "react";

const reports = [
  { id: "RPT-1042", date: "Hari ini, 09:15", project: "Masjid Jami' An-Nur", milestone: "60%", kondisi: "Baik", photos: 4, score: 94 },
  { id: "RPT-1041", date: "Kemarin, 14:30", project: "Masjid Jami' An-Nur", milestone: "60%", kondisi: "Baik", photos: 5, score: 88 },
  { id: "RPT-1040", date: "2 Hari lalu, 10:00", project: "Pesantren Tahfidz Al-Ikhlas", milestone: "20%", kondisi: "Perlu Perhatian", photos: 3, score: 72 },
  { id: "RPT-1039", date: "5 Hari lalu, 08:45", project: "Masjid Jami' An-Nur", milestone: "40%", kondisi: "Baik", photos: 5, score: 97 },
  { id: "RPT-1038", date: "1 Minggu lalu", project: "Pesantren Tahfidz Al-Ikhlas", milestone: "20%", kondisi: "Baik", photos: 2, score: 83 },
];

export default function RiwayatPage() {
  const [selectedReport, setSelectedReport] = useState<typeof reports[0] | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">📋 Riwayat Laporan</h1>
        <p className="text-gray-500 mt-1">Arsip seluruh laporan lapangan yang pernah Anda kirimkan.</p>
      </div>

      <div className="space-y-3">
        {reports.map((r, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${r.kondisi === 'Baik' ? 'bg-emerald-100' : 'bg-orange-100'}`}>
                {r.kondisi === 'Baik' ? '✅' : '⚠️'}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-gray-900 text-sm">{r.project}</span>
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded">Milestone {r.milestone}</span>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span>{r.id}</span>
                  <span>•</span>
                  <span>{r.date}</span>
                  <span>•</span>
                  <span>{r.photos} foto</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-right hidden sm:block">
                <div className={`text-xl font-black ${r.score >= 80 ? 'text-emerald-600' : r.score >= 60 ? 'text-orange-500' : 'text-red-500'}`}>{r.score}%</div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Skor</p>
              </div>
              <button onClick={() => setSelectedReport(r)} className="bg-white border-2 border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-bold hover:border-primary hover:text-primary transition-colors">
                Detail
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedReport(null)}>
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Detail Laporan</h3>
                <p className="text-sm text-gray-500 mt-1 font-medium">{selectedReport.id}</p>
              </div>
              <button onClick={() => setSelectedReport(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Proyek</p>
                  <p className="font-bold text-gray-900 text-sm">{selectedReport.project}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Milestone</p>
                  <p className="font-bold text-primary text-2xl">{selectedReport.milestone}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">Skor Kepatuhan</p>
                <div className="flex items-center gap-3">
                  <div className={`text-3xl font-black ${selectedReport.score >= 80 ? 'text-emerald-600' : 'text-orange-500'}`}>{selectedReport.score}%</div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${selectedReport.score >= 80 ? 'bg-emerald-500' : 'bg-orange-400'}`} style={{width: `${selectedReport.score}%`}}></div>
                    </div>
                    <p className={`text-xs font-bold mt-1 ${selectedReport.score >= 80 ? 'text-emerald-600' : 'text-orange-500'}`}>{selectedReport.score >= 80 ? 'Lulus Inspeksi' : 'Perlu Perbaikan'}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center text-sm">
                {[
                  { label: "Kondisi", value: selectedReport.kondisi, icon: selectedReport.kondisi === 'Baik' ? '✅' : '⚠️' },
                  { label: "Foto", value: `${selectedReport.photos} Foto`, icon: '📸' },
                  { label: "Waktu", value: selectedReport.date, icon: '🕐' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p className="text-xl mb-1">{item.icon}</p>
                    <p className="font-bold text-gray-900 text-xs leading-tight">{item.value}</p>
                    <p className="text-gray-400 text-[10px] uppercase tracking-wider mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Fake photo grid */}
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Foto Dokumentasi</p>
                <div className="grid grid-cols-4 gap-2">
                  {Array.from({length: selectedReport.photos}).map((_, i) => {
                    const colors = ['bg-emerald-200','bg-blue-200','bg-amber-200','bg-rose-200','bg-violet-200'];
                    return (
                      <div key={i} className={`${colors[i]} rounded-lg aspect-square relative`}>
                        <div className="absolute bottom-1 right-1 bg-black/40 text-white text-[8px] px-1 rounded font-mono">GPS✓</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <button onClick={() => setSelectedReport(null)} className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark">Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
}
