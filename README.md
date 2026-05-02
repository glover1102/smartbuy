# SmartBuy 🛒

> **Make Your Membership Pay For Itself**

Split bulk purchases from Costco, Sam's Club, and BJ's with people in your ZIP code. Save 30–50% on everyday essentials while your neighbors do the same.

SmartBuy is a neighborhood cost-sharing platform for warehouse clubs. Post a bulk buy, invite neighbors in your ZIP code to claim shares, and everyone pays only their portion — no full membership required.

## Features

- 🛒 **Browse bulk buys** filtered by ZIP code
- ✉️ **Magic-link auth** — no passwords, just click the link in your email
- 🤝 **Claim splits** and track how many spots remain
- 💬 **Comment** on listings to coordinate pickup
- 📊 **Status tracking** (Open → Full → Purchased → Completed)
- 📱 **Mobile-first** responsive design

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript strict |
| Styling | Tailwind CSS |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth.js — email magic-link |
| Validation | Zod |
| Package manager | pnpm |
| Deploy | Railway (Nixpacks) |

## Local Development

### Prerequisites

- **Node.js 20+**
- **pnpm** — `npm install -g pnpm`
- **PostgreSQL** — local install, [Railway](https://railway.app), or [Neon](https://neon.tech) (free tier works great)

### Setup

```bash
# 1. Clone
git clone https://github.com/glover1102/smartbuy.git
cd smartbuy

# 2. Install dependencies
pnpm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local — fill in DATABASE_URL and generate a secret:
#   openssl rand -base64 32   → paste as NEXTAUTH_SECRET

# 4. Run migrations (creates all tables)
pnpm prisma migrate dev --name init

# 5. (Optional) seed sample bulk buys
pnpm db:seed

# 6. Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

> **Dev tip:** Magic-link emails are printed to the **terminal** in development — just copy the URL from the console output; no real email provider needed.

## Deploy to Railway (step-by-step)

> Railway docs: <https://docs.railway.app>

### 1. Create a Railway project

1. Sign in at [railway.app](https://railway.app) and click **New Project**.
2. Choose **Deploy from GitHub repo** and connect your GitHub account if prompted.
3. Select the `glover1102/smartbuy` repository (or your fork).

### 2. Add a PostgreSQL database

1. In your Railway project dashboard, click **+ New** → **Database** → **Add PostgreSQL**.
2. Railway provisions a Postgres instance and automatically injects `DATABASE_URL` into your project environment. ✅

### 3. Set environment variables

In the Railway project → **Variables** tab, add:

| Variable | Value |
|---|---|
| `DATABASE_URL` | *(auto-set by Postgres plugin)* |
| `NEXTAUTH_URL` | `https://<your-app>.railway.app` |
| `NEXTAUTH_SECRET` | output of `openssl rand -base64 32` |

For production email (optional — see below):

| Variable | Value |
|---|---|
| `EMAIL_SERVER_HOST` | `smtp.resend.com` (or your SMTP host) |
| `EMAIL_SERVER_PORT` | `465` |
| `EMAIL_SERVER_USER` | `resend` |
| `EMAIL_SERVER_PASSWORD` | your Resend API key |
| `EMAIL_FROM` | `SmartBuy <noreply@yourdomain.com>` |

### 4. Deploy

Railway detects the `railway.toml` at the repo root and runs:

```
pnpm install && prisma generate && prisma migrate deploy && next build
```

Migrations run automatically on every deploy. When the build finishes, your app is live at `https://<your-app>.railway.app`.

### 5. (Optional) seed production data

Open a Railway shell or run locally against the production `DATABASE_URL`:

```bash
DATABASE_URL="<prod-url>" pnpm db:seed
```

## Swapping Email Providers for Production

By default the app logs magic-link URLs to the console in `NODE_ENV=development`. For production, set SMTP environment variables (see above). Two popular options:

### Resend

1. Create an account at [resend.com](https://resend.com), verify your domain.
2. Generate an API key.
3. Set `EMAIL_SERVER_HOST=smtp.resend.com`, `EMAIL_SERVER_PORT=465`, `EMAIL_SERVER_USER=resend`, `EMAIL_SERVER_PASSWORD=<api-key>`.

### SendGrid

1. Create account at [sendgrid.com](https://sendgrid.com), verify sender.
2. Create an API key with *Mail Send* permission.
3. Set `EMAIL_SERVER_HOST=smtp.sendgrid.net`, `EMAIL_SERVER_PORT=587`, `EMAIL_SERVER_USER=apikey`, `EMAIL_SERVER_PASSWORD=<api-key>`.

No code changes needed — the auth module reads from environment variables automatically.

## Scripts Reference

| Script | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript check |
| `pnpm test` | Vitest unit tests |
| `pnpm db:migrate:deploy` | Run pending migrations (production) |
| `pnpm db:seed` | Seed sample data |

## License

MIT © 2025 SmartBuy Contributors
