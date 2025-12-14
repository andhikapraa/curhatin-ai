# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Curhatin AI is an Indonesian emotional support landing page for a university course project (PPD at Fasilkom UI). This repository contains **only the marketing landing page** - no AI chat functionality is implemented. All user-facing content is in **Indonesian (Bahasa Indonesia)**.

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
- **animate-ui** components via shadcn CLI with custom registry

## Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Landing page composition
│   └── globals.css         # Tailwind + CSS variables
├── components/
│   ├── landing/            # Landing page sections
│   │   ├── hero.tsx
│   │   ├── features.tsx
│   │   ├── why-us.tsx
│   │   ├── how-it-works.tsx
│   │   ├── faq.tsx
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── wishlist-modal.tsx
│   └── animate-ui/         # Animated component library
│       ├── components/     # Ready-to-use components
│       └── primitives/     # Base primitives
├── hooks/                  # Custom hooks (use-controlled-state, use-is-in-view)
└── lib/
    ├── utils.ts            # cn() function (clsx + tailwind-merge)
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

## Code Standards (Ultracite/Biome)

Run `bun check` before committing. Key rules:
- Use `for...of` over `.forEach()`
- Use `Number.POSITIVE_INFINITY` instead of `Infinity`
- Prefer `unknown` over `any`
- Use Next.js `<Image>` component for images
- Client components need `"use client"` directive
