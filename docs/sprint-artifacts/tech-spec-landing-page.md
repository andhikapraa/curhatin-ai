# Tech-Spec: Curhatin AI Landing Page

**Created:** 2025-12-12
**Status:** Ready for Development

## Overview

### Problem Statement

Curhatin AI needs a marketing landing page to introduce the product - an Indonesian AI-powered emotional support platform. The page must communicate the value proposition, showcase features, and capture leads via a wishlist signup.

### Solution

Build a single-page responsive landing page using Next.js 16, React 19, and Tailwind CSS 4 with animated components from animate-ui registry. The page will feature a calming teal color scheme with a friendly robot mascot.

### Scope

**In Scope:**
- Single landing page with all sections
- Wishlist signup modal (Name + Email form)
- Animated FAQ accordion
- Desktop-first responsive design
- Smooth animations using animate-ui components

**Out of Scope:**
- Backend/API integration (form submission is UI only for now)
- AI chat functionality
- User authentication
- Actual Journaling/Mood Tracker/Mindful Moment features

## Context for Development

### Codebase Patterns

- **Framework:** Next.js 16 with App Router (RSC enabled)
- **Styling:** Tailwind CSS 4 with CSS variables
- **Components:** shadcn new-york style + @animate-ui registry
- **Icons:** Lucide React
- **Code Quality:** Biome + Ultracite

### Files to Reference

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page (main file to edit)
│   └── globals.css         # Global styles + Tailwind
├── components/
│   └── animate-ui/         # Installed animate-ui components
│       ├── components/
│       │   ├── backgrounds/  # gradient.tsx, bubble.tsx
│       │   ├── buttons/      # button.tsx, ripple.tsx, liquid.tsx, icon.tsx, theme-toggler.tsx
│       │   ├── radix/        # dialog.tsx, accordion.tsx, tooltip.tsx, sheet.tsx
│       │   ├── base/         # checkbox.tsx
│       │   └── community/    # flip-card.tsx
│       └── primitives/     # Low-level primitives
├── hooks/
│   ├── use-controlled-state.tsx
│   └── use-is-in-view.tsx
└── lib/
    ├── utils.ts            # cn() utility
    └── get-strict-context.tsx
