"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/adminpanel/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      disabled={busy}
      className="text-sm text-red-600 transition-opacity hover:opacity-70 disabled:opacity-50"
    >
      Log out
    </button>
  );
}
