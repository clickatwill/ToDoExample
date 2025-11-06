# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript TODO list application built with Vite, featuring drag-and-drop reordering functionality. The app uses localStorage for persistence and implements a modern UI with Tailwind CSS and shadcn/ui components.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (default: http://localhost:5173)
npm run dev

# Build for production (runs TypeScript compiler + Vite build)
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Architecture

### Component Structure

The application follows a straightforward component hierarchy:

- **App.tsx**: Root component that provides layout wrapper
- **TodoList.tsx**: Main container component that manages:
  - Todo state (array of `{id: string, text: string}` objects)
  - localStorage persistence via `useEffect` hooks
  - Drag-and-drop context from `@dnd-kit/core`
  - CRUD operations (add, remove todos)
- **TodoItem.tsx**: Individual todo item component with:
  - Sortable drag-and-drop functionality via `useSortable` hook
  - Checkbox that removes the todo when checked (note: checking = deleting, not completing)
  - Grip handle for drag-and-drop

### State Management

State is managed locally in TodoList.tsx using React useState. Todos are persisted to localStorage with key `'todos'` and automatically saved on every change.

### Drag-and-Drop Implementation

The app uses `@dnd-kit` for drag-and-drop:
- `DndContext` wraps the todo list in TodoList.tsx
- `SortableContext` provides vertical list sorting strategy
- Each TodoItem uses `useSortable` hook for drag behavior
- `arrayMove` from `@dnd-kit/sortable` reorders items on drag end

### UI Components

Reusable UI components in `src/components/ui/`:
- Built with Radix UI primitives (@radix-ui/react-*)
- Styled with Tailwind CSS using the `cn()` utility
- `cn()` utility in `src/lib/utils.ts` merges Tailwind classes using `clsx` and `tailwind-merge`

### Path Aliases

TypeScript and Vite are configured with `@/*` path alias mapping to `./src/*`. Use this for cleaner imports:
```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
```

### Styling

- Tailwind CSS with custom theme configuration in `tailwind.config.js`
- CSS variables for theming (HSL color values)
- Dark mode support via class strategy (though not currently implemented in UI)

## Key Technical Details

- **TypeScript**: Strict mode enabled with all linting options active
- **Module System**: ESM (type: "module" in package.json)
- **React Version**: 18.2.0
- **Build Tool**: Vite 5.x with React plugin
- **Todo ID Generation**: Uses `Date.now().toString()` for unique IDs

## Current Limitations

- No "complete" state for todos - checking the checkbox removes the item
- No edit functionality for existing todos
- No filtering or sorting options (beyond manual drag-and-drop)
- localStorage only (no backend persistence)
