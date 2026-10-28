"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Clock,
  Ticket,
  Gift,
  HelpCircle,
  LogOut,
  User,
} from "lucide-react";
import { useState } from "react";
import { clearSessionCookie } from "@/lib/auth";

export function Header({ className }: { className?: string }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: null },
    { href: "/schedule", label: "Schedule", icon: <Clock size={18} strokeWidth={2} /> },
    { href: "/events", label: "Events", icon: <Ticket size={18} strokeWidth={2} /> },
    { href: "/wishlist", label: "Wishlist", icon: <Gift size={18} strokeWidth={2} /> },
    { href: "/faq", label: "FAQ", icon: <HelpCircle size={18} strokeWidth={2} /> },
  ];

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <header className={`sticky top-0 z-50 border-b border-burgundy/10 bg-white/95 backdrop-blur supports-[backdrop-blur]:bg-white/80 ${className || ""}`}>
      <div className="section flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-burgundy flex items-center justify-center">
            <span className="text-xs font-bold text-white">CE</span>
          </div>
          <span className="font-serif font-semibold text-lg tracking-tight text-charcoal">
            The Creator Edit
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "text-burgundy"
                  : "text-charcoal hover:text-burgundy"
              }`}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              {item.label}
            </Link>
          ))}
          <Link
            href="/signin"
            className="text-sm font-medium text-burgundy hover:text-burgundy-dark underline"
          >
            Sign in
          </Link>
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="text-charcoal"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-burgundy/10 bg-white">
          <div className="section flex flex-col gap-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 py-3 text-lg font-medium transition-colors ${
                  pathname === item.href
                    ? "text-burgundy bg-burgundy/5"
                    : "text-charcoal hover:text-burgundy"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 py-3 text-lg font-medium text-burgundy hover:bg-burgundy/5 transition-colors"
            >
              <LogOut size={18} strokeWidth={2} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}