import Link from "next/link";

export default function AuthPage() {
  const roles = [
    {
      id: "pengelola",
      name: "Pengelola Aset",
      description: "Takmir Masjid, Pesantren, Komunitas Desa",
      path: "/pengelola",
      icon: "🕌",
      color: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:border-emerald-500",
    },
    {
      id: "wakif",
      name: "Wakif (Donatur)",
      description: "Individu & Institusi (LazizMu, Dompet Dhuafa, dll)",
      path: "/wakif",
      icon: "🤲",
      color: "bg-amber-50 text-amber-700 border-amber-200 hover:border-amber-500",
    },
    {
      id: "admin",
      name: "Admin Platform",
      description: "Super Admin & Admin Biasa (Verifikasi & Kurasi)",
      path: "/admin",
      icon: "🛡️",
      color: "bg-blue-50 text-blue-700 border-blue-200 hover:border-blue-500",
    },
    {
      id: "vendor",
      name: "Mitra Vendor",
      description: "Vendor Resmi & Swakelola (Eksekusi Proyek)",
      path: "/vendor",
      icon: "🏗️",
      color: "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl text-center space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Portal Simulasi Login
          </h1>
          <p className="text-foreground/60 text-lg">
            Pilih peran Anda untuk masuk ke dalam ekosistem Wakaf Konstruksi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
          {roles.map((role) => (
            <Link
              key={role.id}
              href={role.path}
              className={`flex items-start p-6 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${role.color}`}
            >
              <div className="text-4xl mr-4">{role.icon}</div>
              <div className="text-left">
                <h3 className="text-xl font-bold">{role.name}</h3>
                <p className="opacity-80 mt-1">{role.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="pt-8">
          <Link href="/" className="text-primary font-medium hover:underline">
            &larr; Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
