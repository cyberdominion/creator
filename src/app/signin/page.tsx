"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User as UserIcon, ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionTitle } from "@/components/ui";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header className="bg-white border-none" />
      <main className="flex-1">
        <div className="section flex items-center justify-center min-h-[calc(100vh-160px)]">
          <div className="w-full max-w-md">
            <SectionTitle className="text-left mb-8">Sign In</SectionTitle>
            <form onSubmit={handleSubmit} className="space-y-5 bg-white p-8 border border-gray-100 rounded-xl shadow-sm">
              {error && (
                <div className="p-3 bg-red-50 text-red-600 text-sm rounded border border-red-100">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-burgundy focus:border-transparent transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-sm"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
              <p className="text-center text-sm text-gray-500">
                Don't have an account? Contact the administrator to get access.
              </p>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}