"use client";

import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";
import { Button } from "./button";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmText = "Delete",
  cancelText = "Cancel",
  isDanger = true,
  isLoading = false,
  onConfirm,
  onClose,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl relative text-slate-800 animate-in fade-in-50 zoom-in-95 duration-150">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start space-x-4">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              isDanger
                ? "bg-rose-100 text-rose-600 border border-rose-200"
                : "bg-amber-100 text-amber-600 border border-amber-200"
            }`}
          >
            <AlertTriangle className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-black text-baho-navy-dark">{title}</h3>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
          <Button
            type="button"
            onClick={onClose}
            variant="outline"
            disabled={isLoading}
            className="border-slate-300 text-slate-700 text-xs font-bold"
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`font-bold text-xs shadow-md text-white ${
              isDanger
                ? "bg-rose-600 hover:bg-rose-700"
                : "bg-amber-600 hover:bg-amber-700"
            }`}
          >
            {isLoading ? "Processing..." : confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
