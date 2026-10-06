# HEMMA — Customer Demo Guide

Recommended presentation sequence. Use the floating **Presenter Navigator** (🎛️ icon, bottom-right
of every screen) to jump directly between stops — you never need to replay a flow from the start.

Start at **http://localhost:5173/** (Presentation Home).

| # | Screen | What it demonstrates | Ask for approval on |
|---|--------|----------------------|----------------------|
| 1 | Presentation Home | HEMMA is a full ecosystem, not a booking app | Overall product direction |
| 2 | Subscriber Home | Guided journey, fitness snapshot, upcoming session all in one place | Home screen hierarchy |
| 3 | Trainer Discovery | Search, filter, verified badges, ratings | Discovery UX, trust signals |
| 4 | Compare Trainers | Side-by-side comparison of up to 3 trainers | Comparison feature |
| 5 | Trainer Profile (Sarah Ahmed) | Hero profile: bio, certifications, packages, reviews | Trainer profile depth |
| 6 | Package selection | Basic/Standard/Premium tiers | Package/pricing structure |
| 7 | Booking (date/time/review) | Stepper flow, availability states | Booking UX |
| 8 | Demo Payment | Simulated checkout, all payment states | Payment UX (not the gateway) |
| 9 | Booking Confirmation | Receipt-style confirmation | — |
| 10 | My Training | Active program, next session, recent activity | Post-booking value |
| 11 | Workout | Interactive set tracking, previous performance | Workout UX |
| 12 | Body Assessment → Upload Report | Simulated report analysis | Assessment UX, extraction disclaimer |
| 13 | Review Extracted Measurements | Editable, clearly labeled as extracted | Data trust/accuracy framing |
| 14 | Progress → Assessment Comparison | 75kg→72kg transformation story | **This is a differentiator — emphasize it** |
| 15 | Chat (Messages) | Trainer/subscriber messaging | Communication feature |
| 16 | Trainer Dashboard | Revenue, schedule, quick actions | Trainer-side value |
| 17 | Maha's Client Profile → Progress tab | Trainer sees subscriber's body assessment with consent | Data-sharing model |
| 18 | Trainer Program Builder | How trainers assign/manage programs | Coaching tooling |
| 19 | Admin Dashboard | Executive metrics, revenue/booking trends | Platform oversight |
| 20 | Trainer Verification → detail | Approve/reject workflow with audit trail | Verification process |
| 21 | Admin Bookings | Booking table + detail | Operations tooling |
| 22 | Admin Finance | Payments/Refunds/Payouts, linked by booking ID | Financial model |
| 23 | Admin Reports | Revenue, adoption, engagement metrics | Reporting depth |
| 24 | Business Decisions | Every open question grouped and status-tagged | **Drive the actual approval conversation here** |
| 25 | Future Roadmap | Phase 1–4 scope boundaries | Scope expectations |
| 26 | Arabic Experience | Toggle language anywhere — full RTL | Localization quality |

## Live demo tips

- **Payment outcomes:** the Payment screen has a "Presenter: simulate outcome" control — pick
  Success, Failed, or Cancelled to show any state on demand.
- **Body Assessment upload:** use "Use a sample report (demo)" instead of picking a real file, or
  use the simulate-outcome chips to show Unsupported/Too Large/Could Not Read states.
- **Trainer verification:** the Verification detail screen's Approve/Reject/Request Update buttons
  are fully live — approving updates the status badge and appends to the audit history in real
  time.
- **Reset Demo:** available in the Presentation Home header and inside the Presenter Navigator.
  Use it between customer meetings to restore the original presentation state (clears bookings,
  comparisons, and body assessments back to the canonical seed data).

## What NOT to demo as "done"

Be upfront that these are concept-only, not built:
- Marketplace, Trainer Store, Healthy Food, Gifting (preview cards only)
- Challenges & Rewards (preview card only)
- Wearables, video calls, AI-assisted extraction (roadmap only)
- Kids Training (parent/guardian consent flow is a stated business decision, not built)
