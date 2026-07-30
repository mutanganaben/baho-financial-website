"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  if (totalItems === 0 || totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 text-xs font-medium text-slate-500">
      <div>
        Showing <span className="font-bold text-slate-800">{startItem}</span> to{" "}
        <span className="font-bold text-slate-800">{endItem}</span> of{" "}
        <span className="font-bold text-slate-800">{totalItems}</span> records
      </div>

      <div className="flex items-center space-x-1">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="h-8 px-2.5 border-slate-200 text-slate-700 disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4 mr-0.5" />
          <span>Prev</span>
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 rounded-lg font-bold text-xs transition-colors ${
              currentPage === page
                ? "bg-[#0B1B33] text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {page}
          </button>
        ))}

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="h-8 px-2.5 border-slate-200 text-slate-700 disabled:opacity-40"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4 ml-0.5" />
        </Button>
      </div>
    </div>
  );
}
