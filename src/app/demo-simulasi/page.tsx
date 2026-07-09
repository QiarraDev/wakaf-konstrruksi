"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type UserRole = "pengelola" | "validator" | "admin" | "superadmin" | "wakif" | null;

interface SimulationState {
  currentRole: UserRole;
  currentScreen: string;
  projectData: {
    name: string;
    category: string;
    budget: string;
    location: string;
    pic: string;
    progress: number;
    status: string;
    photos: number;
    validatorScore: number;
  };
  notifications: number;
}

export default function DemoSimulasiPage() {
  const [state, setState] = useState<SimulationState>({
    currentRole: null,
    currentScreen: "role-selection",
    projectData: {
      name: "Pembangunan Masjid Jami' An-Nur",
      category: "Masjid",
      budget: "Rp 1.2 Miliar",
      location: "Jawa Barat",
      pic: "Budi Santoso",
      progress: 0,
      status: "Menunggu Persetujuan",
      photos: 0,
      validatorScore: 0,
    },
    notifications: 0,
  });

  const switchRole = (role: UserRole) => {
    setState((prev) => ({
      ...prev,
      currentRole: role,
      currentScreen: "dashboard",
    }));
  };

  const nextAction = () => {
    let nextState: Partial<SimulationState> = {};

    if (state.currentRole === "pengelola") {
      if (state.currentScreen === "dashboard") {
        nextState = {
          currentScreen: "submit-proposal",
          projectData: {
            ...state.projectData,
            status: "Proposal Submitted",
            progress: 25,
          },
        };
      } else if (state.currentScreen === "submit-proposal") {
        nextState = {
          currentScreen: "penggalangan-dana",
          projectData: {
            ...state.projectData,
            status: "Penggalangan Dana",
            progress: 50,
          },
        };
      } else if (state.currentScreen === "penggalangan-dana") {
        nextState = {
          currentScreen: "eksekusi",
          projectData: {
            ...state.projectData,
            status: "Eksekusi Berjalan",
            progress: 75,
          },
        };
      } else if (state.currentScreen === "eksekusi") {
        nextState = {
          currentScreen: "serah-terima",
          projectData: {
            ...state.projectData,
            status: "Serah Terima",
            progress: 100,
          },
        };
      }
    } else if (state.currentRole === "validator") {
      if (state.currentScreen === "dashboard") {
        nextState = {
          currentScreen: "inspection",
          projectData: {
            ...state.projectData,
            photos: 15,
            validatorScore: 95,
            status: "Inspeksi Selesai",
            progress: 50,
          },
          notifications: 1,
        };
      } else if (state.currentScreen === "inspection") {
        nextState = {
          currentScreen: "penggalangan-dana",
          projectData: {
            ...state.projectData,
            status: "Penggalangan Dana",
            progress: 60,
          },
        };
      } else if (state.currentScreen === "penggalangan-dana") {
        nextState = {
          currentScreen: "eksekusi",
          projectData: {
            ...state.projectData,
            status: "Monitoring Eksekusi",
            progress: 80,
          },
        };
      } else if (state.currentScreen === "eksekusi") {
        nextState = {
          currentScreen: "serah-terima",
          projectData: {
            ...state.projectData,
            status: "Final Inspection",
            progress: 100,
          },
        };
      }
    } else if (state.currentRole === "admin") {
      if (state.currentScreen === "dashboard") {
        nextState = {
          currentScreen: "approval-list",
          projectData: {
            ...state.projectData,
            status: "Menunggu Approval Final",
            progress: 75,
          },
          notifications: 1,
        };
      } else if (state.currentScreen === "approval-list") {
        nextState = {
          currentScreen: "penggalangan-dana",
          projectData: {
            ...state.projectData,
            status: "Penggalangan Dana",
            progress: 85,
          },
        };
      } else if (state.currentScreen === "penggalangan-dana") {
        nextState = {
          currentScreen: "eksekusi",
          projectData: {
            ...state.projectData,
            status: "Eksekusi Dimonitor",
            progress: 90,
          },
        };
      } else if (state.currentScreen === "eksekusi") {
        nextState = {
          currentScreen: "serah-terima",
          projectData: {
            ...state.projectData,
            status: "Serah Terima Disetujui",
            progress: 100,
          },
        };
      }
    } else if (state.currentRole === "superadmin") {
      if (state.currentScreen === "dashboard") {
        nextState = {
          currentScreen: "review-dokumen",
          projectData: {
            ...state.projectData,
            status: "Review Dokumen",
            progress: 25,
          },
        };
      } else if (state.currentScreen === "review-dokumen") {
        nextState = {
          currentScreen: "final-approval",
          projectData: {
            ...state.projectData,
            status: "Final Approval",
            progress: 50,
          },
        };
      } else if (state.currentScreen === "final-approval") {
        nextState = {
          currentScreen: "publikasi-portal",
          projectData: {
            ...state.projectData,
            status: "Dipublikasikan",
            progress: 75,
          },
        };
      } else if (state.currentScreen === "publikasi-portal") {
        nextState = {
          currentScreen: "penggalangan-dana",
          projectData: {
            ...state.projectData,
            status: "Penggalangan Dana",
            progress: 85,
          },
        };
      } else if (state.currentScreen === "penggalangan-dana") {
        nextState = {
          currentScreen: "serah-terima",
          projectData: {
            ...state.projectData,
            status: "Serah Terima Oversee",
            progress: 100,
          },
        };
      }
    } else if (state.currentRole === "wakif") {
      if (state.currentScreen === "dashboard") {
        nextState = {
          currentScreen: "project-view",
          projectData: {
            ...state.projectData,
            progress: 100,
          },
        };
      } else if (state.currentScreen === "project-view") {
        nextState = {
          currentScreen: "penggalangan-dana",
          projectData: {
            ...state.projectData,
            status: "Sudah Berkomitmen",
            progress: 100,
          },
        };
      } else if (state.currentScreen === "penggalangan-dana") {
        nextState = {
          currentScreen: "eksekusi",
          projectData: {
            ...state.projectData,
            status: "Monitoring Progress",
            progress: 100,
          },
        };
      } else if (state.currentScreen === "eksekusi") {
        nextState = {
          currentScreen: "serah-terima",
          projectData: {
            ...state.projectData,
            status: "Serah Terima Selesai",
            progress: 100,
          },
        };
      }
    }

    setState((prev) => ({ ...prev, ...nextState }));
  };

  const resetSimulation = () => {
    setState({
      currentRole: null,
      currentScreen: "role-selection",
      projectData: {
        name: "Pembangunan Masjid Jami' An-Nur",
        category: "Masjid",
        budget: "Rp 1.2 Miliar",
        location: "Jawa Barat",
        pic: "Budi Santoso",
        progress: 0,
        status: "Menunggu Persetujuan",
        photos: 0,
        validatorScore: 0,
      },
      notifications: 0,
    });
  };

  const getRoleInfo = (role: UserRole) => {
    if (role === null) return null;
    
    const roles: Record<string, any> = {
      pengelola: {
        name: "Pengelola Aset",
        icon: "🕌",
        color: "from-emerald-500 to-teal-600",
        description: "Takmir Masjid/Pesantren",
        glow: "shadow-emerald-200",
      },
      validator: {
        name: "Validator Lapangan",
        icon: "🔍",
        color: "from-violet-500 to-purple-600",
        description: "Tim Inspeksi & Verifikasi",
        glow: "shadow-violet-200",
      },
      admin: {
        name: "Admin Operasional",
        icon: "⚙️",
        color: "from-blue-500 to-indigo-600",
        description: "Kurasi & Koordinasi",
        glow: "shadow-blue-200",
      },
      superadmin: {
        name: "Super Admin",
        icon: "👑",
        color: "from-orange-500 to-amber-500",
        description: "Final Approval",
        glow: "shadow-orange-200",
      },
      wakif: {
        name: "Wakif (Donatur)",
        icon: "🤲",
        color: "from-amber-400 to-orange-500",
        description: "Individu & Institusi",
        glow: "shadow-amber-200",
      },
    };
    return roles[role] || null;
  };

  if (state.currentRole === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline mb-8">
            ← Kembali ke Beranda
          </Link>

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">🎮 Simulasi Workflow Interaktif</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Pilih role Anda dan jalankan simulasi lengkap dari awal sampai akhir
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {["pengelola", "validator", "admin", "superadmin", "wakif"].map((role, idx) => {
              const info = getRoleInfo(role as UserRole);
              return (
                <motion.button
                  key={role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => switchRole(role as UserRole)}
                  className={`group relative overflow-hidden p-6 rounded-2xl border-2 border-gray-200 dark:border-gray-800 transition-all hover:border-primary hover:shadow-lg ${info?.glow}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${info?.color} opacity-0 group-hover:opacity-10 transition`} />
                  <div className="relative z-10 text-center">
                    <div className="text-5xl mb-3">{info?.icon}</div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white">{info?.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{info?.description}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const roleInfo = getRoleInfo(state.currentRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={resetSimulation}
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline mb-6"
          >
            ← Pilih Role Lain
          </button>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`bg-gradient-to-r ${roleInfo?.color} rounded-2xl p-6 text-white shadow-lg`}
          >
            <div className="flex items-center gap-4 justify-between">
              <div>
                <div className="text-5xl mb-2">{roleInfo?.icon}</div>
                <h1 className="text-3xl font-black">{roleInfo?.name}</h1>
                <p className="text-white/80 mt-1">{roleInfo?.description}</p>
              </div>
              {state.notifications > 0 && (
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-red-500 rounded-full w-16 h-16 flex items-center justify-center">
                  <div className="text-2xl font-black">{state.notifications}</div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Progress */}
        <div className="mb-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 dark:text-white">Project Progress</h2>
            <span className="text-2xl font-black text-primary">{state.projectData.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-4 overflow-hidden">
            <motion.div
              animate={{ width: `${state.projectData.progress}%` }}
              transition={{ duration: 0.8 }}
              className="h-full bg-gradient-to-r from-primary to-emerald-500"
            />
          </div>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={state.currentScreen}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Role Specific Screens */}
            {state.currentScreen === "dashboard" && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">📋 Dashboard {roleInfo?.name}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Project</p>
                      <p className="font-black text-gray-900 dark:text-white text-sm mt-1">{state.projectData.name}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Kategori</p>
                      <p className="font-black text-gray-900 dark:text-white text-sm mt-1">{state.projectData.category}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Budget</p>
                      <p className="font-black text-gray-900 dark:text-white text-sm mt-1">{state.projectData.budget}</p>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">Status</p>
                      <p className="font-black text-gray-900 dark:text-white text-sm mt-1 line-clamp-2">{state.projectData.status}</p>
                    </div>
                  </div>
                </div>

                {state.currentRole === "pengelola" && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-8">
                    <div className="flex gap-4">
                      <div className="text-4xl">📝</div>
                      <div>
                        <h3 className="font-black text-blue-900 dark:text-blue-400 text-lg">Siap Mengajukan Proposal</h3>
                        <p className="text-sm text-blue-800 dark:text-blue-300 mt-2">
                          Anda dapat mengajukan proposal pembangunan Masjid Jami' An-Nur dengan estimasi budget Rp 1.2 Miliar
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {state.currentRole === "validator" && (
                  <div className="bg-violet-50 dark:bg-violet-900/20 border-2 border-violet-200 dark:border-violet-800 rounded-2xl p-8">
                    <div className="flex gap-4">
                      <div className="text-4xl">🔍</div>
                      <div>
                        <h3 className="font-black text-violet-900 dark:text-violet-400 text-lg">Tugas Inspeksi Diterima</h3>
                        <p className="text-sm text-violet-800 dark:text-violet-300 mt-2">
                          Admin telah mengirim tugas inspeksi lapangan untuk proyek Masjid Jami' An-Nur. Lakukan survey dan verifikasi legalitas lahan.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {state.currentRole === "admin" && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-8">
                    <div className="flex gap-4">
                      <div className="text-4xl">⚙️</div>
                      <div>
                        <h3 className="font-black text-blue-900 dark:text-blue-400 text-lg">Kurasi Proposal</h3>
                        <p className="text-sm text-blue-800 dark:text-blue-300 mt-2">
                          Review proposal dan RAB dari pengelola aset, kemudian dispatch tugas inspeksi ke validator lapangan.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {state.currentRole === "superadmin" && (
                  <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-8">
                    <div className="flex gap-4">
                      <div className="text-4xl">👑</div>
                      <div>
                        <h3 className="font-black text-orange-900 dark:text-orange-400 text-lg">Persetujuan Final</h3>
                        <p className="text-sm text-orange-800 dark:text-orange-300 mt-2">
                          Berikan persetujuan final untuk publikasi proyek ke portal publik dan penggalangan dana.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {state.currentRole === "wakif" && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-8">
                    <div className="flex gap-4">
                      <div className="text-4xl">🤲</div>
                      <div>
                        <h3 className="font-black text-amber-900 dark:text-amber-400 text-lg">Lihat Proyek</h3>
                        <p className="text-sm text-amber-800 dark:text-amber-300 mt-2">
                          Jelajahi proyek yang tersedia dan pilih untuk berkontribusi dengan donasi wakaf.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {state.currentScreen === "submit-proposal" && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">✅ Proposal Tersubmit!</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl">
                    <p className="font-bold text-emerald-900 dark:text-emerald-400">Proposal berhasil dikirim ke Admin Operasional</p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-2">
                      Admin akan melakukan kurasi dan validasi dokumen dalam 1-2 hari kerja
                    </p>
                  </div>
                </div>
              </div>
            )}

            {state.currentScreen === "inspection" && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">🔍 Hasil Inspeksi</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-2 border-violet-200 dark:border-violet-800 rounded-xl">
                    <p className="text-xs font-bold text-violet-700 dark:text-violet-400 uppercase">Foto Dokumentasi</p>
                    <p className="text-4xl font-black text-violet-900 dark:text-violet-300 mt-2">{state.projectData.photos}</p>
                    <p className="text-sm text-violet-700 dark:text-violet-400 mt-1">Foto dengan GPS geotagging</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">Skor Kepatuhan</p>
                    <p className="text-4xl font-black text-emerald-900 dark:text-emerald-300 mt-2">{state.projectData.validatorScore}/100</p>
                    <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-1">Lulus standar minimum ✅</p>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                  <p className="font-bold text-gray-900 dark:text-white">✅ Verifikasi Lapangan Lengkap</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                    <li>✅ Legalitas AIW: Terverifikasi</li>
                    <li>✅ Lahan: Bersih dari sengketa</li>
                    <li>✅ Akses: Jalan tersedia</li>
                    <li>✅ Laporan diteruskan ke Super Admin</li>
                  </ul>
                </div>
              </div>
            )}

            {state.currentScreen === "approval-list" && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">📋 Penerimaan Laporan Validator</h2>
                <div className="space-y-4">
                  <div className="p-6 border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <h3 className="font-bold text-blue-900 dark:text-blue-400">Laporan Validator Masuk</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
                      Laporan inspeksi dari Ahmad Fauzi telah diterima dengan skor 95/100
                    </p>
                    <div className="mt-4 flex gap-2">
                      <span className="px-2 py-1 text-xs font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 rounded">✅ Terima</span>
                      <span className="px-2 py-1 text-xs font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded">📤 Forward ke Super Admin</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {state.currentScreen === "review-dokumen" && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">📋 Review Dokumen Lengkap</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0 }}
                      className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl"
                    >
                      <p className="font-bold text-blue-900 dark:text-blue-400 mb-3">✅ Proposal & RAB</p>
                      <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                        <li>✅ Proposal: Lengkap & Valid</li>
                        <li>✅ AIW: Terverifikasi</li>
                        <li>✅ RAB: Sesuai Standar</li>
                        <li>✅ Desain: Jelas & Detail</li>
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl"
                    >
                      <p className="font-bold text-emerald-900 dark:text-emerald-400 mb-3">✅ Inspeksi Validator</p>
                      <ul className="text-sm text-emerald-800 dark:text-emerald-300 space-y-1">
                        <li>✅ Skor: 95/100</li>
                        <li>✅ Foto: 15 dokumentasi</li>
                        <li>✅ Legalitas: Terverifikasi</li>
                        <li>✅ Lapangan: Siap Dibangun</li>
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-4 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl"
                    >
                      <p className="font-bold text-purple-900 dark:text-purple-400 mb-3">✅ Admin Kurasi</p>
                      <ul className="text-sm text-purple-800 dark:text-purple-300 space-y-1">
                        <li>✅ Kelengkapan: 100%</li>
                        <li>✅ Kesesuaian: Valid</li>
                        <li>✅ Rekomendasi: Approve</li>
                        <li>✅ Forward: Ke Super Admin</li>
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-4 bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-xl"
                    >
                      <p className="font-bold text-orange-900 dark:text-orange-400 mb-3">📊 Ringkasan Eksekutif</p>
                      <ul className="text-sm text-orange-800 dark:text-orange-300 space-y-1">
                        <li>🏗️ Proyek: Masjid 500m²</li>
                        <li>💰 Budget: Rp 1.2M (Valid)</li>
                        <li>📍 Lokasi: Jawa Barat</li>
                        <li>🎯 Kebutuhan: Jelas</li>
                      </ul>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}

            {state.currentScreen === "final-approval" && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">👑 Final Approval - Pimpinan</h2>
                <div className="space-y-6">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 border-2 border-orange-200 dark:border-orange-800 rounded-xl text-center"
                  >
                    <p className="text-sm font-bold text-orange-700 dark:text-orange-400 uppercase mb-2">Keputusan Pimpinan</p>
                    <p className="text-4xl font-black text-orange-900 dark:text-orange-300 mb-2">✅ DISETUJUI</p>
                    <p className="text-orange-700 dark:text-orange-400">Proyek memenuhi semua syarat dan siap dipublikasikan</p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                      <p className="font-bold text-gray-900 dark:text-white mb-3">📋 Checklist Approval</p>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                        <li>✅ Proposal lengkap & sesuai</li>
                        <li>✅ Inspeksi lapangan valid</li>
                        <li>✅ Kelayakan finansial terjamin</li>
                        <li>✅ Transparansi terpenuhi</li>
                        <li>✅ Risiko minimal</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                      <p className="font-bold text-gray-900 dark:text-white mb-3">🎯 Action Items</p>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                        <li>→ Publikasi ke portal publik</li>
                        <li>→ Notifikasi ke Wakif</li>
                        <li>→ Buka penggalangan dana</li>
                        <li>→ Setup vendor & timeline</li>
                        <li>→ Monitor eksekusi proyek</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl">
                    <p className="font-bold text-emerald-900 dark:text-emerald-400 mb-2">✅ Rekomendasi Approval</p>
                    <p className="text-sm text-emerald-800 dark:text-emerald-300">
                      Semua indikator menunjukkan proyek ini layak untuk dipublikasikan dan penggalangan dana. Transparansi, legalitas, dan kelayakan finansial telah terverifikasi oleh semua stakeholder.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {state.currentScreen === "publikasi-portal" && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">🌐 Publikasi ke Portal Publik</h2>
                <div className="space-y-6">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-200 dark:border-green-800 rounded-xl text-center"
                  >
                    <p className="text-6xl mb-3">🎉</p>
                    <p className="text-2xl font-black text-green-900 dark:text-green-300">LIVE DI PORTAL!</p>
                    <p className="text-green-700 dark:text-green-400 mt-2">Proyek telah dipublikasikan dan bisa dilihat oleh semua Wakif</p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl text-center">
                      <p className="text-4xl font-black text-blue-600 dark:text-blue-400">1.2M</p>
                      <p className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase mt-2">Target Dana</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Rp 1.2 Miliar</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl text-center">
                      <p className="text-4xl font-black text-purple-600 dark:text-purple-400">500m²</p>
                      <p className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase mt-2">Luas Bangunan</p>
                      <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Masjid Modern</p>
                    </div>
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl text-center">
                      <p className="text-4xl font-black text-amber-600 dark:text-amber-400">6M</p>
                      <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase mt-2">Timeline</p>
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">6 Bulan Konstruksi</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <p className="font-bold text-gray-900 dark:text-white mb-3">📢 Status Publikasi</p>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                      <li>✅ Halaman proyek: LIVE</li>
                      <li>✅ Foto & detail: Terlihat</li>
                      <li>✅ Target penggalangan: Terlihat</li>
                      <li>✅ Notifikasi Wakif: Dikirim</li>
                      <li>✅ Social media: Posted</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {state.currentScreen === "project-view" && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">🌐 Proyek Terlihat di Portal Publik</h2>
                <div className="space-y-4">
                  <div className="p-6 border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                    <h3 className="font-bold text-amber-900 dark:text-amber-400">{state.projectData.name}</h3>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-amber-700 dark:text-amber-300">💰 Target Dana:</p>
                        <p className="font-bold text-amber-900 dark:text-amber-400">{state.projectData.budget}</p>
                      </div>
                      <div>
                        <p className="text-amber-700 dark:text-amber-300">📍 Lokasi:</p>
                        <p className="font-bold text-amber-900 dark:text-amber-400">{state.projectData.location}</p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                      <p className="text-xs font-bold text-amber-700 dark:text-amber-400">Donatur dapat berkomitmen mulai sekarang! 🤲</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {state.currentScreen === "penggalangan-dana" && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">🤲 Penggalangan Dana</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl">
                      <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase">Target Dana</p>
                      <p className="text-3xl font-black text-amber-900 dark:text-amber-300 mt-2">{state.projectData.budget}</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl">
                      <p className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase">Terkumpul</p>
                      <p className="text-3xl font-black text-blue-900 dark:text-blue-300 mt-2">Rp 850Jt</p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">70.8% dari target</p>
                    </div>
                    <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl">
                      <p className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase">Donatur</p>
                      <p className="text-3xl font-black text-purple-900 dark:text-purple-300 mt-2">542</p>
                      <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">Orang berkomitmen</p>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <p className="font-bold text-gray-900 dark:text-white mb-3">📊 Progress Penggalangan</p>
                    <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3">
                      <motion.div
                        animate={{ width: "71%" }}
                        transition={{ duration: 1 }}
                        className="h-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                      />
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Target akan tercapai dalam 2 minggu 🎯</p>
                  </div>
                </div>
              </div>
            )}

            {state.currentScreen === "eksekusi" && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">🏗️ Eksekusi & Monitoring</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                      <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">📅 Timeline Konstruksi</p>
                      <div className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
                        <p>✅ Mobilisasi: Selesai (100%)</p>
                        <p>✅ Pondasi: Selesai (100%)</p>
                        <p>⏳ Struktur Bangunan: 60% (sedang berjalan)</p>
                        <p>⏱️ Finishing: Menunggu</p>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
                      <p className="text-sm font-bold text-gray-900 dark:text-white mb-2">👥 Tim Terlibat</p>
                      <div className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
                        <p>🏗️ Vendor: CV. Bangun Bersama</p>
                        <p>🔍 Supervisor: Ahmad Fauzi (Validator)</p>
                        <p>👁️ Monitoring: Real-time GPS & Foto</p>
                        <p>📊 Update: Mingguan ke Wakif</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl">
                    <p className="font-bold text-emerald-900 dark:text-emerald-400 mb-2">📸 Update Foto Mingguan</p>
                    <div className="grid grid-cols-4 gap-2 mt-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square bg-gradient-to-br from-emerald-200 to-teal-300 rounded-lg flex items-center justify-center font-bold text-white">
                          📷
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-2">Transparansi penuh dengan GPS & timestamp</p>
                  </div>
                </div>
              </div>
            )}

            {state.currentScreen === "serah-terima" && (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-6">🎉 Serah Terima & Penutupan</h2>
                <div className="space-y-6">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl text-center"
                  >
                    <div className="text-6xl mb-3">🎊</div>
                    <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-400">PROYEK SELESAI!</h3>
                    <p className="text-emerald-700 dark:text-emerald-300 mt-2">Masjid Jami' An-Nur telah berhasil dibangun dan diserah terima</p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl">
                      <p className="text-sm font-bold text-green-900 dark:text-green-400 mb-2">✅ Final Inspection</p>
                      <div className="space-y-1 text-xs text-green-800 dark:text-green-300">
                        <p>✅ Struktur: Sesuai desain 100%</p>
                        <p>✅ Keselamatan: Lulus standar</p>
                        <p>✅ Finishing: Sempurna</p>
                        <p>✅ Sertifikat: Diterbitkan</p>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl">
                      <p className="text-sm font-bold text-blue-900 dark:text-blue-400 mb-2">📋 Dokumentasi</p>
                      <div className="space-y-1 text-xs text-blue-800 dark:text-blue-300">
                        <p>📄 Berita Acara Serah Terima</p>
                        <p>📸 Dokumentasi Lengkap (250 foto)</p>
                        <p>📊 Laporan Final ke Wakif</p>
                        <p>🏛️ Aset Register ke Nazhir</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl text-center">
                    <p className="text-sm font-bold text-purple-900 dark:text-purple-400 mb-2">💰 Realisasi Anggaran</p>
                    <p className="text-2xl font-black text-purple-900 dark:text-purple-300">Rp 1.18 Miliar</p>
                    <p className="text-xs text-purple-700 dark:text-purple-400 mt-2">98.3% dari budget - Efisien ✅</p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="p-6 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl text-center"
                  >
                    <p className="font-black text-lg">🏆 SIMULASI BERHASIL DISELESAIKAN!</p>
                    <p className="text-sm mt-2">Dari pengajuan proposal hingga serah terima proyek</p>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8 mb-8">
          <button
            onClick={() => setState((prev) => ({ ...prev, currentScreen: "dashboard" }))}
            disabled={state.currentScreen === "dashboard"}
            className="py-3 px-6 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Kembali
          </button>
          {state.currentScreen === "serah-terima" ? (
            <button
              onClick={resetSimulation}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition"
            >
              🎉 Simulasi Selesai! Reset & Coba Role Lain
            </button>
          ) : (
            <button
              onClick={nextAction}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-primary to-emerald-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition"
            >
              Lanjut Tahap Berikutnya →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
