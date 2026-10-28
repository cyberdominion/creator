"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Calendar,
  Ticket,
  Link as LinkIcon,
  FileText,
  Settings,
  Shield,
  LogOut,
  ChevronRight,
  Mail,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { clearSessionCookie } from "@/lib/auth";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} strokeWidth={2} /> },
  { href: "/admin/profile", label: "Profile & Branding", icon: <User size={20} strokeWidth={2} /> },
  { href: "/admin/schedule", label: "Schedule", icon: <Calendar size={20} strokeWidth={2} /> },
  { href: "/admin/events", label: "Events & Tickets", icon: <Ticket size={20} strokeWidth={2} /> },
  { href: "/admin/links", label: "Links & Wishlist", icon: <LinkIcon size={20} strokeWidth={2} /> },
  { href: "/admin/content", label: "Content & FAQ", icon: <FileText size={20} strokeWidth={2} /> },
  { href: "/admin/settings", label: "Settings", icon: <Settings size={20} strokeWidth={2} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          router.push("/signin");
        }
      } catch {
        router.push("/signin");
      } finally {
        setAuthChecked(true);
      }
    }
    checkAuth();
  }, [router]);

  if (!authChecked) {
    return null;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-charcoal text-white transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="flex h-16 items-center justify-between px-6 border-b border-burgundy/20">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-burgundy flex items-center justify-center">
              <span className="text-xs font-bold text-white">CE</span>
            </div>
            <span className="font-serif font-bold text-lg tracking-tight">
              Creator Admin
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="lg:hidden p-2 text-white hover:bg-burgundy/30 rounded"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <ChevronRight size={20} strokeWidth={2} /> : <ChevronRight size={20} strokeWidth={2} rotate={180} />}
          </button>
        </div>

        <nav className="mt-6 space-y-1 px-4">
          {adminNav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-burgundy text-white"
                    : "text-gray-300 hover:bg-burgundy/10 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-burgundy/20">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut size={18} strokeWidth={2} />
            Sign out
          </button>
        </div>
      </aside>

      <div className={`lg:pl-64 ${sidebarOpen ? "lg:pl-64" : ""}`}>
        <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 lg:px-8">
            <button
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="lg:hidden p-2 text-charcoal hover:bg-gray-100 rounded"
              aria-label="Toggle sidebar"
            >
              <ChevronRight size={20} strokeWidth={2} />
            </button>
            <div className="flex items-center gap-4">
              <span className="hidden sm:block text-sm font-medium text-charcoal">
                Welcome back
              </span>
              <div className="w-8 h-8 rounded-full bg-burgundy flex items-center justify-center text-white font-bold text-xs">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="px-6 lg:px-8 py-8">{children}</main>
      </div>
    </div>
);
}
