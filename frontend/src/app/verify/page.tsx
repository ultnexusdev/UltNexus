"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "../../lib/store/useAuthStore";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const { verifyEmail } = useAuthStore();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing token.");
      return;
    }

    const verify = async () => {
      const success = await verifyEmail(token);
      if (success) {
        setStatus("success");
        setMessage("Your email has been successfully verified! You can now log in.");
        setTimeout(() => router.push("/"), 3000);
      } else {
        setStatus("error");
        setMessage("Verification failed. The token might be invalid or expired.");
      }
    };

    verify();
  }, [token, verifyEmail, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-strong p-8 rounded-2xl border border-white/10 text-center animate-scale-in">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4 text-[var(--foreground-muted)]">
            <Loader2 className="animate-spin text-[var(--accent-primary)]" size={48} />
            <p>Verifying your email...</p>
          </div>
        )}
        
        {status === "success" && (
          <div className="flex flex-col items-center gap-4 text-green-400">
            <CheckCircle2 size={48} />
            <h2 className="text-xl font-bold text-white">Verified!</h2>
            <p className="text-sm text-[var(--foreground-muted)]">{message}</p>
            <p className="text-xs text-[var(--foreground-muted)] mt-4">Redirecting...</p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-4 text-red-400">
            <XCircle size={48} />
            <h2 className="text-xl font-bold text-white">Verification Failed</h2>
            <p className="text-sm text-[var(--foreground-muted)]">{message}</p>
            <button 
              onClick={() => router.push("/")}
              className="btn-primary mt-4"
            >
              Return Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
