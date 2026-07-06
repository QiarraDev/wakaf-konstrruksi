# System Design: Wakaf Konstruksi Platform

## 1. Architecture Overview
- **Framework**: Next.js (App Router)
- **Routing**: Group routing based on 4 Actor Dashboards (`(dashboards)`)
- **Styling**: Tailwind CSS v4
- **Auth Simulation (MVP)**: Role-based mock login (`/auth`) to easily switch between Pengelola, Wakif, Admin, and Vendor.

## 2. Updated Data Models

### 2.1. User (Aktor Ekosistem)
- `id`: string (UUID)
- `name`: string
- `role`: enum ('PENGELOLA', 'WAKIF', 'ADMIN', 'SUPER_ADMIN', 'VENDOR')
- `type`: string (e.g., 'Individu', 'LazizMu', 'Takmir', 'Swakelola')
- `region`: string

### 2.2. Project (Proposal Konstruksi)
- `id`: string (UUID)
- `pengelolaId`: string (FK)
- `vendorId`: string (FK, nullable until distributed)
- `title`: string
- `category`: string (Masjid, Pesantren, dll)
- `status`: enum ('DRAFT', 'SUBMITTED', 'APPROVED', 'IN_PROGRESS', 'COMPLETED')
- `targetAmount`: number
- `collectedAmount`: number

### 2.3. Project Documents (RAB & Desain)
- `id`: string (UUID)
- `projectId`: string (FK)
- `rabData`: JSON (Breakdown biaya)
- `designFiles`: Array of URLs
- `briefAssessment`: text
- `isRABValidatedByVendor`: boolean

### 2.4. Project Milestones (Progres Eksekusi)
- `id`: string (UUID)
- `projectId`: string (FK)
- `progressPercentage`: number (e.g., 20, 40, 60, 80, 100)
- `reportDetails`: text
- `evidenceImages`: Array of URLs
- `paymentRequested`: boolean
- `paymentStatus`: enum ('PENDING', 'APPROVED', 'PAID')

### 2.5. WakafTransaction (Donasi)
- `id`: string (UUID)
- `projectId`: string (FK)
- `wakifId`: string (FK)
- `amount`: number
- `status`: string ('Success', 'Pending')

## 3. UI/UX Guidelines
- **Color Palette**: Emerald Green (Primary), Amber (Secondary), Off-white (Background).
- **Dashboard Layouts**: Persistent Sidebar specific to the active Role. Clean data tables and distinct visual progress trackers for the 20% milestone steps.
