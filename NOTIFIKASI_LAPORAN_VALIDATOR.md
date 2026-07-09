# Fitur: Notifikasi Laporan Validator ke Superadmin

## 📋 Overview

Sistem notifikasi baru yang memungkinkan admin menerima notifikasi real-time ketika validator mengirimkan laporan, sehingga dapat segera divalidasi dan dipublikasikan di portal publik.

**Alur Kerja:**
1. Validator mengirim laporan → Notifikasi otomatis ke Admin/Superadmin
2. Superadmin melihat notifikasi di bell icon di Topbar
3. Superadmin membuka panel notifikasi untuk melihat detail laporan
4. Superadmin dapat membuka tab "Laporan Validator" untuk validasi menyeluruh
5. Setelah divalidasi → Laporan dapat dipublikasikan

---

## 🏗️ Arsitektur Sistem

### 1. **NotificationContext** (`src/context/NotificationContext.tsx`)
Context global untuk mengelola notifikasi di seluruh aplikasi.

**Fitur:**
- Menyimpan daftar notifikasi dengan tipe berbeda
- Mengelola status unread/read
- Support untuk notifikasi urgent dengan animasi

**Tipe Notifikasi:**
```typescript
- "validator_report": Laporan dari validator
- "vendor_validation": Validasi vendor
- "approval": Approval proyek
- "general": Notifikasi umum
```

### 2. **Topbar Component** (`src/components/layout/Topbar.tsx`)
Bell icon di header yang menampilkan notifikasi.

**Perubahan:**
- Menggunakan `useNotification()` hook
- Filter notifikasi berdasarkan role (superadmin vs user lain)
- Real-time unread counter
- Animasi shake pada urgent notification

### 3. **ReportDetailPanel** (`src/components/ReportDetailPanel.tsx`)
Komponen reusable untuk menampilkan detail laporan validator.

**Menampilkan:**
- Info validator dan skor kepatuhan
- Detail laporan (milestone, kondisi, foto, lokasi)
- Tombol aksi (Validasi/Publikasi)

### 4. **Validator Laporan Page** (`src/app/(dashboards)/validator/laporan/page.tsx`)
Update untuk trigger notifikasi saat laporan disubmit.

**Trigger Notifikasi:**
```typescript
const handleSubmit = () => {
  setSubmitted(true);
  
  // Trigger notifikasi ke admin
  addNotification({
    type: "validator_report",
    icon: "📋",
    title: "Laporan Validator Baru Masuk",
    projectName: form.project,
    // ... data lainnya
  });
};
```

### 5. **Admin Approval Page** (`src/app/(dashboards)/admin/approval/page.tsx`)
Update dengan tab baru untuk mengelola laporan validator.

**Tab Baru:**
- **Approval Proyek**: Untuk approval proyek reguler
- **Laporan Validator**: Untuk mengelola notifikasi laporan validator

---

## 🎯 Fitur Utama

### Notifikasi di Topbar
- **Bell Icon** dengan badge unread counter
- **Animasi shake** untuk notifikasi urgent
- **Animated dropdown** untuk melihat daftar notifikasi
- **Click action** untuk membuka halaman relevant

### Tab Laporan Validator
- **Daftar laporan** yang masuk dengan status unread
- **Detail panel** untuk melihat informasi lengkap
- **Real-time scoring** dari validator
- **Tombol aksi**: Validasi atau Publikasi langsung

### Integrasi Notification Context
```typescript
import { useNotification } from "@/context/NotificationContext";

// Di dalam component
const { notifications, addNotification, dismissNotification } = useNotification();

// Tambah notifikasi baru
addNotification({
  type: "validator_report",
  icon: "📋",
  title: "Laporan Validator Baru Masuk",
  urgent: true,
  projectId: "PRJ-004",
  projectName: "Pembangunan Masjid Jami' An-Nur",
  // ... data lainnya
});
```

---

## 📱 Workflow Lengkap

### Dari Sisi Validator:
1. **Validator** login ke dashboard
2. **Validator** membuka "Laporan Progres"
3. **Validator** melengkapi form 4-step:
   - Step 1: Face check-in dengan selfie
   - Step 2: Pilih proyek & milestone
   - Step 3: Upload foto & kondisi
   - Step 4: Review & kirim
4. **Submit laporan** → Notifikasi otomatis terkirim ke Admin

### Dari Sisi Admin/Superadmin:
1. **Admin** melihat **bell icon beranimasi** di Topbar
2. **Admin** klik bell icon → dropdown notifikasi muncul
3. **Admin** bisa langsung klik notifikasi untuk lihat detail atau
4. **Admin** buka tab **"Laporan Validator"** untuk kelola semua laporan
5. **Admin** klik tombol **"✓ Validasi"** → laporan divalidasi
6. **Admin** klik tombol **"🎉 Publikasi"** → laporan dipublikasikan
7. **Toast success** menampilkan hasil aksi

---

## 🔧 Cara Menggunakan

### Menambah Notifikasi Baru di Komponen Lain

