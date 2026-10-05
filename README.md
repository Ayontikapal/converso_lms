# Converso — Real-Time AI Teaching & Study Companion SaaS

Converso is a production-ready, full-stack micro-SaaS platform built with Next.js 15, Vapi AI, Supabase, Clerk Auth, and Stripe. It enables users to build customized AI study companions for any academic subject, practice interactive voice lessons hands-free, track session histories, and upgrade subscriptions.

---

## 🚀 Feature Overview

- **Real-Time Voice AI Sessions**: Fluid, low-latency audio conversations with AI tutors (powered by Vapi, ElevenLabs, Deepgram, and OpenAI GPT-4o).
- **Custom Companion Builder**: Define companion names, subjects, topics, formal/casual teaching styles, voice models, and estimated session durations.
- **Session History & Auto-Sync**: Completed lessons automatically update at the top of the **Recent Sessions** list.
- **Transcript Summary & Export**: Instant single-click copy for notes and `.md` file markdown export.
- **Stripe Integration & Webhooks**: Production-ready Stripe Checkout flow and webhook endpoint (`/api/stripe/webhook`) for automatic tier upgrades.
- **Plan Limit Controls**: Enforce basic (3 companion limit), core (10 companion limit), or pro (unlimited) user permissions.

---

## 🛠️ Tech Stack & Architecture

- **Frontend / Framework**: Next.js 15 (App Router, React Server Components, Server Actions)
- **Styling**: Tailwind CSS, Shadcn UI primitives, Lottie React animations
- **Authentication**: Clerk (`@clerk/nextjs`)
- **Database**: Supabase PostgreSQL (`companions` and `session_history` tables)
- **Voice Orchestration**: Vapi Web SDK (`@vapi-ai/web`)
- **Payments**: Stripe Checkout & Webhook API (`stripe`)

---

## 📦 Getting Started (Quick Setup Guide)

### 1. Clone the repository & Install Dependencies

```bash
git clone https://github.com/your-username/converso-saas.git
cd my-app
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env.local` and populate your API credentials:

```bash
cp .env.example .env.local
```

### 3. Database Schema (Supabase SQL)

Run the following SQL queries in your Supabase SQL Editor:

```sql
-- Create Companions Table
CREATE TABLE companions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  voice TEXT NOT NULL,
  style TEXT NOT NULL,
  duration INT DEFAULT 15,
  author TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Session History Table
CREATE TABLE session_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  companion_id UUID REFERENCES companions(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💳 Stripe Webhook Configuration (Local Testing)

1. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli).
2. Forward events to your local endpoint:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```
3. Copy the secret key (`whsec_...`) printed in your terminal into `STRIPE_WEBHOOK_SECRET` inside `.env.local`.

---

## 📹 Demo Walkthrough Script

1. **Sign In**: Log in using Clerk authentication.
2. **Explore Library**: Navigate to `/companions` to browse existing study companions.
3. **Build Companion**: Go to `/companions/new` to create a custom AI assistant.
4. **Voice Lesson**: Launch a session on `/companions/[id]`, click "Start Session", talk/listen to the AI tutor, view real-time soundwaves and live transcripts.
5. **Export Notes**: Click "Copy Summary" or "Export Notes (.md)" to save session notes.
6. **End Session**: Click "End Session". Notice automatic redirect to `/my-journey` with the session showing **first** in the list.
