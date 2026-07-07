"use client";
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: ReactNode;
  roleName: string;
  sidebarItems: { name: string; href: string; icon: string }[];
}

export function DashboardLayout({ children, roleName, sidebarItems }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex" style={{ background: 'var(--background)' }}>
      <Sidebar roleName={roleName} items={sidebarItems} />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Topbar />
        <motion.main
          className="flex-1 p-8 overflow-auto"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
