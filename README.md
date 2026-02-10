# Premium Portfolio

A production-ready, animated personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, next-themes, and lucide-react.

## Setup

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Customize Content
All content lives in:
- `src/content/portfolio.ts`

Update:
- `profile` for name, title, tagline, location, email, socials
- `skills`, `projects`, `experience`, `education`, `testimonials`
- `resumeUrl` to point to your resume file (drop a PDF into `public/`)

## Customize Theme
Global styles and theme overrides:
- `src/app/globals.css`
- Tailwind tokens in `tailwind.config.js`

Quick wins:
- Update `colors.neon` in `tailwind.config.js`
- Adjust `.glass` in `src/app/globals.css` for blur/shadow strength

## Structure
- `src/app/page.tsx` — composition of sections
- `src/components/sections/*` — page sections
- `src/components/ui/*` — reusable UI primitives

## Notes
- Motion respects `prefers-reduced-motion`.
- For contact form, the submit action opens a mailto link with prefilled content.
- The AI assistant UI is ready; connect it to AWS Bedrock + Railway Postgres to enable live responses.

## Replace Resume
1. Add a file like `public/resume.pdf`
2. Update `profile.resumeUrl` in `src/content/portfolio.ts`

## Deployment
Build for production:
```bash
npm run build
npm run start
```

---

If you want more sections, a blog, or CMS integration, say the word and we can extend it.

## AI Assistant (Railway + Bedrock)
This project includes a production-ready RAG skeleton.

### 1) Initialize Railway Postgres
Run this SQL in Railway’s query editor:
```sql
-- sql/railway-init.sql
```

### 2) Add environment variables
Copy `.env.example` to `.env.local` and fill in:
- `DATABASE_URL` (use Railway public URL for local dev)
- `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- `BEDROCK_CHAT_MODEL_ID`, `BEDROCK_EMBED_MODEL_ID`

### 3) Add your knowledge pack
Edit `data/assistant/knowledge.json` with your real resume/FAQ content.

### 4) Ingest into Railway
```bash
node scripts/ingest.mjs
```

### 5) Test the chat
Run dev server and open the chat drawer; messages will call `/api/chat`.
