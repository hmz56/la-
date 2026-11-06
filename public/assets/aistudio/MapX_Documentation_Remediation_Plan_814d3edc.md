# MapX — Documentation Remediation & Upgrade Plan

**Document type:** Living decision and change-control plan  
**Status:** Draft — owner decisions pending  
**Created:** 5 November 2026  
**Purpose:** Consolidate the review findings, approved decisions, required corrections, missing artefacts and verification criteria into one portable handoff file for another AI platform.

> **Important:** This file is a working plan, not evidence that changes have been applied. No decision in this file is approved until the owner explicitly approves it in this conversation and the decision log is updated. The receiving AI must not silently convert recommendations into approvals.

---

## 1. Instructions for the AI receiving this file

You are assisting with the **documentation correction and readiness phase** of MapX. The owner will provide this file together with the original five project documents.

### Required workflow

1. Read all five supplied project documents in full, including extracting and reviewing both PDFs. Do not rely only on this remediation file or the previous AI's summary.
2. Verify every finding below against the actual source documents. If a finding cannot be confirmed, mark it `RECHECK` and explain why; do not invent a correction.
3. Treat the Master Project Specification as the authority for product behaviour, security, formats and requirements; the UI/UX Guide as the authority for visual design; the Development Roadmap as the authority for implementation order; and the Progress Tracker as the authority for execution status.
4. This remediation file controls **the approved corrections and decisions made during the owner review**. It does not silently override the original source documents until the owner approves a specific change.
5. Work in **Plan/Review mode first**. Produce a file-by-file change plan, showing exact sections, tables, wording and cross-references to be changed. Do not begin broad rewriting before the owner approves the plan.
6. Ask the owner about unresolved decisions one at a time, in plain language. Explain the options, consequences and recommended choice. Do not bundle multiple unrelated decisions into one question.
7. After each owner answer, update this file's decision log and change log. Preserve the owner's actual decision and date. `APPROVED`, `REJECTED` and `DEFERRED` are distinct statuses.
8. Once all required decisions are closed, update the relevant Markdown/PDF project documents. Keep a backup of every original file. Do not overwrite originals without explicit approval.
9. Do not start application coding as part of this task. This phase is about correcting and finalizing the project documentation and creating a trustworthy handoff baseline.
10. After edits, perform a cross-document consistency audit and produce a final list of changed files, sections, unresolved issues and verification results.

### Change safety

- Use version control or a dated backup folder before editing.
- Make small, reviewable changes; preserve the project vision and features unless the owner explicitly changes scope.
- Never fabricate device capabilities, library versions, test results, approvals or implementation status.
- Do not mark a feature as built or tested. The project is still `NOT STARTED` unless the owner provides verified implementation evidence.
- Do not weaken acceptance criteria or delete requirements merely to make the documents easier to reconcile.
- If two authoritative passages conflict and this plan does not resolve them, stop and ask the owner.

---

## 2. Project baseline being reviewed

The supplied package contains:

1. `MapX_Master_Project_Specification.md` — v1.0, 4 November 2026.
2. `MapX_UI_UX_Design_Guide_261105_202933.pdf` — v1.1, 5 November 2026.
3. `MapX_Complete_Development_Roadmap.pdf` — version references conflict; the PDF and other documents must be checked and reconciled.
4. `MapX_Progress_Tracker.md` — currently records `NOT STARTED`, 0/184 steps.
5. `MapX_AI_Project_Operating_Instructions.md` — v1.0, 5 November 2026.

The roadmap states 22 phases, 46 stages and 184 implementation steps. The UI/UX Guide is 58 pages. The roadmap is a plan, not proof of implementation.

### Product direction to preserve unless the owner changes it

- Native Android application using Kotlin, Jetpack Compose and MapLibre Native.
- Offline-first geographic visual briefing, editing and presentation system.
- Tablet-first authoring; external audience display where hardware supports it; smartphone as presentation remote only.
- Geographic coordinates are the persistent truth; screen coordinates are transient UI/rendering state.
- Arabic and English, RTL and LTR.
- GIS import/export with honest support declarations.
- Local account/project model, reliable persistence, backup and portable project packages.
- No turn-by-turn navigation, cloud dependency, analytics or telemetry in core workflows.

---

## 3. Confirmed findings from the documentation review

These findings should be revalidated by the receiving AI against the source files before edits.

### 3.1 Strong foundations to preserve

