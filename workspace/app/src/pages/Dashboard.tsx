import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100">
      <header className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-semibold">Bloom</div>
        <div className="flex items-center gap-3">
          <div className="text-sm">{user?.email}</div>
          <button onClick={logout} className="text-sm rounded-md border px-3 py-1">Logout</button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        <h1 className="text-2xl font-bold">Period Tracking Dashboard</h1>
        <p className="text-gray-600 dark:text-zinc-400">Calendar, symptoms, moods, and AI insights will go here.</p>
        <Link to="/partner" className="underline">Share partner view</Link>
      </main>
    </div>
  );
}