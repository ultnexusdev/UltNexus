"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { UserRound, Mail, Calendar, LogOut } from "lucide-react";

// Mock i18n function for profile page
const t = (key: string) => {
  const translations: Record<string, string> = {
    "profile.title": "Your Profile",
    "profile.account_details": "Account Details",
    "profile.username": "Username",
    "profile.email": "Email Address",
    "profile.member_since": "Member Since",
    "profile.logout": "Log Out",
    "profile.edit": "Edit Profile",
  };
  return translations[key] || key;
};

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuthStore();
  const router = useRouter();

  // Protect route
  useEffect(() => {
    // If not loading and no user, redirect to home
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (!user) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center shadow-lg shadow-purple-500/20">
          <UserRound size={32} className="text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {t("profile.title")}
          </h1>
          <p className="text-[var(--foreground-muted)]">
            {user.username}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-strong rounded-2xl border border-white/10 p-6 overflow-hidden relative">
            {/* Decorative background glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--accent-primary)] rounded-full blur-[80px] opacity-20 pointer-events-none"></div>

            <h2 className="text-xl font-semibold text-white mb-6">
              {t("profile.account_details")}
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[var(--foreground-muted)]">
                  <UserRound size={20} />
                </div>
                <div>
                  <p className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider font-semibold mb-1">
                    {t("profile.username")}
                  </p>
                  <p className="text-sm font-medium text-white">{user.username}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[var(--foreground-muted)]">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider font-semibold mb-1">
                    {t("profile.email")}
                  </p>
                  <p className="text-sm font-medium text-white">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[var(--foreground-muted)]">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-[var(--foreground-muted)] uppercase tracking-wider font-semibold mb-1">
                    {t("profile.member_since")}
                  </p>
                  <p className="text-sm font-medium text-white">June 2026</p> {/* Mock date for now */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-4">
          <div className="glass-strong rounded-2xl border border-white/10 p-6 flex flex-col gap-3">
            <button className="w-full btn-primary !rounded-xl !py-3">
              {t("profile.edit")}
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium"
            >
              <LogOut size={18} />
              {t("profile.logout")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