- Clear product identity, non-goals and three-device model.
- Good separation of UI, domain, data and map-engine responsibilities.
- Geographic-truth principle and command-based editing/undo.
- Explicit format-support matrix that distinguishes full, partial and deferred support.
- Detailed project save, migration, export and recovery requirements.
- Strong offline-first and local-only design direction.
- Detailed UI/UX coverage for responsive layouts and Arabic RTL.
- Roadmap technical-risk spikes before committing to high-risk technology.
- Progress tracker distinguishes implementation, build, automated tests and real-device verification.
- AI workflow emphasizes one step at a time, minimal changes, backups, tests and honest reporting.

### 3.2 Important technical risks

1. Cross-resource project persistence: Room records, project JSON, media, map files and package manifests can become inconsistent if an operation is interrupted.
2. Geographic correctness: coordinate conversion, UTM/MGRS boundaries, antimeridian geometry, invalid geometries and georeferencing require independent reference fixtures.
3. Map engine compatibility: MBTiles behaviour, PMTiles, raster sources, Arabic labels and target-device performance require real feasibility evidence.
4. GIS import security: archives and structured files need strict size, nesting, feature-count and malformed-input limits.
5. Security details: account isolation, password hashing, export encryption and remote pairing/protocol rules need precise specifications and tests.
6. State/event boundaries: Editor, MapEngine, Repository, Presentation, External Display and Companion components need explicit state ownership and event contracts.
7. Device assumptions: tablet GNSS, USB-C external display, Android version, phone pairing and available storage must be verified on actual hardware.
8. Resource budgets: large maps, rasters, media and projects need explicit memory, storage, file-size, concurrency and performance limits.

### 3.3 Cross-document/document-control issues

- Roadmap version is described inconsistently: its PDF and Tracker refer to v1.0, while AI instructions list v1.1. Verify the actual PDF cover/version history and establish one canonical value.
- UI/UX Guide is v1.1, but other documents still refer to Layout Blueprint v1. Update authority names and references so the Guide's relationship to the Blueprint is unambiguous.
- AI instructions list DEV-1..DEV-5 as open but separately acknowledge DEV-6..DEV-9. The Tracker has only DEV-1..DEV-5 rows.
- DN-7 has conflicting approval language in the Roadmap. Treat it as **OPEN / NOT APPROVED** until the owner decides.
- AI instructions refer to `MAPX_STATUS.md` as a second status record while the Tracker is intended to be authoritative. Define one source of truth.
- Several supporting artefacts are named as if they exist or will exist: `ARCHITECTURE.md`, `MAPX_DECISIONS.md`, `MAPX_HANDOFF.md`, `MAPX_STATUS.md`, `SECURITY.md`, `SYMBOLS_LICENSE.md`, `AI_WORKFLOW.md`, `STANDING_ORDERS.md`, `MAPX_CONTEXT_PACK.md`. Classify each as existing, prerequisite, generated later or optional.
- Specification section references and the source-priority wording must be checked against the exact delivered versions.

---

## 4. Required corrections and upgrades

The following are proposed remediation tasks. They are not owner-approved until the owner accepts the overall plan or individual items.

### R-01 — Canonical document control

**Problem:** Version labels, authority names and references differ across documents.

**Proposed solution:**
- Add a canonical document manifest with filename, title, version, date, status, authority area, checksum and superseded version.
- Standardize the UI document name as `MapX_UI_UX_Design_Guide.pdf` (or another owner-approved canonical name).
- Verify the Roadmap's actual version and use the same version everywhere.
- Remove stale references to the standalone Layout Blueprint where the v1.1 Guide now supersedes it; retain historical references only where useful.
- Add a short revision history to every controlled document.
- State the conflict rule clearly: Specification = behaviour/security/formats; UI/UX Guide = visual layout; Roadmap = sequence; Tracker = execution status; this file = approved remediation decisions.

**Acceptance checks:**
- All filenames and versions agree in all five documents.
- Every cross-reference points to a real section in the delivered version.
- Superseded documents are labelled historical and cannot be mistaken for current authority.

### R-02 — Single decision and status source

**Problem:** The Tracker and the proposed `MAPX_STATUS.md` may compete; decision records are incomplete.

**Proposed solution:**
- Keep `MapX_Progress_Tracker.md` as the single authoritative status record.
- If `MAPX_STATUS.md` is needed for AI context, make it a generated, read-only summary derived from the Tracker, or remove the duplicate status requirement.
- Create/maintain `MAPX_DECISIONS.md` as the decision history, or keep the full decision register in the Tracker; choose one canonical location and cross-link the other.
- Every decision record must contain ID, exact question, options, owner decision, status, date, rationale and affected document/roadmap steps.

