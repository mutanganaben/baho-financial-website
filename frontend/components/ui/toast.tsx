"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  showToast: (title: string, message?: string, type?: ToastType) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
  warning: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, message?: string, type: ToastType = "info") => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, title, message }]);

      // Auto dismiss after 4 seconds
      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  const success = useCallback(
    (title: string, message?: string) => showToast(title, message, "success"),
    [showToast]
  );

  const error = useCallback(
    (title: string, message?: string) => showToast(title, message, "error"),
    [showToast]
  );

  const info = useCallback(
    (title: string, message?: string) => showToast(title, message, "info"),
    [showToast]
  );

  const warning = useCallback(
    (title: string, message?: string) => showToast(title, message, "warning"),
    [showToast]
  );

  return (
    <ToastContext.Provider value={{ showToast, success, error, info, warning }}>
      {children}
      {/* Toast Render Portal Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-md w-full pointer-events-none px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start space-x-3 p-4 rounded-2xl border shadow-xl backdrop-blur-md transition-all animate-in slide-in-from-bottom-5 duration-300 ${
              toast.type === "success"
                ? "bg-emerald-950/90 text-emerald-100 border-emerald-800"
                : toast.type === "error"
                ? "bg-rose-950/90 text-rose-100 border-rose-800"
                : toast.type === "warning"
                ? "bg-amber-950/90 text-amber-100 border-amber-800"
                : "bg-slate-900/90 text-slate-100 border-slate-800"
            }`}
          >
            {toast.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            )}
            {toast.type === "error" && (
              <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            )}
            {toast.type === "warning" && (
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            )}
            {toast.type === "info" && (
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            )}

            <div className="flex-1 space-y-0.5 text-xs">
              <div className="font-extrabold text-sm leading-snug">{toast.title}</div>
              {toast.message && (
                <div className="text-slate-300 font-medium leading-relaxed">{toast.message}</div>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
