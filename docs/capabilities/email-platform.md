# Email Platform

**Status:** Partial implementation

Email is both a communication transport and an entity-addressing capability. An entity may publish an address such as `<entity>@email.1var.com`, allowing people and systems to interact with reusable work through familiar email while the entity remains governed by ordinary 1var permissions and behavior.

## Current outbound safeguards

The compute layer builds and sends raw messages through Amazon SES and includes several reputation and consent controls:

- first-contact invitations and double opt-in behavior;
- sender-specific and global blocking;
- `List-Unsubscribe` and one-click unsubscribe headers;
- per-user reservation/rate limits that grow with account age;
- block-ratio and rolling hard-bounce thresholds;
- local suppression records for permanent and repeated transient bounces;
- SES configuration-set metadata/tags and daily metrics;
- idempotent processing of SES bounce events.

These controls align with important parts of [Amazon SES reputation guidance](https://docs.aws.amazon.com/ses/latest/dg/faqs-enforcement.html), [configuration sets](https://docs.aws.amazon.com/ses/latest/dg/using-configuration-sets.html), [subscription management](https://docs.aws.amazon.com/ses/latest/dg/sending-email-subscription-management.html), and [suppression lists](https://docs.aws.amazon.com/ses/latest/dg/sending-email-suppression-list.html).

## Platform fit

- The entity address is a stable interaction target, not merely an alias for a human mailbox.
- Inbound content should enter the same sentence/Essence/Path/command runtime as browser messages, subject to channel-specific safety rules.
- An entity can prepare or send mail only with the sender's permission, recipient-consent policy, and appropriate protected assets.
- Parent/child lineage can compose brand, workflow, authorization, templates, and delivery behavior.
- Public templates can package compliant workflows; private entities keep organizational messages and contacts private.

## Do not overstate compliance

The code contains meaningful anti-spam and bounce controls, but source inspection alone does not prove that a deployment is fully compliant or has good standing with AWS. Production verification must cover SES identity authentication (SPF, DKIM, and DMARC), account-level suppression, configuration-set event destinations, complaint events, sandbox/production status, quotas, and current reputation metrics. Amazon publishes these operational signals through the [SES reputation dashboard](https://docs.aws.amazon.com/ses/latest/dg/reputation-dashboard-dg.html) and related monitoring services.

## Required work

- Add and test complaint-event handling alongside bounce processing.
- Define inbound routing, attachment scanning, content limits, sender authentication, and entity-address ownership.
- Verify unsubscribe and consent behavior across every message source, including automations and scheduled tasks.
- Version the email command/event schemas and make retries idempotent.
- Add abuse reporting, moderation, tenant isolation, retention, deletion, and audit policies.
- Continuously reconcile local limits with actual SES quotas and reputation state.

