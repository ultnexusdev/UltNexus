"use client";

import Link from "next/link";
import { useState } from "react";
import { Film, Tv, Sparkles, BookOpen, Search, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Movies", href: "/movies", icon: Film },
  { label: "Series", href: "/series", icon: Tv },
  { label: "Animes", href: "/animes", icon: Sparkles },
  { label: "Books", href: "/books", icon: BookOpen },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#06b6d4] flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-110">
              U
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="gradient-text">Ult</span>
              <span className="text-white">Nexus</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-[var(--foreground-muted)] hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  <Icon size={16} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              className="p-2.5 rounded-xl text-[var(--foreground-muted)] hover:text-white hover:bg-white/5 transition-all duration-200"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <Link
              href="#"
              className="px-4 py-2 rounded-xl text-sm font-medium text-[var(--foreground-muted)] hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              Sign In
            </Link>
            <Link
              href="#"
              className="btn-primary !py-2 !px-5 !text-sm !rounded-xl"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-xl text-[var(--foreground-muted)] hover:text-white hover:bg-white/5 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-white/5 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--foreground-muted)] hover:text-white hover:bg-white/5 transition-all"
                >
                  <Icon size={18} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
            <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
              <Link
                href="#"
                className="px-4 py-3 rounded-xl text-center text-sm font-medium text-[var(--foreground-muted)] hover:text-white hover:bg-white/5 transition-all"
              >
                Sign In
              </Link>
              <Link href="#" className="btn-primary justify-center !rounded-xl">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
