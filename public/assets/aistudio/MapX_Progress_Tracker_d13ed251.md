# MAPX PROJECT PROGRESS TRACKER

> Companion to `MapX_Complete_Development_Roadmap.pdf` (v1.0). Planning documents only: **nothing here has been built or tested.**

## HOW TO UPDATE THIS FILE (READ FIRST - for you and for any AI)

- Never rename, renumber, reorder, add or delete any PHASE, STAGE or STEP line. The IDs (for example `01.1.3`) are permanent and match the PDF exactly.
- Tick a step (put an x between the brackets of its checkbox) only after its acceptance criteria and verification procedure in the PDF passed. Generated code is not 'done'.
- Tick a STAGE only when all its steps are ticked; tick a PHASE only when all its stages are ticked.
- Edit only: checkboxes, the Project information values, the Development environment values, and the sections after the phase list. Do not touch the heading lines.
- Hardware features (external display, GPS, phone remote) must stay 'Not tested' until a real device run is recorded. Simulated runs are 'Simulated only'.
- When pasting this file to an AI, add: 'Update only the checkboxes and the tracking sections; keep every phase, stage and step line byte-for-byte unchanged.'
- Evidence vocabulary: Implemented, Built, Automated-test verified, Device verified, Not tested, Deferred.

---

## PROJECT INFORMATION

- **Project name:** MapX
- **Roadmap version:** 1.0
- **Roadmap date:** 4 November 2026
- **Last updated:** (not started)
- **Current phase:** PHASE 01 - ENVIRONMENT PREPARATION
- **Current stage:** STAGE 01.1 - Verify Existing Development Environment
- **Current step:** STEP 01.1.1 - Verify Windows Configuration
- **Overall status:** NOT STARTED (0 of 184 steps complete)

## DEVELOPMENT ENVIRONMENT

| Item | Value | Verified? |
|---|---|---|
| Operating system | Windows 11 Home 64-bit, build 22631 (stated) | UNVERIFIED until 01.1.1 |
| CPU | Intel Core i7-9700 (from screenshot) | UNVERIFIED |
| RAM | 16 GB (stated) | UNVERIFIED |
| Dedicated GPU | NVIDIA GeForce RTX 2070, 8 GB (stated) | UNVERIFIED |
| Integrated GPU | Intel UHD Graphics 630 (stated) | UNVERIFIED |
| Free storage | about 50 GB (stated) | UNVERIFIED - record real GB |
| Internet | slow, data-limited | - |
| Android Studio | installed (version unknown) | UNVERIFIED |
| Android SDK | installed (version unknown) | UNVERIFIED |
| Java JDK / Studio JBR | installed (version unknown) | UNVERIFIED |
| Git | installed (version unknown) | UNVERIFIED |
| Visual Studio Code | installed | UNVERIFIED |
| Node.js | installed (version unknown) | UNVERIFIED |
| Python | installed, system configuration not verified | UNVERIFIED |
| Flutter | installed, NOT used for MapX | UNVERIFIED |
| LM Studio + Qwen2.5-Coder-7B-Instruct | working (stated) | UNVERIFIED - record context length |
| AntiGravity IDE | available (no paid plan assumed) | UNVERIFIED |
| Chromium / Edge | installed | - |
| Primary tablet | Lenovo Tab P12 (Android 15 per spec) | UNVERIFIED - adb facts in 01.1.9 |
| Secondary phone | Samsung Galaxy A16 | UNVERIFIED |
| Tablet GNSS | unknown (DN-9) | UNVERIFIED |
| Tablet external display route | unknown | UNVERIFIED (03.2.2) |

**Configuration (fill in):** project path `C:\dev\MapX` (assumed); Gradle user home: ______; JAVA/Gradle JDK: ______; compileSdk/targetSdk: ______ / ______; MapLibre version: ______.

**Known limitations:** USB-C 2.0 on the tablet may rule out wired external display; tablet GPS unconfirmed; free AI tier limits unknown; slow internet; ~50 GB disk; no emulator planned.

---

## PHASE PROGRESS

### - [ ] PHASE 01 — ENVIRONMENT PREPARATION

#### - [ ] STAGE 01.1 — Verify Existing Development Environment

