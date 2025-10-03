# Expensely

A full-stack expense tracking application built with modern web technologies.

## Overview

Expensely is a personal finance management tool that helps users track their income and expenses. The application features user authentication, transaction management, and categorization of financial activities.

## Tech Stack

### Backend
- **Node.js** with TypeScript
- **Hono** web framework for API server
- **Drizzle ORM** with PostgreSQL database
- **Neon Database** for serverless PostgreSQL
- **bcrypt** for password hashing
- **Zod** for schema validation

### Frontend
- **React 19** with TypeScript
- **Vite** for build tooling
- **TanStack Router** for routing
- **TanStack Query** for server state management
- **Zustand** for client state management
- **Mantine** UI component library
- **Tailwind CSS** for styling
- **Day.js** for date handling
- **Sonner** for toast notifications

## Project Structure

```
├── backend/           # Hono API server
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── db/           # Database schema and configuration
│   │   └── routes/       # API endpoints
│   └── drizzle.config.ts # Database configuration
├── frontend/          # React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── modules/      # Feature-specific code
│   │   ├── routes/       # Page components
│   │   ├── utils/        # Helper functions
│   │   └── store.ts      # Zustand state management
│   └── vite.config.ts   # Vite configuration
└── pnpm-workspace.yaml # Monorepo configuration
```

## Features

- **User Authentication**: Secure login and signup with bcrypt password hashing
- **Transaction Management**: Add, view, and categorize income/expenses
- **Dashboard**: Overview of financial activities
- **Recurring Transactions**: Support for daily, weekly, monthly, and yearly recurring transactions
- **Categories**: Predefined categories (Food, Transport, Entertainment, Utilities, Health, Education, Other)
- **Multi-Currency Support**: Support for multiple currencies (CNY, INR, EUR, USD, IDR, BRL, PKR, RUB)
- **Real-time UI**: Responsive interface with toast notifications and loading states

## Development

This is a monorepo managed with pnpm workspaces. Each package (frontend/backend) has its own package.json and can be developed independently.

The application uses TypeScript throughout for type safety and better developer experience.