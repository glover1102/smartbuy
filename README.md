# SmartBuy

> **Make Your Membership Pay For Itself** — Split bulk warehouse purchases with neighbors and save up to 70%.

SmartBuy is a neighborhood cost-sharing platform for Costco, Sam's Club, and BJ's Wholesale. Post a bulk buy, split it with neighbors in your ZIP code, and everyone pays only their share.

## Features

- 🛒 **Browse bulk buys** by ZIP code
- ✉️ **Magic-link auth** (no passwords)
- 🤝 **Claim splits** and track progress
- 💬 **Comment** on listings
- 📊 **Status tracking** (Open → Full → Purchased → Completed)

## Tech Stack

- **Next.js 14** (App Router) + TypeScript (strict mode)
- **Tailwind CSS** for styling
- **Prisma ORM** + PostgreSQL
- **NextAuth.js** (email magic-link)
- **Zod** for validation
- **pnpm** as package manager

## Local Development

### Prerequisites

- Node.js 20+
- pnpm (`npm install -g pnpm`)
- PostgreSQL (local or [Railway](https://railway.app) / [Neon](https://neon.tech))

### Setup

```bash
# Clone the repo
git clone https://github.com/yourorg/smartbuy.git
cd smartbuy

# Install dependencies
pnpm install

# Copy env example
cp .env.example .env.local

# Edit .env.local with your DATABASE_URL, NEXTAUTH_SECRET
# Generate a secret: openssl rand -base64 32

# Run database migrations
pnpm prisma migrate dev --name init

# Seed sample data
pnpm db:seed

# Start dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

In dev mode, magic-link emails are **printed to the console** — no email provider needed.

## Deploy to Railway

Set environment variables:
- `DATABASE_URL` — from Railway PostgreSQL
- `NEXTAUTH_URL` — your Railway app URL
- `NEXTAUTH_SECRET` — run `openssl rand -base64 32`

## License

MIT © 2025 SmartBuy Contributors 🛒

**Make Your Membership Pay For Itself.**

Split bulk purchases from Costco, Sam's Club, and BJ's with people in your zip code. Save 30–50% on everyday essentials while your neighbors do the same.

> 🚧 This repository is being scaffolded. The full Next.js + Prisma + Railway-deployable MVP is on the way in the first pull request.