```

### Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Fonts | Poppins + Nunito | Design system specifies these; loaded via next/font |
| Component library | animate-ui | Smooth animations, matches design aesthetic |
| Form handling | React state | Simple form, no complex validation needed |
| Modal | Radix Dialog | Accessible, animated via animate-ui |
| FAQ | Radix Accordion | Native accessibility, smooth animations |
| Background | Gradient + Bubble | Matches design's teal gradient with playful bubbles |
| Responsive approach | Desktop-first | User specified preference |

## Design Specifications

### Color Palette (Design System)

**Basic:**
| Token | Hex | Usage |
|-------|-----|-------|
| White | #FAFCFD | Backgrounds, cards |
| Black | #1E4A4F | Text, dark accents |

**Neutrals (Gray Scale):**
| Token | Hex | Usage |
|-------|-----|-------|
| Neutrals-100 | #F3F3F4 | Light backgrounds |
| Neutrals-200 | #E2E3E5 | Borders, dividers |
| Neutrals-300 | #CBCDCD | Disabled states |
| Neutrals-400 | #B2B5BA | Placeholder text |
| Neutrals-500 | #999FA5 | Secondary text |
| Neutrals-600 | #808A91 | Icons |
| Neutrals-700 | #717578 | Body text |
| Neutrals-800 | #585D67 | Strong text |
| Neutrals-900 | #4C4F53 | Headings |
| Neutrals-1000 | #3C3E41 | Darkest text |

**Primary (Teal - Brand Color):**
| Token | Hex | Usage |
|-------|-----|-------|
| Primary-100 | #CAF6F7 | Light teal bg |
| Primary-200 | #9CCFDD | Hover states |
| Primary-300 | #6DB7B9 | Secondary elements |
| Primary-400 | #7AADC6 | Borders |
| Primary-500 | #5DC998 | Main brand (buttons) |
| Primary-600 | #2DCC8C | Active states |
| Primary-700 | #25A080 | Dark teal |
| Primary-800 | #1F9A7A | Darker accent |
| Primary-900 | #198F62 | Very dark |
| Primary-1000 | #1AB58B | Deepest teal |

**Secondary (Light Teals):**
| Token | Hex | Usage |
|-------|-----|-------|
| Secondary-100 | #F6FCFC | Page background |
| Secondary-200 | #D4F1F0 | Card backgrounds |
| Secondary-300 | #9DFED9 | Highlights |
| Secondary-500 | #91E4B8 | Soft accents |
| Secondary-600 | #A7D9E3 | Borders |

**Accent (Pink - Hearts/Love):**
| Token | Hex | Usage |
|-------|-----|-------|
| Pink-100 | #FEF3F5 | Light pink bg |
| Pink-300 | #FFB6C1 | Hearts, love icons |
| Pink-500 | #F472B6 | Pink accents |

**CSS Variables Implementation:**
```css
/* globals.css - Core colors */
@theme {
  /* Basic */
  --color-white: #FAFCFD;
  --color-black: #1E4A4F;

  /* Primary Teal */
  --color-primary-100: #CAF6F7;
  --color-primary-200: #9CCFDD;
  --color-primary-500: #5DC998;
  --color-primary-600: #2DCC8C;
  --color-primary-700: #25A080;

  /* Secondary */
  --color-secondary-100: #F6FCFC;
  --color-secondary-200: #D4F1F0;

  /* Neutrals */
  --color-neutral-100: #F3F3F4;
  --color-neutral-500: #999FA5;
  --color-neutral-700: #717578;
  --color-neutral-900: #4C4F53;

  /* Accent */
  --color-pink-300: #FFB6C1;
}
```

### Typography

**Fonts:** Poppins + Nunito (Google Fonts)

| Role | Font | Weight | Line Height | Sizes |
|------|------|--------|-------------|-------|
| **Heading** | Poppins | Bold (700) | 120% | H1: 64px, H2: 48px, H3: 32px, H4: 24px, H5: 20px, H6: 16px |
| **SubHeading** | Nunito | ExtraBold (800) | 120% | S1: 48px, S2: 32px, S3: 24px, S4: 20px, S5: 16px, S6: 12px |
| **Body** | Nunito | SemiBold (600) | 150% | B1: 28px, B2: 24px, B3: 20px, B4: 16px, B5: 12px, B6: 8px |
| **Caption** | Nunito | Medium (500) | 150% | C1: 12px, C2: 8px |

**Implementation:**
```tsx
// next/font/google in layout.tsx
import { Poppins, Nunito } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-poppins'
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['500', '600', '800'],
  variable: '--font-nunito'
})
```

**Tailwind Classes:**
```css
/* globals.css */
@theme {
  --font-heading: var(--font-poppins);
  --font-body: var(--font-nunito);
}
```

**Language:** Indonesian (Bahasa Indonesia)

### Page Sections

1. **Header/Nav** - Logo + navigation links (anchor to sections)
2. **Hero** - Value prop + CTA button + Robot mascot
3. **Why Us** - 4 benefit cards with icons
4. **Features** - 3 feature cards (Journaling, Mood Tracker, Mindful Moment)
5. **How It Works** - 3-step process
6. **FAQ** - Expandable accordion
7. **Footer** - Links + branding

### Interactive Elements

| Element | Component | Behavior |
|---------|-----------|----------|
| Hero CTA | `RippleButton` | Opens wishlist modal on click |
| Nav links | Anchor tags | Smooth scroll to sections |
| FAQ items | `Accordion` | Expand/collapse with animation |
| Wishlist modal | `Dialog` | Form with Name + Email fields |
| Form submit | `RippleButton` | Visual feedback, close modal |

## Implementation Plan

### Tasks

- [ ] **Task 1:** Set up page structure, fonts, and global styles
  - Configure Poppins + Nunito fonts in `layout.tsx`
  - Update `globals.css` with color variables + font variables
  - Create base page layout in `page.tsx`

- [ ] **Task 2:** Create reusable section components
  - `SectionWrapper` - consistent padding/max-width
  - `SectionTitle` - styled headings
  - `Card` - benefit/feature card component

- [ ] **Task 3:** Build Header/Navigation
  - Logo (CurhatinAI)
  - Nav links: Journaling, Mood Tracker, Mindful Moment, Curhat
  - Mobile: Sheet component for hamburger menu

- [ ] **Task 4:** Build Hero section
  - Headline + subtext (Indonesian)
  - CTA button with ripple effect
  - Robot mascot placeholder (user will provide SVG)
  - Gradient + bubble background

- [ ] **Task 5:** Build "Kenapa Harus Pakai Curhatin AI?" section
  - 4 benefit cards with icons:
    1. Aman untuk Jadi Dirimu Sendiri (Home icon)
    2. Respons Penuh Empati (Heart icon)
    3. Dibuat untuk Menenangkan (Book icon)
    4. Selalu Siap Saat Dibutuhkan (Clock icon)

- [ ] **Task 6:** Build Features section
  - 3 feature cards with illustrations:
    1. Journaling
    2. Mood Tracker
    3. Mindful Moment
  - Consider flip-card for interaction

- [ ] **Task 7:** Build "How It Works" section
  - 3 steps with illustrations:
    1. Mulai Bercerita
    2. Dapatkan Dukungan yang Menenangkan
    3. Temukan Ruang Aman untuk Bernafas

- [ ] **Task 8:** Build FAQ section
  - Accordion component
  - FAQ items:
    - Apa itu Curhatin AI?
    - Apakah Curhatin AI aman?
    - Fitur apa saja yang tersedia?
    - Bagaimana cara memulai sesi?
    - Apakah percakapan saya akan direkam atau dibagikan?

- [ ] **Task 9:** Build Footer
  - Logo + tagline
  - Feature links
  - Social links (Instagram)

- [ ] **Task 10:** Build Wishlist Modal
  - Dialog component
  - Form: Nama + Email inputs
  - Submit button (Kirim)
  - Robot mascot with hearts

- [ ] **Task 11:** Responsive adjustments
  - Mobile navigation (Sheet)
  - Stack cards on mobile
  - Adjust typography scale

- [ ] **Task 12:** Final polish
  - Test all animations
  - Verify accessibility
  - Run build check

### Acceptance Criteria

- [ ] **AC 1:** Given a user lands on the page, When they view the hero, Then they see the value proposition in Indonesian with a clear CTA button
- [ ] **AC 2:** Given a user clicks the CTA, When the modal opens, Then they can enter Name and Email in a styled form
- [ ] **AC 3:** Given a user clicks an FAQ item, When it expands, Then the answer animates smoothly into view
- [ ] **AC 4:** Given a user is on mobile, When they view the page, Then all sections are properly stacked and readable
- [ ] **AC 5:** Given a user hovers over buttons, When they interact, Then they see smooth ripple/liquid animations

## Additional Context

### Dependencies (Already Installed)

```json
{
  "motion": "latest",           // For animations (via animate-ui)
  "@radix-ui/react-accordion": "latest",
  "@radix-ui/react-dialog": "latest",
  "@radix-ui/react-tooltip": "latest",
  "lucide-react": "^0.560.0"
}
```

### Assets Needed (From User)

- [ ] Robot mascot SVG/PNG (hero + modal)
- [ ] Feature illustrations (Journaling, Mood Tracker, Mindful Moment)
- [ ] How It Works step illustrations
- [ ] Logo SVG

### Testing Strategy

- Visual inspection across breakpoints (desktop, tablet, mobile)
- Animation performance check (no jank)
- Accessibility audit (keyboard navigation, screen reader)
- Lint & format (`bun check` - runs ultracite fix)
- Build verification (`bun run build`)

### Notes

- All text content is in **Indonesian (Bahasa Indonesia)**
- Modal form is UI-only for now - no backend submission
- User will provide SVG/PNG assets during implementation
- Use placeholder divs with descriptive text until assets arrive
