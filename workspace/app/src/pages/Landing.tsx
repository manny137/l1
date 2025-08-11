import { useState } from "react";
import AuthModal from "../components/AuthModal";
import { Link } from "react-router-dom";

export default function Landing() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white dark:from-zinc-950 dark:to-zinc-900 text-gray-900 dark:text-zinc-100">
      <nav className="flex items-center justify-between max-w-6xl mx-auto px-6 py-4">
        <div className="font-bold text-xl">Bloom</div>
        <div className="flex items-center gap-4">
          <Link to="/partner" className="text-sm hover:underline">Partner login</Link>
          <button onClick={() => setOpen(true)} className="rounded-full bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 transition">Login / Sign up</button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 grid items-center gap-10 py-20 md:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Understand and support the cycle, together.</h1>
          <p className="text-lg text-gray-600 dark:text-zinc-400">Track periods, symptoms, and moods. Get gentle insights powered by AI. Share a private partner code so the person you love can support you without sharing personal details.</p>
          <div className="flex gap-3">
            <button onClick={() => setOpen(true)} className="rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2">Get started</button>
            <Link to="/partner" className="rounded-lg border border-black/10 dark:border-white/10 px-4 py-2">I have a partner code</Link>
          </div>
        </div>
        <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 bg-white/70 dark:bg-zinc-950/60 backdrop-blur">
          <div className="aspect-[4/3] w-full rounded-xl bg-gradient-to-br from-rose-200 via-rose-100 to-rose-50 dark:from-rose-900/40 dark:via-rose-900/20 dark:to-rose-900/10" />
        </div>
      </main>

      <AuthModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}