**Acceptance checks:**
- No conflicting status fields exist.
- No AI instruction tells an agent to update two independent status sources.
- Every DN and DEV decision has a Tracker record.

### R-03 — Persistence, transaction and recovery design

**Problem:** The specification requires atomic save and last-known-good recovery, but multi-resource consistency needs a more explicit protocol.

**Proposed solution:**
- Define a save transaction sequence for project JSON, Room metadata, media, map-source references and checksums.
- Use temporary writes and verification before committing metadata; use atomic rename where supported and specify safe fallback behaviour.
- Define a recovery journal or equivalent reconciliation mechanism for interrupted saves/imports/exports.
- Define startup reconciliation for missing files, orphaned assets and stale temporary files.
- Define exactly one writer per project and behaviour for concurrent save requests.
- Add process-death, force-stop, disk-full, partial-copy, corrupt-document, permission-revocation and interrupted-migration tests.
- Define backup retention and require a restore test for every backup format.

**Acceptance checks:**
- Failure at every save stage leaves either the previous valid project or the new valid project recoverable.
- No project object silently disappears when a map source is missing.
- Recovery tests are specified and later implemented before the save system is called reliable.

### R-04 — GIS accuracy and coordinate validation

**Problem:** Correct-looking but inaccurate coordinates are a high-impact failure mode.

**Proposed solution:**
- Create a version-controlled geographic golden-test fixture set from independent authoritative references.
- Cover DD, DDM, DMS, UTM and MGRS; standard UTM exceptions; zone/grid boundaries; antimeridian; polar limits; invalid coordinates; Arabic-Indic input; precision and round trips.
- Define numeric tolerances for each operation.
- Define CRS handling: unknown or unsupported CRS must be rejected or explicitly reported, never silently treated as WGS84.
- Define geometry validity rules for self-intersections, degenerate rings, duplicate vertices, antimeridian-spanning paths and large feature collections.
- Define georeferencing control-point minimums, distribution checks, residual reporting, RMSE thresholds and warnings/rejection for extrapolation.

**Acceptance checks:**
- Each supported conversion has independent expected values and boundary tests.
- Round-trip errors remain within documented tolerances.
- Georeferencing reports residuals and does not treat a low RMSE as universal proof of accuracy.

### R-05 — GIS import and archive security

**Problem:** Importing untrusted files can exhaust memory/storage or exploit parser weaknesses.

**Proposed solution:**
- Specify limits for archive entry count, total decompressed size, compression ratio, XML nesting depth, feature count, geometry complexity, image dimensions and processing time.
- Validate paths to prevent ZIP traversal.
- Reject malformed or unsupported content with a clear message.
- Ensure cancellation and failure remove temporary/partial output.
- Add fuzz/hostile-file test cases where feasible.

**Acceptance checks:**
- Limits are documented and configurable where appropriate.
- Invalid inputs fail safely without crashing or leaving partial project data.

### R-06 — Architecture/state contracts

**Problem:** State ownership and synchronization across major subsystems are not fully explicit.

**Proposed solution:**
- Add a state ownership diagram and event-flow diagram.
- Define interfaces and contracts for EditorViewModel, ProjectRepository, MapEngine, PresentationController, DisplayController, CompanionHost and SessionManager.
- Define event ordering, lifecycle, cancellation, error propagation and stale-event handling.
- Specify rendering responsibilities, selection/hit-testing, transient gesture state, camera transforms, overlays and invalidation.
- Keep domain models independent of Android UI and MapLibre.
- Enforce package boundaries with architecture tests; retain the single Gradle module initially unless evidence justifies modularization.

**Acceptance checks:**
- Each state has one owner.
- No direct UI mutation of persistent project state.
- Rendering and domain state can be tested independently.

### R-07 — Security and privacy specification

**Problem:** Security direction is good but several implementation contracts are not final.

**Proposed solution:**
- Write a threat model covering device access, app files, exports, backups, local network and paired remote.
- Specify password hashing algorithm/parameters, unique salts, versioned credential records, lockout, recovery-code lifecycle and password-change flow.
- Define account isolation across projects, map sources, media, caches, temporary files, exports and backups.
- Define remote pairing protocol state machine, token expiry, nonce/replay protection, rate limiting, reconnect, certificate rotation/pinning, protocol versioning and command allow-list.
- Define export encryption format, integrity/authentication checks and metadata exposure.
- State clearly what app login does not protect; retain Android device encryption and device screen-lock guidance.

