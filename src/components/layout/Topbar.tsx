"use client";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { useNotification } from "@/context/NotificationContext";

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);
  const { notifications, unreadCount, markAsRead } = useNotification();

  // Detect if we're in admin dashboard
  const isAdminDashboard = pathname.startsWith("/admin");
  const isSuperAdmin = isAdminDashboard; // Simplified for now

  // Filter notifications based on role
  const filteredNotifications = isSuperAdmin
    ? notifications
    : notifications.filter((n) => n.type !== "approval");

  const unreadCountFiltered = filteredNotifications.filter(
    (n) => n.unread
  ).length;

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
            className="relative p-2 text-gray-500 hover:text-primary transition-colors rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {/* Bell icon with shake animation when urgent notif exists */}
            <motion.svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={
                isSuperAdmin &&
                filteredNotifications.some((n) => n.urgent && n.unread)
                  ? { rotate: [0, 15, -15, 10, -10, 0] }
                  : {}
              }
              transition={{
                repeat: Infinity,
                repeatDelay: 3,
                duration: 0.5,
              }}
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </motion.svg>

            {/* Badge merah berkedip untuk urgent */}
            {unreadCountFiltered > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center">
                {isSuperAdmin &&
                  filteredNotifications.some((n) => n.urgent && n.unread) && (
                    <span className="absolute inline-flex w-4 h-4 rounded-full bg-red-400 opacity-75 animate-ping"></span>
                  )}
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative w-4 h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center"
                >
                  {unreadCountFiltered}
                </motion.span>
              </span>
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
                  <p className="font-bold text-sm text-gray-900 dark:text-gray-100">
                    Notifikasi {unreadCountFiltered > 0 && `(${unreadCountFiltered})`}
                  </p>
                  <button
                    onClick={() => {
                      setNotifOpen(false);
                    }}
                    className="text-xs text-primary font-semibold hover:underline"
                  >
                    Tutup
                  </button>
                </div>

                {filteredNotifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-gray-400">
                    Tidak ada notifikasi saat ini
                  </div>
                ) : (
                  <div className="max-h-96 overflow-y-auto">
                    {filteredNotifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          if (n.href) {
                            markAsRead(n.id);
                            router.push(n.href);
                            setNotifOpen(false);
                          }
                        }}
                        className={`px-4 py-3 flex gap-3 transition-colors ${
                          n.href ? "cursor-pointer" : ""
                        } ${
                          n.urgent
                            ? "bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30 border-l-4 border-orange-500"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        } ${!n.unread ? "opacity-60" : ""}`}
                      >
                        <span className="text-lg flex-shrink-0">{n.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium leading-tight ${
                              n.urgent
                                ? "text-orange-900 dark:text-orange-300 font-bold"
                                : "text-gray-800 dark:text-gray-200"
                            }`}
                          >
                            {n.title}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                            {n.projectName}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {n.timestamp.toLocaleTimeString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          {n.urgent && n.href && (
                            <span className="text-xs text-orange-600 dark:text-orange-400 font-bold mt-1 inline-block">
                              Klik untuk meninjau →
                            </span>
                          )}
                        </div>
                        {n.unread && (
                          <div
                            className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${
                              n.urgent ? "bg-orange-500" : "bg-primary"
                            }`}
                          ></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-200 dark:border-gray-800">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md ${isAdminDashboard ? 'bg-gradient-to-br from-orange-500 to-amber-500 shadow-orange-500/20' : 'bg-gradient-to-br from-primary to-emerald-600 shadow-primary/20'}`}>
            {isAdminDashboard ? '👑' : 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight">
              {isAdminDashboard ? 'Super Admin' : 'User'}
            </p>
            <p className="text-[11px] text-gray-400 dark:text-gray-500">
              {isAdminDashboard ? 'Pimpinan / Komite' : 'Staff'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

