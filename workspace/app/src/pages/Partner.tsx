import { useEffect, useState } from "react";

export default function Partner() {
  const [code, setCode] = useState("");
  const [sessionCode, setSessionCode] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("partnerCode");
    if (saved) setSessionCode(saved);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    localStorage.setItem("partnerCode", code.trim());
    setSessionCode(code.trim());
  };

  if (!sessionCode) {
    return (
      <div className="min-h-screen grid place-items-center bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 p-6">
        <div className="w-full max-w-md rounded-xl border border-black/10 dark:border-white/10 p-6">
          <h1 className="text-xl font-semibold mb-2">Partner login</h1>
          <p className="text-sm text-gray-600 dark:text-zinc-400 mb-4">Enter the secret code your partner shared with you.</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter partner code"
              className="w-full rounded-md border border-black/10 dark:border-white/10 px-3 py-2 bg-white dark:bg-zinc-950"
            />
            <button className="w-full rounded-md bg-rose-500 hover:bg-rose-600 text-white px-4 py-2">Continue</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-zinc-100">
      <header className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-semibold">Partner View</div>
        <button
          onClick={() => {
            localStorage.removeItem("partnerCode");
            setSessionCode(null);
          }}
          className="text-sm rounded-md border px-3 py-1"
        >
          Sign out
        </button>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div className="rounded-lg border p-4">
          <h2 className="font-medium">Current phase</h2>
          <p className="text-gray-600 dark:text-zinc-400">Premenstrual (example)</p>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="font-medium">How to support</h2>
          <ul className="list-disc pl-5 text-gray-600 dark:text-zinc-400">
            <li>Offer rest and comfort</li>
            <li>Be patient and attentive</li>
          </ul>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="font-medium">Cycle health</h2>
          <p className="text-gray-600 dark:text-zinc-400">Looks healthy (example)</p>
        </div>
      </main>
    </div>
  );
}