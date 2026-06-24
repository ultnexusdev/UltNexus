"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Film, Tv, Sparkles, BookOpen, Search, Menu, X, LogOut, 
  User, ChevronDown, UserRound, Users, Shield, Star, List, 
  Settings, Sliders 
} from "lucide-react";
import { useAuthStore } from "../lib/store/useAuthStore";

// Mock i18n function
const t = (key: string) => {
  const translations: Record<string, string> = {
    "nav.profile": "Profile",
    "nav.friends": "Friends",
    "nav.clubs": "Clubs",
    "nav.reviews": "Reviews",
    "nav.personal_lists": "Personal Lists",
    "nav.account_settings": "Account Settings",
    "nav.preferences": "Preferences",
    "nav.logout": "Log Out",
  };
  return translations[key] || key;
};
import AuthModal from "./AuthModal";

const navLinks = [
  { label: "Movies", href: "/movies", icon: Film },
  { label: "Series", href: "/series", icon: Tv },
  { label: "Animes", href: "/animes", icon: Sparkles },
  { label: "Books", href: "/books", icon: BookOpen },
];

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle click outside for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileOpen(false);
    router.push("/");
  };
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");

  const openAuth = (tab: "login" | "register") => {
    setAuthTab(tab);
    setIsAuthModalOpen(true);
    setMobileOpen(false);
  };

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
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold tracking-widest uppercase text-[var(--foreground-muted)] hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300"
                >
                  <Icon size={14} />
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
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                    <UserRound size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">
                    {user.username}
                  </span>
                  <ChevronDown size={14} className={`text-[var(--foreground-muted)] transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl glass-strong border border-white/10 shadow-xl overflow-hidden animate-fade-in">
                    <div className="p-1">
                      <Link href="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--foreground-muted)] hover:text-white hover:bg-white/10 transition-all">
                        <User size={16} /> {t("nav.profile")}
                      </Link>
                      <Link href="#" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--foreground-muted)] hover:text-white hover:bg-white/10 transition-all">
                        <Users size={16} /> {t("nav.friends")}
                      </Link>
                      <Link href="#" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--foreground-muted)] hover:text-white hover:bg-white/10 transition-all">
                        <Shield size={16} /> {t("nav.clubs")}
                      </Link>
                      
                      <div className="h-px bg-white/10 my-1" />
                      
                      <Link href="#" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--foreground-muted)] hover:text-white hover:bg-white/10 transition-all">
                        <Star size={16} /> {t("nav.reviews")}
                      </Link>
                      <Link href="#" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--foreground-muted)] hover:text-white hover:bg-white/10 transition-all">
                        <List size={16} /> {t("nav.personal_lists")}
                      </Link>

                      <div className="h-px bg-white/10 my-1" />

                      <Link href="#" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--foreground-muted)] hover:text-white hover:bg-white/10 transition-all">
                        <Settings size={16} /> {t("nav.account_settings")}
                      </Link>
                      <Link href="#" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[var(--foreground-muted)] hover:text-white hover:bg-white/10 transition-all">
                        <Sliders size={16} /> {t("nav.preferences")}
                      </Link>

                      <div className="h-px bg-white/10 my-1" />

                      <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-all">
                        <LogOut size={16} /> {t("nav.logout")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => openAuth("login")}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-[var(--foreground-muted)] hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuth("register")}
                  className="btn-primary !py-2 !px-5 !text-sm !rounded-xl"
                >
                  Get Started
                </button>
              </>
            )}
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
              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all"
                  >
                     <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center">
                      <UserRound size={16} className="text-white" />
                     </div>
                     <span className="font-medium">{user.username} (Profile)</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-center text-sm font-medium text-red-400 hover:bg-red-400/10 transition-all"
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => openAuth("login")}
                    className="px-4 py-3 rounded-xl text-center text-sm font-medium text-[var(--foreground-muted)] hover:text-white hover:bg-white/5 transition-all"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuth("register")}
                    className="btn-primary justify-center !rounded-xl"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialTab={authTab}
      />
    </nav>
  );
}