**Acceptance checks:**
- Threat model and security test cases exist before security implementation.
- Remote cannot mutate persistent project data.
- Account isolation is tested across every file/storage category.

### R-08 — MapLibre, map sources and Arabic typography feasibility

**Problem:** Core map behaviours depend on version/device compatibility and actual font shaping.

**Proposed solution:**
- Run a controlled feasibility spike using the intended MapLibre Native version and real representative MBTiles, PMTiles, raster and vector sources.
- Test offline operation in airplane mode, large-file performance, camera gestures, map attribution and source switching.
- Test Arabic labels using the actual Cairo font and representative Arabic/Latin/digit/diacritic strings.
- Record exact dependency version, device model, Android version, sample-file hashes, screenshots, logs, pass/fail and fallback.
- Verify native library ABI and 16 KB page-size compatibility at dependency pin time.

**Acceptance checks:**
- A documented pass/fail gate exists for each map-source type.
- No feature is described as supported until the relevant spike passes.
- Arabic map labels and authored Arabic UI text are tested separately.

### R-09 — UI/UX approvals and real implementation tests

**Problem:** The Guide contains pending DEV decisions and stand-in fonts; its own layout checks are not Compose tests.

**Proposed solution:**
- Record DEV-1..DEV-9 in the Tracker.
- Keep all unapproved design amendments clearly labelled proposed.
- Use the bundled Cairo font in implementation and validate Arabic at 100%, 150% and 200% font scale.
- Create Compose UI tests for four layout modes, LTR/RTL, themes, panel states, context bars, rotation, split-screen and accessibility.
- Test touch targets, TalkBack, stylus/finger interaction, gesture cancellation, selection priority, edge dragging and undo grouping.
- Have Arabic UI copy reviewed by a fluent/native reviewer before release.

**Acceptance checks:**
- Every DEV item has an explicit owner status.
- UI tests validate the actual Compose implementation, not only the design mockup model.

### R-10 — Roadmap dependency gates and milestones

**Problem:** A detailed step list does not alone prove dependencies or schedule feasibility.

**Proposed solution:**
- Add hard pass/fail gates for each technical risk spike.
- Establish milestone exit criteria: project shell; reliable editing/saving; offline maps and import/export; presentation; remote/hardware; production hardening.
- Move foundational data contracts, format versioning, resource budgets and recovery rules earlier than advanced UI features.
- Add effort estimates only after environment and feasibility evidence; record owner capacity and contingency.
- Keep advanced/deferred features explicitly marked so they cannot accidentally enter P0 scope.

**Acceptance checks:**
- Each milestone has measurable acceptance criteria and dependencies.
- Failed spikes trigger an explicit owner decision and fallback, not silent continuation.

### R-11 — Tracker and evidence improvements

**Proposed solution:**
- Add DEV-6..DEV-9 rows.
- Add decision owner/status/date/rationale/affected steps.
- Evidence should record commit hash, build variant, device model, Android version, test date, test report/log path, fixture identifier and reviewer.
- Preserve `NOT STARTED` until implementation evidence is supplied.
- Keep hardware-dependent items `Not tested` until tested on the actual device.

### R-12 — Missing artefacts and prerequisites

Classify each item below as `EXISTS`, `CREATE BEFORE DEVELOPMENT`, `GENERATE DURING ROADMAP STEP`, or `OPTIONAL/DEFERRED`:

- `ARCHITECTURE.md`
- `MAPX_DECISIONS.md`
- `MAPX_HANDOFF.md`
- `MAPX_STATUS.md`
- `SECURITY.md`
- `SYMBOLS_LICENSE.md`
- `AI_WORKFLOW.md`
- `STANDING_ORDERS.md`
- `MAPX_CONTEXT_PACK.md`
- Requirements-to-test traceability matrix
- GIS golden-test fixtures
- Representative sample project corpus
- Hardware/environment inventory
- Performance/resource budget
- Release/backup/restore runbook
- Third-party dependency and asset licence/provenance register

The receiving AI must not claim any of these files exist unless it finds them in the supplied package or repository.

---

## 5. Owner decision register

**Status key:** `OPEN` = owner has not decided; `APPROVED` = owner explicitly accepted; `REJECTED` = owner explicitly declined; `DEFERRED` = owner postponed the decision. Recommendations are not approvals.