- [ ] STEP 01.1.1 — Verify Windows Configuration
- [ ] STEP 01.1.2 — Verify Java JDK
- [ ] STEP 01.1.3 — Verify Android Studio
- [ ] STEP 01.1.4 — Verify Android SDK
- [ ] STEP 01.1.5 — Verify Git
- [ ] STEP 01.1.6 — Verify Node.js and Python (Optional Tools)
- [ ] STEP 01.1.7 — Verify Flutter (Installed, Not Used)
- [ ] STEP 01.1.8 — Verify LM Studio and the Local Qwen Model
- [ ] STEP 01.1.9 — Verify Physical Android Devices over ADB
- [ ] STEP 01.1.10 — Record Storage Budget and Environment Report

#### - [ ] STAGE 01.2 — Close Gaps and Optimize Downloads

- [ ] STEP 01.2.1 — Install or Update Only What Is Missing
- [ ] STEP 01.2.2 — Configure Gradle for Low Bandwidth and Offline Reuse
- [ ] STEP 01.2.3 — Decide on Emulator Use (Optional, Default: Skip)

#### - [ ] STAGE 01.3 — Establish the Free-Tier AI Workflow

- [ ] STEP 01.3.1 — Build the AI Tool Matrix and Fallback Ladder
- [ ] STEP 01.3.2 — Configure LM Studio as a Local Coding Assistant
- [ ] STEP 01.3.3 — Create the Context Pack Generator
- [ ] STEP 01.3.4 — Create the Standing Orders and Handoff Routine

### - [ ] PHASE 02 — PROJECT FOUNDATION

#### - [ ] STAGE 02.1 — Repository and Engineering Documents

- [ ] STEP 02.1.1 — Create the Repository, .gitignore and Backup Routine
- [ ] STEP 02.1.2 — Install the Two Source Documents in docs/
- [ ] STEP 02.1.3 — Create ARCHITECTURE.md (Initial Version)
- [ ] STEP 02.1.4 — Create the Other Five Engineering Documents
- [ ] STEP 02.1.5 — Run the Version Gate (Verify and Pin Dependency Versions)

#### - [ ] STAGE 02.2 — Create the New Android Project

- [ ] STEP 02.2.1 — Generate the Compose Project in Android Studio
- [ ] STEP 02.2.2 — Convert to Version Catalog and Pin Versions
- [ ] STEP 02.2.3 — Harden the Manifest (Backup, Permissions, Features)
- [ ] STEP 02.2.4 — First Build and Install on the Lenovo Tab P12
- [ ] STEP 02.2.5 — First Install on the Samsung Galaxy A16
- [ ] STEP 02.2.6 — Create and Back Up the Signing Key

#### - [ ] STAGE 02.3 — Skeleton, Localization and Theme

- [ ] STEP 02.3.1 — Create Package Structure and AppContainer
- [ ] STEP 02.3.2 — Add Architecture Tests and the Local check.ps1 Script
- [ ] STEP 02.3.3 — Localization Infrastructure (English/Arabic, No Hard-Coded Strings)
- [ ] STEP 02.3.4 — Theme, Design Tokens and the Cairo Font

### - [ ] PHASE 03 — TECHNICAL RISK SPIKES

#### - [ ] STAGE 03.1 — Map Engine Feasibility

- [ ] STEP 03.1.1 — MapLibre Hello-Map and 16 KB Alignment Check
- [ ] STEP 03.1.2 — PMTiles Local Source Spike
- [ ] STEP 03.1.3 — MBTiles Direct-Read Spike and Loopback Fallback Decision
- [ ] STEP 03.1.4 — Arabic Label Rendering Spike

#### - [ ] STAGE 03.2 — Networking and Display Feasibility

- [ ] STEP 03.2.1 — WebSocket + TLS + AndroidKeyStore Certificate Spike
- [ ] STEP 03.2.2 — External Display Capability Probe on the Lenovo Tab P12
- [ ] STEP 03.2.3 — GNSS Hardware Probe (Lenovo and Samsung)

#### - [ ] STAGE 03.3 — Spike Decision Gate

- [ ] STEP 03.3.1 — Record Spike Results and Update Decisions

### - [ ] PHASE 04 — CORE DOMAIN LOGIC

#### - [ ] STAGE 04.1 — Geography and Coordinates

