# Elevate Gym Management System

Gym membership + RFID operations preview for **Elevate Lifestyle & Fitness**.

This repository currently focuses on a **UI-first** Next.js dashboard experience backed by deterministic **mock data**, with future integrations planned for RFID hardware, locker control, and biometric attendance.

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Vitest
- OpenSpec (spec-driven workflow under `openspec/`)

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm

### Install

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

Then open:

- `http://localhost:3000`

### Other scripts

```bash
npm run lint
npm run test
npm run build
npm run start
```

## App Routes

- `/` Marketing landing page
- `/register` Public registration preview (mock API)
- `/dashboard` Operations dashboard preview
- `/dashboard/members` Members directory (mock data + drawer)
- `/dashboard/employees` Employees attendance page (mock data + drawer)
- `/dashboard/lockers` Lockers occupancy page (RFID session mock + drawer)

## Current UI Capabilities (Mocked)

- **Members directory**
  - Search + filter
  - Detail drawer
- **Employees attendance**
  - Compliance status filters
  - Biometric ID shown in drawer
- **Lockers occupancy**
  - Track available vs occupied
  - Occupied sessions bound to RFID
  - Session release conceptually happens at cashier logout
- **Dashboard analytics**
  - KPI tiles
  - Analytics trend + breakdown cards

## OpenSpec Workflow

This project uses OpenSpec to propose and track changes.

### Create a change

1. Create a new folder under `openspec/changes/<change-id>/`
2. Add:
   - `proposal.md`
   - `tasks.md`
   - `specs/<capability>/spec.md`
3. Validate:

```bash
openspec validate <change-id> --strict --no-interactive
```

### Implement an approved change

Work through the checklist in `openspec/changes/<change-id>/tasks.md` and mark items `- [x]` when done.

## Troubleshooting

### Dev server starts but pages return 404 for `/_next/static/...`

If you see repeated 404s for chunks/CSS (for example `/_next/static/css/app/layout.css` or `/_next/static/chunks/main-app.js`) or a `MODULE_NOT_FOUND` under `.next/server/...`, it is usually caused by a stale Next dev build cache.

Try:

1. Stop the dev server.
2. Delete the `.next` folder.
3. Restart:

```bash
npm run dev
```

If it still happens, also try reinstalling deps:

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## License

TBD
