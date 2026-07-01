"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { toast } from "react-hot-toast";

export default function SetUsernamePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, token } = useAuthStore();
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If user profile is already completed, redirect to home
  if (user?.isProfileCompleted) {
    router.push("/");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/auth/set-username`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(t('AUTH.USERNAME_SET_SUCCESS', 'Username successfully set!'));
        // In a real app, you might want to refresh the user data here or update the store
        window.location.href = '/'; 
      } else {
        toast.error(t(data.message) || t('AUTH.USERNAME_SET_FAILED', 'Failed to set username.'));
      }
    } catch (error) {
      toast.error(t('AUTH.NETWORK_ERROR', 'Network error. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--background-secondary)] rounded-2xl p-8 border border-[var(--border-color)]">
        <h1 className="text-2xl font-bold text-center mb-2">Welcome to UltNexus!</h1>
        <p className="text-sm text-center text-gray-400 mb-8">
          Please choose a username to complete your profile.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              required
              pattern="^[A-Za-z0-9_.]+$"
              title="Only letters, numbers, underscores and dots are allowed"
              className="w-full px-4 py-3 bg-[var(--background-primary)] border border-[var(--border-color)] rounded-xl focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
              placeholder="e.g. John_Doe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !username}
            className="w-full py-3 bg-[var(--accent-primary)] hover:bg-opacity-90 text-white rounded-xl font-medium transition-all disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
