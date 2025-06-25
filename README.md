# Manara

**Manara** is a modern full-stack web application built with **Next.js 15**, **TypeScript**, and **TailwindCSS**. It combines powerful backend APIs, AI capabilities via OpenAI SDK, authentication with Clerk, and a dynamic user experience with Radix UI, Leaflet, and interactive maps.

---

## 🚀 Features

- ⚡ **Full-stack Next.js** app with API routes and server-side logic
- 🔐 Authentication & user management via [Clerk](https://clerk.dev/)
- 🧠 AI-powered features using Deepseek + AI SDK
- 🎨 Custom, accessible UI components with Radix UI
- 🗺️ Maps and geolocation with Leaflet
- 🗂️ File upload via Vercel Blob and `react-dropzone`
- 🌐 RTL & LTR support with `postcss-rtlcss` and `tailwindcss-rtl`
- 🌍 Internationalization with `next-intl`
- 🧾 Markdown rendering with `react-markdown`
- 💬 Toast notifications with `sonner`
- 🎯 Form validation via `react-hook-form` + `zod`

---

## 🛠️ Tech Stack

| Layer        | Tech                                     |
|--------------|-------------------------------------------|
| Framework    | Next.js 15 + React 18                     |
| Styling      | TailwindCSS, tailwindcss-animate, RTL CSS |
| Auth         | Clerk                                     |
| AI           | Deepseek, AI SDK                          |
| Forms        | React Hook Form, Zod                      |
| Maps         | Leaflet, Google Maps API                  |
| ORM / DB     | Prisma + Neon / PostgreSQL                |
| Uploads      | Vercel Blob                               |
| Emails       | Nodemailer                                |
| Utils        | Date-fns, uuid, clsx, sonner              |

---

## 📁 Folder Structure

```bash
.
├── src/
│   ├── app/                 # Next.js app directory
│   ├── components/          # UI components
│   ├── providers/           # Map providers
│   ├── lib/                 # Helpers, utils, and integrations
│   ├── server/              # Server-side logic (e.g. API routes, DB)
│   │   ├── db/              # Prisma setup & seeder
│   ├── styles/              # Tailwind & global styles
│   ├── i18n/                # Translations
├── public/                  # Static assets
├── prisma/                  # Prisma schema
├── messages/                # Translation files
```

## 📦 Scripts
```bash
npm run dev        # Run dev server with Turbopack
npm run build      # Generate Prisma client and build project
npm start          # Start production server
npm run seed       # Seed the database
```

## 🧑‍💻 Development
### 1. Install dependencies
```bash
 npm install
```

### 2. Set up environment variables
Create a `.env.local` file and define your values:
```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
DATABASE_URL=your_neon_postgres_url
DEEPSEEK_API_KEY=your_deepseek_api_key
EMAIL_USER=...
EMAIL_PASS=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_BASE_URL=your_vercel_base_url
BLOB_READ_WRITE_TOKEN=your_vercel_blob_api_key
```

### 3. Set up the database
```bash
npx prisma generate
npx prisma migrate dev
npm run seed
```

### 4. Run the app
```bash
npm run dev
```

## 🧠 AI Features
  This app integrates Deepseek (via `ai` + `openai` SDKs) for features like:
  Chatbots or assistants
  Smart form suggestions
  Content generation
  Text summarization or classification
  The logic for AI is handled in `src/app/api/chat` using `ai` and `zod`.

## 🔒 Authentication
  Uses Clerk for:
  User sign-up / login
  Sessions & JWT
  Profile management

## 🌍 Internationalization (i18n)
Supports multilingual UI with `next-intl`. Add or edit translations inside:
```bash
src/i18n/
```
## 📤 File Upload & Email
 - File Upload: via [Vercel Blob](https://vercel.com/docs/vercel-blob)
 - Email: via `nodemailer` and your SMTP config

## 🌎 Maps
Interactive map support with:
  - `react-leaflet` + `leaflet`

## ✅ Linting & Formatting
  - ESLint (Next.js default config)
  - TailwindCSS
  - Prettier (optional)

## 📬 Contact
Want to collaborate or need help? Reach out to [Achraf Mør`eau](elachraf6@gmail.com).
