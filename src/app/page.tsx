"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PublicNav } from "@/components/layout/PublicNav";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute top-[40%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-teal-500/10 blur-[120px]" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-[0.03]" />
      </div>

      {/* Navbar */}
      <PublicNav />

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center py-20 px-6 lg:px-12 z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-primary-dark dark:text-emerald-400 font-bold text-xs uppercase tracking-widest mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Marketplace Konstruksi Wakaf Terpercaya
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Marketplace{" "}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 relative inline-block">
              Wakaf-Konstruksi
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-2 bg-emerald-500/20 rounded-full blur-sm"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-10 font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            yang menjamin setiap rupiah
            {" "}<span className="text-primary font-black">menjadi bangunan nyata.</span>
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link href="/auth" className="w-full sm:w-auto px-8 py-4 bg-gray-900 dark:bg-emerald-600 hover:bg-black dark:hover:bg-emerald-500 text-white rounded-xl font-bold text-lg shadow-xl shadow-gray-900/20 dark:shadow-emerald-600/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              Jelajahi Ekosistem
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m12 16 4-4-4-4"/><path d="M8 12h8"/></svg>
            </Link>
            <Link href="/demo" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl font-bold text-lg shadow-sm transition-all flex items-center justify-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              Lihat Demo Workflow
            </Link>
          </motion.div>

          {/* Staggered Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-20 mt-12 border-t border-gray-200/60 dark:border-gray-800/60"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {[
              { label: "Proyek Terkelola", value: "120+", icon: "🏗️" },
              { label: "Total Anggaran", value: "Rp 12M", icon: "💰" },
              { label: "Vendor Tervalidasi", value: "45", icon: "✅" },
              { label: "Skor Transparansi", value: "98%", icon: "📊" },
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col items-center justify-center space-y-3 p-4 rounded-2xl hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all cursor-default">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-2xl border border-gray-100 dark:border-gray-700">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white tracking-tight">{stat.value}</div>
                <div className="text-xs md:text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
