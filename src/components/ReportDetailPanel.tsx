"use client";
import { motion } from "framer-motion";
import { ReportNotification } from "@/context/NotificationContext";

interface ReportDetailPanelProps {
  notification: ReportNotification;
  onApprove?: () => void;
  onReject?: () => void;
  onPublish?: () => void;
}

export function ReportDetailPanel({
  notification,
  onApprove,
  onReject,
  onPublish,
}: ReportDetailPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-start gap-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-4">
        <span className="text-3xl flex-shrink-0">{notification.icon}</span>
        <div className="flex-1">
          <h3 className="font-black text-lg text-gray-900 dark:text-white">
            {notification.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {notification.projectName}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-bold bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300 px-2 py-1 rounded">
              ID: {notification.projectId}
            </span>
            <span className="text-xs text-gray-500">
              {notification.timestamp.toLocaleTimeString("id-ID")}
            </span>
          </div>
        </div>
      </div>

      {/* Validator Info */}
      {notification.validatorName && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 space-y-3">
          <p className="font-bold text-blue-900 dark:text-blue-300">👤 Validator</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-700 dark:text-blue-400">
              {notification.validatorName}
            </span>
            <span className="text-sm font-bold text-blue-700 dark:text-blue-400">
              Skor: {notification.validatorScore}/100
            </span>
          </div>
          <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${notification.validatorScore}%`,
              }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600"
            />
          </div>
          {notification.validatorScore && notification.validatorScore >= 75 && (
            <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">
              ✅ Memenuhi standar minimum untuk publikasi
            </p>
          )}
        </div>
      )}

      {/* Laporan Data */}
      {notification.data && (
        <div className="space-y-3">
          <p className="font-bold text-sm text-gray-700 dark:text-gray-300">
            📊 Detail Laporan
          </p>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
            {[
              [
                "Milestone Progres",
                `${notification.data.milestone}%`,
                "text-primary",
              ],
              ["Kondisi", notification.data.kondisi, "text-gray-900"],
              ["Wilayah", notification.data.region, "text-gray-900"],
              ["Dana RAB", notification.data.dana, "text-gray-900"],
              ["Foto Diunggah", `${notification.data.photos} foto`, "text-gray-900"],
            ].map(([label, value, color]) => (
              <div
                key={label}
                className="flex justify-between items-center px-4 py-3 text-sm"
              >
                <span className="text-gray-500 dark:text-gray-400">{label}</span>
                <span className={`font-bold ${color} dark:text-gray-100`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary */}
      {notification.data?.summary && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-4 rounded-xl">
          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-2">
            Ringkasan Laporan
          </p>
          <p className="text-sm text-emerald-800 dark:text-emerald-300 leading-relaxed">
            {notification.data.summary}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      {(onApprove || onReject || onPublish) && (
        <div className="flex gap-2 pt-3 border-t border-gray-200 dark:border-gray-800">
          {onReject && (
            <button
              onClick={onReject}
              className="flex-1 py-2.5 px-3 rounded-lg border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              ✕ Tolak
            </button>
          )}
          {onApprove && (
            <button
              onClick={onApprove}
              className="flex-1 py-2.5 px-3 rounded-lg border-2 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 font-bold text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              ✓ Validasi
            </button>
          )}
          {onPublish && (
            <button
              onClick={onPublish}
              className="flex-1 py-2.5 px-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-sm hover:-translate-y-0.5 transition-transform shadow-lg shadow-emerald-500/30"
            >
              🎉 Publikasi
            </button>
          )}
        </div>
      )}

      {/* Urgent Badge */}
      {notification.urgent && (
        <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 px-3 py-2 rounded-lg">
          <span className="animate-pulse">🔴</span>
          Laporan Menunggu Validasi
        </div>
      )}
    </motion.div>
  );
}
