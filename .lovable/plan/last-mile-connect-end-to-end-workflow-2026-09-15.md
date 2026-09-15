# Last Mile Connect end-to-end workflow

## Goal
Build a polished, clickable telecom service marketplace that carries a user from service discovery through booking, live tracking, and completion.

## What will be built
- A persistent Last Mile Connect top bar and six-service sidebar, including help and custom-solution actions.
- A marketplace home with service filters, service cards, prices, metrics, and category-specific views.
- A field-engineer service detail view with scope, turnaround, coverage, pricing, and booking action.
- A four-stage survey form with selectable survey type, editable floor rows, contact/site details, file drop area, and scheduling.
- A booking and payment review with selected services, payment choices, checklist, and confirmation action.
- A tracking experience that advances through pending, assigned, scheduled, in-progress, and completed states.
- An assigned engineer profile, timeline, rescheduling/contact controls, completion documents, outcome metrics, and feedback submission.
- Responsive behavior for desktop and mobile while preserving the enterprise dashboard density.

## Interaction flow
```text
Marketplace → Category / service → Service details → Survey form
            → Booking review → Tracking states → Completion
```

Every primary action will update the visible workflow or navigate to the relevant view. Secondary actions such as category filters, adding floors, payment selection, status advancement, downloads, and feedback will also respond visibly.

## Technical details
- Keep the experience frontend-only with in-memory React state; no account, payment, upload, or persistence service is required for this prototype.
- Use the existing TanStack route at `/` for the complete journey, avoiding dead links while keeping each workflow stage addressable through app state.
- Reuse the existing shadcn controls and semantic Tailwind theme tokens.
- Add route-specific metadata for Last Mile Connect and remove placeholder metadata.
- Validate the finished journey in the running preview at desktop and mobile sizes, including console and runtime checks.
