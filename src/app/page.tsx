import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="glass sticky top-0 z-50 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            W
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            Wakaf Konstruksi
          </span>
        </div>
        <Link href="/auth" className="hidden md:flex items-center gap-6 text-sm font-medium">
          <span className="hover:text-primary transition-colors">Beranda</span>
          <span className="hover:text-primary transition-colors">Daftar Proyek</span>
          <span className="hover:text-primary transition-colors">Transparansi</span>
        </Link>
        <Link href="/auth" className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full font-medium transition-colors">
          Masuk Portal
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center py-20 px-6 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary-dark font-medium text-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Platform Wakaf Konstruksi Terpercaya
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Bangun Kebaikan <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Beramal Jariyah
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Platform digital transparan untuk mendukung pembangunan Masjid, Pesantren, Madrasah, dan fasilitas sosial Islam lainnya di seluruh Indonesia.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-full font-bold text-lg shadow-lg shadow-primary/30 transition-all hover:-translate-y-1">
              Lihat Proyek Aktif
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-foreground border border-gray-200 hover:border-primary hover:text-primary rounded-full font-bold text-lg shadow-sm transition-all">
              Pelajari Lebih Lanjut
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-16 border-t border-gray-100">
            {[
              { label: "Proyek Selesai", value: "120+" },
              { label: "Donatur Aktif", value: "15.000+" },
              { label: "Total Wakaf", value: "Rp 12 M" },
              { label: "Vendor Terverifikasi", value: "45" },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-3xl font-black text-foreground">{stat.value}</div>
                <div className="text-sm font-medium text-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
