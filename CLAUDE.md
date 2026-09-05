# Running Calendar — Architecture Reference

PWA for planning and tracking running training programs. Built from the same patterns as the fasting calendar (github.com/sandymcfadden/fasting) — read that project for shared learnings.

Live: running.sandym.ca

## Stack
Vite + React + TypeScript + Tailwind v4 (`@tailwindcss/vite`) + Dexie + dexie-react-hooks + vite-plugin-pwa + date-fns

## Key design decisions

**Fixed-length programs (not repeating cycles)**  
`Program.days` is a flat array of `ProgramDay` objects. `days[0]` = `startDate`, `days[1]` = `startDate + 1 day`, etc. `getRunTypeForDate()` in `src/utils/program.ts` computes the day offset and looks up `days[offset]`. If `offset >= days.length`, the day is outside the program (no color).

**Pre-seeded half marathon program**  
`src/data/halfMarathonProgram.ts` contains the full 10-week plan (Aug 4 – Oct 12, 2025) derived from a Google Calendar ICS export. It's loaded via the "Load Half Marathon Program" button in ProgramList — not auto-seeded on first run.

**12 run types** defined in `src/data/runTypes.ts`:
rest, easy, long-run, fast-finish-long, progressive, steady-state, tempo, tempo-intervals, cruise-intervals, fartlek, speed, half-marathon

**DayLog** stores: status (optional), runTypeOverride, runTypeId (snapshot at save — preserves color if program deleted), distanceKm, durationMinutes, notes

**Distance unit**: stored in localStorage (`distanceUnit` key), toggled via button in App.tsx header area. Distances stored in km always; converted for display.

**Per-day target duration**: stored in `ProgramDay.targetDuration` (string like "50–70 min"). Shown in DayDetail modal. Not present on custom programs unless user adds it.

## Important gotchas (inherited from fasting project)

- **`import type` required** for all imports from `types.ts` — Vite/esbuild strips pure-interface files to `export {}`
- **`npm install` not `npm ci`** in CI — Tailwind v4's oxide engine installs platform-specific optional native binaries that differ between macOS and Linux
- **`tsc -b` not `tsc --noEmit`** for local type checking — matches what `vite build` does in CI
- **Escape key**: both modal components (DayDetail, ProgramEditor) add a `keydown` listener in `useEffect` to close on Escape

## File structure
```
src/
  types.ts                      — RunType, Program, ProgramDay, DayLog, DayStatus
  db/db.ts                      — Dexie schema (programs, dayLogs tables)
  data/runTypes.ts              — 12 RunType definitions with colors
  data/halfMarathonProgram.ts   — seeded 10-week HM plan
  utils/program.ts              — getRunTypeForDate, getCalendarDays, today, formatDistance, formatDuration
  components/
    Header.tsx                  — nav bar (Calendar / Programs)
    CalendarView.tsx            — month grid, color-coded by run type
    DayDetail.tsx               — bottom-sheet modal: log status, distance, duration, type override
    ProgramEditor.tsx           — week-by-week program builder
    ProgramList.tsx             — program cards + half marathon loader + DataPortability
    DataPortability.tsx         — export/import JSON backup (replace or merge)
```

## GitHub Pages
- Deploys via GitHub Actions on push to main (`.github/workflows/deploy.yml`)
- Custom domain: `running.sandym.ca` (CNAME in `public/`)
- DNS: add CNAME record `running → sandymcfadden.github.io` at your DNS provider
