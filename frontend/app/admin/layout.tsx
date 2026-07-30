"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAdminToken, getAdminUser } from "@/lib/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Bypass protection check on the login page itself
    if (pathname === "/admin/login") {
      setIsAuthorized(true);
      return;
    }

    // Check for valid token and user session
    const token = getAdminToken();
    const user = getAdminUser();

    if (!token || !user) {
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  if (!isAuthorized && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen bg-[#0B1B33] flex items-center justify-center text-white font-bold text-sm">
        Verifying administrator session...
      </div>
    );
  }

  return <>{children}</>;
}
