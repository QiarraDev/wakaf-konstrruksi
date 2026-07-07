"use client";
import { useState } from "react";
import Link from "next/link";

export default function ValidatorDashboard() {
  const [selectedProject, setSelectedProject] = useState("Masjid Jami' An-Nur");

  const projects = ["Masjid Jami' An-Nur", "Pesantren Tahfidz Al-Ikhlas"];

  const stats = [
    { label: "Proyek Dipantau", value: "2", icon: "🏗️", color: "text-primary" },
    { label: "Laporan Bulan Ini", value: "8", icon: "📸", color: "text-blue-600" },
    { label: "Inspeksi Menunggu", value: "1", icon: "⏳", color: "text-orange-500" },
    { label: "Skor Kepatuhan", value: "94%", icon: "✅", color: "text-emerald-600" },
  ];

  const recentActivity = [
    { time: "09:15 WIB", action: "Laporan progres 60% Masjid An-Nur dikirim", status: "success" },
    { time: "Kemarin, 14:30", action: "Checklist inspeksi lantai 2 diselesaikan", status: "success" },
    { time: "Kemarin, 11:00", action: "Foto dokumentasi 12 gambar diunggah", status: "success" },
    { time: "2 Hari lalu", action: "Laporan revisi RAB diterima dari Vendor", status: "warning" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Validator Lapangan</h1>
          <p className="text-gray-500 mt-1">Pantau dan laporkan kondisi pembangunan secara real-time dari lokasi.</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-bold text-emerald-700">Aktif • GPS On</span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl">{s.icon}</span>
              <span className={`text-2xl font-black ${s.color}`}>{s.value}</span>
            </div>
            <p className="text-sm text-gray-500 font-medium leading-tight">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Action: Submit Report */}
      <div className="bg-gradient-to-r from-primary to-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-primary/20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold">Kirim Laporan Real-Time Sekarang</h2>
            <p className="text-white/80 text-sm mt-1">Laporkan kondisi terkini dari lokasi konstruksi lengkap dengan foto & data GPS.</p>
          </div>
          <Link href="/validator/laporan" className="flex-shrink-0 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors shadow-md">
            📸 Buat Laporan
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Selector & Status */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-bold text-gray-900">Status Proyek Aktif</h2>
            <select 
              value={selectedProject} 
              onChange={(e) => setSelectedProject(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 outline-none focus:border-primary"
            >
              {projects.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2 font-medium">
                <span className="text-gray-600">Progres Keseluruhan</span>
                <span className="text-primary font-bold">{selectedProject.includes('Masjid') ? '60%' : '20%'}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-primary h-3 rounded-full transition-all duration-700" style={{width: selectedProject.includes('Masjid') ? '60%' : '20%'}}></div>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              {[
                { label: "Tahap Saat Ini", value: selectedProject.includes('Masjid') ? "Pemasangan Kubah" : "Pengecoran Struktur" },
                { label: "Estimasi Selesai", value: selectedProject.includes('Masjid') ? "Oktober 2026" : "Januari 2027" },
                { label: "Laporan Terakhir", value: "Hari ini, 09:15 WIB" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-sm border-b border-gray-50 pb-2 last:border-0">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Log */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-bold text-gray-900">Log Aktivitas Terkini</h2>
          </div>
          <div className="p-5">
            <ul className="space-y-4">
              {recentActivity.map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className={`mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.status === 'success' ? 'bg-emerald-500' : 'bg-orange-500'}`}></div>
                  <div>
                    <p className="text-sm text-gray-800 font-medium">{item.action}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
