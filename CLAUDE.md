# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Cold Chain Tracker prototype - a Progressive Web Application (PWA) for warehouse operators to track cold chain products in industrial environments. The app is designed for mobile devices with touch interfaces optimized for industrial glove use.

## Tech Stack

- **Frontend Framework**: React 19.1.0 with TypeScript
- **Styling**: Tailwind CSS (v2.2.17 compat version) with PostCSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router DOM v7
- **Build Tool**: Create React App with react-scripts
- **Testing**: Jest with React Testing Library

## Development Commands

- `npm start` - Start development server (http://localhost:3000)
- `npm test` - Run tests in watch mode
- `npm run build` - Build for production
- `npm run eject` - Eject from CRA (one-way operation)

## Architecture Overview

### Application Structure
The app uses a single-page application architecture with client-side routing managed by a central state in App.tsx. Navigation is handled through a `currentPage` state rather than traditional routing.

**Key Components:**
- `App.tsx` - Main application with central navigation state
- `Layout.tsx` - Provides header, footer, and bottom navigation wrapper
- `components/` - Feature-specific components for different warehouse operations

### Navigation Pattern
The app uses a unique navigation pattern where:
- All navigation is managed by `currentPage` state in App.tsx
- `Layout.tsx` provides a fixed bottom navigation bar optimized for mobile
- Page transitions trigger reset mechanisms for components like MovementTiles

### Styling Architecture
- **Brand Colors**: Primary red (#b22234) and blue (#0b3b60) defined in Layout.tsx
- **Mobile-First**: All components optimized for touch interfaces
- **PWA Design**: App-like experience with fixed headers/footers and smooth interactions

### Component Organization
Components are organized by feature rather than type:
- `Home.tsx` - Dashboard overview
- `MovementTiles.tsx` - Product movement operations
- `Movements.tsx` - Movement tracking
- `TORExtension.tsx` - Time-based operations
- `ActiveProducts.tsx` - Real-time product monitoring
- Additional components for specific warehouse operations

## Key Features

### PWA Capabilities
- Mobile-optimized interface for warehouse environments
- Push notification support for time-sensitive alerts
- Real-time status monitoring with colored indicators
- Installation prompts for home screen access

### Cold Chain Specific
- Temperature and time tracking
- Product movement workflows
- Barcode/QR code scanning capabilities
- Real-time alerts and monitoring
- Lot number tracking (LPCI)

### Industrial Design
- Touch targets sized for industrial gloves (44px minimum)
- High contrast colors for warehouse lighting
- Fixed navigation elements for stability during movement
- Status indicators for immediate system health visibility

## Development Guidelines

### Component Patterns
- All components should follow the PWA mobile-first design principles
- Use the brand color constants from Layout.tsx for consistency
- Status indicators should update in real-time where applicable
- Navigation should integrate with the central `currentPage` state pattern

### State Management
The app uses local React state management:
- Central navigation state in App.tsx
- Component-specific state for features
- Reset triggers for components that need fresh state on navigation

### Mobile Optimization
- Ensure all interactive elements are touch-friendly
- Consider industrial glove use in sizing decisions
- Test on mobile devices for warehouse environment usability
- Implement haptic feedback where appropriate

## Sample Components
The `samples/` directory contains prototype components that may be integrated:
- Floor plan dashboard concepts
- Supervisor dashboard previews
- Product return workflows
- Movement tracking examples

Refer to `src/components/component_library_spec.md` for detailed component specifications and PWA requirements.