```typescript
"use client";
import { useNotification } from "@/context/NotificationContext";

export default function MyComponent() {
  const { addNotification } = useNotification();

  const handleSomeEvent = () => {
    addNotification({
      type: "validator_report",
      icon: "📋",
      title: "Laporan Baru",
      description: "Ada laporan validator yang perlu divalidasi",
      urgent: true,
      projectId: "PRJ-004",
      projectName: "Proyek A",
      validatorName: "Ahmad Fauzi",
      validatorScore: 92,
      href: "/admin/approval",
      data: {
        milestone: 60,
        kondisi: "Baik",
        summary: "Progress berjalan baik",
        region: "Jawa Barat",
        dana: "Rp 1.2M",
        photos: 5,
      },
    });
  };

  return (
    <button onClick={handleSomeEvent}>
      Trigger Notifikasi
    </button>
  );
}
```

### Menggunakan ReportDetailPanel

```typescript
import { ReportDetailPanel } from "@/components/ReportDetailPanel";

<ReportDetailPanel
  notification={notification}
  onApprove={() => handleApprove(notification)}
  onReject={() => handleReject(notification)}
  onPublish={() => handlePublish(notification)}
/>
```

---

## 📊 Data Structure

### ReportNotification Interface
```typescript
interface ReportNotification {
  id: string;
  type: "validator_report" | "vendor_validation" | "approval" | "general";
  icon: string;
  title: string;
  description: string;
  timestamp: Date;
  unread: boolean;
  urgent: boolean;
  projectId: string;
  projectName: string;
  validatorName?: string;
  validatorScore?: number;
  href?: string;
  data?: {
    milestone?: number;
    kondisi?: string;
    summary?: string;
    region?: string;
    dana?: string;
    photos?: number;
  };
}
```

---

## 🚀 Fitur Lanjutan (Future Enhancement)

### Backend Integration
Untuk produksi, integrasikan dengan backend:

```typescript
// Fetch notifikasi dari API
useEffect(() => {
  const fetchNotifications = async () => {
    const res = await fetch("/api/notifications");
    const data = await res.json();
    // Update context dengan data dari server
  };
  fetchNotifications();
}, []);

// WebSocket untuk real-time notification
useEffect(() => {
  const ws = new WebSocket("ws://api.example.com/notifications");
  ws.onmessage = (event) => {
    const notif = JSON.parse(event.data);
    addNotification(notif);
  };
  return () => ws.close();
}, []);
```

### Database Schema
```sql
CREATE TABLE notifications (
  id VARCHAR(36) PRIMARY KEY,
  type VARCHAR(50),
  user_id VARCHAR(36),
  project_id VARCHAR(36),
  title TEXT,
  description TEXT,
  icon VARCHAR(10),
  unread BOOLEAN DEFAULT TRUE,
  urgent BOOLEAN DEFAULT FALSE,
  data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (project_id) REFERENCES projects(id)
);
```

### API Endpoints
```
GET /api/notifications                    # Dapatkan semua notifikasi user
GET /api/notifications/unread             # Dapatkan notifikasi unread
POST /api/notifications/:id/read          # Tandai notifikasi sebagai read
DELETE /api/notifications/:id             # Hapus notifikasi
POST /api/notifications/clear-all         # Hapus semua notifikasi
```

---

## 🎨 Customization

### Mengubah Warna/Icon Notifikasi
Edit di `ReportDetailPanel.tsx`:

```typescript
<div className="bg-orange-50 dark:bg-orange-900/20 ...">
  {/* Ubah warna di sini */}
</div>
```

### Menambah Tipe Notifikasi Baru
1. Update interface di `NotificationContext.tsx`
2. Tambah case baru di filter logic
3. Buat styling untuk tipe baru

---

## ✅ Testing Checklist

- [x] Notifikasi muncul saat validator submit laporan
- [x] Bell icon beranimasi untuk urgent notification
- [x] Dropdown notifikasi berfungsi
- [x] Detail panel menampilkan info lengkap
- [x] Tab "Laporan Validator" menampilkan daftar
- [x] Tombol validasi dan publikasi berfungsi
- [x] Toast notification muncul saat aksi
- [x] Responsive design di mobile/tablet
- [x] Dark mode support

---

## 📝 Notes

### Session Storage
Notifikasi saat ini disimpan di React state (local). Pada refresh page, notifikasi akan reset ke default.

**Solusi:**
- Implementasikan localStorage untuk persistent storage
- Atau gunakan backend API dengan database

### Real-time Updates
Untuk real-time notification saat validator submit laporan:
- Integrasikan WebSocket atau Server-Sent Events (SSE)
- Atau gunakan polling dengan interval pendek

### Performance
- Notification list di-virtualize jika > 50 items
- Pagination untuk daftar laporan yang banyak

---

## 🆘 Troubleshooting

### Notifikasi tidak muncul
- Pastikan `NotificationProvider` wraps root `<children>` di `layout.tsx`
- Check browser console untuk error
- Verifikasi `useNotification()` hook digunakan di component yang tepat

### Styling tidak sesuai dark mode
- Ensure dark class variant ada di Tailwind config
- Check `next-themes` setup di root layout

### Layout shift pada dropdown
- Set fixed height untuk notification panel
- Atau gunakan `position: fixed` dengan proper positioning

---

Generated dengan Kiro Agent
Last Updated: July 9, 2026
