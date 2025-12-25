# Finance Tracker AI - Frontend

A modern web application for tracking and managing personal finances with AI-powered insights.

## Overview

This is the frontend application for the Finance Tracker AI system, built with Next.js 16, React 19, TypeScript, and Tailwind CSS. The application provides a comprehensive dashboard for managing transactions, generating financial reports, and gaining AI-powered financial insights.

## Tech Stack

- **Framework**: Next.js 16.0.10
- **UI Library**: React 19
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.18
- **Component Library**: Radix UI
- **Form Validation**: React Hook Form + Zod
- **Charts**: Recharts
- **Theme**: Next-themes (Dark mode support)
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 10.x

### Installation

1. Navigate to the project directory:
```bash
cd "d:\Project\Finance Tracker AI\code\Frontend\finance-webapp"
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build application for production
- `pnpm start` - Run production build
- `pnpm lint` - Run ESLint to check code quality

## Test Credentials

### Login Credentials

Use the following dummy credentials to test the application:

**User Account 1:**
- **Username**: `demo.user@example.com`
- **Password**: `Demo@12345`

**User Account 2:**
- **Username**: `test.account@example.com`
- **Password**: `Test@12345`

## Project Structure

```
finance-webapp/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── dashboard/               # Dashboard page
│   ├── login/                   # Login page
│   ├── register/                # Registration page
│   ├── transactions/            # Transactions page
│   ├── reports/                 # Reports page
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── dashboard-layout.tsx     # Dashboard layout wrapper
│   ├── theme-provider.tsx       # Theme provider
│   └── ui/                      # Radix UI components
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts            # Mobile detection
│   └── use-toast.ts             # Toast notifications
├── lib/                          # Utility functions
│   ├── mock-data.ts             # Mock data for development
│   └── utils.ts                 # Helper functions
├── public/                       # Static assets
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript configuration
├── next.config.mjs              # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
└── postcss.config.mjs           # PostCSS configuration
```

## Features

- 📊 **Dashboard** - View financial overview and key metrics
- 💰 **Transaction Management** - Add, edit, and categorize transactions
- 📈 **Reports** - Generate detailed financial reports
- 🎨 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ✨ **Modern UI** - Built with Radix UI and Tailwind CSS
- 🔐 **Form Validation** - Secure input validation with Zod

## Pages

- `/` - Home page
- `/login` - User login
- `/register` - User registration
- `/dashboard` - Main dashboard
- `/transactions` - Transaction management
- `/reports` - Financial reports

## Development

### Adding a New Page

1. Create a new directory in `app/` with a `page.tsx` file
2. Import and use components from `components/ui/`
3. Apply the `DashboardLayout` wrapper for consistency

### Adding a New Component

1. Create component in `components/ui/`
2. Use Radix UI primitives and Tailwind CSS for styling
3. Export from the component file

## Build & Deployment

### Production Build

```bash
pnpm build
```

### Run Production Build

```bash
pnpm start
```

The application will be available at `http://localhost:3000`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private Project - All Rights Reserved

## Support

For issues or questions, please contact the development team.
