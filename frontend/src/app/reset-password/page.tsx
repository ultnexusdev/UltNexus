"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "../../lib/store/useAuthStore";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { resetPassword, isLoading, error, clearError } = useAuthStore();

  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-strong p-8 rounded-2xl border border-white/10 text-center text-red-400">
          <AlertCircle size={48} className="mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Invalid Link</h2>
          <p>The password reset link is missing or invalid.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    const isSuccess = await resetPassword({ token, newPassword: password });
    if (isSuccess) {
      setSuccess(true);
      setTimeout(() => router.push("/"), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-strong p-8 rounded-2xl border border-white/10 animate-scale-in">
        {success ? (
          <div className="text-center text-green-400">
            <CheckCircle2 size={48} className="mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Password Reset!</h2>
            <p className="text-[var(--foreground-muted)] mb-4">Your password has been changed successfully.</p>
            <p className="text-xs text-[var(--foreground-muted)]">Redirecting to login...</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Set New Password</h2>
            <p className="text-[var(--foreground-muted)] mb-6 text-center text-sm">
              Enter your new password below.
            </p>

            {error && (
              <div className="p-3 mb-4 text-sm text-red-200 border border-red-500/30 bg-red-500/10 rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password (min 6 characters)"
                  required
                  minLength={6}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] transition-all"
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full btn-primary !rounded-xl !py-3.5 flex items-center justify-center gap-2"
              >
                {isLoading && <Loader2 size={18} className="animate-spin" />}
                Reset Password
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
