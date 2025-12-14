# Curhatin AI

> Indonesian AI-powered emotional support platform - Landing Page

**Course Project** for PPD (Pengelolaan Produk Digital) at Fasilkom UI

🌐 **Live Site:** [curhatin-ai.prasetya.dev](https://curhatin-ai.prasetya.dev)

## About

Curhatin AI is a concept for an Indonesian emotional support platform where users can safely express their feelings and receive empathetic AI-powered responses. "Curhat" in Indonesian means to vent or pour out one's feelings.

**Note:** This repository contains only the **marketing landing page** for the product concept. The actual AI chat functionality is not implemented.

### Features Showcased

- Hero section with value proposition
- Feature highlights (Journaling, Mood Tracker, Mindful Moment)
- "Why Us" benefits section
- How It Works guide
- FAQ accordion
- Wishlist signup modal with Google Sheets integration

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

# Copy environment variables
cp .env.example .env.local

# Start development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

### Environment Setup

The wishlist form requires Google Sheets and Cloudflare Turnstile to work. Follow the steps below to set them up.

#### 1. Google Sheets (Wishlist Storage)

1. Create a new Google Sheet at [sheets.new](https://sheets.new)
2. Name it "Curhatin Wishlist" (or any name you prefer)
3. Add headers in Row 1: `Timestamp` | `Name` | `Email`
4. Go to **Extensions > Apps Script**
5. Delete the default code and paste:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date().toISOString(),
      data.name,
      data.email
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

6. Click **Deploy > New deployment**
7. Select type: **Web app**
8. Set "Execute as": **Me**
9. Set "Who has access": **Anyone**
10. Click **Deploy** and copy the Web app URL
11. Paste the URL in `.env.local` as `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`

#### 2. Cloudflare Turnstile (Spam Protection)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Turnstile**
2. Click **Add Site**
3. Enter your domain name (use `localhost` for development)
4. Select Widget Type: **Managed** (recommended)
5. Click **Create**
6. Copy the **Site Key** and paste in `.env.local` as `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
7. Copy the **Secret Key** and paste in `.env.local` as `TURNSTILE_SECRET_KEY`

#### Environment Variables Summary

```bash
# .env.local
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...
TURNSTILE_SECRET_KEY=0x4AAAAAAA...
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── wishlist/
│   │       └── route.ts    # Wishlist API with Turnstile verification
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
