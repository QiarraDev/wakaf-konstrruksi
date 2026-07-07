"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";

export function PublicNav() {
  const pathname = usePathname();
  
  const links = [
    { name: "Beranda", href: "/" },
    { name: "Proyek Aktif", href: "/proyek-aktif" },
    { name: "Transparansi", href: "/transparansi" },
    { name: "Cara Kerja", href: "/cara-kerja" },
  ];

  return (
    <motion.nav 
      className="glass sticky top-0 z-50 flex items-center justify-between px-6 py-4 lg:px-12 mx-4 mt-4 rounded-2xl"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-700 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/30">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <span className="font-bold text-xl tracking-tight text-foreground">
          Wakaf Konstruksi
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-600 dark:text-gray-300">
        {links.map((link) => (
          <Link 
            key={link.href} 
            href={link.href} 
            className={`transition-colors ${pathname === link.href ? 'text-primary dark:text-emerald-400' : 'hover:text-primary dark:hover:text-primary-light'}`}
          >
            {link.name}
          </Link>
        ))}
        <ThemeToggle />
      </div>
      <Link href="/auth" className="btn-primary flex items-center gap-2">
        Masuk Portal
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </Link>
    </motion.nav>
  );
}
