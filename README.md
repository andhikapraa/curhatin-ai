# Curhatin AI

> Indonesian AI-powered emotional support platform - Landing Page

**Course Project** for PPD (Pengelolaan Produk Digital) at Fasilkom UI

## About

Curhatin AI is a concept for an Indonesian emotional support platform where users can safely express their feelings and receive empathetic AI-powered responses. "Curhat" in Indonesian means to vent or pour out one's feelings.

**Note:** This repository contains only the **marketing landing page** for the product concept. The actual AI chat functionality is not implemented.

### Features Showcased

- Hero section with value proposition
- Feature highlights (Journaling, Mood Tracker, Mindful Moment)
- "Why Us" benefits section
- How It Works guide
- FAQ accordion
- Wishlist signup modal (UI only)

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16 | React framework with App Router |
| React | 19 | UI library with new compiler |
| Tailwind CSS | 4 | Utility-first styling with `@theme` |
| Motion | 12 | Animation library |
| Radix UI | - | Accessible primitives |
| animate-ui | - | Pre-built animated components |
| Ultracite | 6 | Biome-based linting & formatting |

## Getting Started

### Prerequisites

- Node.js 18+
- [Bun](https://bun.sh/) (recommended) or npm/yarn/pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/curhatin-ai.git
cd curhatin-ai

# Install dependencies
bun install

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Landing page
│   └── globals.css         # Tailwind + CSS variables
├── components/
│   ├── landing/            # Landing page sections
│   │   ├── header.tsx
│   │   ├── hero.tsx
│   │   ├── why-us.tsx
│   │   ├── features.tsx
│   │   ├── how-it-works.tsx
│   │   ├── faq.tsx
│   │   ├── footer.tsx
│   │   └── wishlist-modal.tsx
│   └── animate-ui/         # Animated UI components
├── hooks/                  # Custom React hooks
└── lib/                    # Utilities
```

## Development

```bash
# Run development server
bun dev

# Lint and format code
bun check

# Build for production
bun run build

# Start production server
bun start
```

## Design System

### Color Palette

The design uses a calming teal color scheme to evoke feelings of safety and tranquility:

- **Primary:** `#5DC998` (Teal) - Main brand color
- **Secondary:** `#F6FCFC` - Light backgrounds
- **Accent:** `#FFB6C1` (Pink) - Hearts and love elements

### Typography

- **Headings:** Poppins (Bold)
- **Body:** Nunito (SemiBold/Medium)

### Language

All user-facing content is in **Indonesian (Bahasa Indonesia)**.

## Course Information

**Course:** PPD (Pengelolaan Produk Digital)
**Institution:** Fasilkom UI (Fakultas Ilmu Komputer, Universitas Indonesia)

## License

This project is for educational purposes.
