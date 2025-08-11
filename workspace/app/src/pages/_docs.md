# Learning notes

- Firebase Auth: client SDK manages sessions. Providers include Google and Email/Password. We subscribe with `onAuthStateChanged` and expose methods via context.
- Routing: `BrowserRouter` + `Routes` + `ProtectedRoute` to guard private pages.
- Modal UX: blur the background using `backdrop-blur` and animate show/hide using `framer-motion`'s `AnimatePresence`.
- Tailwind v4: `@import "tailwindcss"` in CSS, no content array. Utility classes are available at runtime via PostCSS.
- Env vars: use `VITE_*` keys. Copy `.env.example` to `.env` and fill Firebase values.

Next:
1) Add Firestore data model (cycles, entries, symptoms) and partner code logic.
2) Implement calendar UI and CRUD operations.
3) Add AI API integration (HuggingFace Space) and insights panel.
4) Deploy to Vercel and configure Firebase Auth domains.