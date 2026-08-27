# 0086 — Publisher credit accrual precedes Connect transfer

**Status:** Accepted

Publisher earnings first exist as `credit_micro` payable in the exact marketplace journal. A separate idempotent accrual converts only whole configured units into `usd_cent` cash payable; any remainder stays in credit units. A later exact transfer atomically reserves cash in a pending subledger before calling the enabled Stripe connected account. Provider failure releases it; success clears pending cash into exact transfer evidence.

Install price, platform fee, publisher credit, publisher cash, and transferred cash are distinct accounts. Stripe transfer success is evidence for that transfer, not authority to recompute marketplace economics. Payout, fee, dispute, and reversal events require separate reconciliation contracts.
