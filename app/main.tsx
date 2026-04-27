import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import './globals.css'
// Import the generated route tree
import { routeTree } from './routeTree.gen'

// why-did-you-render: opt-in render-cause inspector for debugging re-renders.
// Off by default — wdyr monkey-patches React.useState, which collides with
// libraries that call useState conditionally inside their own internals
// (TanStack Router's <Transitioner> in particular triggers a "hooks order
// changed" crash). Set VITE_WDYR=1 (e.g. `VITE_WDYR=1 bun run dev`) only when
// you actively want to debug. Tree-shaken from prod because the env constant
// is replaced at build time and the branch is DCE'd.
if (import.meta.env.DEV && import.meta.env.VITE_WDYR === '1') {
  void import('./wdyr')
}

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