- [ ] STEP 04.1.1 — GeoPoint and Geodesy Utilities
- [ ] STEP 04.1.2 — DD/DDM/DMS Formatting and Parsing
- [ ] STEP 04.1.3 — UTM Conversion (80S-84N, Zone Exceptions)
- [ ] STEP 04.1.4 — MGRS Encode/Decode with Precision
- [ ] STEP 04.1.5 — Scale Bar and Metric Formatting

#### - [ ] STAGE 04.2 — Model, Commands and Serialization

- [ ] STEP 04.2.1 — ProjectModels and MapObject Types
- [ ] STEP 04.2.2 — MapObjectRegistry and Definitions
- [ ] STEP 04.2.3 — CommandManager (begin/update/commit, 200 steps)
- [ ] STEP 04.2.4 — Geometry Utilities (Douglas-Peucker, Curves, Rectangle)
- [ ] STEP 04.2.5 — ProjectSerializer, formatVersion and Migration Framework
- [ ] STEP 04.2.6 — Layer, Scene and RenderOrder Domain
- [ ] STEP 04.2.7 — Spatial Index and Hit-Test Core

### - [ ] PHASE 05 — DATA LAYER AND PROJECT PERSISTENCE

#### - [ ] STAGE 05.1 — Storage Foundation

- [ ] STEP 05.1.1 — Room Database and Entities
- [ ] STEP 05.1.2 — File Storage Layout and Account-Scoped Paths
- [ ] STEP 05.1.3 — PreferencesManager (DataStore)
- [ ] STEP 05.1.4 — Offline Guard (Debug)

#### - [ ] STAGE 05.2 — Project Repository

- [ ] STEP 05.2.1 — ProjectRepository CRUD and Library Index
- [ ] STEP 05.2.2 — Autosave Engine and Atomic Save
- [ ] STEP 05.2.3 — Last-Known-Good Recovery and Corruption Handling
- [ ] STEP 05.2.4 — Duplicate Project (Deep Copy)
- [ ] STEP 05.2.5 — Room and Migration Tests with Golden Fixtures

### - [ ] PHASE 06 — AUTHENTICATION AND SECURITY

#### - [ ] STAGE 06.1 — Accounts and Credentials

- [ ] STEP 06.1.1 — Password Hashing with AndroidKeyStore Binding
- [ ] STEP 06.1.2 — AuthRepository, Roles and Lockout
- [ ] STEP 06.1.3 — SessionManager, Auto-lock and Process-death Behaviour

#### - [ ] STAGE 06.2 — Login UI

- [ ] STEP 06.2.1 — S0 Lock/Login Screen and First-run Admin
- [ ] STEP 06.2.2 — Recovery Code and Erase-all Flow
- [ ] STEP 06.2.3 — S10 Accounts Screen
- [ ] STEP 06.2.4 — Screen Protection and Device-Lock Warning
- [ ] STEP 06.2.5 — Security Tests and SECURITY.md Update

### - [ ] PHASE 07 — LAYOUT SYSTEM AND APPLICATION SHELL

#### - [ ] STAGE 07.1 — Layout Engine

- [ ] STEP 07.1.1 — LayoutMode Classifier and LayoutSpec
- [ ] STEP 07.1.2 — MapXLayoutRoot with Region Tree (Tablet Landscape)
- [ ] STEP 07.1.3 — Remaining Three Modes (Tablet Portrait, Phone Landscape, Phone Portrait)
- [ ] STEP 07.1.4 — PanelManager and PanelContent Frame
- [ ] STEP 07.1.5 — Layout Debug Mode
- [ ] STEP 07.1.6 — regionsNeverOverlap Test and Stress-Size Harness

#### - [ ] STAGE 07.2 — Shell Screens and Navigation

- [ ] STEP 07.2.1 — Navigation Host and Back-stack Priority
- [ ] STEP 07.2.2 — S1 Home Screen (Adaptive)
- [ ] STEP 07.2.3 — S2 New Project Flow and Library Actions
- [ ] STEP 07.2.4 — Top Bar, Tool Rail, Dock and Context Bar Content
- [ ] STEP 07.2.5 — ModalLayer (One at a Time)
- [ ] STEP 07.2.6 — RTL Mirroring Pass on the Shell

