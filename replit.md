# replit.md

## Overview

This is a full-stack AI chat application called "Sterna" built with React, Express, and TypeScript. The application provides a conversational interface where users can interact with an AI assistant powered by OpenAI's GPT-5 model. The system supports session-based conversations with persistent message history and features a modern, responsive UI built with shadcn/ui components and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for the client-side application
- **Vite** as the build tool and development server with hot module replacement
- **Wouter** for lightweight client-side routing
- **TanStack React Query** for server state management, caching, and API interactions
- **shadcn/ui** component library built on Radix UI primitives for accessible UI components
- **Tailwind CSS** for utility-first styling with custom CSS variables for theming
- **Single Page Application** architecture with component-based structure

### Backend Architecture
- **Express.js** server with TypeScript for REST API endpoints
- **Memory-based storage** using in-memory Maps for development/testing (designed to be easily replaceable with database storage)
- **RESTful API design** with endpoints for message retrieval and creation
- **Session-based conversation management** using unique session identifiers
- **Request/response logging middleware** for debugging and monitoring

### Data Storage Solutions
- **Drizzle ORM** configured for PostgreSQL with type-safe database operations
- **Database schema** defined for users and messages with proper relationships
- **Migration system** using Drizzle Kit for schema changes
- **In-memory storage interface** (IStorage) that can be easily swapped for database implementation
- **Prepared for Neon Database** integration based on connection string configuration

### Authentication and Authorization
- **Basic user schema** defined with username/password fields
- **Session management** infrastructure in place but not currently implemented in the chat flow
- **Extensible authentication system** designed to support future auth implementations

### External Service Integrations
- **OpenAI API** integration using the official OpenAI SDK
- **GPT-5 model** for generating AI responses with configurable parameters
- **Conversation context** maintained by sending message history to the AI model
- **Error handling** and fallback responses for API failures
- **Environment-based API key management** with fallback options

### Design Patterns and Principles
- **Separation of concerns** with distinct client, server, and shared directories
- **Type safety** throughout the application using TypeScript and Zod schemas
- **Component composition** using Radix UI primitives and custom wrapper components
- **Custom hooks** for reusable logic (mobile detection, toast notifications)
- **Responsive design** with mobile-first approach and adaptive layouts
- **Error boundaries** and proper error handling at multiple levels
- **Real-time UI updates** using React Query's optimistic updates and cache invalidation

## External Dependencies

### Core Framework Dependencies
- **React 18** - Frontend framework with hooks and context
- **Express.js** - Backend web framework
- **TypeScript** - Type safety across the entire application
- **Vite** - Build tool and development server

### Database and ORM
- **Drizzle ORM** - Type-safe database toolkit
- **@neondatabase/serverless** - Neon PostgreSQL serverless driver
- **drizzle-zod** - Zod integration for schema validation

### UI and Styling
- **@radix-ui/* packages** - Accessible UI primitive components
- **Tailwind CSS** - Utility-first CSS framework
- **class-variance-authority** - Component variant management
- **Lucide React** - Icon library

### State Management and Data Fetching
- **@tanstack/react-query** - Server state management
- **React Hook Form** - Form state management
- **Zod** - Runtime type validation

### AI Integration
- **OpenAI SDK** - Official OpenAI API client for GPT-5 integration

### Development and Build Tools
- **tsx** - TypeScript execution environment
- **esbuild** - JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal** - Development error handling
- **@replit/vite-plugin-cartographer** - Replit-specific development tooling

### Utilities
- **date-fns** - Date manipulation and formatting
- **clsx** and **tailwind-merge** - Conditional CSS class management
- **nanoid** - Unique ID generation
- **wouter** - Lightweight client-side routing