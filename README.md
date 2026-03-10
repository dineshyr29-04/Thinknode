# ThinkNode — Freelancer Dashboard

This is a local, open-source React dashboard (Vite + Tailwind) for managing clients, projects, invoices and payments.

Summary of recent changes
- New Invoice Generator page with live preview, print/export options (HTML, JSON, Print/PDF via browser).
- Invoice numbers auto-increment using localStorage (`thinknode_inv_counter`).
- When an invoice is saved in the Invoice Generator it now creates/updates an entry in the Payments list (keeps any manually changed payment status).
- Payments page: responsive mobile card view plus desktop table and interactive status dropdown (Paid / Pending / Partial).
- Settings page redesigned as a full-page responsive grid; Change Password fields are hidden inside profile edit mode.
- Central AppContext rewritten to provide cascading updates across clients, projects and payments and to push sync logs to the Dashboard.

Export & Save behavior (free, client-side)
- Export options are all implemented client-side — no external paid service is used.
- Print: uses `window.print()` to send invoice to printer.
- Save as PDF: opens a clean preview in a popup and triggers the browser print dialog (choose "Save as PDF").
- Download HTML: generates a standalone `.html` file and downloads it to your computer via a blob URL.
- Download JSON: downloads the invoice data as `.json` for backups.

Payments sync
- Saving an invoice from the Invoice Generator creates a Payments entry (or updates an existing one) in the shared in-app data store. If the Payments entry already exists, the code updates client, amount and dates but preserves the current status so manual edits in Payments are retained.

Connecting two sites to a shared server (overview)
If you have two separate frontend sites (two repos) and want them to share the same data and appear in one place:

1. Create a small backend API (Node/Express, FastAPI, or similar) with endpoints like `/api/payments`, `/api/invoices`, `/api/clients`.
2. Host one database (Postgres, MySQL, MongoDB, or Supabase) and have the backend talk to it.
3. Configure both frontend apps to use the same `VITE_API_URL` environment variable (pointing to the backend). Both sites will then read/write the same data.
4. Use JWT-based auth for unified login across both sites.

Free hosting options:
- Frontends: Vercel or Netlify (free tiers)
- Backend: Render / Railway / Fly / Railway free tier or small VPS
- Database: Supabase (Postgres), or MongoDB Atlas free tier

Developer setup (local)
1. Install dependencies:
```bash
npm install
```
2. Start the dev server:
```bash
npm run dev
```
3. Open the app (Vite will show the localhost URL). The app uses localStorage for a few features (invoice counter, theme preference).

Environment variables
- If you wire the app to a remote backend, add a `.env` (Vite) with:
```env
VITE_API_URL=https://your-backend.example.com
```

Notes & next steps
- The current app uses an in-memory / local dummy dataset (see `src/data/dummyData.js`) and a client-side store (`src/context/AppContext.jsx`). To use a shared server, replace calls in `AppContext` with fetch/Axios calls to the backend endpoints and persist data in a database.
- I can scaffold a minimal backend repo (Express + simple REST endpoints + sample DB schema) and show the exact changes needed in this repo to talk to it — say the word and I will create the backend scaffold and update `AppContext` to call the API.

If you want, I can now:
- Scaffold a simple backend repo (Express + SQLite or Postgres) and provide run instructions.
- Update `src/context/AppContext.jsx` to fetch from the API instead of using local dummy data.

---
Made March 2026 — ThinkNode local dev snapshot