### - [ ] PHASE 08 — MAP ENGINE AND BUNDLED BASEMAP

#### - [ ] STAGE 08.1 — MapEngine Abstraction

- [ ] STEP 08.1.1 — MapEngine Interface and MapLibreMapView
- [ ] STEP 08.1.2 — Camera, Projection and Event Coalescing
- [ ] STEP 08.1.3 — Map Controls (Compass, Zoom, Scale, Attribution)
- [ ] STEP 08.1.4 — Coordinate Readout, Format Switcher and Coordinate Search

#### - [ ] STAGE 08.2 — Bundled Offline Basemap

- [ ] STEP 08.2.1 — Build the Basemap Data from Natural Earth
- [ ] STEP 08.2.2 — Glyphs, Style and Bilingual Labels
- [ ] STEP 08.2.3 — Antimeridian Handling and Arabic Reference Test

### - [ ] PHASE 09 — MAP SOURCES AND IMPORT PIPELINE

#### - [ ] STAGE 09.1 — Import Foundation

- [ ] STEP 09.1.1 — Source Library Data Model and Storage
- [ ] STEP 09.1.2 — Import Pipeline (SAF, Free Space, Stream Copy, SHA-256, Cancel)
- [ ] STEP 09.1.3 — Validation and SourceNormalizer

#### - [ ] STAGE 09.2 — Tile Sources

- [ ] STEP 09.2.1 — PMTiles Source Support
- [ ] STEP 09.2.2 — MBTiles Source Support (Direct or Loopback)
- [ ] STEP 09.2.3 — XYZ/TMS ZIP Conversion
- [ ] STEP 09.2.4 — Vector Style Handling (OpenMapTiles and Generic)

#### - [ ] STAGE 09.3 — Image Sources and Maps Panel

- [ ] STEP 09.3.1 — IMAGE_LOCAL Canvas
- [ ] STEP 09.3.2 — World-file Georeferenced Images
- [ ] STEP 09.3.3 — Maps Panel UI (Map Sources Tab, Details, Relink)
- [ ] STEP 09.3.4 — Format Support Matrix Evidence Run

### - [ ] PHASE 10 — EDITOR CORE: OBJECTS, DRAWING, LAYERS

#### - [ ] STAGE 10.1 — Rendering and Interaction Foundation

- [ ] STEP 10.1.1 — Map-native Object Rendering
- [ ] STEP 10.1.2 — Selection, Hit-testing and Drag-move
- [ ] STEP 10.1.3 — HandleLayer
- [ ] STEP 10.1.4 — Label Tag (Map-native Bitmaps)
- [ ] STEP 10.1.5 — Marker Object

#### - [ ] STAGE 10.2 — Drawing Tools

- [ ] STEP 10.2.1 — Draw Popup and Context Bar State Machine
- [ ] STEP 10.2.2 — Freehand, Line, Polyline/Route
- [ ] STEP 10.2.3 — Straight and Curved Arrows
- [ ] STEP 10.2.4 — Circle and Rectangle
- [ ] STEP 10.2.5 — Polygon, Boundary, Highlighted Area
- [ ] STEP 10.2.6 — Route with Pins

#### - [ ] STAGE 10.3 — Properties, Layers and Undo

- [ ] STEP 10.3.1 — Properties Panel
- [ ] STEP 10.3.2 — Layers Panel
- [ ] STEP 10.3.3 — Undo/Redo UI, Selection Actions and Multi-select
- [ ] STEP 10.3.4 — Editor Process-death Restore and Anchoring Test Suite
- [ ] STEP 10.3.5 — Stylus Support Pass

### - [ ] PHASE 11 — MEDIA, SYMBOLS AND ANIMATION

#### - [ ] STAGE 11.1 — Images

- [ ] STEP 11.1.1 — Media Store, Import and Decode Safeguards
- [ ] STEP 11.1.2 — Image Objects (Anchored)
- [ ] STEP 11.1.3 — Image Transform Gestures and Context Actions

#### - [ ] STAGE 11.2 — Animation

- [ ] STEP 11.2.1 — AnimationScheduler
- [ ] STEP 11.2.2 — GIF and Animated WebP Playback

#### - [ ] STAGE 11.3 — Symbols

