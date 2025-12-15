# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Curhatin AI is an Indonesian emotional support platform concept for a university course project (PPD at Fasilkom UI). This repository contains the **marketing landing page** with a **demo chatbot** for visitors to try.

### Product Features (Showcased on Landing Page)
- **Journaling** - Write freely to process emotions and track feelings
- **Mood Tracker** - Monitor emotional patterns with daily check-ins
- **Mindful Moment** - Guided breathing and relaxation exercises

### Website Features (Implemented)
- **AI Chatbot Demo** - Try the empathetic AI (Parlant-powered, bilingual ID/EN)
- **Landing Page** - Hero, features, how-it-works, FAQ sections
- **Wishlist Signup** - Google Sheets + Cloudflare Turnstile

All user-facing content is in **Indonesian (Bahasa Indonesia)** with English support in the chatbot.

## Commands

```bash
bun dev          # Start development server (localhost:3000)
bun run build    # Production build
bun start        # Start production server
bun check        # Lint and format with Ultracite/Biome
```

## Tech Stack

- **Next.js 16** with App Router and React Compiler (`reactCompiler: true`)
- **React 19** with the new compiler
- **Tailwind CSS v4** with `@theme` syntax in globals.css
- **Motion** (Framer Motion) for animations
- **react-chatbotify** for chat UI components
- **parlant-client** for AI backend integration
- **animate-ui** components via shadcn CLI with custom registry

## Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── v1/parlant/
│   │   │   ├── sessions/
│   │   │   │   ├── route.ts           # Create Parlant sessions (POST)
│   │   │   │   └── [sessionId]/
│   │   │   │       └── events/
│   │   │   │           └── route.ts   # Send (POST) / Poll (GET) messages
│   │   └── wishlist/
│   │       └── route.ts               # Wishlist API with Turnstile
│   ├── layout.tsx                     # Root layout with CurhatinChatBot
│   ├── page.tsx                       # Landing page composition
│   └── globals.css                    # Tailwind + CSS variables
├── components/
│   ├── chatbot/
│   │   ├── curhatin-chat-bot.tsx      # Main chatbot component (react-chatbotify)
│   │   └── system-prompts/
│   │       ├── index.ts               # Language selection helpers
│   │       ├── indonesian.ts          # Indonesian system prompt
│   │       └── english.ts             # English system prompt
│   ├── landing/                       # Landing page sections
│   │   ├── hero.tsx                   # Hero with CTA buttons
│   │   ├── features.tsx
│   │   ├── why-us.tsx
│   │   ├── how-it-works.tsx
│   │   ├── faq.tsx
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── wishlist-modal.tsx
│   └── animate-ui/                    # Animated component library
│       ├── components/                # Ready-to-use components
│       └── primitives/                # Base primitives
├── hooks/                             # Custom hooks
└── lib/
    ├── utils.ts                       # cn() function (clsx + tailwind-merge)
    ├── parlant-client.ts              # Parlant SDK wrapper
    └── get-strict-context.tsx
```

## Key Patterns

### Path Aliases
All imports use `@/*` pointing to `./src/*`:
```typescript
import { cn } from "@/lib/utils";
import { Hero } from "@/components/landing/hero";
```

### Animation Pattern
Components use motion/react with Variants for orchestrated animations:
```typescript
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
```

### Chatbot Integration
The chatbot is rendered globally in `layout.tsx` and can be opened via custom event:
```typescript
window.dispatchEvent(new CustomEvent("openCurhatinChatbot"));
```

### Parlant Session Flow
1. User selects language (Indonesian/English)
2. Turnstile verification runs in background
3. Session created via `POST /api/v1/parlant/sessions`
4. Messages sent via `POST /api/v1/parlant/sessions/[id]/events`
5. Responses polled via `GET /api/v1/parlant/sessions/[id]/events`

### Component Installation
Use shadcn CLI with custom animate-ui registry:
```bash
npx shadcn@latest add -r @animate-ui <component-name>
```

### Fonts
- **Poppins** (`--font-poppins`) for headings via `font-heading` class
- **Nunito** (`--font-nunito`) for body via `font-body` class

### Design Tokens
- Primary: `#5DC998` (teal)
- Background: `#D9F1F3`, `#F6FCFC`
- Text: `#3E4A4F`

## Environment Variables

```bash
# Parlant Configuration (AI Chatbot)
PARLANT_SERVER_URL=http://your-parlant-server:8800
PARLANT_AGENT_ID_ID=your_indonesian_agent_id
PARLANT_AGENT_ID_EN=your_english_agent_id

# Cloudflare Turnstile (Bot Protection)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key
TURNSTILE_SECRET_KEY=your_secret_key

# Google Sheets (Wishlist)
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=your_apps_script_url
```

## Code Standards (Ultracite/Biome)

Run `bun check` before committing. Key rules:
- Use `for...of` over `.forEach()`
- Use `Number.POSITIVE_INFINITY` instead of `Infinity`
- Prefer `unknown` over `any`
- Use Next.js `<Image>` component for images
- Client components need `"use client"` directive
- File names should be kebab-case (e.g., `curhatin-chat-bot.tsx`)
