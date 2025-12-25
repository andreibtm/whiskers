<div align="center">

# Whiskers

_A polished, offline-first reading companion built with Expo + React Native._

</div>

## Highlights at a Glance

- Barcode scanning + Open Library / Google Books lookups to prefill metadata in seconds.
- Manual add flow with cover picker, progress tracking, and per-book notes.
- Offline-first SQLite persistence via Drizzle ORM—no auth, no cloud, your data stays local.
- Mobile-first UX with Expo Router, lean components, and dark-friendly styling.

## Screenshots

| Library                                | Search                                  | Add Book                                | Book Detail                                |
| -------------------------------------- | --------------------------------------- | --------------------------------------- | ------------------------------------------ |
| ![Library](assets/README/IMG_0965.jpg) | ![Search](assets/README/IMG_0966.jpg)   | ![Add Book](assets/README/IMG_0967.jpg) | ![Book Detail](assets/README/IMG_0968.jpg) |
| Notes                                  | Progress                                | Filters                                 | Edit Book                                  |
| ![Notes](assets/README/IMG_0969.jpg)   | ![Progress](assets/README/IMG_0970.jpg) | ![Filters](assets/README/IMG_0971.jpg)  | ![Edit Book](assets/README/IMG_0972.jpg)   |

## Feature Snapshots (with context)

<table>
  <tr>
    <td width="45%">
      <strong>Library overview</strong><br />
      Card-based grid with status pills to jump into any title quickly.
    </td>
    <td align="center">
      <img src="assets/README/IMG_0965.jpg" alt="Library overview" width="320" />
    </td>
  </tr>
  <tr>
    <td>
      <strong>Smart search</strong><br />
      ISBN scan or text search pulls clean metadata so the form starts prefilled.
    </td>
    <td align="center">
      <img src="assets/README/IMG_0966.jpg" alt="Smart search" width="320" />
    </td>
  </tr>
  <tr>
    <td>
      <strong>Guided add flow</strong><br />
      Manual entry with cover picker and validation for the essentials.
    </td>
    <td align="center">
      <img src="assets/README/IMG_0967.jpg" alt="Guided add flow" width="320" />
    </td>
  </tr>
  <tr>
    <td>
      <strong>Book detail</strong><br />
      Rich header, status chip, and quick links to edit or open notes.
    </td>
    <td align="center">
      <img src="assets/README/IMG_0968.jpg" alt="Book detail" width="320" />
    </td>
  </tr>
  <tr>
    <td>
      <strong>Notes that stick</strong><br />
      Fast note-taking space per book with clear typographic hierarchy.
    </td>
    <td align="center">
      <img src="assets/README/IMG_0969.jpg" alt="Notes workspace" width="320" />
    </td>
  </tr>
  <tr>
    <td>
      <strong>Progress tracking</strong><br />
      Update current page, see percent complete, and visualize progress.
    </td>
    <td align="center">
      <img src="assets/README/IMG_0970.jpg" alt="Progress tracking" width="320" />
    </td>
  </tr>
  <tr>
    <td>
      <strong>Library filters</strong><br />
      Triage by status (Reading, Paused, Finished) without losing context.
    </td>
    <td align="center">
      <img src="assets/README/IMG_0971.jpg" alt="Library filters" width="320" />
    </td>
  </tr>
  <tr>
    <td>
      <strong>Edit without friction</strong><br />
      Adjust title, author, pages, ISBN, and cover in one pass.
    </td>
    <td align="center">
      <img src="assets/README/IMG_0972.jpg" alt="Edit book" width="320" />
    </td>
  </tr>
</table>

## Product Story

Whiskers is designed to keep long-form reading organized: capture a book via scan or search, drop quick notes with tags, and track progress without losing context. The app is intentionally offline-first to keep focus on reading—not accounts, sync, or ads.

## Core Features

- **Capture fast:** Scan an ISBN or search by title/author; metadata pre-fills the add form.
- **Flexible covers:** Import from gallery or use provided art; previews fit without cropping.
- **Progress tracking:** Update current page, see percent complete, and watch weekly streaks.
- **Notes that stick:** Per-book note streams with lightweight categorization for recall.
- **Library controls:** Filters by status (Reading, Paused, Finished) with clean cards.

## Architecture

- **Client:** Expo + React Native with Expo Router for file-based navigation.
- **State/logic:** Screen-specific hooks keep UI lean; minimal global state.
- **Data:** Drizzle ORM on Expo SQLite for local, schema-driven persistence.
- **Integrations:** Google Books / Open Library for metadata enrichment.

## Developer Experience

- TypeScript everywhere with strict eslint/tsconfig defaults.
- Modular feature folders (add-book, search, library, book, camera) to keep changes scoped.
- Theming via `src/constants/theme.ts` for consistent colors and typography.

## Getting Started

```bash
npm install
npx expo start
```

- Choose a platform in the Expo CLI (iOS simulator, Android emulator, or Expo Go).
- On first boot, allow the app to run migrations; if the DB feels stale, reload once.

## Project Map

- App shell and routing: `src/app`
- Feature views and logic: `src/features/*`
- Data + services: `src/modules/*`
- Database schema/migrations: `drizzle/`
- Assets and README screenshots: `assets/README/`

## Tech Stack

- **Expo / React Native** for mobile UI
- **Expo Router** for navigation
- **Drizzle ORM + Expo SQLite** for offline data
- **TypeScript** for safety and IDE support

## Contributing

Issues and PRs are welcome. Focus on keeping the experience fast, offline-first, and distraction-free.
