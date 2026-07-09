"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

export interface ReportNotification {
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

interface NotificationContextType {
  notifications: ReportNotification[];
  addNotification: (notif: Omit<ReportNotification, "id" | "timestamp" | "unread">) => void;
  dismissNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<ReportNotification[]>([
    {
      id: "notif-001",
      type: "validator_report",
      icon: "📋",
      title: "Laporan Validator Baru",
      description: "Laporan validator PRJ-004 sudah masuk dan siap untuk validasi",
      timestamp: new Date(Date.now() - 15 * 60000),
      unread: true,
      urgent: true,
      projectId: "PRJ-004",
      projectName: "Pembangunan Masjid Jami' An-Nur",
      validatorName: "Ahmad Fauzi",
      validatorScore: 92,
      href: "/admin/approval",
      data: {
        milestone: 60,
        kondisi: "Baik",
        summary: "Pembangunan berjalan sesuai jadwal dengan progress 60%",
        region: "Jawa Barat",
        dana: "Rp 1.2M",
        photos: 5,
      },
    },
  ]);

  const addNotification = useCallback(
    (notif: Omit<ReportNotification, "id" | "timestamp" | "unread">) => {
      const newNotif: ReportNotification = {
        ...notif,
        id: `notif-${Date.now()}`,
        timestamp: new Date(),
        unread: true,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    },
    []
  );

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        dismissNotification,
        markAsRead,
        clearAll,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification harus digunakan dalam NotificationProvider");
  }
  return context;
}