### 5.1 Product and technical decisions (DN-1 to DN-10)

| ID | Decision to make | Recommended default from current Specification | Owner status | Owner decision / notes |
|---|---|---|---|---|
| DN-1 | Account model: multiple local accounts (Admin + Members, separate libraries) or one shared local password for the device? | Multiple local accounts with separate libraries. Better team separation; more implementation work. | APPROVED | Owner chose Option B: one shared local password and one shared project/map library on the device; no separate per-user accounts or libraries. Update security, permissions, ownership and account-related requirements consistently. |
| DN-2 | Encrypt project JSON at app level in v1, or rely on Android device encryption + login gate + encrypted exports? | Defer app-level project JSON encryption to P2; device encryption and encrypted exports in v1. | OPEN | |
| DN-3 | Phone remote transport: Java-WebSocket, Ktor, or TLS sockets with JSON lines? | Java-WebSocket on both ends, with documented fallback. Must verify maintenance, licence and Android compatibility before pinning. | OPEN | |
| DN-4 | GeoTIFF support scope? | Partial/simple GeoTIFF only in P2, with clear refusal and conversion workflow for unsupported cases. | OPEN | |
| DN-5 | How should very large map sources be transferred in project packages? | Transfer Bundle (project package plus separate source files) above approximately 2 GB. | OPEN | |
| DN-6 | Phone remote permissions: scene navigation only, or also start/exit presentation and temporary pan/zoom/layer overrides? | Allow start/exit and session-only pan/zoom/layer overrides; never persist edits to project data. | OPEN | |
| DN-7 | Ordinary ungeoreferenced images: should they use `IMAGE_LOCAL` coordinates until georeferenced, without invented geographic coordinates? | Approve `IMAGE_LOCAL`; geographic conversion occurs only after explicit georeferencing. | OPEN | |
| DN-8 | Store identical imported map sources separately for each account, or deduplicate shared files? | Duplicate per account for stronger logical isolation; costs more disk space. | OPEN | |
| DN-9 | GPS test hardware: does the exact Lenovo Tab P12 variant have GNSS, or should another device be the GPS reference? | Verify exact model/variant; do not assume GNSS exists. | OPEN | |
| DN-10 | Direct nearby device-to-device transfer in v1 or later? | Keep as P2; use file/share-sheet transfer for P1. | OPEN | |

### 5.2 UI/UX decisions (DEV-1 to DEV-9)

| ID | Decision to make | Guide proposal / rationale | Owner status | Owner decision / notes |
|---|---|---|---|---|
| DEV-1 | Phone portrait top bar: 56 dp or 48 dp? | Guide proposes 48 dp. | OPEN | |
| DEV-2 | Phone portrait dock: 64 dp or 56 dp; compact slots Select, Pan, Draw, Layers, More? | Guide proposes 56 dp; Marker, Label and Symbols move into More. | OPEN | |
| DEV-3 | Phone landscape top bar/context bar: retain 40/44 dp or use 48/48 dp? | Guide proposes 48 dp for both to respect minimum touch-target rules. | OPEN | |
| DEV-4 | Phone landscape rail: which tools remain visible? | Guide proposes Select, Pan, Draw, Layers, Scenes + More; Symbols moves into More. | OPEN | |
| DEV-5 | Add Appearance group in Settings for theme and animation? | Guide proposes yes. | OPEN | |
| DEV-6 | Alert red token: use Specification token `#E3201B` or the older brief token `#E83218`? | Guide applies `#E3201B` because the Specification is authoritative; both need contrast review on navy. | OPEN | |
| DEV-7 | Map controls in RTL: remain at logical end edge (left in RTL) or move to logical start? | Guide corrects the old Blueprint note: controls remain at logical end edge, adjacent to side panel. | OPEN | |
| DEV-8 | Add “Go to coordinates” to the coordinate popup rather than another toolbar item? | Guide proposes placing coordinate search in the existing popup. | OPEN | |
| DEV-9 | Context-bar deletion action: pin Delete immediately before the final overflow slot, rather than “delete last-but-one” wording? | Guide proposes the explicit pinned placement to resolve the context-bar conflict. | OPEN | |

### 5.3 Additional owner-level questions to resolve after DN/DEV

These are not numbered in the original Specification but may be required to finalize the remediation package:

