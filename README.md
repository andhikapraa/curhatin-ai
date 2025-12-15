# Curhatin AI

> Indonesian AI-powered emotional support platform

**Course Project** for PPD (Pengelolaan Produk Digital) at Fasilkom UI

🌐 **Live Site:** [curhatin-ai.prasetya.dev](https://curhatin-ai.prasetya.dev)

## About

Curhatin AI is a concept for an Indonesian emotional support platform where users can safely express their feelings and receive empathetic AI-powered responses. "Curhat" in Indonesian means to vent or pour out one's feelings.

This repository contains the **marketing landing page** showcasing the product concept, along with a **demo chatbot** for visitors to try the AI experience.

### Product Features (Showcased)

The landing page highlights these planned product features:

- **Journaling** - Write freely to process emotions and track feelings over time
- **Mood Tracker** - Monitor emotional patterns with easy daily check-ins
- **Mindful Moment** - Guided breathing and relaxation exercises

### Website Features (Implemented)

- **AI Chatbot Demo** - Try the empathetic AI assistant (Parlant-powered) with bilingual support (Indonesian/English)
- **Landing Page** - Hero, features showcase, how-it-works guide, FAQ sections
- **Wishlist Signup** - Join the waitlist with Google Sheets + Cloudflare Turnstile

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16 | React framework with App Router |
| React | 19 | UI library with new compiler |
| Tailwind CSS | 4 | Utility-first styling with `@theme` |
| Motion | 12 | Animation library |
| react-chatbotify | 2.3 | Chat UI components |
| parlant-client | 3.0 | AI backend SDK |
| Radix UI | - | Accessible primitives |
| Ultracite | 6 | Biome-based linting & formatting |

## Getting Started

### Prerequisites

- Node.js 18+
- [Bun](https://bun.sh/) (recommended) or npm/yarn/pnpm
- Parlant server (for AI chatbot functionality)

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

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment Setup

#### 1. Parlant (AI Chatbot Backend)

The chatbot requires a running Parlant server with configured agents.

1. Set up your Parlant server (see [Parlant documentation](https://github.com/parlant-ai/parlant))
2. Create two agents in Parlant:
   - One for Indonesian responses
   - One for English responses
3. Copy the agent IDs and server URL to `.env.local`

```bash
PARLANT_SERVER_URL=http://your-parlant-server:8800
PARLANT_AGENT_ID_ID=your_indonesian_agent_id
PARLANT_AGENT_ID_EN=your_english_agent_id
```

#### 2. Cloudflare Turnstile (Bot Protection)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Turnstile**
2. Click **Add Site**
3. Enter your domain name (use `localhost` for development)
4. Select Widget Type: **Managed** (recommended)
5. Click **Create**
6. Copy the keys to `.env.local`:

```bash
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...
TURNSTILE_SECRET_KEY=0x4AAAAAAA...
```

#### 3. Google Sheets (Wishlist Storage)

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

#### Environment Variables Summary

```bash
# .env.local

# Parlant Configuration (AI Chatbot)
PARLANT_SERVER_URL=http://your-parlant-server:8800
PARLANT_AGENT_ID_ID=your_indonesian_agent_id
PARLANT_AGENT_ID_EN=your_english_agent_id

# Cloudflare Turnstile
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...
TURNSTILE_SECRET_KEY=0x4AAAAAAA...

# Google Sheets (Wishlist)
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── v1/parlant/
│   │   │   ├── sessions/
│   │   │   │   ├── route.ts           # Create Parlant sessions
│   │   │   │   └── [sessionId]/
│   │   │   │       └── events/
│   │   │   │           └── route.ts   # Send/poll messages
│   │   └── wishlist/
│   │       └── route.ts               # Wishlist API
│   ├── layout.tsx                     # Root layout with chatbot
│   ├── page.tsx                       # Landing page
│   └── globals.css                    # Tailwind + CSS variables
├── components/
│   ├── chatbot/
│   │   ├── curhatin-chat-bot.tsx      # Main chatbot component
│   │   └── system-prompts/            # AI system prompts
│   │       ├── index.ts
│   │       ├── indonesian.ts
│   │       └── english.ts
│   ├── landing/                       # Landing page sections
│   │   ├── header.tsx
│   │   ├── hero.tsx
│   │   ├── why-us.tsx
│   │   ├── features.tsx
│   │   ├── how-it-works.tsx
│   │   ├── faq.tsx
│   │   ├── footer.tsx
│   │   └── wishlist-modal.tsx
│   └── animate-ui/                    # Animated UI components
├── hooks/                             # Custom React hooks
└── lib/
    ├── utils.ts                       # cn() function
    ├── parlant-client.ts              # Parlant SDK wrapper
    └── get-strict-context.tsx
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
- **Secondary:** `#D9F1F3`, `#F6FCFC` - Light backgrounds
- **Accent:** `#FFB6C1` (Pink) - Hearts and love elements

### Typography

- **Headings:** Poppins (Bold)
- **Body:** Nunito (SemiBold/Medium)

### Language

All user-facing content is in **Indonesian (Bahasa Indonesia)** with English support in the chatbot.

## Course Information

**Course:** PPD (Pengelolaan Produk Digital)
**Institution:** Fasilkom UI (Fakultas Ilmu Komputer, Universitas Indonesia)

## License

This project is for educational purposes.
