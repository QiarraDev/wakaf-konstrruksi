import Link from "next/link";
import { ReactNode } from "react";

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
  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-gray-100 flex items-center justify-center">
        <Link href="/" className="font-bold text-xl text-primary tracking-tight">
          Wakaf Konstruksi
        </Link>
      </div>
      
      <div className="p-4 bg-gray-50 text-sm font-medium text-gray-500 uppercase tracking-wider text-center">
        {roleName} Dashboard
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {items.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-primary/10 hover:text-primary transition-colors font-medium"
              >
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <Link
          href="/auth"
          className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium text-sm"
        >
          🚪 Keluar (Ganti Role)
        </Link>
      </div>
    </aside>
  );
}