| ID | Topic | Question / required confirmation | Status |
|---|---|---|---|
| AQ-1 | Document output | Should the corrected roadmap and UI/UX Guide be regenerated as PDFs, with source Markdown retained where possible? | OPEN |
| AQ-2 | Project language | Should final UI Arabic copy be reviewed by a specific fluent/native reviewer, or should a review checklist be prepared for a reviewer you choose later? | OPEN |
| AQ-3 | Scope control | Should all current P0/P1/P2 scope be preserved, with no feature removals unless you explicitly approve them? | OPEN |
| AQ-4 | Hardware inventory | Confirm exact Lenovo Tab P12 model/variant, phone model, Android versions and whether you have a USB-C hub/HDMI display available. | OPEN |
| AQ-5 | Development machine | Confirm the Windows PC specifications and free disk space when you are ready for the environment phase. | OPEN |

---

## 6. Technical recommendations to adopt unless owner rejects

These are engineering recommendations, not hidden product decisions. The receiving AI should still show the owner any material scope/cost trade-off.

- Keep one Gradle module initially, but enforce package boundaries and architecture tests.
- Define a versioned project-package schema and migration strategy early.
- Keep all project edits command-based and undoable.
- Keep MapLibre behind a `MapEngine` interface.
- Use one authoritative owner for each state domain.
- Add geographic golden fixtures and test coordinate boundary cases.
- Use import resource limits and safe temporary-file cleanup.
- Use actual Cairo font assets and test Arabic on-device.
- Use a threat model and protocol state machine for the phone remote.
- Keep device-dependent features marked `Not tested` until verified on actual hardware.
- Make unsupported format behaviour explicit and safe.
- Maintain a reproducible test corpus and evidence log.
- Keep the Tracker as the single execution-status source.

---

## 7. Proposed final deliverables after the review is complete

The receiving AI should deliver:

1. Updated `MapX_Master_Project_Specification.md`.
2. Updated `MapX_UI_UX_Design_Guide.pdf` and editable source if available.
3. Updated `MapX_Complete_Development_Roadmap.pdf` and editable source if available.
4. Updated `MapX_Progress_Tracker.md`.
5. Updated `MapX_AI_Project_Operating_Instructions.md`.
6. This completed `MapX_Documentation_Remediation_Plan.md` with all decisions and change history.
7. `MAPX_DOCUMENT_MANIFEST.md` (canonical file names, versions, authority and checksums).
8. `MAPX_DECISIONS.md` if selected as the canonical decision log.
9. Any newly required architecture, security, traceability or test-fixture documents, but only where the owner approves creating them in this documentation phase.
10. A final audit report listing every changed section and confirming consistency across the package.

If the AI cannot regenerate an editable source for a PDF, it must say so and provide the best available editable source rather than pretending the PDF is fully editable.

---

## 8. Final verification checklist

Before calling the documentation baseline complete, verify:

- [ ] All five source documents were read and cross-checked.
- [ ] Every DN-1..DN-10 decision has a recorded owner status.
- [ ] Every DEV-1..DEV-9 decision has a recorded owner status.
- [ ] No recommendation is described as an approval unless the owner approved it.
- [ ] Canonical filenames, versions and dates agree across documents.
- [ ] Authority hierarchy and conflict rules agree.
- [ ] Every referenced section, step, file and decision ID exists.
- [ ] Tracker contains all decisions and remains the single status authority.
- [ ] Persistence/recovery rules are explicit and testable.
- [ ] GIS accuracy and import-security requirements are explicit and testable.
- [ ] Security and remote protocol requirements are explicit and testable.
- [ ] UI/UX changes are reflected in the Guide and related roadmap steps.
- [ ] Roadmap gates and milestone exit criteria are explicit.
- [ ] Missing artefacts are classified by when/how they will be created.
- [ ] No feature is falsely marked implemented or tested.
- [ ] Original files have been backed up and a change log is supplied.
- [ ] A final cross-document consistency report is delivered.

---

## 9. Decision and change history

- DN-1 — APPROVED: Owner selected Option B (one shared local password and one shared project/map library; no separate local user accounts or per-user libraries). This supersedes the document's recommended default of multiple local accounts. Other decisions remain OPEN unless explicitly recorded otherwise.


| Date | Item | Owner decision / change | Status |
|---|---|---|---|
| 5 Nov 2026 | Initial remediation plan | Created from the five-document review; all DN and DEV decisions remain open pending owner review. | DRAFT |

**Rule:** After each owner answer in the working conversation, update the matching row above and the decision register. Do not batch-approve decisions that the owner has not explicitly accepted.
