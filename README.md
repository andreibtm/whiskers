# Whiskers

Read deeply, remember more, and keep every thought in one place. Whiskers is an offline-first reading companion designed to cure fragmented reading—no more scribbles in margins, scattered stickies, or random notes apps.

## Why Whiskers

- **📚 The Anti-Library:** Organize Reading, Planning, and Finished stacks in a distraction-free dark mode space.
- **🧠 Thought Stream:** Timeline notes with quick tags (Questions, Facts, Quotes, Synthesis) to build a second brain for every book.
- **⚡ Scan & Scout:** Add books instantly by scanning ISBN barcodes (Google Books) or searching archives (Open Library).
- **🔒 Local First:** Your data lives on your device—no login, no cloud, no tracking. Just you and your books.

## Feature Highlights

- Barcode scanning to capture ISBNs and prefill book data.
- Manual add flow for titles without reliable metadata.
- Library view with cover art, authors, and navigation into per-book detail.
- Per-book note streams categorized for fast recall.
- Offline-friendly: SQLite via Expo + Drizzle ORM; everything persists locally.

## Tech Stack

- **Expo / React Native** for the mobile experience.
- **Expo Router** for file-based navigation.
- **Drizzle ORM + Expo SQLite** for local, offline-first storage.
- **Google Books / Open Library** for metadata lookups.

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Run the app (choose a platform in the Expo CLI)

```bash
npx expo start
```

3. If you hit DB errors on first run, reload so migrations can finish (handled in the app layout).

## Current Screens

- **Search**: Enter or scan an ISBN, fetch book metadata, save to library.
- **Add Manually**: Enter title/author/pages/ISBN and optional cover.
- **Library**: Browse saved books and open details.
- **Camera**: Scan barcodes with a minimal overlay and one-tap flow.

## Contributing

Issues and PRs are welcome. Please keep contributions focused on the offline-first reading experience, clarity of UI, and reliability of local data.
