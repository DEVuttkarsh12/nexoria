# Zykken signature systems — October 9, 2026

The user requested distinctive, understandable names and a buildable signature feature for each of the agency’s five services. The active catalog now lives in `offers.mjs`, exported as `services` from `content.mjs`. Homepage cards, service details, footer links and inquiry labels use that catalog. Inquiry emails use the same names. The existing API values and service fragment IDs remain compatible.

These are **custom-build offers and implementation blueprints**, not five SaaS products already running behind this marketing website. The example receipts are labelled illustrative flows. Feature scope, integrations, delivery dates and operating costs are agreed per proposal. No new client results or exclusive-market claims were added.

| Offer | Existing expertise | Signature feature | Useful difference in the offer |
| --- | --- | --- | --- |
| Flowback | Workflow automation | Safe Replay Desk | Step-level receipts, duplicate checks and an approved recovery path rather than an uninspected full rerun |
| Carryline | Voice/chat agents | Context Passport | Confirmed context, unresolved questions and an accepted next owner across the selected channels |
| IntentPath | Websites | Decision Brief | A visitor-reviewed enquiry brief and route based on the actual offer catalog |
| PreviewOps | Custom software/SaaS | Change Rehearsal | Preview selected business changes, check conflicts and permissions, then retain the committed change receipt |
| PledgeDesk | CRM/follow-up | Commitment Radar | Source-linked promises with confirmed owners/dates and tracked completion |

Names pair a short, meaningful label with a plain-language category. Flowback refers to recovering a stopped flow; Carryline to carrying context along a conversation; IntentPath to the visitor’s goal and route; PreviewOps to reviewing operational changes; PledgeDesk to making customer commitments accountable. These are Zykken service labels. The research is not trademark clearance.

## Market research and feasibility

The small market sample included [Morningside’s strategy/development/adoption offer](https://www.morningside.ai/) and [Spur’s conversational automation offer](https://www.spurnow.com/en). [Retell already describes contextual warm transfers](https://www.retellai.com/blog/effortless-handoffs-with-retell-ais-warm-transfer-feature), so a basic handoff is not an exclusive invention. The website differentiates the specific custom workflow, its visible evidence and ownership, rather than claiming nobody else provides these capabilities. A search also found an existing PromiseTrack call-management offer and a Threadline context product; those candidate labels were rejected.

Useful implementation primitives are available: [n8n error workflows](https://docs.n8n.io/flow-logic/error-handling/) expose failed execution context, and [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests) support safely repeating supported API requests. They are components for a custom recovery design, not a blanket guarantee that any third-party action can be retried or undone.

## Build blueprints and acceptance criteria

### Flowback / Safe Replay Desk

- Start with a selected workflow and record a job ID, per-step status, input/result references and provider operation IDs in a durable store.
- On failure, present the completed steps and proposed recovery. Reconcile the provider result where possible before deciding to retry.
- Wrap supported writes in idempotency keys or a durable uniqueness check. Separate the unfinished step from the original full workflow. Require manual reconciliation when a provider’s result is uncertain or its API cannot make a repeat safe.
- Acceptance: a failure after a confirmed payment can recover the missing invoice sync without issuing another payment or creating a second invoice. An unknown external result remains in review. The owner and recovery result are recorded.
- No promise of general rollback or exactly-once delivery across arbitrary external services.

### Carryline / Context Passport

- Store a structured enquiry brief: customer identity reference, confirmed facts, source transcript references, open questions, commitments, next owner and handoff state.
- Link records through a verified identifier or explicit continuation link, with business-approved access and retention rules. Do not merge unrelated customers by a guessed identity.
- Connect selected phone/chat/messaging webhooks. Brief the receiving human and mark the handoff accepted only after an actual acceptance event; otherwise route to the agreed callback/queue fallback.
- Acceptance: a verified cross-channel customer can continue a test enquiry with the relevant brief; unrelated identities remain separate; an unanswered handoff creates a traceable fallback rather than being marked completed.

### IntentPath / Decision Brief

- Define a small question flow and routing rules against the client’s actual service catalog. A deterministic form is sufficient for v1; optional AI can draft a summary, with validation and visitor review.
- Let the visitor edit goals, constraints and the summary before submission. Clearly distinguish a recommended route from a fixed quote or an approved appointment.
- Send the approved brief through the client’s selected form/CRM integration and preserve it on a failed submission.
- Acceptance: test journeys reach the appropriate approved route; edits survive validation or delivery failures; nothing is sent before the visitor submits. This feature is not installed as a live guided-brief integration on the current Zykken site.

### PreviewOps / Change Rehearsal

- Start with one supported command, such as a roster update. Compute a proposed record diff and conflicts from the current database state without applying the change.
- Associate the preview with record versions, an expiration and the required approver. Recheck authorization and conflicts at commit time; reject a stale preview.
- Apply database changes transactionally where supported. Queue external notifications separately and expose their status. Store before/after references and actor/approval metadata.
- Acceptance: preview produces no writes; unauthorized or stale approvals do not commit; a successful commit has an accurate receipt. External side effects require separate adapter-specific handling and are not universally predictable or reversible.

### PledgeDesk / Commitment Radar

- Read only approved notes/message sources. Draft a structured commitment with the original excerpt/reference, proposed owner, due date/time zone and confidence/review state.
- Ask a human to confirm ambiguous dates, vague promises and ownership. Deduplicate commitments, retain edits and avoid treating model output as confirmed fact.
- Use a scheduler to remind an assigned owner. Track completion against a team action or a confirmed integrated event. Outbound customer messaging must follow the client’s approved rules and channel preferences.
- Acceptance: a sample quote promise becomes a source-linked item with a confirmed date and owner; vague timing enters review; duplicate notes do not create duplicate tasks; an unrelated email does not count as proof of completion.

## Verification of the website change

- Build: 19 generated pages. All 14 existing tests pass; the contact API and greeting loader retain their contracts.
- The homepage, services, contact and custom-quote pages were checked in the browser at actual widths 320, 390, 768, 1024 and 1440px. No horizontal overflow, clipped feature panels or completed broken images were detected.
- The five service anchors, five signature panels and names were inspected. Desktop homepage cards and the phone Safe Replay Desk panel were visually reviewed.
- The contact selector displays the new names and categories. IntentPath selects the preserved `website` API value. No live email was sent.
- Browser error/warning logs were empty in the checked preview. All retired pricing-package checks continue to pass.
- Marketing examples and the feature blueprints were reviewed; the proposed client systems themselves were not deployed or integration-tested as part of this website copy update.

Previews: `previews/signature-systems-desktop.jpg` and `previews/signature-service-mobile.jpg`.
