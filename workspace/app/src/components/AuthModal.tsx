import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const { loginWithGoogle, loginWithEmail, signupWithEmail } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
      } else {
        await signupWithEmail(email, password);
      }
      onClose();
      navigate("/app");
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 backdrop-blur-sm bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
          >
            <div className="w-full max-w-md rounded-2xl bg-white text-gray-900 dark:bg-zinc-900 dark:text-zinc-100 shadow-xl border border-black/5">
              <div className="p-6 border-b border-black/5 dark:border-white/10">
                <h2 className="text-xl font-semibold">Welcome</h2>
                <p className="text-sm text-gray-500 dark:text-zinc-400">Login or create an account</p>
              </div>
              <div className="p-6 space-y-4">
                {error && (
                  <div className="text-sm text-red-600 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-md p-2">
                    {error}
                  </div>
                )}
                <button
                  onClick={async () => {
                    setError(null);
                    try {
                      await loginWithGoogle();
                      onClose();
                      navigate("/app");
                    } catch (err: any) {
                      setError(err?.message ?? "Failed to login with Google");
                    }
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
                    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.8 32.5 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 6 .8 8.2 3l5.7-5.7C34.9 6.1 29.7 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/>
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 18.9 13 24 13c3.1 0 6 .8 8.2 3l5.7-5.7C34.9 6.1 29.7 4 24 4 16.1 4 9.5 8.1 6.3 14.7z"/>
                    <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.4l-6.3-5.2C29.1 35.7 26.7 36.5 24 36c-5.2 0-9.6-3.5-11.7-8.2l-6.6 5C9.4 40 16.2 44 24 44z"/>
                    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.3 3.8-5.1 6.5-9.3 6.5-5.2 0-9.6-3.5-11.7-8.2l-6.6 5C9.4 40 16.2 44 24 44c11.1 0 20-8.9 20-20 0-1.2-.1-2.3-.4-3.5z"/>
                  </svg>
                  Continue with Google
                </button>

                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-sm">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
                      placeholder="••••••••"
                    />
                  </div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 hover:opacity-90 disabled:opacity-60"
                  >
                    {loading ? "Please wait…" : mode === "login" ? "Login" : "Sign up"}
                  </button>
                </form>

                <div className="text-sm text-center text-gray-500 dark:text-zinc-400">
                  {mode === "login" ? (
                    <button className="underline" onClick={() => setMode("signup")}>No account? Create one</button>
                  ) : (
                    <button className="underline" onClick={() => setMode("login")}>Have an account? Log in</button>
                  )}
                </div>
              </div>
              <div className="p-4 border-t border-black/5 dark:border-white/10 flex justify-end">
                <button onClick={onClose} className="text-sm px-3 py-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10">Close</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}