"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminBranchesPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin?tab=branches");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-500">
      Loading Admin Portal...
    </div>
  );
}
