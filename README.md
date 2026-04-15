# Optimai Website

A modern, high-performance website for Optimai - AI & Automation Consultancy for SMEs and Startups. Built with React 19, Tailwind CSS 4, Express, tRPC, and Framer Motion.

## Features

- **Liquid Glass UI**: Premium dark theme with glassmorphism effects, deep purple/navy palette, and smooth animations
- **13 Full Pages**: Home, Services, About, Why Optimai, ROI Calculator, Pricing, Case Studies, Contact, Free Audit, Resources, FAQ, Privacy, Terms
- **Interactive Components**: Expandable service cards, ROI calculator with real-time calculations, testimonials carousel, pricing tiers
- **AI Chatbot Widget**: Floating assistant for visitor engagement with message history and smooth animations
- **Lead Capture**: Multi-step free audit form and contact form with validation and owner notifications
- **Fully Responsive**: Mobile-optimized design across all pages
- **Smooth Animations**: Scroll-triggered animations and micro-interactions via Framer Motion
- **Backend Integration**: tRPC procedures for form submissions and owner notifications

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4, Framer Motion
- **Backend**: Express 4, tRPC 11, Node.js
- **Database**: MySQL/TiDB (optional for future enhancements)
- **Authentication**: Manus OAuth (built-in)
- **Notifications**: Built-in owner notification system
- **Testing**: Vitest

## Getting Started

### Prerequisites

- Node.js 22+
- pnpm 10+

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables (see .env.example)
cp .env.example .env.local

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Development

### Project Structure

```
client/
  src/
    pages/          # Page components
    components/     # Reusable UI components
    lib/            # Utilities and helpers
    index.css       # Global styles with liquid glass theme
server/
  routers/          # tRPC procedure definitions
  _core/            # Core server infrastructure
drizzle/            # Database schema (optional)
```

### Key Pages

- **Home** (`/`): Hero section, services preview, testimonials, CTA
- **Services** (`/services`): 5 core pillars with expandable details and simple/technical toggle
- **ROI Calculator** (`/roi-calculator`): Interactive sliders for time/cost/productivity calculations
- **Pricing** (`/pricing`): Tiered pricing cards with comparison
- **Case Studies** (`/case-studies`): Client success stories with metrics
- **Free Audit** (`/free-audit`): Multi-step form for audit requests
- **Contact** (`/contact`): Contact form with validation
- **About** (`/about`): Company story and team
- **FAQ** (`/faq`): Accordion-style FAQ
- **Privacy** & **Terms**: Legal pages

### Forms & Notifications

Contact and Free Audit forms are wired to the backend with:
- Client-side validation using Zod
- tRPC mutations for submission
- Automatic owner notifications via `notifyOwner()`
- Success/error toast notifications

### Testing

Run tests with:

```bash
pnpm test
```

Tests are located in `server/routers/*.test.ts` and cover form validation and submission logic.

## Environment Variables

The following environment variables are automatically injected by Manus:

- `DATABASE_URL`: MySQL/TiDB connection string
- `JWT_SECRET`: Session cookie signing secret
- `VITE_APP_ID`: Manus OAuth application ID
- `OAUTH_SERVER_URL`: Manus OAuth backend URL
- `VITE_OAUTH_PORTAL_URL`: Manus login portal URL
- `BUILT_IN_FORGE_API_URL`: Manus built-in APIs URL
- `BUILT_IN_FORGE_API_KEY`: Bearer token for built-in APIs

No manual `.env` file is required for deployment on Manus.

## Deployment

### On Manus

1. Click the **Publish** button in the Management UI
2. The site will be deployed to your custom domain

### On External Platforms

The project is ready for deployment on any Node.js hosting platform:

```bash
# Build
pnpm build

# Start
pnpm start
```

Ensure all environment variables are set on your hosting platform.

## Design System

The site uses a custom liquid glass design system:

- **Colors**: Deep purple (#5B21B6), Navy (#1E1B4B), Pink accent (#EC4899)
- **Glass Effects**: Glassmorphism cards with backdrop blur and transparency
- **Animations**: Framer Motion for smooth scroll-triggered animations
- **Typography**: Inter font family for modern, clean look
- **Spacing**: Tailwind's default spacing system

Customize colors and theme in `client/src/index.css`.

## Performance

- Optimized for mobile and desktop
- Lazy-loaded components
- Efficient animations with Framer Motion
- CDN-ready asset structure

## Support

For issues or questions, please reach out to the Optimai team.

## License

MIT
