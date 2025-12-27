<div align="center">

# 🐱 Whiskers

**A polished, offline-first reading companion.**
<br />
_Built for focus. Powered by Expo & React Native._

<p>
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
  <img src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle" />
</p>

[Features](#-features) • [Showcase](#-app-showcase) • [Tech Stack](#-tech-stack) • [Setup](#-getting-started)

</div>

---

## 📖 The Product Story

**Whiskers** handles the chaos of a growing book collection without the noise of social media or ads. It is designed to be:

* ⚡ **Fast:** Capture books via ISBN scan or search in seconds.
* 🔒 **Private:** Offline-first architecture. No accounts, no cloud, no tracking.
* 🎨 **Polished:** A mobile-first UX with dark-mode friendly styling and smooth transitions.

---

## 📱 App Showcase

### 1. Dashboard & Momentum
Your reading life at a glance. Track current reads, pace, and daily streaks.

| **Home Dashboard** | **Home Detail** |
|:---:|:---:|
| <img src="assets/README/home1.jpg" width="280" /> | <img src="assets/README/home2.jpg" width="280" /> |

### 2. Discovery & Capture
Instant metadata lookup via **Open Library** & **Google Books**.

| **Search** | **Barcode Scan** |
|:---:|:---:|
| <img src="assets/README/search1.jpg" width="280" /> | <img src="assets/README/search2.jpg" width="280" /> |

### 3. Management & Tracking
A card-first library with status filters and rich note-taking capabilities.

| **Add Book** | **Library Filters** | **Book Detail & Notes** |
|:---:|:---:|:---:|
| <img src="assets/README/add-book2.jpg" width="240" /> | <img src="assets/README/library2.jpg" width="240" /> | <img src="assets/README/notes.PNG" width="240" /> |

---

## 🛠 Tech Stack & Architecture

This project demonstrates a modern, type-safe approach to React Native development.

| Category | Technology | Usage |
| :--- | :--- | :--- |
| **Framework** | **Expo (Managed)** | Rapid development, OTA updates, and `expo-router` for file-based navigation. |
| **Language** | **TypeScript** | Strict typing enabled for reliable refactoring and state management. |
| **Data Layer** | **Expo SQLite** | Local, on-device database engine. |
| **ORM** | **Drizzle ORM** | Type-safe SQL queries, migrations, and schema definition. |
| **API** | **OpenLibrary / Google Books** | External REST APIs for fetching cover art and metadata. |

### 📂 Project Structure

```text
src/
├── app/                 # Expo Router file-based navigation
├── features/            # Feature-based modular architecture (Add, Search, Library)
├── modules/             # Core data services and API clients
├── constants/           # Theming (Colors, Typography)
└── drizzle/             # Database schemas and migrations
