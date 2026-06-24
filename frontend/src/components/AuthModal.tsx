"use client";

import { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { useAuthStore } from "../lib/store/useAuthStore";

// Mock i18n function. In the future, this will be replaced by next-intl or react-i18next
const t = (key: string) => {
  const translations: Record<string, string> = {
    "auth.login_tab": "Sign In",
    "auth.register_tab": "Create Account",
    "auth.email_placeholder": "Email Address",
    "auth.password_placeholder": "Password",
    "auth.username_placeholder": "Username",
    "auth.submit_login": "Sign In",
    "auth.submit_register": "Create Account",
    "auth.continue_google": "Continue with Google",
    "auth.continue_facebook": "Continue with Facebook",
    "auth.or_continue_with": "or continue with email",
    "AUTH.INVALID_CREDENTIALS": "Invalid email or password.",
    "AUTH.EMAIL_IN_USE": "This email is already registered.",
    "AUTH.USERNAME_TAKEN": "This username is already taken.",
    "AUTH.EMAIL_NOT_VERIFIED": "Please verify your email before logging in.",
    "AUTH.NETWORK_ERROR": "Network error. Please try again later.",
    "VALIDATION.INVALID_EMAIL": "Please provide a valid email.",
    "AUTH.REGISTRATION_SUCCESS": "Registration successful! Please check your email to verify your account.",
  };
  return translations[key] || key;
};

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "login" | "register";
}

export default function AuthModal({ isOpen, onClose, initialTab = "login" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(initialTab);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { login, register, isLoading, error, clearError } = useAuthStore();

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      clearError();
      setSuccessMessage(null);
      setFormData({ username: "", email: "", password: "" });
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab, clearError]);

  const handleTabSwitch = (tab: "login" | "register") => {
    setActiveTab(tab);
    clearError();
    setSuccessMessage(null);
  };

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSuccessMessage(null);

    if (activeTab === "login") {
      const success = await login({ email: formData.email, password: formData.password });
      if (success) onClose();
    } else {
      const success = await register(formData);
      if (success) {
        setSuccessMessage("AUTH.REGISTRATION_SUCCESS");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-md p-6 overflow-hidden shadow-2xl glass-strong rounded-2xl border border-white/10 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[var(--foreground-muted)] hover:text-white hover:bg-white/10 rounded-full transition-all z-10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header / Tabs */}
        <div className="flex items-center gap-6 mb-8 border-b border-white/10">
          <button
            type="button"
            onClick={() => handleTabSwitch("login")}
            className={`pb-3 text-lg font-semibold transition-all relative ${
              activeTab === "login" ? "text-white" : "text-[var(--foreground-muted)] hover:text-white/80"
            }`}
          >
            {t("auth.login_tab")}
            {activeTab === "login" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-t-full" />
            )}
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch("register")}
            className={`pb-3 text-lg font-semibold transition-all relative ${
              activeTab === "register" ? "text-white" : "text-[var(--foreground-muted)] hover:text-white/80"
            }`}
          >
            {t("auth.register_tab")}
            {activeTab === "register" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-t-full" />
            )}
          </button>
        </div>

        {/* Social Logins */}
        <div className="space-y-3 mb-6">
          <button className="flex items-center justify-center w-full gap-3 px-4 py-3 text-sm font-medium text-white transition-all border rounded-xl glass-panel hover:bg-white/5 border-white/10">
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {t("auth.continue_google")}
          </button>
          <button className="flex items-center justify-center w-full gap-3 px-4 py-3 text-sm font-medium text-white transition-all border rounded-xl glass-panel hover:bg-white/5 border-white/10">
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            {t("auth.continue_facebook")}
          </button>
        </div>

        <div className="relative flex items-center py-2 mb-6">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink-0 px-4 text-xs text-[var(--foreground-muted)]">
            {t("auth.or_continue_with")}
          </span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* Messages */}
        {error && (
          <div className="p-3 mb-4 text-sm text-red-200 border border-red-500/30 bg-red-500/10 rounded-xl animate-fade-in">
            {t(error)}
          </div>
        )}
        {successMessage && (
          <div className="p-3 mb-4 text-sm text-green-200 border border-green-500/30 bg-green-500/10 rounded-xl animate-fade-in">
            {t(successMessage)}
          </div>
        )}

        {/* Forms */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === "register" && (
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={t("auth.username_placeholder")}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all"
              />
            </div>
          )}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("auth.email_placeholder")}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t("auth.password_placeholder")}
              required
              minLength={6}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full btn-primary !rounded-xl !py-3.5 mt-2 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader2 size={18} className="animate-spin" />}
            {activeTab === "login" ? t("auth.submit_login") : t("auth.submit_register")}
          </button>
        </form>
      </div>
    </div>
  );
}