- [ ] STEP 11.3.1 — Symbol Set and SYMBOLS_LICENSE.md
- [ ] STEP 11.3.2 — Symbol Registry, SDF Rendering and Search
- [ ] STEP 11.3.3 — Symbols Panel and Placement

### - [ ] PHASE 12 — IMPORT, EXPORT AND PORTABILITY

#### - [ ] STAGE 12.1 — GIS Import

- [ ] STEP 12.1.1 — GeoJSON Streaming Importer
- [ ] STEP 12.1.2 — KML/KMZ Importer (incl. GroundOverlay)
- [ ] STEP 12.1.3 — GPX and CSV/TSV Importers
- [ ] STEP 12.1.4 — GIS Import Panel and Convert to MapX Objects
- [ ] STEP 12.1.5 — Security Fixtures (XXE, Zip-slip, Zip-bomb)

#### - [ ] STAGE 12.2 — Exchange Export

- [ ] STEP 12.2.1 — Fidelity Report Engine
- [ ] STEP 12.2.2 — KML/KMZ, GeoJSON, GPX and CSV Exporters

#### - [ ] STAGE 12.3 — MapX Packages

- [ ] STEP 12.3.1 — PackageWriter/Reader (.mapx) with Manifest and Checksums
- [ ] STEP 12.3.2 — Layer Package (.mapxlayer)
- [ ] STEP 12.3.3 — Passphrase Encryption
- [ ] STEP 12.3.4 — Backup and Restore (.mapxbackup)
- [ ] STEP 12.3.5 — Transfer Bundle and Map Source Export
- [ ] STEP 12.3.6 — Export/Import Wizard UI, Relink, Share Sheet, Open-with
- [ ] STEP 12.3.7 — Round-trip Tests and Two-device Transfer

### - [ ] PHASE 13 — GEOREFERENCING

#### - [ ] STAGE 13.1 — Georeferencing

- [ ] STEP 13.1.1 — Affine Transform, Residuals and RMSE
- [ ] STEP 13.1.2 — S8 Georeference Screen
- [ ] STEP 13.1.3 — IMAGE_LOCAL to GEOGRAPHIC Conversion Command
- [ ] STEP 13.1.4 — Tile Pyramid for Large Georeferenced Images (P2)

### - [ ] PHASE 14 — SCENES, PRESENTER MODE AND BROADCAST GRAPHICS

#### - [ ] STAGE 14.1 — Scenes

- [ ] STEP 14.1.1 — Scene Commands and Scenes Panel
- [ ] STEP 14.1.2 — PresentationController and Session Overrides

#### - [ ] STAGE 14.2 — Presenter Mode and Graphics

- [ ] STEP 14.2.1 — Presenter Mode Screen
- [ ] STEP 14.2.2 — Graphics Zones Z1-Z5 Renderer
- [ ] STEP 14.2.3 — Scene Graphics Panel and Transitions
- [ ] STEP 14.2.4 — In-editor Preview and Audience Preview Window
- [ ] STEP 14.2.5 — Built-in Sample Briefing
- [ ] STEP 14.2.6 — Presenting-Never-Mutates Test

### - [ ] PHASE 15 — EXTERNAL DISPLAY

#### - [ ] STAGE 15.1 — External Display

- [ ] STEP 15.1.1 — DisplayController with Fake DisplayManager Tests
- [ ] STEP 15.1.2 — Presentation Window with Second MapView
- [ ] STEP 15.1.3 — LIVE Chip, Stop and Failure Handling
- [ ] STEP 15.1.4 — Hardware Evidence Run

### - [ ] PHASE 16 — PHONE REMOTE

#### - [ ] STAGE 16.1 — Protocol and Host

- [ ] STEP 16.1.1 — RemoteTransport, RemoteCommandPolicy and Protocol Tests
- [ ] STEP 16.1.2 — CompanionHost Server (TLS)
- [ ] STEP 16.1.3 — Pairing: QR, Manual Code, Approval, Session

#### - [ ] STAGE 16.2 — Phone Side

- [ ] STEP 16.2.1 — Remote Client and Controller Screen
- [ ] STEP 16.2.2 — CameraX and ZXing QR Scanning
- [ ] STEP 16.2.3 — Session Overrides Wiring and Reset View
- [ ] STEP 16.2.4 — Two-device Validation

