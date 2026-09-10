"use client";

import React from "react";

export const WhatsAppFloating: React.FC = () => {
  const phoneNumber = "250788381721";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hello%20BAHO%20Financial%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  return (
    <aside
      aria-label="WhatsApp Quick Contact"
      className="fixed bottom-6 right-6 z-50 flex items-center group"
    >
      {/* Tooltip */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 bg-slate-900/90 backdrop-blur text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-slate-800">
        Chat with us on WhatsApp
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with BAHO Financial on WhatsApp (+250 788 381 721)"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.6)] transform hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-400/50 cursor-pointer"
      >
        {/* WhatsApp Icon */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.11L7.79 18.93L4.66 19.75L5.49 16.7L5.29 16.38C4.54 15.19 4.14 13.57 4.14 11.91C4.14 7.37 7.84 3.67 12.04 3.67ZM8.83 7.37C8.64 7.37 8.34 7.44 8.08 7.72C7.82 8.01 7.08 8.7 7.08 10.12C7.08 11.54 8.11 12.91 8.26 13.1C8.4 13.3 10.26 16.17 13.11 17.4C15.48 18.42 15.96 18.22 16.48 18.17C17 18.12 18.15 17.49 18.39 16.82C18.63 16.14 18.63 15.56 18.56 15.44C18.49 15.32 18.3 15.25 18.01 15.11C17.72 14.96 16.3 14.27 16.03 14.17C15.77 14.07 15.58 14.02 15.39 14.31C15.19 14.6 14.63 15.26 14.46 15.45C14.29 15.65 14.12 15.67 13.83 15.53C13.54 15.38 12.61 15.08 11.51 14.1C10.65 13.33 10.07 12.38 9.9 12.09C9.73 11.8 9.88 11.64 10.03 11.5C10.16 11.37 10.32 11.16 10.47 10.99C10.61 10.82 10.66 10.69 10.76 10.5C10.86 10.31 10.81 10.14 10.74 10C10.66 9.85 10.08 8.42 9.84 7.84C9.6 7.27 9.36 7.35 9.18 7.34C9.01 7.33 8.83 7.37 8.83 7.37Z" />
        </svg>
      </a>
    </aside>
  );
};
