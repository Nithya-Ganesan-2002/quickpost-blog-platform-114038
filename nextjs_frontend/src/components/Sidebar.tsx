import React from "react";
import Link from "next/link";

// PUBLIC_INTERFACE
export default function Sidebar() {
  // Replace below with dynamic tag/category list later
  const tags = ["Tech", "Personal", "Travel", "Programming"];
  return (
    <div className="flex flex-col gap-6 px-4 py-8">
      <div>
        <h3 className="text-base font-semibold mb-3 text-[#1a1a1a]">Navigation</h3>
        <ul className="flex flex-col gap-2">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li><Link href="/new" className="hover:underline">New Post</Link></li>
        </ul>
      </div>
      <div>
        <h3 className="text-base font-semibold mb-3 text-[#1a1a1a]">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs rounded bg-[#f5a623] text-white font-semibold cursor-pointer hover:opacity-80">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
