"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin?tab=applications");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">
      Loading Admin Portal...
    </div>
  );
}
