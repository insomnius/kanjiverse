/**
 * why-did-you-render — dev-only render-cause inspector.
 *
 * Imported lazily from main.tsx behind `import.meta.env.DEV` so production
 * builds drop the entire module + its peer (we never even resolve the
 * dependency graph in prod). To track a specific component, set its static
 * member, e.g.:
 *
 *   MyComponent.whyDidYouRender = true
 *
 * Pure-component tracking is OFF (`trackAllPureComponents: false`) — turning
 * it on floods the console with renders that are correct-by-design (memoized
 * children re-rendering when their key set changes, etc.). Opt in per
 * suspect component while debugging.
 */

import React from "react"
import whyDidYouRender from "@welldone-software/why-did-you-render"

whyDidYouRender(React, {
  trackAllPureComponents: false,
  collapseGroups: true,
  logOwnerReasons: true,
})
