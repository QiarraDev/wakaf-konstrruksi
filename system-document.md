# System Document: Wakaf Konstruksi Platform

## 1. Project Overview
**Wakaf Konstruksi** is a digital platform designed to facilitate and manage endowment funds (wakaf) specifically targeted towards construction projects such as mosques, schools, Islamic centers, and public wells. 

## 2. Core Actors & Ecosystem
Platform ini menghubungkan 4 aktor utama dengan ekosistem yang terintegrasi:

### 2.1. Pengelola Aset
- **Kategori**: Takmir Masjid (DMI), Pondok Pesantren, Komunitas/Perangkat Desa (Lurah, RT/RW).
- **Fitur Utama**: Tools Konsultasi, Arsitek/Desain, RAB, Brief Assessment.
- **Alur Kerja Utama**: Membuat Proposal ➔ RAB ➔ Desain ➔ Brief Assessment Bangunan.

### 2.2. Wakif (Donatur)
- **Kategori**: Individu, Institusi (LazizMu, Dompet Dhuafa, LazizNu).
- **Fitur Utama**: Memilih program wakaf, memantau *timeline* secara *real-time* dan transparan.

### 2.3. Admin (Sistem)
- **Kategori**: Super Admin (Akses Penuh), Admin Biasa (Akses Terbatas).
- **Fitur Utama**: 
  - Approval/Verifikasi pengajuan pengelola aset.
  - Kurasi dan Pendistribusian Proyek ke Vendor berdasar daerah.
  - Validasi mitra Vendor (SDM, Toko, Arsitek).
  - LMS Edukasi Konstruksi Bangunan.

### 2.4. Vendor (Eksekutor)
- **Kategori**: Vendor Resmi, Swakelola.
- **Fitur Utama Vendor Resmi**: Kontrak Legal, Eksekusi & Timeline, Pengawasan, Kontraktor, Validasi RAB, Reporting Progres (Setiap kelipatan 20% dapat mengajukan termin *payment*).
- **Fitur Utama Swakelola**: Wajib ada Validasi Sistem dan Sertifikasi SDM/Vendor.

## 3. Technical Specifications
- **Frontend**: Next.js 15+ (App Router) with React 19+.
- **Language**: TypeScript.
- **Styling**: Tailwind CSS v4.
- **Architecture**: Multiple Route Groups `(dashboards)` for distinct user role interfaces.
