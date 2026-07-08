"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";

export function Topbar() {
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifCount] = useState(3);

  const notifications = [
    { icon: "📋", text: "PRJ-003 menunggu kurasi Anda", time: "5 mnt lalu", unread: true },
    { icon: "✅", text: "Laporan RPT-1042 telah disetujui Admin", time: "1 jam lalu", unread: true },
    { icon: "⚠️", text: "Revisi RAB dibutuhkan oleh Vendor", time: "2 jam lalu", unread: false },
  ];

  // Generate breadcrumb from path
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumb = segments.map((s, i) => ({
    label: s.charAt(0).toUpperCase() + s.slice(1),
    href: '/' + segments.slice(0, i + 1).join('/'),
  }));

  return (
    <header className="topbar h-16 flex items-center justify-between px-8 sticky top-0 z-20">
      {/* Left side: Back Button & Breadcrumb */}
      <div className="flex items-center gap-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-primary transition-colors bg-gray-100 hover:bg-emerald-50 dark:bg-gray-800 dark:hover:bg-emerald-900/30 px-3 py-1.5 rounded-lg border border-transparent hover:border-emerald-200 dark:hover:border-emerald-800"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span className="hidden sm:inline">Beranda</span>
        </Link>
        
        <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm">
          {breadcrumb.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-gray-300 dark:text-gray-600">/</span>}
              <span className={`font-semibold ${i === breadcrumb.length - 1 ? 'text-gray-800 dark:text-gray-100' : 'text-gray-400 dark:text-gray-500'}`}>
                {crumb.label}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors px-3 py-2 rounded-xl text-sm text-gray-400 cursor-pointer">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <span className="text-xs">Cari...</span>
          <kbd className="ml-1 text-[10px] bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notif bell */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 text-gray-500 hover:text-primary transition-colors rounded-xl hover:bg-gray-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {notifCount > 0 && (
              <motion.span
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center"
              >
                {notifCount}
              </motion.span>
            )}
          </motion.button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center">
                  <p className="font-bold text-sm text-gray-900 dark:text-gray-100">Notifikasi</p>
                  <button className="text-xs text-primary font-semibold hover:underline">Tandai semua dibaca</button>
                </div>
                {notifications.map((n, i) => (
                  <div key={i} className={`px-4 py-3 flex gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${n.unread ? '' : 'opacity-60'}`}>
                    <span className="text-lg">{n.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 dark:text-gray-200 font-medium leading-tight">{n.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                    {n.unread && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1.5"></div>}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200 dark:border-gray-800">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary/20">
            U
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight">User</p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
