import Link from "next/link";
import { Film, Tv, Sparkles, BookOpen, Globe, ExternalLink } from "lucide-react";

const categories = [
  { label: "Movies", href: "/movies", icon: Film },
  { label: "Series", href: "/series", icon: Tv },
  { label: "Animes", href: "/animes", icon: Sparkles },
  { label: "Books", href: "/books", icon: BookOpen },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center text-white font-bold text-sm">
                U
              </div>
              <span className="text-xl font-bold tracking-tight">
                <span className="gradient-text">Ult</span>
                <span className="text-white">Nexus</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--foreground-dim)] max-w-xs leading-relaxed">
              Your ultimate entertainment hub. Track, rate, and discover
              movies, series, animes, and books — all in one place.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                className="p-2 rounded-lg bg-white/5 text-[var(--foreground-dim)] hover:text-white hover:bg-white/10 transition-all"
                aria-label="Twitter"
              >
                <Globe size={16} />
              </a>
              <a
                href="https://github.com/ultnexusdev/UltNexus"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 text-[var(--foreground-dim)] hover:text-white hover:bg-white/10 transition-all"
                aria-label="GitHub"
              >
                <ExternalLink size={16} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <li key={cat.href}>
                    <Link
                      href={cat.href}
                      className="flex items-center gap-2 text-sm text-[var(--foreground-dim)] hover:text-white transition-colors"
                    >
                      <Icon size={14} />
                      {cat.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {["About", "Contact", "Privacy Policy", "Terms of Service"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-[var(--foreground-dim)] hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--foreground-dim)]">
            © {new Date().getFullYear()} UltNexus. All rights reserved.
          </p>
          <p className="text-xs text-[var(--foreground-dim)]">
            Built with ♥ for entertainment lovers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
