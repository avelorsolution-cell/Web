# HEMMA — Interactive Concept Prototype

A Qatar-focused sports and fitness ecosystem prototype: subscribers discover and book verified
trainers, train against personalized programs, track body composition over time, and communicate
with their trainer — all inside one platform. Trainer and Admin experiences are included so the
full DISCOVER → COMPARE → BOOK → PAY → TRAIN → ASSESS → TRACK → COMMUNICATE → IMPROVE → REVIEW
story can be demonstrated end to end.

**Developed by [Avelor Solutions](https://avelorsolutions.com/).**

## What this is

This is a **customer-approval prototype**, not a production application. It exists to let a
customer see, click through, and approve the product direction, user flows, and UI/UX before any
production build begins. See `CUSTOMER_DECISIONS.md` for the list of business decisions still
required, and `DEMO_GUIDE.md` for the recommended walkthrough order.

## Prototype limitations (by design)

- **No real payments.** Checkout is fully simulated — no payment gateway is integrated, and no
  real financial data is collected or transmitted.
- **No real report analysis.** Body Assessment report upload simulates OCR/AI extraction with a
  timed animation and mock data; no file is actually parsed.
- **No production backend.** All data is in-memory React state and mock JSON — nothing persists
  across a hard page reload, and nothing is sent to a server.
- **No real authentication.** Login/signup/OTP screens are demonstrative only.
- Deep secondary Admin/Trainer screens (Sports, Promotions, CMS, Roles, Audit Log, Settings,
  Program/Workout builders) are intentionally lighter-weight than the hero screens — enough to
  demonstrate the concept, not full CRUD tooling.

## Tech stack

- **React 19 + TypeScript**, built with **Vite**
- **Tailwind CSS** for styling
- **React Router v6** for client-side routing
- **lucide-react** for iconography
- No backend, no database, no external API calls — the app runs entirely client-side

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check and produce a production build in dist/
npm run preview  # preview the production build locally
```

## Android (Capacitor)

The `android/` folder is a [Capacitor](https://capacitorjs.com/) wrapper that packages the same
web app as a native Android shell — no server, no separate codebase. It loads the bundled `dist/`
build locally; it never connects to a dev server.

```bash
npm install
npm run build
npx cap sync android

cd android
export JAVA_HOME=$(brew --prefix openjdk@21)   # requires JDK 21+
./gradlew assembleDebug
# APK output: android/app/build/outputs/apk/debug/app-debug.apk
```

- **App ID:** `com.avelorsolutions.hemma.prototype`
- **App name:** HEMMA
- Requires the Android SDK command-line tools (`platform-tools`, `platforms;android-34`,
  `build-tools;34.0.0`) and a `local.properties` file in `android/` pointing `sdk.dir` at your SDK
  install (this file is machine-specific and intentionally not committed).
- This is a **debug** build only — no release signing/keystore is configured, and none should be
  added to this repo.

## Project structure

```
src/
  components/
    ui/            reusable primitives (Button, Input, Badge, Modal, LineChart, ...)
    cards/          composite cards (TrainerCard, MetricCard, JourneyTracker, ...)
    layout/         PhoneFrame, TopBar, BottomNav, PresenterMenu, ...
    admin/          AdminSidebar, AdminTable, StatCard (desktop-only)
  context/          AppStateContext (booking/session state), BodyAssessmentContext
  data/             mock data: trainers, sports, training programs, admin stats, ...
  i18n/             English/Arabic translations + LanguageContext (RTL-aware)
  pages/
    subscriber/     mobile-first subscriber journey (phone-frame simulated)
    trainer/        mobile-first trainer app
    admin/          desktop admin portal (sidebar layout, no phone frame)
    PresentationHome.tsx, BusinessDecisions.tsx, EdgeCases.tsx, FutureRoadmap.tsx
```

Subscriber and Trainer screens are rendered inside a simulated 390×844 phone frame to make the
mobile-app intent obvious on a desktop browser during a customer meeting. Admin is a genuine
desktop SaaS layout with a fixed sidebar.

## Demo data

All prototype data is fictional and Qatar-themed. Canonical demo personas used consistently
throughout:

- **Subscriber:** Maha Al-Kuwari (Doha) — goal: Strength & Body Composition
- **Primary trainer:** Sarah Ahmed (West Bay, Doha) — 8 yrs experience, 4.9★, 120 verified reviews
- **Other trainers:** Ahmed Khaled, Omar Nasser, Sara Ali
- **Canonical booking:** Sarah Ahmed · Standard Strength Package · 16 Sep 2026, 3:00 PM
- **Canonical body assessment history:** 75.0kg/24.5 BMI (15 Jul) → 72.0kg/23.5 BMI (15 Sep)

## Language

The entire prototype supports English and Arabic with full RTL mirroring (layout direction, back
arrows, number formatting, charts). Toggle with the language switcher in any header, or jump
straight into the Arabic experience from the Presentation Home's Meeting Tools section.

## Presenter tools

A floating **Presenter Navigator** (bottom-right corner on every screen) lets you jump directly to
any Subscriber, Trainer, Admin, or Meeting screen without replaying the full flow — see
`DEMO_GUIDE.md`. **Reset Demo** (Presentation Home header, or inside the Presenter Navigator)
restores the prototype to its original presentation state for repeat demonstrations.

---

*This prototype demonstrates product direction and UX only. No real user data, payments, health
records, or production infrastructure are involved.*
