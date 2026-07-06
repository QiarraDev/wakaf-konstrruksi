import { ReactNode } from "react";

export function Topbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="text-gray-500 font-medium">
        {/* Placeholder for Breadcrumbs or Page Title */}
        Dashboard Overview
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-gray-100">
          🔔
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
          U
        </div>
      </div>
    </header>
  );
}
