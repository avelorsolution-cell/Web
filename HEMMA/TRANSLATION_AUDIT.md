# TRANSLATION_AUDIT.md

**Method:** `src/i18n/translations/en.ts` and `ar.ts` were compiled with esbuild and
diffed programmatically (recursive key flattening + interpolation-token extraction).
This is an exact, deterministic comparison — not a sample.

## Summary

| Metric | Count |
|---|---|
| TOTAL ENGLISH KEYS | 838 |
| TOTAL ARABIC KEYS | 838 |
| MATCHED KEYS | 838 |
| MISSING ARABIC | **0** |
| MISSING ENGLISH | **0** |
| EMPTY VALUES (English) | **0** |
| EMPTY VALUES (Arabic) | **0** |
| INTERPOLATION MISMATCHES | **0** |
| SUSPICIOUS ENGLISH-IN-ARABIC | 1 (verified false positive) |

## Details

### Missing Arabic keys
None.

### Missing English keys
None.

### Empty values
None in either file.

### Interpolation mismatches
None. No `{{var}}` / `{var}` placeholder is present in one language and absent/renamed
in the other.

### Suspicious English-in-Arabic (manually reviewed)
- `payment.savedCard` — value is `"Visa •••• 4242"` in both languages. **Not a bug** —
  this is a masked card number/brand string that is correctly identical in both
  locales (nothing to translate).

## Fixes made during this QA pass

The following customer-facing strings were found **hardcoded in JSX** (bypassing the
translation system entirely) and have been moved into `en.ts`/`ar.ts` under new keys:

| Location | Old (hardcoded) | New key |
|---|---|---|
| `Conversation.tsx` (subscriber chat send) | `'Message Sent'` | `toast.messageSent` |
| `Workout.tsx` (Finish Workout) | `'Workout Saved'` | `toast.workoutSaved` |
| `bodyAssessment/Review.tsx` (Save Assessment) | `'Assessment Saved'` | `toast.assessmentSaved` |
| `trainer/ProgramBuilder.tsx` (Publish) | `'Program Assigned'` | `toast.programAssigned` |
| `PresentationHome.tsx` ×2, `PresenterMenu.tsx`, `PrototypeMenu.tsx` | `'Reset Demo'` | `common.resetDemo` |
| `PresentationHome.tsx` reset-confirm modal | `'Reset demo data?'` + body sentence | `common.resetDemoConfirmTitle` / `common.resetDemoConfirmBody` |
| `pages/NotFound.tsx` (entire page) | 4 hardcoded strings, **no Arabic at all** | `notFound.title` / `notFound.body` / `notFound.backToPrototypeHome` / `notFound.subscriberHome` |

After these fixes the diff was re-run: **838/838 matched, 0 missing, 0 empty, 0
mismatches** (up from 831/831 before the fix — the new keys account for the +7).

## Known remaining hardcoded-English items (not fixed — see rationale)

These are **not P0 core flows** — they are the "feature name" labels passed to the
generic, not-yet-built `/subscriber/coming-soon` placeholder screen. Fixing all of
them means adding ~14 new keys for screens that intentionally don't exist yet in the
prototype. Flagged as **Medium priority**, not blocking:

- `Booking.tsx`: `'Cancellation Policy'`
- `Confirmation.tsx`: `'Calendar Sync'`, `'My Bookings'`
- `Home.tsx`: `'Notifications'`
- `Profile.tsx` / `trainer/Profile.tsx`: `'My Bookings'`, `'Payment Methods'`,
  `'Favorite Trainers'`, `'Notifications'`, `'Help & Support'`, `'Terms'`, `'Privacy'`
- `trainer/ProgramBuilder.tsx`: `'Assign Client'`, `'Duplicate Template'`
- `trainer/ClientProgress.tsx`: `'Add Trainer Measurement'`, `'Request New Assessment'`
- `trainer/Packages.tsx`: `'Create Package'`, `'Edit Package'`
- `trainer/Calendar.tsx`: `'Block Time'`

**Impact if left as-is:** an Arabic-mode user who taps one of these sees the
"Coming Soon" screen's own chrome in Arabic, but the specific feature name in the
body text appears in English. Low customer impact (these are explicitly "not built
yet" stubs), but should be cleaned up before a fully polished Arabic walkthrough of
every menu item.

## Terminology consistency (spot-checked, not exhaustively reviewed)

Checked the specific terms called out in the QA brief against `ar.ts`:

| English | Arabic used | Consistent? |
|---|---|---|
| Body Assessment | تقييم الجسم | ✅ used consistently |
| Weight | الوزن | ✅ |
| BMI | مؤشر كتلة الجسم | ✅ |
| Body Fat | نسبة الدهون | ✅ |
| Muscle Mass | كتلة العضلات | ✅ |
| Waist | محيط الخصر | ✅ |
| Subscriber | المشترك | ✅ |
| Booking | الحجز | ✅ |
| Payment | الدفع | ✅ |
| Verified | موثّق | ✅ |

I did **not** read every one of the 838 Arabic strings for translation *quality*
(as opposed to presence/parity) — that would require a native Arabic speaker's
review for tone/register, which is outside what I can verify. The parity numbers
above (0 missing / 0 empty / 0 interpolation breaks) are hard, verified facts;
the *quality* of the Arabic prose is spot-checked only.