### - [ ] PHASE 17 — GPS LOCATION

#### - [ ] STAGE 17.1 — Location

- [ ] STEP 17.1.1 — LocationProvider and Permission Flow
- [ ] STEP 17.1.2 — Locate Control States, Follow and Drop Marker
- [ ] STEP 17.1.3 — GNSS Device Test

### - [ ] PHASE 18 — IMAGE AND PDF EXPORT

#### - [ ] STAGE 18.1 — Image and PDF Export

- [ ] STEP 18.1.1 — PNG Export Engine
- [ ] STEP 18.1.2 — PDF Export and JPEG/WebP

### - [ ] PHASE 19 — LOCALIZATION, ACCESSIBILITY AND POLISH

#### - [ ] STAGE 19.1 — Localization and Accessibility

- [ ] STEP 19.1.1 — Settings S7 Completion
- [ ] STEP 19.1.2 — Full Arabic Translation and RTL Audit
- [ ] STEP 19.1.3 — Accessibility Pass
- [ ] STEP 19.1.4 — Empty, Loading and Error State Audit

### - [ ] PHASE 20 — P2 ADVANCED FEATURES

#### - [ ] STAGE 20.1 — Advanced Formats

- [ ] STEP 20.1.1 — GeoTIFF Simple Subset (Partial)
- [ ] STEP 20.1.2 — GeoPackage Raster, SQLiteDB and Calibrated .map
- [ ] STEP 20.1.3 — Shapefile Import/Export and GeoPackage Vector Import

#### - [ ] STAGE 20.2 — Other P2 Features

- [ ] STEP 20.2.1 — Stacked Map Sources and Cropped MBTiles Export
- [ ] STEP 20.2.2 — Biometric Unlock, Arabic-Indic Digits and TalkBack List View
- [ ] STEP 20.2.3 — Layer Copy, Backup Reminders, Coordinate Grid and Nearby Transfer

### - [ ] PHASE 21 — HARDENING, PERFORMANCE AND ACCEPTANCE

#### - [ ] STAGE 21.1 — Performance and Stability

- [ ] STEP 21.1.1 — Performance Budgets on the Reference Device
- [ ] STEP 21.1.2 — Memory, Leaks and StrictMode

#### - [ ] STAGE 21.2 — Security and Offline Audit

- [ ] STEP 21.2.1 — Full Offline Guard Run
- [ ] STEP 21.2.2 — Security Review and SECURITY.md Completion
- [ ] STEP 21.2.3 — targetSdk 37 Decision

#### - [ ] STAGE 21.3 — Full Acceptance

- [ ] STEP 21.3.1 — Full Acceptance Matrix Run
- [ ] STEP 21.3.2 — Regression Pack and Fix Cycle

### - [ ] PHASE 22 — RELEASE AND HANDOFF

#### - [ ] STAGE 22.1 — Release

- [ ] STEP 22.1.1 — R8 Release Build and Signing
- [ ] STEP 22.1.2 — Install, Final Documents and Final Report

---

## COMPLETED TASKS

_(none yet - list step IDs with date and evidence as you tick them)_

## CURRENT TASKS

_(Step 01.1.1 is next)_

## PENDING TASKS

_All unticked steps above are pending._

## KNOWN ISSUES

| ID | Date | Step | Severity (BLOCKER/MAJOR/MINOR) | Description | Status |
|---|---|---|---|---|---|
| | | | | | |

## TECHNICAL DECISIONS

Full log lives in `docs/MAPX_DECISIONS.md`. Record here only the decision ID and one line.

| ID | Decision | Step |
|---|---|---|
| DN-1..DN-10 | Spec defaults (see roadmap) | 02.1.4 |
| D-R01 | No emulator by default | 01.2.3 |
| D-R02 | targetSdk 36 first; 37 decided in 21.2.3 | 02.1.5 |
| D-R03 | State-based navigation, no Navigation library | 02.1.4 |
| D-R05 | applicationId `app.mapx`, folder `C:\dev\MapX` (assumed) | 02.1.4 |
| D-R06 | Pinned dependency versions | 02.1.5 |
| D-R07 | MBTiles: direct or loopback | 03.1.3 |
| D-R08 | Remote transport: Java-WebSocket or TLS sockets | 03.2.1 |
| D-R09 | Phone-landscape rail slots (assumed; owner confirm C-08) | 07.1.3 |

