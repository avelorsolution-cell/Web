# CUSTOMER_DEMO_CHECKLIST.md

Practical pre-flight checklist for whoever presents this prototype live.

## Before you open the laptop for the customer

- [ ] **Check internet connectivity.** The demo currently loads trainer/subscriber
      avatars and a few gallery photos from `i.pravatar.cc` and `picsum.photos`
      (third-party image services). If the venue wifi is weak, blocked, or those
      services are unreachable, avatars will show as broken images. Test this on
      the actual venue network beforehand if possible.
- [ ] Run `npm run build` once to confirm a clean build (should show 0 errors).
- [ ] Start the dev server (`npm run dev`) and open `http://localhost:5173/`.
- [ ] Click **Reset Demo** once before the customer arrives, so all screens start
      from the canonical demo state (no leftover comparisons, bookings, or
      assessment drafts from your own rehearsal).
- [ ] Confirm the language switch (`English | العربية`) is set to **English** unless
      you're specifically opening in Arabic.

## Recommended walkthrough order (matches the canonical demo path)

1. **Root** → point out the clean hero, then **Start Demo**.
2. **Subscriber**: Home → Discover Trainers → apply a filter → select 2 trainers to
   Compare → open Sarah Ahmed's profile → Message (optional) → Back → choose a
   Package → Booking (date → time → review) → Payment (demo/simulated) → success →
   Confirmation.
3. Continue: My Training → Workout → complete a couple of sets → Finish Workout.
4. Body Assessment: Upload Report (use the "Use a sample report" shortcut, not a
   real file) → watch the upload/analyze animation → Review → Save.
5. Progress → point out the before/after comparison and charts.
6. Switch to **Trainer**: Dashboard → Calendar → Clients → open Maha's profile.
   ⚠️ Her detail screen opens on the **Overview** tab, not Progress — click the
   **Progress** tab yourself if that's what you want to show (see known-issue below).
7. Switch to **Admin**: Dashboard → Trainer Verification → open a pending trainer →
   demonstrate Approve / Request Update / Reject.
8. If asked about open product decisions, use **Business Decisions** — every item
   there is honestly labeled `Needs Decision` / `Proposed` / `Future` (nothing is
   mis-presented as final).

## Known issues to work around live (see `FINAL_QA_REPORT.md` for full detail)

- **Maha's client detail screen** opens on Overview, not Progress, when reached via
  the Presenter Navigator's "Maha Progress" shortcut — just click the Progress tab
  after it opens.
- A handful of secondary menu items (My Bookings, Payment Methods, Favorite
  Trainers, Help & Support, Terms, Privacy, and a few Trainer-side "coming soon"
  actions) lead to a generic "Coming Soon" placeholder whose feature name shows in
  English even when the app is in Arabic. If a customer asks about one of these in
  Arabic mode, mention it's a placeholder for a not-yet-built feature.
- Avatars/photos require internet access (see checklist item above).

## Language switching mid-demo

- The `English | العربية` toggle in the header and the "•••" menu on every
  Subscriber/Trainer screen both switch language instantly (no page reload).
- Translation coverage for everything in the walkthrough above is **100% complete**
  (verified — see `TRANSLATION_AUDIT.md`), so you can safely demo the full canonical
  path in Arabic as well as English.

## If something breaks live

- **Reset Demo** (top-right on the root page, or via the "•••" menu on any
  Subscriber/Trainer screen, or the floating 🎛️ Presenter button) restores the
  canonical state instantly.
- Every deep screen has a Back arrow and a Home icon in its header — you can never
  get stuck; if in doubt, tap Home or use the "•••" menu → **Prototype Home** to
  return to the root screen.
- A mistyped or bad URL shows a proper "Page Not Found" screen with buttons back to
  either the Prototype Home or Subscriber Home — never a blank white page.
