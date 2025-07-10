import React from "react";
import Link from "next/link";
import clsx from "clsx";

// PUBLIC_INTERFACE
export default function LayoutContainer({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900">
      <header className="flex justify-between items-center py-4 px-6 border-b bg-[#0070f3] text-white">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            QuickPost
          </Link>
        </div>
        <div>
          {/* Login/Profile control slot */}
          <UserProfileButton />
        </div>
      </header>
      <div className="flex-1 flex flex-row min-h-0">
        <aside className="hidden md:block bg-[#f8fafc] min-w-[220px] max-w-[260px] border-r">
          {sidebar}
        </aside>
        <main className={clsx(
          "flex-1 p-3 md:p-6",
          "w-full md:w-auto",
        )}>{children}</main>
      </div>
    </div>
  );
}

// UserProfileButton is placeholder, will be filled with authentication integration logic.
function UserProfileButton() {
  // This will show the auth button or user menu
  // For now, just a placeholder for profile/login/signup
  return (
    <Link href="/auth" className="rounded px-3 py-1 bg-[#f5a623] text-white font-semibold hover:opacity-90">
      Login / Profile
    </Link>
  );
}