## MODIFIED FILES

_(list files changed per step: step ID, file path, date)_

## DEPENDENCIES

| Dependency | Pinned version | Added in step | Size | Licence | Decision |
|---|---|---|---|---|---|
| | | | | | |

## IMPORTANT COMMANDS

```
adb devices -l
.\gradlew.bat installDebug --offline
.\gradlew.bat testDebugUnitTest
.\gradlew.bat connectedDebugAndroidTest
.\tools\check.ps1
.\tools\backup.ps1
git tag before-<stepID>   /   git tag done-<stepID>
```

## AI CONTEXT AND HANDOFF NOTES

- Start every AI session with `MAPX_CONTEXT_PACK.md` (built by `tools\make-context.ps1`) and the step prompt from the PDF.
- Source of truth order: Master Project Specification, UI/UX Design Guide, Layout Blueprint (as amended).
- Which AI used last: ______ | Limit reached? ______ | Next AI in ladder: ______
- Last session summary: ______
- What must NOT change: ______

## NEXT ACTION

**Step 01.1.1 - Verify Windows Configuration.** Open PowerShell and run the command block in the PDF.

## FEATURE EVIDENCE MATRIX

Statuses: Implemented / Built / Automated-test verified / Device verified / Not tested / Deferred. Everything starts at **Not built / Not tested**.

| Area | Implemented | Built | Auto-test verified | Device verified (Lenovo / Samsung) | Notes |
|---|---|---|---|---|---|
| Projects, autosave, last-known-good, migrations (FR-PRJ-*, AC-PRJ-1) | no | no | no | not tested | |
| Map view, controls, coordinate search (FR-MAP-*) | no | no | no | not tested | |
| GPS location (FR-GPS-*, AC-GPS-1) | no | no | no | not tested | |
| Coordinate systems and metric units (FR-CRD-*, AC-CRD-1) | no | no | no | not tested | |
| Objects, commands, selection, HandleLayer (FR-OBJ-*) | no | no | no | not tested | |
| Drawing tools, 11 tools (FR-DRW-*, AC-DRW-1) | no | no | no | not tested | |
| Layers (FR-LYR-*, AC-LYR-1) | no | no | no | not tested | |
| Images and animation (FR-IMG-*, FR-ANI-*, AC-IMG-1) | no | no | no | not tested | |
| Symbols (FR-SYM-*) | no | no | no | not tested | |
| Scenes (FR-SCN-*) | no | no | no | not tested | |
| Presenter Mode and broadcast graphics (FR-PRS-*, AC-PRS-1) | no | no | no | not tested | |
| External display (FR-DSP-*, AC-DSP-1) | no | no | no | not tested | |
| Phone remote (FR-REM-*, AC-REM-1) | no | no | no | not tested | |
| Settings, language, accessibility (FR-SET-*, FR-ACC-*) | no | no | no | not tested | |
| Map sources and formats (FR-SRC-*, Spec 6, AC-SRC-1) | no | no | no | not tested | |
| Georeferencing (FR-GRF-*, AC-SRC-2) | no | no | no | not tested | |
| Import/export, packages, backup, fidelity (Spec 9, AC-EXP-1..5) | no | no | no | not tested | |
| PNG and PDF export (FR-IMX-*, AC-EXP-4) | no | no | no | not tested | |
| Login, accounts, security (FR-SEC-*, AC-SEC-1) | no | no | no | not tested | |
| Permissions and privacy (Spec 10.3, 10.4) | no | no | no | not tested | |
| Offline operation (AC-OFF-1) | no | no | no | not tested | |
| Performance budgets (AC-PERF-1) | no | no | no | not tested | |
| Localization English/Arabic RTL (AC-I18N-1) | no | no | no | not tested | |
| Layout contract, four modes (AC-UI-1, BA-01..BA-17) | no | no | no | not tested | |
| Honest limitations (AC-HON-1) | no | no | no | not tested | |
| Engineering documents (Spec 18.2) | no | no | no | not tested | |
| Final acceptance and release (Spec 16, 18.3) | no | no | no | not tested | |
| Environment, devices, free-AI workflow (master prompt 4-6, 12) | no | no | no | not tested | |
