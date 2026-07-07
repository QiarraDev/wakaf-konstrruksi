"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarItem {
  name: string;
  href: string;
  icon: string;
}
interface SidebarProps {
  roleName: string;
  items: SidebarItem[];
}

export function Sidebar({ roleName, items }: SidebarProps) {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <aside className="sidebar-premium w-64 h-screen flex flex-col fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-200 dark:border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <span className="font-bold text-lg text-gray-900 dark:text-white tracking-tight">Wakaf Konstruksi</span>
        </Link>
      </div>

      {/* Role Badge */}
      <div className="px-6 py-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400/80 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full uppercase tracking-widest">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
          {roleName}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-3">
        <p className="text-[10px] font-bold text-gray-400 dark:text-white/20 uppercase tracking-widest px-3 mb-2">Menu</p>
        <ul className="space-y-0.5">
          {items.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <span className="text-base w-5 text-center leading-none">{item.icon}</span>
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="ml-auto w-1.5 h-1.5 bg-emerald-400 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-4 py-4 border-t border-gray-200 dark:border-white/5">
        <Link
          href="/auth"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 dark:text-red-400/70 dark:hover:text-red-400 dark:hover:bg-red-500/10 transition-all text-sm font-medium"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span>Ganti Role</span>
        </Link>
      </div>
    </aside>
  );
}
