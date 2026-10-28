import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white border-t border-burgundy/20 mt-auto">
      <div className="section pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-burgundy flex items-center justify-center">
                <span className="text-xs font-bold text-white">CE</span>
              </div>
              <span className="font-serif font-semibold text-lg tracking-tight">
                The Creator Edit
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A premium creator platform for live events, memberships, and community.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-400">
              Platform
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-burgundy-light transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="hover:text-burgundy-light transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-burgundy-light transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-burgundy-light transition-colors">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-400">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link href="/privacy" className="hover:text-burgundy-light transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-burgundy-light transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-burgundy-light transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-burgundy-light transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-400">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <a href="mailto:support@thecreatoredit.com" className="hover:text-burgundy-light transition-colors">
                  support@thecreatoredit.com
                </a>
              </li>
              <li>
                <Link href="/signin" className="hover:text-burgundy-light transition-colors">
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-burgundy-light transition-colors">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-burgundy/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {currentYear} The Creator Edit. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-burgundy-light transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-burgundy-light transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-burgundy-light transition-colors">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}