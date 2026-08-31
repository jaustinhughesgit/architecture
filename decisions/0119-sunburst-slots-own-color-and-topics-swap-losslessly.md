# 0119: Sunburst slots own color and topics swap losslessly

**Status:** Accepted decision; fixed-slot browser presentation is implemented in source. Durable cross-device bank and activation delivery remain Partial.

## Context

The Sunburst must preserve one recognizable rainbow while letting users and organizations maintain far more topics than can remain visible at once. Treating colors as editable category properties would make visual position unstable. Treating every ray as a fixed five-cell counter would also display decoration rather than the widgets and activity that actually exist.

## Decision

Twenty trusted presentation slots own a fixed rainbow palette. Topic categories occupy those slots. Slot zero remains the permanent purple `system.1var` control. Package and legacy overlay color values remain parseable for compatibility but cannot redefine fixed-slot rendering.

The visible Sunburst is bounded and the topic bank is conceptually unbounded. The bank is identity-level, not installation-level: retaining an exact ray group makes it available after another template is activated. A swap moves one bank occupant into an editable slot and moves the displaced occupant into the bank as one lossless presentation operation. Publishing freezes active occupants into a new immutable package and excludes the inactive bank, local activity, protected data, and system ray.

Every visible category renders one transparent placeholder dot. Additional dots exist only for projected widgets. Dot size represents bounded activity counts: `1–3`, `4–19`, and `20+`; zero remains transparent. The responsive widget page always offers five baseline cards or placeholders and can scroll as widgets grow.

The compact Sunburst is the default right-side control. A one-percent-opacity black circle behind the complete burst is the wheel grabber. Circular motion beginning on the grabber or through a pointer-transparent activity dot rotates the complete wheel. The ray nearest twelve o'clock is the exact preview and selection source: its fixed color drives the larger center `1var` circle, and a temporary white-on-dark pill above the burst names that category only during active spin motion. Pointer release commits that same top ray, preserves the nearest equivalent exact rotation instead of resetting the wheel, and removes the pill. The center remains the only action surface: tap opens the widget dashboard; upward drag opens template and topic management, including the signed marketplace and identity-level bank; stationary hold customizes the selected group; and left drag transitions into the existing four-button slider and Essence input. Activity dots own no click, action-drag, or keyboard-button behavior. Marketplace actions are review-before-commit operations, so one pointer gesture cannot silently charge, publish, install, or activate. Closing or submitting the ephemeral input returns to the Sunburst. These gestures emit typed interaction intents and cannot modify trust lanes or grants.

The current bank is an identity-level browser-local projection shared across local template installations; active assignment overlays, widget lists, and activity counts remain installation-scoped browser-local projections. The durable design must use bounded records and cursor paging. It must not create one DynamoDB table per topic or one unbounded account record.

## Consequences

- Categories can be replaced or restored without losing prior work.
- The rainbow retains stable spatial meaning even when template topics differ.
- Widget/activity visuals correspond to real projections instead of a decorative one-hundred-dot matrix.
- Display state and action controls cannot be mistaken for one another; dots remain information while the center and grabber have separate typed gesture ownership.
- Cross-device bank and activation recovery remain an explicit later persistence boundary.
- Color, dot size, focus, and bank membership never grant authority or become entity identity.
