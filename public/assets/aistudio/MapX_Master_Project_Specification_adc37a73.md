# MapX — Master Project Specification

**Version 1.0 · 4 November 2026 · Status: complete, awaiting owner approval of the items in Section 17**

---

## 0. Document control

### 0.1 Purpose
This is the single source of truth for **what MapX is, what it must do, and how well it must do it**. It is written for any AI platform or developer who will design, build, test or review MapX. It merges and replaces the product definitions in `MapX_Complete_Spec.md`, `MapX_Master_Plan_v2.md` (product digest) and `MapX_Layout_Blueprint_v1.pdf` (product behaviour only), after applying the owner's Stage 2 answers and resolving every problem found in Stage 1.

### 0.2 Scope boundary
- **In scope:** requirements, behaviour, architecture recommendations, data/storage, security, permissions, dependencies, performance, compatibility, priorities, acceptance criteria.
- **Out of scope (other AI accounts own these):** the UI/UX Guide (visual design details, pixel-level wireframes) and the Development Roadmap (phases, prompts, tracker). This document refers to the **Layout Blueprint** for dp sizes and wireframes. Where the Blueprint must change to match this specification, the required changes are listed in **Section 12.4** so the Blueprint owner can apply them.

### 0.3 Source priority when documents disagree
1. **This specification** (everything about product behaviour, security, formats, export, permissions).
2. **Layout Blueprint v1**, as amended by Section 12.4 (everything about screen structure, regions, dp sizes, overlap rules).
3. `MapX_Complete_Spec.md` and `MapX_Master_Plan_v2.md` — historical inputs. Where they differ from this document, this document wins. Master Plan v2 remains useful only for execution workflow, which is not part of this specification.

### 0.4 How requirements are marked
| Mark | Meaning |
|---|---|
| **[C]** | **Confirmed** — stated by the owner in the original documents or in the Stage 2 answers. |
| **[R]** | **Recommended improvement** — added by the analysis to resolve a gap, contradiction or risk. Treated as part of the specification unless the owner rejects it (see Section 17 for the ones that need an explicit decision). |
| **[V]** | **Verified by research** on 4 November 2026 (sources in Section 3.3). Versions and behaviour can change; re-verify when pinning dependencies. |

**Priority:** **P0** = core, must work for MapX to be usable at all · **P1** = required for the finished product · **P2** = required for the finished product but may follow P0/P1 · **D** = Deferred: documented, not promised, with a stated alternative.

All of P0, P1 and P2 are in scope for "a finished MapX". Priorities express order of importance, not removal of features.

---

## 1. Project overview

### 1.1 Identity [C]
MapX is a native Android, **offline-first geographic visual briefing and presentation system**. It is not simply a map app: it is a visual workspace for explaining real-world events geographically, preparing geographic briefings, and presenting them live. The map is the canvas; geographic coordinates are the truth; everything placed on the canvas stays attached to the real world.

### 1.2 Distribution and users [C]
- **Private use** by the owner and the owner's team. No public Google Play release is planned. Consequences: APK/AAB is installed directly (sideload or private distribution); no store policy compliance work; no public privacy policy is required; symbol and map-data licences still matter and must be documented.
- **Primary users:** journalists, news anchors, editors, analysts, researchers, emergency and planning teams, field teams, educators.
- **Primary device:** Android tablet in landscape (reference test device: Lenovo Tab P12, Android 15), touch or stylus. Phones are supported through compact layouts and as a remote controller.

### 1.3 Three-device model [C]
| Role | Device | Purpose |
|---|---|---|
| Studio | Tablet | Full authoring and control. |
| Audience screen | External display (when supported) | Clean, audience-facing output; never shows the editor. |
| Remote | Smartphone | **Presentation remote only.** Never edits project data. |

### 1.4 Core user journey [C, extended by R]
1. Open MapX and **log in** (local account, no internet). [C]
2. Start a project; choose or import an offline map or geographic source (many formats, many providers). [C]
3. Navigate world → region → city → local area; optionally show **my GPS location**. [C]
4. Add markers, labels, symbols, routes, arrows, boundaries, highlighted areas, images, GIFs. [C]
5. Organise content into layers; build scenes. [C]
6. Present (Presenter Mode), optionally on an external display, optionally controlled from a phone. [C]
7. **Export or back up** the work (project, layers, maps, images, PDF, KML/KMZ, GeoJSON, …) and **transfer it to another device** without loss. [C]
8. Exit; the project stays saved. [C]

### 1.5 What MapX is not [C, updated]
- Not a navigation app: **no turn-by-turn navigation or routing guidance**. [C]
- Not a generic social map, a browser slideshow, or cloud-only software.
- Not an image editor pretending ordinary images are geographic.
- Not a GIS application that falsely claims to support every GIS format.
- Not a duplicated full editor on phone and tablet.
- Not a live-data product (no real-time news, aircraft or traffic feeds).
- Not an app with cloud accounts, analytics or telemetry.

### 1.6 Design principles [C]
Map first · Geographic truth · Offline first · Tablet first · One source of truth per state · Professional restraint · Fast direct manipulation · Undoable work · Safe persistence · Real (never faked) format support · Arabic and English as first-class languages · Stylus friendly · Editing UI and audience UI are distinct · **Honest limitations** (if something cannot be done reliably, the app says so and offers the nearest alternative).

---

## 2. Application objectives

| ID | Objective | Measured by |
|---|---|---|
| O1 | Objects stay at the same real-world location however the map moves, saves or reloads. | AC-GEO-* |
| O2 | The full core workflow works with no network (airplane mode). | AC-OFF-* |
| O3 | Users can bring **their own maps from many sources and formats**, not one provider. | Format Support Matrix (Section 6.3), AC-SRC-* |
| O4 | Work is **portable**: projects, layers and maps move between devices without losing data, structure or function. | AC-EXP-* |
| O5 | Presentations look professional and the audience screen is cleanly separated from the editor. | AC-PRS-*, AC-DSP-* |
| O6 | The phone remote controls presentations without any ability to change project data. | AC-REM-* |
| O7 | Only logged-in users can reach the app and its projects; data is protected at rest using Android device encryption plus app-level controls. | AC-SEC-* |
| O8 | Arabic and English both feel native, including on the map. | AC-I18N-* |
| O9 | No overlapping or stacked toolbars, ever. | Layout Blueprint, AC-UI-* |
| O10 | Nothing is silently faked: unsupported formats and limitations are reported. | AC-HON-* |

---

## 3. Decision register and resolution of all Stage 1 problems

### 3.1 Owner decisions from Stage 2 [C]
| ID | Decision |
|---|---|
| D-01 | Private use for the owner and team; no Google Play release for now. |
| D-02 | GPS allowed: the app may use the device GPS and show the current location on the map when needed. |
| D-03 | No turn-by-turn navigation. |
| D-04 | Comprehensive import/export: complete projects, individual layers, maps/map views, images (PNG and others), PDF, KML/KMZ, GeoJSON and other useful geographic formats; backup; transfer between devices without losing data, structure or functionality. The most useful practical formats are chosen in Section 9. |
| D-05 | Comments and presenter notes are **removed** from version 1. |
| D-06 | The phone is a **presentation remote only** and must not modify original project data. |
| D-07 | Minimum Android version is **Android 9 (API 28)**. |
| D-08 | **Metric units** only. |
| D-09 | Coordinate formats: **DD, DDM, DMS, UTM, MGRS**, switchable by the user. |
| D-10 | **Western digits (1, 2, 3)** by default. |
| D-11 | Offline maps from **many sources and formats** (AlpineQuest maps, Google Earth data, map images, scanned and georeferenced maps, MBTiles, PMTiles, other compatible formats); not tied to one provider or one format. |
| D-12 | **Login screen with user account and password**; use Android device encryption and appropriate measures; simplest reliable approach with **no online account or cloud**. |
| D-13 | Specification stays at requirements level and refers to the Layout Blueprint for UI/UX dimensions. |
| D-14 | Resolve all Stage 1 problems inside the documents; preserve the original vision; do not unnecessarily simplify or remove features. |
| D-15 | Native Kotlin + Jetpack Compose + MapLibre Native (from Master Plan v2; Flutter dropped). |

### 3.2 Resolution of every Stage 1 finding
| # | Stage 1 finding | Resolution | Where |
|---|---|---|---|
| S1-01 | No export/import/backup anywhere. | Full export/import system defined: `.mapx` project package, `.mapxlayer` layer package, map-source export, backup/restore, PNG/JPEG/WebP, PDF, KML, KMZ, GeoJSON, GPX, CSV, plus import of the same. | §9 |
| S1-02 | GPS button in wireframes but no location feature or permission. | GPS location feature defined (foreground only, no tracking, no navigation); permissions declared. | §5.3, §10.4 |
| S1-03 | Navigation undefined. | Explicitly out of scope (D-03). | §1.5 |
| S1-04 | "Comments" referenced in external-display rules but never defined. | Comments removed from v1; wording replaced by "editor-only UI state". | §5.13, §12.4 |
| S1-05 | Project portability: a project only references its map source, so moving it breaks it. | Package format with map-source fingerprints, optional embedding, relink flow, Transfer Bundle for very large sources. | §9.2–9.4 |
| S1-06 | Phone remote had undo/redo and tool select vs "phone never edits" and "presenting never changes project data". | Remote command allow-list reduced to presentation commands only; remote camera/layer changes are **session overrides** that are never saved. | §5.14 |
| S1-07 | Blueprint rail items 44 dp vs rule "touch targets ≥ 48 dp". | All tappable items ≥ 48 dp in both directions; rail scrolls. | §12.3 |
| S1-08 | Phone-landscape rail shows Scenes, phone-portrait dock hides it in More. | Intentional; the More popup lists only items **not visible** in the current bar. | §12.3 |
| S1-09 | Compose label overlays recomputed every camera move do not scale. | Labels render **map-native** (symbol layer + cached bitmaps); Compose only for the selected label's handles and in-progress editing. | §7.4 |
| S1-10 | Arabic shaping on map labels uncertain. | Three-path text strategy; bundled glyphs must include Arabic ranges; mandatory test. | §7.5 |
| S1-11 | MBTiles/PMTiles compatibility unproven. | PMTiles [V]; MBTiles reported working, to be confirmed on the pinned version; normalisation strategy and fallback defined. | §3.3, §6.3 |
| S1-12 | WebSocket server and TLS certificate were not accounted for in dependencies. | Transport behind an interface; one WebSocket library pinned to the project, certificate from AndroidKeyStore without a library; fallback defined; all in dependency table. | §10.5, §11 |
| S1-13 | Permissions list incomplete (GPS, local network, camera, file access). | Full permission table, including Android 17 `ACCESS_LOCAL_NETWORK`. | §10.4 |
| S1-14 | Master Plan v2 refers to `MapX_Prompt_Pack.md` and a Manual Test Checklist that were not provided. | Identified as **missing, non-blocking dependencies** (roadmap/test-procedure artefacts). This specification contains its own acceptance criteria. | §17.3 |
| S1-15 | Optional GIS extensions (GeoTIFF, Shapefile, GeoPackage, manual georeferencing) were "only if reliable" while the owner now wants broad format support. | Promoted into the format matrix with honest status per format and nearest alternative where impossible. | §6.3 |
| S1-16 | Imports from other apps (AlpineQuest) assume access to another app's private folders. | Documented limitation: Android blocks it; files must be exported/copied to a visible folder and picked via the file picker. | §6.4 |
| S1-17 | Stream-copy import of huge maps needs free space equal to the file. | Free-space check, clear message, optional delete-original guidance. | §6.4 |
| S1-18 | Georeferenced images shown as a four-corner image source distort over large extents (Web Mercator). | Accuracy limit stated; large/low-latitude-span images are converted to a tile pyramid at import. | §6.5 |
| S1-19 | Reference tablet may have no GNSS chip (some Wi-Fi-only tablets do not). | Flagged; GPS tests need a GNSS-capable device; feature degrades gracefully with a clear message. | §5.3, §17.2 |
| S1-20 | "No network" principle vs `INTERNET` permission needed for local sockets and the map engine. | Rule refined: `INTERNET` is declared, but **no outbound internet requests** in core workflows; debug offline guard enforces it. | §10.4 |
| S1-21 | Auto-lock could interrupt a live presentation. | Auto-lock never fires during Presenter Mode or a live external presentation. | §10.1 |
| S1-22 | Large-screen orientation rules on newer Android versions. | App is resizable and never locks orientation. | §12.2 |

### 3.3 Research verification (4 November 2026) [V]
| Topic | Result | Source |
|---|---|---|
| PMTiles in MapLibre Native Android | **Supported from MapLibre Android 11.7.0.** Prefix a source URL with `pmtiles://`; local files use `pmtiles://file:///absolute/path`; the URL inside must be fully specified. **PMTiles sources do not support offline pack download or caching** (they read the file directly, which is fine for local files). | maplibre.org/maplibre-native/android/examples/data/PMTiles |
| MBTiles in MapLibre Native Android | Community reports show a local `mbtiles://` source path works with MapLibre/Mapbox-style Native SDKs, but **no official documentation page was found in this research**. Therefore MBTiles is **expected Supported but unconfirmed** until the pinned version is tested with a real file. Fallback: MapX-owned loopback tile reader (Section 6.3). | OpenStreetMap help thread "android full offline"; GitHub gist on MBTiles for Mapbox SDK |
| MapLibre Native Android current line | API reference shows version **11.11.0**; pin **11.7.0 or newer** and record the exact version. | maplibre.org API reference |
| Arabic in map labels | MapLibre implements its own bidirectional text handling and Arabic letter-shaping logic (presentation forms). Complex typography (ligature/kerning quality, curved-line text) is limited compared with a full text engine. Glyph files must contain the Arabic Unicode blocks. | MapLibre bidi/shaping sources; MapLibre discussion #778 |
| AlpineQuest formats | AlpineQuest reads MBTiles, GeoTIFF, GeoPackage, KMZ overlays, OziExplorer OZF2/OZF3, calibrated images, SQLiteDB, TMS zipped tiles, Memory-Map QCT and its own `.AQM/.PGD` maps, and imports/exports GPX, KML/KMZ, CSV/TSV, GeoJSON, Shapefile. | alpinequest.net, store listings |
| Android 17 local network | Apps targeting **API 37** need the **`ACCESS_LOCAL_NETWORK` runtime permission** (part of the Nearby Devices group); apps targeting lower levels keep implicit access if they hold `INTERNET`. | developer.android.com behaviour changes and local-network permission pages |

---

## 4. Feature map

| Area | Section | Area | Section |
|---|---|---|---|
| Projects and saving | 5.1 | Scenes | 5.11 |
| Map view | 5.2 | Presenter Mode and graphics | 5.12 |
| GPS location | 5.3 | External display | 5.13 |
| Coordinate systems | 5.4 | Phone remote | 5.14 |
| Objects, selection, commands | 5.5 | Settings, language, units | 5.15 |
| Drawing tools | 5.6 | Accessibility | 5.16 |
| Layers | 5.7 | Map sources and formats | 6 |
| Images | 5.8 | Import, export, portability | 9 |
| Animation | 5.9 | Login, security, permissions | 10 |
| Symbols | 5.10 | | |

---

## 5. Functional specification

Each table row is a requirement. Acceptance criteria are consolidated in Section 16.

### 5.1 Projects and saving
| ID | Requirement | Tag | Pri |
|---|---|---|---|
| FR-PRJ-01 | Home screen shows exactly: New Project, Open Project, Recent Projects, Settings (plus the account/lock control). No rail, panels or context bar on Home. | C | P0 |
| FR-PRJ-02 | New Project: step 1 name + optional description; step 2 choose an existing map source or import a new one; then create and open. | C | P0 |
| FR-PRJ-03 | Library actions: open, rename, **duplicate (deep copy, all IDs regenerated, fully independent)**, delete (always confirmed). Shows thumbnail, name, modified date, object count. | C | P0 |
| FR-PRJ-04 | A project is a **versioned JSON document** (`formatVersion`) holding: id, name, description, createdAt, modifiedAt, camera, map-source reference, layers, objects, scenes, presentation/graphics data, media references. Large media and map data never live in the document or in Room. | C | P0 |
| FR-PRJ-05 | **Autosave**: debounced 1–2 s after meaningful commands; also on stop, project close and low-memory signals; exactly one writer per project. Never blocks the UI. | C | P0 |
| FR-PRJ-06 | **Atomic save** in one transaction; the previous revision is kept as **last-known-good** until the new one reads back successfully. | C | P0 |
| FR-PRJ-07 | Save status state machine visible in the top bar: Saved / Saving / Unsaved / Error. | C | P0 |
| FR-PRJ-08 | A project that fails to load shows a clear error with **Restore last-known-good** and **Back to Home**; it never crashes, never white-screens, never blocks other projects. | C | P0 |
| FR-PRJ-09 | Process death restores the open project, camera and active tool. | C | P0 |
| FR-PRJ-10 | Database migrations and document migrations keyed by `formatVersion`; golden fixture JSON for every released version, one test each. Existing projects are never broken. | C | P0 |
| FR-PRJ-11 | UUID strings identify projects, objects, layers, scenes, media and sources. | C | P0 |
| FR-PRJ-12 | Each local account has its **own project library and map-source library** (logical isolation by account). | R | P0 |
| FR-PRJ-13 | If a project's map source is missing or unreadable, the project still opens, shows a clear warning, and offers **Relink source** (choose another source, or import one matching the stored fingerprint). Objects are never deleted or moved because a source is missing. | R | P0 |
| FR-PRJ-14 | Undo history is session-scoped (not saved), bounded at 200 steps. | C | P0 |

### 5.2 Map view
| ID | Requirement | Tag | Pri |
|---|---|---|---|
| FR-MAP-01 | MapLibre Native behind a `MapEngine` interface (camera, projection `toScreen/fromScreen`, sources, layers, events). Camera = geographic centre, zoom, bearing, pitch. | C | P0 |
| FR-MAP-02 | A **bundled minimal offline basemap and style** so a project can start with no imported map: coastlines, country borders, country and major-city names in English and Arabic where the data provides them, public-domain or permissively licensed data (e.g. Natural Earth), with its glyphs bundled. Recommended APK budget for the basemap: ≤ 60 MB. | C/R | P0 |
| FR-MAP-03 | Smooth, geographically correct navigation world → region → city → local area; pan, pinch zoom, rotate, tilt. | C | P0 |
| FR-MAP-04 | Status area shows coordinates (selected format), zoom and a **metric** scale; tapping the coordinate readout opens the coordinate-format switcher. | C/R | P0 |
| FR-MAP-05 | **Search by coordinates** in any supported format (DD, DDM, DMS, UTM, MGRS); format auto-detected; invalid input explained. | C | P0 |
| FR-MAP-06 | Map controls inside the map workspace: compass/north, zoom in/out, locate, scale bar, attribution (from source metadata). | C | P0 |
| FR-MAP-07 | Antimeridian (±180°) geometry renders correctly via longitude unwrapping, or the limitation is documented and tested. | C | P0 |
| FR-MAP-08 | Online demo styles exist only behind a **debug flag, off by default**. | C | P0 |
| FR-MAP-09 | Map source can be switched in a project; the switch is a command (undoable) and never alters object coordinates. | R | P1 |

### 5.3 GPS location (new) [C by D-02, design R]
| ID | Requirement | Tag | Pri |
|---|---|---|---|
| FR-GPS-01 | A **Locate** map control shows the device's current position as a dot with an **accuracy circle**. States: idle, searching, located, permission denied, location services off, no GNSS hardware. | C/R | P1 |
| FR-GPS-02 | Location is requested **only when the user taps Locate**, with a one-line explanation first. **Foreground only**; no background location. | R | P1 |
| FR-GPS-03 | Uses the platform `LocationManager` (GNSS and network providers). **No Google Play Services dependency.** GNSS works offline. | R | P1 |
| FR-GPS-04 | Tap again to centre/fit; optional **follow mode** (camera follows the dot) and heading arrow when sensors allow. | R | P1 |
| FR-GPS-05 | **Drop marker at my location** creates a normal Marker through a command (undoable). | R | P1 |
| FR-GPS-06 | The location is **never stored** in a project unless the user drops a marker; no track recording and no history in v1; never transmitted. | R | P1 |
| FR-GPS-07 | **Presenter Mode and the audience screen never show the location dot** unless the presenter enables "Show my location" for that presentation (default off). | R | P1 |
| FR-GPS-08 | If permission is denied or services are off, a clear message with a shortcut to system settings; the rest of the app is unaffected. | R | P1 |
| FR-GPS-09 | No turn-by-turn navigation, routing guidance or route recording (D-03). | C | — |

### 5.4 Coordinate systems and units
| ID | Requirement | Tag | Pri |
|---|---|---|---|
| FR-CRD-01 | Stored geometry is always **WGS84 decimal degrees (`Double`)**, domain order (lat, lon). Formats are display/input conversions only. | C | P0 |
| FR-CRD-02 | Supported formats: **DD, DDM, DMS, UTM, MGRS**, switchable at any time; the choice is saved per account and applied everywhere coordinates are shown (status readout, properties, GPS, search, import preview). | C | P0 |
| FR-CRD-03 | UTM and MGRS cover **80°S–84°N** including standard zone exceptions. Outside that band (polar UPS) the app shows DD and a short note; UPS is **Deferred**. | R | P0 |
| FR-CRD-04 | MGRS precision is selectable (10 km … 1 m); default 1 m (10 digits). | R | P1 |
| FR-CRD-05 | Coordinate parsing is tolerant: separators, hemisphere letters (N/S/E/W), signs, Arabic-Indic digits accepted on input. | R | P0 |
| FR-CRD-06 | Hemisphere letters stay Latin (N/E/S/W) in both languages by default, rendered bidi-safe. | R | P1 |
| FR-CRD-07 | All conversions live in `CoordinateUtils` (pure Kotlin, no library) and are verified against published reference vectors in unit tests. | R | P0 |
| FR-CRD-08 | **Metric units only** (m, km, m², hectares, km²) for distances, areas, scale and radii. | C | P0 |
| FR-CRD-09 | **Western digits (1, 2, 3)** by default in both languages. An optional Arabic-Indic digits display setting is allowed. | C/R | P2 |
| FR-CRD-10 | Datum is WGS84 only; other datums/CRS on imported data are reported, never silently assumed (see Section 6). | C | P0 |

### 5.5 Objects, selection and commands
| ID | Requirement | Tag | Pri |
|---|---|---|---|
| FR-OBJ-01 | Common properties: UUID `id`, `type`, geometry/position, `layerId`, `visible`, `locked`, style, `CoordinateSpace` (`GEOGRAPHIC` or `IMAGE_LOCAL`). | C | P0 |
| FR-OBJ-02 | `MapObjectRegistry` holds one `MapObjectDefinition` per type (serialise, deserialise, renderer, hit-test, property editor). Nothing hard-codes types elsewhere. Unknown types in a document are preserved or skipped safely. | C | P0 |
| FR-OBJ-03 | **Label** rendered as a **Label Tag**: white card, bold navy text (#14264F), small amber square on the inline-start edge, pointer to the exact coordinate, bidi-safe; sizes S/M/L; tag colour and anchor colour. Properties: text, fontSize, colour, opacity, rotation. | C | P0 |
| FR-OBJ-04 | **Marker**: position, name, icon, colour, rotation, show-name. | C | P0 |
| FR-OBJ-05 | **Image** object, **Symbol** object, **Drawing** objects, and read-only **Imported features** (see 5.6–5.10, Section 9). | C | P0 |
| FR-OBJ-06 | Every edit is a **command** (Create, Delete, Move, Update, plus layer, scene, conversion and import commands). One gesture = one undo step via `begin/update/commit` sessions. UI never mutates project state directly. | C | P0 |
| FR-OBJ-07 | Selection: tap selects, tap empty deselects, **blue outline**, multi-select, delete, drag to move without panning the map. Long-press on an empty map creates a label. | C | P0 |
| FR-OBJ-08 | One reusable **HandleLayer** for vertex, endpoint, move, resize, shape and rotation handles. Screen-space, transient, never stored. | C | P0 |
| FR-OBJ-09 | One **Properties editor** composable reused in the tablet side panel and the phone bottom sheet. | C | P0 |
| FR-OBJ-10 | Hit-testing uses geometry distance in screen space via the projection; hidden layers are not hit-testable. | C | P0 |
| FR-OBJ-11 | Stylus support: precise drawing and handle manipulation; palm rejection by relying on platform stylus events. | C | P1 |

### 5.6 Drawing and annotation
| ID | Requirement | Tag | Pri |
|---|---|---|---|
| FR-DRW-01 | **11 tools**: Freehand, Line, Polyline/Route, Straight Arrow, Curved Arrow, Circle, Rectangle, Polygon, Boundary, Highlighted Area, Route with Pins. | C | P0 |
| FR-DRW-02 | Flow: activate tool → draw → finish → select → edit → delete → undo → redo. A continuous freehand stroke is **one** command. Active tool is shown in interaction blue. | C | P0 |
| FR-DRW-03 | A circle drawn around a city **stays around that city** when the map pans, zooms or rotates (geographic geometry, radius in metres). | C | P0 |
| FR-DRW-04 | Style model: stroke colour, fill colour (where applicable), stroke width, opacity, dash style, arrowheads. | C | P0 |
| FR-DRW-05 | Stored geometry: see Section 7.3 table (all geographic; freehand simplified with Douglas–Peucker and a hard vertex cap). | C | P0 |
| FR-DRW-06 | Properties show measurements in metric units: length, area, perimeter, radius, vertex count; coordinates in the selected format. | R | P1 |

### 5.7 Layers
| ID | Requirement | Tag | Pri |
|---|---|---|---|
| FR-LYR-01 | Layer model: id, name, kind (`USER`/`IMPORTED`), visible, locked, opacity, order, readOnly, optional `parentId` (one level of grouping). A default layer always exists and cannot be deleted. Every geographic object has a layer id. | C | P0 |
| FR-LYR-02 | Operations (all undoable commands): create, rename, delete, reorder, visibility, lock, opacity, set active layer, assign objects, move objects between layers. Deleting a layer with objects asks: move them or delete them (confirmed, undoable). | C | P0 |
| FR-LYR-03 | Semantics: hidden = not rendered and not hit-testable; locked = visible but not editable; imported = read-only; layer opacity multiplies object opacity; new objects go to the active layer. | C | P0 |
| FR-LYR-04 | One `RenderOrder` service owns draw order (layer order, then object order); the mapping to MapLibre style layers is documented. | C | P0 |
| FR-LYR-05 | **Layer export/import** as a lossless `.mapxlayer` package and as GeoJSON/KML/KMZ/GPX/CSV (Section 9). | C/R | P1 |
| FR-LYR-06 | Layers can be copied between projects on the same device without export files (copy/paste layer). | R | P2 |

### 5.8 Images
| ID | Requirement | Tag | Pri |
|---|---|---|---|
| FR-IMG-01 | Import PNG, JPG/JPEG, WebP (incl. transparency) via the system file picker into `files/media/<projectId>/<mediaId>`; projects hold stable media references (id, hash, mime, size, dimensions), never bytes. | C | P0 |
| FR-IMG-02 | Duplicate media detected by hash; missing media shows a clear placeholder and never crashes; orphan cleanup is safe, tested and undo-aware. | C | P0 |
| FR-IMG-03 | Image objects are **geographically anchored** and scale with the map (centre + width in metres + rotation), rendered map-natively. | C | P0 |
| FR-IMG-04 | Editing: move, scale, rotate, flip, opacity, lock, delete; a transform gesture is one undo step; large handles on tablet, contextual sheet on phone. | C | P0 |
| FR-IMG-05 | Decode with downsampling, respect EXIF orientation, cap texture size, reuse bitmaps, release when off-screen or hidden. A 12 MP photo must not exhaust memory. Memory budget is defined and documented (recommended: decoded image cache ≤ 128 MB, longest side ≤ 2048 px for display). | C/R | P0 |
| FR-IMG-06 | Images imported from KML/KMZ **GroundOverlay** become image objects placed by their stated geographic box and rotation. | R | P1 |

### 5.9 Animation
| ID | Requirement | Tag | Pri |
|---|---|---|---|
| FR-ANI-01 | GIF and animated WebP are supported on **all supported devices** (minSdk 28 gives platform animated decoding everywhere; the old "static first frame below API 28" path is removed). | C | P1 |
| FR-ANI-02 | One central `AnimationScheduler` with a single clock; no animation loops inside composables or objects. Controls: play, pause, restart, speed, loop, progress. The same clock later drives pulsing hotspots, moving symbols, animated routes and scene transitions. | C | P1 |
| FR-ANI-03 | **Visible-only playback**: hidden, off-screen or hidden-layer objects neither advance nor decode. Pause on background and release decoders. | C | P1 |
| FR-ANI-04 | Cap on concurrently animating objects (default 6, configurable); frame-rate cap for map image updates; honour the system reduced-motion setting. | C | P1 |
| FR-ANI-05 | Global controls: Play, Pause All, Restart, Speed. Per-object play state, speed and loop persist; transient progress does not. | C | P1 |

### 5.10 Symbols
| ID | Requirement | Tag | Pri |
|---|---|---|---|
| FR-SYM-01 | **15 categories**: General, People, Transport, Vehicles, Aircraft, Maritime, Logistics, Emergency, Buildings, Weather, Outdoor, Infrastructure, Range/Rings, Arrows, Callouts; at least 6 symbols each (90+). | C | P1 |
| FR-SYM-02 | **Original** vector symbols only (or clearly licensed); never copy copyrighted or military-standard artwork you cannot license. `SYMBOLS_LICENSE.md` lists every symbol, author, licence. | C | P1 |
| FR-SYM-03 | Registered with the map as SDF-capable images so colour changes without re-rasterising; re-registered on density change; rasterised sizes cached. | C | P1 |
| FR-SYM-04 | Search by name and tags in **English and Arabic**; favourites and recents persist. | C | P1 |
| FR-SYM-05 | Edit: move, rotate, resize, recolour, rename, delete, undo/redo. | C | P1 |

### 5.11 Scenes
| ID | Requirement | Tag | Pri |
|---|---|---|---|
| FR-SCN-01 | A scene = id, name, order, camera (centre, zoom, bearing, pitch), visible layers, object-visibility overrides, presentation graphics state, animation state. **A scene is a view state referencing project data, not a copy.** | C | P1 |
| FR-SCN-02 | Operations: create from current view, update, rename, reorder, delete (all undoable), go to, previous, next, scene list. | C | P1 |
| FR-SCN-03 | Going to a scene applies camera and visibility to the **presentation state** without mutating project objects. | C | P1 |
| FR-SCN-04 | A built-in **sample briefing** with ≥ 6 scenes using layers, symbols, images, drawings, an animation, all graphic types and all transitions, for validation. | C | P1 |

### 5.12 Presenter Mode and broadcast graphics
| ID | Requirement | Tag | Pri |
|---|---|---|---|
| FR-PRS-01 | `PresentationController` owns presentation state. Clean full-screen mode hides all editor UI (rail, panels, handles, selection) and shows map, annotations, media, animations and graphics. | C | P1 |
| FR-PRS-02 | Controls: previous, next, scene list, play, pause, restart, exit — in a **transient** controls bar (appears on tap, hides after 4 s). Accidental exit prevented (deliberate gesture or confirmation). | C | P1 |
| FR-PRS-03 | Immersive system bars; back button and rotation handled; keep screen on during presentation, released on exit and on background. | C | P1 |
| FR-PRS-04 | Entering and leaving restores the **exact editor state**. **Presenting never changes project data** (verified by comparing the saved project document before and after). | C | P1 |
| FR-PRS-05 | Graphics are **screen-space inside title-safe (5%) and action-safe (3.5%) margins**: headline banner, lower third, legend, information card, scale indicator (live from camera/latitude), north indicator (follows bearing), source/attribution line. **Location labels stay geographically anchored** and are drawn below screen graphics. | C | P1 |
| FR-PRS-06 | Graphics belong to scenes (per-scene visibility, text, style); appear in the editor only in preview; fixed zones Z1–Z5 per the Layout Blueprint cannot collide. Legend can be built from used symbols/layers and edited by hand. | C | P1 |
| FR-PRS-07 | Transitions: instant, fly-to, fade, object appearance; restrained; honour reduced motion; driven by the `AnimationScheduler`/presentation clock. | C | P1 |
| FR-PRS-08 | In-editor **preview** shows a scene exactly as the audience sees it, without leaving editing state. | C | P1 |
| FR-PRS-09 | Presentation runs on **session state**: remote or presenter camera/visibility overrides are held in memory, discarded on exit, never saved. | R | P1 |
| FR-PRS-10 | Auto-lock (Section 10.1) never triggers during a presentation. | R | P1 |
| FR-PRS-11 | All graphics render correctly in Arabic (RTL, mirrored zones) and English. | C | P1 |

### 5.13 External display
| ID | Requirement | Tag | Pri |
|---|---|---|---|
| FR-DSP-01 | Tablet remains the editor/controller; the external screen shows a clean presentation. **The external display never shows the editor interface.** | C | P1 |
| FR-DSP-02 | Uses only supported Android mechanisms: `DisplayManager` and `android.app.Presentation` (MediaRouter for route selection where useful). | C | P1 |
| FR-DSP-03 | The external screen has its **own MapView instance** driven by shared presentation state (a MapView cannot be shared between displays); memory cost and mitigation documented. | C | P1 |
| FR-DSP-04 | Shows map, annotations, media, animations, graphics; hides toolbars, panels, handles, selection and all editor-only UI state. **Never leaks hidden layers or unsaved UI state.** (v1 has no comments or notes feature.) | C | P1 |
| FR-DSP-05 | Tablet stays fully interactive (editing, previewing the next scene); a red **LIVE** chip with **Stop** shows while live. | C | P1 |
| FR-DSP-06 | Failure handling: cable removed (snackbar with Reconnect / Use in-app preview), unsupported hardware (honest message + draggable in-app **Audience Preview**), mirroring-only (say so), orientation/resolution change (zones re-layout by percentage), background/return, presentation started with no display. A lost display never corrupts the project. | C | P1 |

### 5.14 Phone remote (presentation-only) [C by D-06]
The phone runs the same APK in **Remote mode**. It is a presentation controller, not an editor.

| ID | Requirement | Tag | Pri |
|---|---|---|---|
| FR-REM-01 | The tablet runs `CompanionHost`; the phone connects over the local network (same Wi-Fi or hotspot). No cloud, no internet needed, no Google Play Services. | C | P1 |
| FR-REM-02 | **Allowed commands (complete allow-list):** start presentation, exit presentation, next scene, previous scene, go to scene, play, pause, restart, animation speed, pan and zoom the **presentation camera**, reset to the scene camera, toggle layer visibility **as a session override**, request a state snapshot. | C/R | P1 |
| FR-REM-03 | **Forbidden (rejected and logged locally):** undo, redo, tool selection, create/update/delete of any object, layer create/edit/delete, scene edit, import, export, settings, project open/close/delete, anything not on the allow-list. Undo/redo and tool select from the earlier Spec/Blueprint are **removed**. | C/R | P1 |
| FR-REM-04 | Remote camera and layer overrides live only in `PresentationController` session state. They **never modify the project**, are never saved, reset on scene change (camera) or via a **Reset view** command, and vanish on exit. | R | P1 |
| FR-REM-05 | Phone controller is a single scrolling column: connection status, current scene card, large Previous/Next, Play/Pause/Restart, pan pad with zoom, layer toggles, scene list, Disconnect. No drawing, no editing, no rail, no panels. In every non-connected state controls are **disabled, not hidden**. | C | P1 |
| FR-REM-06 | Connection states: Connected (green), Reconnecting (amber), Disconnected (grey), Session expired (red, with **Pair again**). | C | P1 |
| FR-REM-07 | One controller at a time; a second phone requires explicit takeover approved on the tablet. | C | P1 |
| FR-REM-08 | Pairing and message security are specified in Section 10.5. | C | P1 |
| FR-REM-09 | The phone must be logged in to MapX on its own (local account) before Remote mode opens; the phone never receives project files, only read-only state snapshots (scene names, order, play state, layer names/visibility). | R | P1 |

### 5.15 Settings, language and units
| ID | Requirement | Tag | Pri |
|---|---|---|---|
| FR-SET-01 | Languages: English (LTR) and Arabic (RTL), via `values/` and `values-ar/`; no hard-coded user-visible strings; choice persists (DataStore). | C | P0 |
| FR-SET-02 | Settings sections: Language, Coordinate format, Digits (P2), Security (auto-lock, screen protection, change password, accounts), Storage (usage per project/source, cleanup), Backup, Offline guard status (debug), About and licences. Metric units are fixed (no unit switch). | C/R | P0 |
| FR-SET-03 | Cairo font bundled (OFL) for Arabic and Latin; works offline. | C | P0 |
| FR-SET-04 | Direction-aware icons (undo/redo, back, next/previous, progress flip in RTL; clocks, media-play icons, the map, compass, numbers, Latin brand names do not flip). | C | P0 |

### 5.16 Accessibility
| ID | Requirement | Tag | Pri |
|---|---|---|---|
| FR-ACC-01 | Touch targets ≥ 48 dp (larger on tablet); contrast ≥ 4.5:1 for text and essential icons. | C | P0 |
| FR-ACC-02 | TalkBack content descriptions and sensible focus order; custom accessibility actions; a **list-view alternative** so map objects are reachable without the canvas. | C | P2 |
| FR-ACC-03 | Text scaling to 200% without clipping or stacking toolbars; reduced motion honoured everywhere. | C | P1 |

---

## 6. Map sources and offline map formats

The owner's requirement is **not to be tied to one map provider or one format** [C, D-11]. The design therefore separates *what the user imports* from *what the map engine renders*.

**Principle [R]:** every imported map is classified into one of a few **normalised source types**. Rendering code only knows these types:

| Normalised type | Meaning | Render path |
|---|---|---|
| `MBTILES` (raster or vector) | SQLite tile archive | MapLibre tile source (see 6.3 for the confirmed/fallback reader) |
| `PMTILES` (raster or vector) | Single-file tile archive | MapLibre `pmtiles://file://` source [V] |
| `GEOREF_IMAGE` | Image plus a stored georeference transform | Map-native image source (small extents) or generated tile pyramid (large extents), see 6.5 |
| `IMAGE_LOCAL` | Ordinary image with **no** geography | Image-space canvas; objects use `IMAGE_LOCAL` coordinates |
| `STYLE_ONLY` | The bundled offline basemap style | Bundled style and glyphs |

Formats that are not one of these are **converted at import** (background, with progress, cancel and disk-space check) into `MBTILES` or `GEOREF_IMAGE`, or are rejected with an explanation.

### 6.1 Map source library [C]
| ID | Requirement | Pri |
|---|---|---|
| FR-SRC-01 | A library separate from projects: view, import, inspect metadata, rename, select, delete, remember. Own database table(s) and storage `files/accounts/<account>/mapsources/<id>/`. | P0 |
| FR-SRC-02 | A project holds only a `MapSourceRef` (id + content fingerprint). Deleting a source in use is blocked or warned; a missing source never leaves a broken reference (FR-PRJ-13). | P0 |
| FR-SRC-03 | Preview thumbnail, details screen, and clear warnings when a source is missing or unreadable. | P0 |
| FR-SRC-04 | Metadata where available: id, name, original file name, format, file size, dimensions, bounds, CRS, zoom range, tile information (raster/vector, tile format), import date, storage location, attribution, SHA-256. | P0 |
| FR-SRC-05 | Attribution from source metadata is always displayed when present. | P0 |
| FR-SRC-06 | Several sources can be combined in one project as **stacked background layers** (e.g. a satellite MBTiles under a road-overlay PMTiles) with per-source opacity and order; the first source is the primary reference for scale and attribution. This matches how AlpineQuest users stack maps. | P2 [R] |

### 6.2 Import pipeline [C, extended]
File picker (Storage Access Framework) → **free-space check first** → **stream-copy** into app storage (never load a whole file into RAM) with **SHA-256 computed while copying** → progress and **cancellation** (partial files always deleted) → **duplicate detection by hash** → **validation by magic bytes and structure** (SQLite header + MBTiles tables; PMTiles header; image signatures; ZIP central directory) → **classification** into a normalised type → **conversion** if needed → register in the library. Clear errors for invalid, unsupported, corrupt and storage problems. No whole-file blocking spinner; progress appears inside the Maps panel.

Additional rules [R]:
- Imports run while the app is in the foreground; if the app is backgrounded, the import pauses or cancels cleanly with no partial files (no foreground service in v1).
- All writes to a staging folder; the source becomes visible only after validation succeeds (atomic).
- MBTiles/PMTiles files are opened **read-only**; conversion never modifies the original.

### 6.3 Format Support Matrix (expected status; final status is set only with evidence)
Each format is exactly one of **Supported / Partial / Deferred**, recorded in `ARCHITECTURE.md` with the real sample file used. Nothing is marked Supported without importing a real sample [C].

| Format | Expected status | Pri | How | Notes and nearest alternative |
|---|---|---|---|---|
| **MBTiles, raster** (PNG/JPG/WebP tiles) | Supported *(to confirm)* | P0 | MapLibre local MBTiles source on the pinned version; if the pinned build does not read it, use the **fallback reader** below | Most common offline format (MOBAC, AlpineQuest, QGIS, TileMill). |
| **MBTiles, vector** (PBF) | Supported *(to confirm)* | P1 | Same as above plus a style (see 6.7) | Without a known schema the app uses a generic style and says so. |
| **PMTiles v3** raster/vector | **Supported** [V] | P0 | `pmtiles://file://<absolute path>`; MapLibre Android ≥ 11.7.0 | PMTiles sources do not use offline packs/caches, which is fine for local files. |
| **XYZ/TMS tile folders in a ZIP** | Supported | P1 | Converted to MBTiles at import | Output format of MOBAC and many tile exporters. |
| **PNG / JPG / WebP ordinary images** | Supported | P0 | `IMAGE_LOCAL` | Never given invented coordinates. |
| **Georeferenced image with world file** (`.pgw/.jgw/.wld` + image) | Supported | P1 | `GEOREF_IMAGE` from the world-file transform | CRS must be EPSG:4326 or 3857 (or a UTM zone); otherwise refused with a message. |
| **KML/KMZ GroundOverlay** (Google Earth image overlay) | Supported | P1 | `GEOREF_IMAGE` from LatLonBox + rotation | Also reached via GIS import. |
| **Manual georeferencing of any image or scanned map** | Supported | P1 | Control points, affine transform (6.5) | The answer to scanned maps with no embedded geography. |
| **Calibrated image `.map` (OziExplorer text calibration)** | Partial | P2 | Parse calibration points into control points, then affine | OZF2/OZF3 and QCT are **Deferred** (proprietary encoded images). |
| **GeoTIFF** | Partial (simple files) | P2 | Import-time conversion to tiles with an in-app reader for uncompressed/Deflate/LZW 8-bit RGB(A)/gray, tiled or striped, EPSG:4326/3857/UTM | **Arbitrary GeoTIFF cannot be supported reliably** without a native GIS library (BigTIFF, JPEG-in-TIFF, floating-point, multi-band, huge sizes, exotic CRS). MapX refuses unsupported variants with a clear message. **Nearest alternative:** convert with QGIS/GDAL (`gdal2tiles`, or Raster → MBTiles) or MOBAC, then import the MBTiles/PMTiles. |
| **GeoPackage raster tiles** | Partial | P2 | Standard tile pyramids converted to MBTiles | Vector GeoPackage is a GIS import (Section 9). |
| **SQLiteDB (OruxMaps/RMaps/Locus)** | Partial | P2 | Tile table converted to MBTiles | |
| **AlpineQuest `.AQM/.PGD`** | Deferred | D | — | Proprietary. **Alternative:** in AlpineQuest use maps based on MBTiles/GeoTIFF/KMZ, or recreate the area with MOBAC as MBTiles. Verify with the format owner if a documented export exists. |
| **Mapsforge `.map`** | Deferred | D | — | Needs a separate vector renderer. **Alternative:** convert to MBTiles/PMTiles with desktop tools. |
| **Google Earth imagery / Google basemap tiles** | Not available | D | — | The imagery is not provided as an exportable offline source and provider terms restrict offline copying. **Supported alternative:** KML/KMZ placemarks, shapes and image overlays made in Google Earth (Section 9), plus user-supplied licensed imagery as MBTiles/PMTiles. |
| **DEM / terrain / hillshade** | Deferred | D | — | Not in the original vision. |

**MBTiles fallback reader [R]:** if the pinned MapLibre version cannot open local MBTiles, MapX provides its own small tile provider: a read-only SQLite reader that serves tiles to MapLibre through a **loopback-only** local endpoint (`127.0.0.1`, random port, random path token, cleartext allowed for loopback only through a narrow network-security configuration). This is the approach used by community integrations. It must never listen on a non-loopback address. Whichever path is chosen is recorded in `MAPX_DECISIONS.md` with the pinned version and evidence.

### 6.4 Bringing maps from other apps and providers
| Source | What works | Limitation |
|---|---|---|
| **AlpineQuest** | Maps stored as MBTiles, GeoTIFF, GeoPackage, SQLiteDB, TMS zips, KMZ overlays, calibrated images become importable (see matrix). Placemarks exported as GPX, KML/KMZ, CSV/TSV, GeoJSON or Shapefile are importable (Section 9). | Android blocks one app from browsing another app's private storage. The user must **copy/export the file to a visible folder** (Downloads, Documents, SD card, USB) and then pick it with MapX's file picker. AlpineQuest's own `.AQM/.PGD` maps are Deferred. |
| **Google Earth** | KML/KMZ vector content and image overlays. | No imagery basemap export; see matrix. |
| **MOBAC / QGIS / desktop tools** | Produce MBTiles, PMTiles, GeoTIFF, XYZ folders. The recommended route for unusual formats. | Done on a computer. |
| **Another MapX device** | `.mapx` / Transfer Bundle (Section 9). | — |

The Maps panel's import chooser shows a **plain-language list of what each format needs** and a "Where do I find this file?" hint (for AlpineQuest and Google Earth).

### 6.5 Georeferencing and image accuracy [C by D-11, promoted from "optional"]
| ID | Requirement | Pri |
|---|---|---|
| FR-GRF-01 | **Manual georeferencing** for ordinary images and scanned maps: the user places ≥ 3 non-collinear control points pairing image positions with geographic coordinates (entered in any supported coordinate format, or picked on the map). | P1 |
| FR-GRF-02 | Compute an affine transform by least squares; with ≥ 4 points report per-point residuals and **RMSE in metres**; warn on large RMSE or poor point distribution; the user accepts, adjusts or rejects. | P1 |
| FR-GRF-03 | Store the transform, control points, RMSE and CRS with the source. Objects authored in `IMAGE_LOCAL` convert to `GEOGRAPHIC` through the transform as an **explicit, undoable** action. | P1 |
| FR-GRF-04 | Ordinary images are **never** given invented coordinates; objects on an ungeoreferenced image store image-space coordinates and are never labelled geographic. The owner must approve this `IMAGE_LOCAL` design (see Section 17). | P0 |
| FR-GRF-05 | **Accuracy rule:** a four-corner image source is exact only in Web Mercator space. For extents larger than a configurable limit (default: ~1° of latitude span or ~100 km), or images over ~4096 px on a side, the import creates a **tile pyramid** (MBTiles) from the image by streaming region decoding, so distortion and memory use stay bounded. The limit is documented and tested. | P2 |
| FR-GRF-06 | A dedicated **Georeference screen** (two synchronised views: image and map, plus a control-point table) is required; its layout is added to the Blueprint (Section 12.4). | P1 |

### 6.6 Offline operation [C]
The entire core workflow works in airplane mode. No network use for tiles, fonts, sprites or glyphs — everything the style needs is bundled or imported. A **debug-only offline guard** fails loudly on any outbound request. Tile caches are bounded; first tile appears within ~2 s of opening a project; tiles are read on demand; datasets are never loaded into RAM; the app never downloads or caches provider map data without permission.

### 6.7 Vector styling and glyph rules [R]
- Vector tile sets need a style. MapX bundles (a) a style for the common **OpenMapTiles schema** and (b) a **generic fallback style** that draws any unknown source-layer by geometry type with neutral colours. The Map Source details screen states which style is used.
- The bundled glyph set covers Latin and the Arabic Unicode blocks (see 7.5). Styles from imported sources that reference fonts not bundled are mapped to the bundled font stack, with a warning when characters would render as missing glyphs.
- Imported styles/sprites/glyphs that point at online URLs are refused or rewritten to local resources; they are never fetched.

---

## 7. Technical architecture (recommendations)

### 7.1 Technology
| Area | Decision |
|---|---|
| Platform | Native Android. **`minSdk 28`** [C]; `compileSdk`/`targetSdk` = current stable (the choice of target level affects the local-network permission, see 10.4). Resizable app; orientation never locked. |
| Language / UI | Kotlin, Jetpack Compose, Material 3, single Activity, single Gradle module, package-by-feature. |
| Map engine | **MapLibre Native for Android, 11.7.0 or newer** (PMTiles requires it) [V], behind a `MapEngine` interface; only the `map` package imports MapLibre. |
| Persistence | Room (library index, project documents, accounts, map-source table), DataStore (preferences), app-private files (media, map sources, exports in cache). |
| Serialization | kotlinx.serialization JSON with explicit `formatVersion`. |
| Imports/exports | Storage Access Framework; streaming; platform `java.util.zip`, `android.util.JsonReader`, `XmlPullParser`, `android.graphics.pdf.PdfDocument`, `javax.crypto`. |
| Async / state | Coroutines + Flow; ViewModels; unidirectional data flow. |
| DI | Manual `AppContainer`. |
| Build | Gradle Kotlin DSL with version catalog; KSP for Room; R8 for release. |
| Testing | JUnit, kotlinx-coroutines-test, Room in-memory, Compose UI tests, instrumented tests, Android Lint clean of errors. |
| Excluded | React, PWA, HTML/CSS UI, a required server, **own** NDK/C++ code, Capacitor, analytics/telemetry, Google Play Services, ML Kit, Flutter. |

### 7.2 Package structure and dependency rule
`core/geo`, `core/model`, `core/command`, `core/coords` (formats), `data` (db, repository, preferences, accounts), `map` (MapLibre only here), `ui/layout`, `ui/theme`, `feature/*` (auth, editor, projects, mapsources, georef, drawing, layers, media, symbols, scenes, presentation, gis, exchange, display, companion, location, settings).

**Rule:** UI → ViewModel → domain (commands, registry, geo) → data. The domain layer has no Android UI and no MapLibre imports; an architecture test enforces it.

**Required class names (reuse; never create parallel versions):** `MapXViewModel`, `MapXLayoutRoot`, `PanelManager`, `MapLibreMapView`, `MapObject`, `MapObjectRegistry`, `MapObjectDefinition`, `LabelTag`, `LabelTagDefinition`, `CommandManager`, `MapCommand`, `EditorTool`, `LayoutMode`, `LayoutRegion`, `LayoutSpec`, `ActivePanel`, `CoordinateUtils`, `ProjectModels`, `ProjectSerializer`, `ProjectMigration`, `ProjectEntity`, `ProjectDao`, `MapXDatabase`, `ProjectRepository`, `PreferencesManager`, `AnimationScheduler`, `PresentationController`, `DisplayController`, `CompanionHost`, `RenderOrder`, `HandleLayer`, `EditorViewModel`, `MapEngine`.
**New names introduced by this specification [R]:** `AuthRepository` and `SessionManager` (accounts and lock state), `CoordinateFormatter`, `LocationProvider`, `ExchangeManager` (import/export orchestration), `PackageWriter` / `PackageReader` (`.mapx`, `.mapxlayer`, `.mapxbackup`), `SourceNormalizer` (format classification and conversion), `GeoreferenceModel`, `RemoteTransport` (WebSocket abstraction), `RemoteCommandPolicy` (the allow-list).

### 7.3 State domains and geographic truth
**Seven state domains, one owner each; they never contaminate each other.**
| Domain | Responsibility | Owner |
|---|---|---|
| Editor | Selection, active tool, active layer, undo/redo, manipulation, property editing | `EditorViewModel` / `CommandManager` |
| Project | Identity, metadata, persistence, autosave, lifecycle | `ProjectRepository` |
| Map | Map source, geographic camera, rendering state | `MapEngine` |
| Presentation | Current scene, sequence, playback, transitions, graphics, **session overrides** | `PresentationController` |
| External display | Audience display connection and clean output | `DisplayController` |
| Companion | Paired phone connection and allow-listed commands | `CompanionHost` |
| **Session (new)** | Logged-in account, lock state, auto-lock timer | `SessionManager` |

**Geographic truth [C].** Persistent geographic objects store latitude/longitude or explicit geographic geometry. Screen positions are derived from the current camera and projection. Never store pixel coordinates, offsets or Compose-position hacks; editing handles are transient and never stored. WGS84 decimal degrees as `Double`; `GeoPoint(lat, lon)` validates lat ∈ [−90, 90], lon ∈ [−180, 180]. GeoJSON/MBTiles interchange is (lon, lat), converted only at import/export boundaries and unit-tested. Distances (circle radii, image sizes) are stored in **metres** and rendered geodesically. Altitude is ignored (noted at import).

| Object | Stored geometry (all geographic) |
|---|---|
| Marker, Label, Symbol | One `GeoPoint` |
| Line, Polyline/Route, Boundary | Ordered `GeoPoint` list (route pins reference vertex indices or own points) |
| Straight arrow | Two points; arrowhead is a render-time shape sized in dp |
| Curved arrow | Start, end, one geographic control point (quadratic), sampled at render time |
| Circle | Centre + radius in metres; geodesic polygon |
| Rectangle | Centre + width/height in metres + bearing |
| Polygon, Highlighted area | Ordered ring of points |
| Freehand | Gesture converted once to points, simplified (Douglas–Peucker, ~2 dp tolerance), hard vertex cap |
| Image overlay | Centre + width in metres (height from aspect ratio) + rotation |

### 7.4 Rendering and performance of labels and large object counts [R, resolves S1-09]
1. **Map-native first.** Geometry renders as MapLibre GeoJSON sources with line, fill, circle and symbol layers, so anchoring is intrinsic. Use **one source per (layer × geometry class)**, never one per object, and update only the sources whose objects changed.
2. **Labels are map-native.** A Label Tag is drawn by the platform text engine into a bitmap (keyed by text, size, colours, language, density) held in an LRU cache and registered as a style image; each label is a feature in a symbol layer with icon anchor and offset for the pointer. **Compose draws only the selected label's editing handles** and in-progress editing UI. This removes per-frame recomposition of hundreds of overlays.
3. **Memory and counts:** label-bitmap cache budget (recommended ≤ 48 MB); user-authored labels may overlap (the author controls placement) with an optional declutter mode; when a very large number of labels is visible the renderer reduces detail progressively rather than dropping frames.
4. **Hit-testing** uses a spatial index in the domain layer so touch does not scan every object once projects exceed a few thousand objects.
5. **Imported layers** use MapLibre's native tiling of GeoJSON, with simplification/clustering for very large layers and **import caps** (recommended defaults: ≤ 100 MB per file, ≤ 250,000 features; both configurable; always a clear message).
6. **Camera events** are coalesced to one update per frame; recomposition uses stable keys; animation updates are capped (FR-ANI-04).
7. **Budgets** (measured and reported on the reference device) are in Section 13.

### 7.5 Arabic text strategy [R, resolves S1-10]
MapX has three text paths. Each has its own rule and test.

| Path | Used for | Engine | Requirement |
|---|---|---|---|
| **A. App UI** | Panels, dialogs, buttons, settings | Compose / platform text | Full Arabic shaping and bidi; RTL layout mirroring. |
| **B. MapX-authored map text** | Label Tags, marker names, symbol labels, scene graphics, PDF/PNG export text | Platform text layout (`StaticLayout`/`Canvas`, Cairo font) rendered to bitmaps | Full shaping and bidi; mixed Arabic/Latin/number text keeps reading order; amber anchor square stays on the inline-start edge; tested with 40% text expansion. |
| **C. Base-map and imported vector labels** | Place names from the bundled basemap and imported vector tiles | MapLibre engine text (its own bidi handling and Arabic presentation-form shaping) [V] | Glyph files bundled for Latin and the Arabic blocks (U+0600–06FF, U+0750–077F, U+FB50–FDFF, U+FE70–FEFF). Label text expression picks the Arabic name when the app language is Arabic, otherwise English, falling back to the default name. |

**Known limit [V]:** the MapLibre engine's Arabic support covers letter joining and direction but is not a full typographic engine (kerning, ligature quality and text along curved lines are limited). **Mandatory verification:** a reference set of Arabic labels (connected forms, lam-alef, diacritics, mixed digits and Latin) must render correctly on the reference tablet in both the bundled basemap and a vector MBTiles sample. **Fallback if Path C is unacceptable:** the bundled basemap's Arabic names are **pre-shaped at data-build time**, and imported vector sets show Arabic through the engine with an honest note. Path B text (everything the user authors) is not affected.

---

## 8. Data and storage requirements

| Rule | Requirement | Tag |
|---|---|---|
| Storage split | **Room** = structured data (accounts, library index, project documents, map-source table); **DataStore** = settings, favourites, recents; **app-private files** = media, map sources. **No large binaries in Room.** | C |
| Layout | `files/accounts/<accountId>/media/<projectId>/<mediaId>`; `files/accounts/<accountId>/mapsources/<sourceId>/`; `cache/exports/` (temporary, cleared after sharing and on start). | C/R |
| Per-account isolation | Each account has its own library and sources. Two accounts that import the same map store it twice; this is accepted for isolation. | R |
| Hashes | SHA-256 for media and map sources; duplicates detected on import; orphan cleanup is safe, tested and undo-aware. | C |
| Library row | id, name, description, createdAt, modifiedAt, objectCount, mapSourceId, thumbnail reference. | C |
| Platform backup | `android:allowBackup="false"` and data-extraction rules that exclude everything, so project data is never copied to cloud backup or device-to-device transfer by the OS. User-controlled backup is MapX's own `.mapxbackup` (Section 9). | R |
| File access | Only through the Storage Access Framework (pickers) and `FileProvider` (share sheet). **No broad storage permissions.** | R |
| Low storage | Free-space check before every import, conversion and export; clear message; no partial files. | C |
| Process death and migration | See FR-PRJ-09/10. | C |
| Export temp files | Written in `cache/exports`, shared with temporary read grants, deleted afterwards. | R |

---

## 9. Import, export and portability [C by D-04]

### 9.1 Format overview
"Lossless" means MapX re-imports it with identical data, structure and function. Every other format is **lossy by nature** and always produces a **report** (9.7).

| Format | Import | Export | Fidelity | Pri | Purpose |
|---|---|---|---|---|---|
| **`.mapx`** project package | Yes | Yes | Lossless | P1 | Backup and transfer of a whole project, with its media, layers, scenes, graphics and map-source information. |
| **`.mapxlayer`** layer package | Yes | Yes | Lossless | P1 | Copy one or more layers (with their media) between projects and devices. |
| **`.mapxbackup`** library backup | Yes | Yes | Lossless | P1 | Back up all of an account's projects and settings in one file. |
| **Map source file** (MBTiles/PMTiles as imported) | Yes (6.2) | Yes | Lossless | P1 | Move a map source to another device. |
| **Transfer Bundle** (folder: `.mapx` + `sources/`) | Yes | Yes | Lossless | P1 | Projects whose map sources are too large for one package. |
| **PNG** (current view, a scene, all scenes) | — | Yes | Image | P1 | Picture of the work. |
| **JPEG / WebP** | — | Yes | Image | P2 | Smaller pictures. |
| **PDF** (view or scenes, one per page) | — | Yes | Print/handout | P1 | Briefing handouts. |
| **KML** | Yes | Yes | Lossy | P1 | Google Earth and many GIS apps. |
| **KMZ** | Yes | Yes | Lossy | P1 | KML plus images (overlays). |
| **GeoJSON** | Yes | Yes | Lossy | P1 | Universal web/GIS exchange. |
| **GPX** | Yes | Yes | Lossy | P1 | GPS devices and outdoor apps (waypoints, routes, tracks). |
| **CSV / TSV** (points) | Yes | Yes | Lossy | P1 | Spreadsheets and AlpineQuest-style waypoint lists. |
| **Shapefile** (ZIP: shp/shx/dbf/prj) | Yes | Yes | Lossy | P2 | Desktop GIS interchange (one geometry type per file). |
| **GeoPackage (vector)** | Yes | Deferred | Lossy | P2 / D | Desktop GIS. Alternative for export: GeoJSON or Shapefile. |
| **DXF, SVG** | — | Deferred | — | D | Alternative: PDF for print, GeoJSON for data. |
| **Video (MP4) / animated GIF of a presentation** | — | Deferred | — | D | Alternative: Android's built-in screen recorder while presenting, or PNG export of all scenes. |
| **Direct device-to-device transfer over local Wi-Fi** | Yes | Yes | Lossless | P2 | "Send to nearby MapX device" reusing the pairing mechanism. Alternative today: share sheet or file picker. |

Why this set: `.mapx`/`.mapxlayer`/`.mapxbackup` are the only way to guarantee "without losing data, structure or functionality"; KML/KMZ, GeoJSON, GPX and CSV cover Google Earth, AlpineQuest, web GIS and spreadsheets; PNG/PDF cover people who do not use MapX.

### 9.2 `.mapx` project package
A **ZIP container** (media and map sources stored uncompressed because they are already compressed; ZIP64 handled where the platform allows, otherwise a Transfer Bundle is used).

| Entry | Content |
|---|---|
| `manifest.json` | `packageType`, `packageFormatVersion`, `projectFormatVersion`, MapX app version, creation time, content list with sizes and **SHA-256** for every entry, encryption header (if encrypted), and a `mapSources[]` list: id, name, format, SHA-256, size, bounds, CRS, zoom range, attribution, `embedded` yes/no. |
| `project.json` | The versioned project document (objects, layers, scenes, graphics, camera, references). |
| `media/<mediaId>` | Original media bytes (images, GIFs). |
| `mapsources/<sourceId>/…` | Present only for embedded map sources. |
| `thumbnail.png` | Preview. |

**Export options (shown with size estimates and warnings):**
1. **Project only** — map sources referenced by fingerprint, not embedded (small).
2. **Project + map sources used** — embedded (can be very large; free-space check on both devices' side is explained).
3. **Project + cropped MBTiles** (project extent and used zoom range) — P2; PMTiles cropping is Deferred.
4. **Transfer Bundle** — `<name>.mapx` plus a `sources/` folder, for sources too large for one file.
5. **Encrypt with a passphrase** (optional) — see below.

**Import behaviour:**
- Verified **before** anything is committed: manifest checksums, format version, structure, zip-slip/zip-bomb limits.
- Written to a staging area and committed atomically; cancel at any time leaves nothing behind.
- **Never overwrites an existing project.** If the project id already exists, the import creates a new independent copy with new ids and says so; if not, the original id is kept.
- **Map-source resolution:** match by SHA-256 against the account's library → link; otherwise if embedded → install it; otherwise the project opens with the **"map source missing" state** (FR-PRJ-13) showing the name, format, size and bounds so the user can import the right file and relink. Object coordinates never change.
- Media deduplicated by hash.
- **Compatibility:** a package from an older MapX is migrated; a package from a **newer** format version is refused with "Update MapX"; unknown object types are preserved or skipped safely, never crash.
- Symbols are referenced by id; an unknown symbol id shows a placeholder and a warning.

**Optional encryption [R]:** AES-256-GCM using the platform crypto provider, key derived from a user passphrase with PBKDF2-HMAC-SHA256 (≥ 600,000 iterations, random salt, parameters stored in the header), processed in chunks with per-chunk nonces and tags so large packages stream. Wrong passphrase is detected before extraction. **A lost passphrase cannot be recovered**; the dialog says so. The export passphrase is separate from the login password.

### 9.3 `.mapxlayer` layer package
Contents: `manifest.json`, `layers.json` (one or more layers with their objects, styles, ordering), `media/…`, optionally the original source file of an `IMPORTED` layer, and a `requires` block (coordinate space and, for `IMAGE_LOCAL` objects, the image source fingerprint).
- Import targets a chosen project; **all ids are regenerated**; media deduplicated; name conflicts get a numbered suffix.
- Imported as **one undoable command**.
- Layers authored on an ungeoreferenced image (`IMAGE_LOCAL`) can only be imported into a project that uses the same image source (matched by hash); otherwise import is blocked with an explanation and the suggestion to georeference the image first.
- Read-only imported layers keep their original source file so conversion to MapX objects remains possible on the other device.

### 9.4 Backup and transfer between devices
| ID | Requirement | Pri |
|---|---|---|
| FR-EXP-01 | **Backup all** creates one `.mapxbackup` of the current account's projects, favourites/recents and settings (never the password or keys), optionally with map sources, optionally encrypted. | P1 |
| FR-EXP-02 | **Restore** offers "add as new" or "replace" (replace is confirmed and shows what will change); it is atomic and verified like a package import. | P1 |
| FR-EXP-03 | Files can be saved anywhere the system file picker reaches (internal storage, SD card, USB drive, any provider app the user has installed — MapX itself never talks to a cloud) or sent through the **Android share sheet** (`FileProvider`, temporary grants). | P1 |
| FR-EXP-04 | MapX registers **open-with** handling for `.mapx`, `.mapxlayer`, `.mapxbackup`, `.kml`, `.kmz`, `.geojson`, `.gpx`, `.mbtiles`, `.pmtiles`, so tapping a received file starts the correct import flow. | P1 |
| FR-EXP-05 | A reminder appears when a project has not been backed up for a configurable period (default off). | P2 |
| FR-EXP-06 | **Round-trip guarantee:** export → import on another device yields a project whose canonical JSON equals the original (apart from regenerated ids when a copy is made), with all media and layers intact. Verified by an automated test and a two-device manual test. | P1 |

### 9.5 Geographic exchange formats: mapping and honesty
Coordinates: GeoJSON and KML use (lon, lat); GPX uses `lat`/`lon` attributes; CSV has `lat`, `lon` (decimal degrees) plus an optional human-readable column in the user's chosen coordinate format. Geometry crossing ±180° is split per RFC 7946 in GeoJSON.

| MapX object | KML/KMZ | GeoJSON | GPX | CSV |
|---|---|---|---|---|
| Marker, Label | Placemark (Point), name = text | Point + `properties` (type, text, colour) | `wpt` | one row |
| Symbol | Placemark with symbol name in description; rasterised icon in KMZ (P2) | Point + symbol id | `wpt` + symbol name | one row |
| Line, Polyline/Route, Boundary, Freehand | LineString | LineString | `trk` (or `rte` for routes) | — (skipped, reported) |
| Straight / curved arrow | LineString (curve sampled); arrowhead lost | LineString + `arrow=true` | `trk` | — |
| Circle | Polygon approximation (default 72 vertices) | Polygon + `radius_m` property | skipped, reported | — |
| Rectangle, Polygon, Highlighted area | Polygon | Polygon | skipped, reported | — |
| Route with pins | LineString + Point placemarks | LineString + Point features | `rte` with `rtept` | pins as rows |
| Image overlay | **GroundOverlay** (supports rotation), image in KMZ | not representable, reported | not representable | — |
| Animated image | First frame in KMZ, reported | — | — | — |
| Layers | `Folder` per layer | `properties.layer` (or one file per layer) | — | `layer` column |
| Style | KML styles | simplestyle-style properties (stroke, fill, opacity, width) | none | none |

Options: all layers or selected layers; **visible layers only** (default) or including hidden; imported read-only layers included or not.

**Import (GIS import)** [C]: GeoJSON (streaming `JsonReader`, RFC 7946, WGS84 assumed, other declared CRS reported), KML/KMZ, GPX (`XmlPullParser`; KMZ via `ZipInputStream`), CSV/TSV (user maps the lat/lon columns; auto-detected when names are obvious), Shapefile/GeoPackage vector (P2). **XXE disabled; zip-slip blocked; zip-bomb limits** (entry count, uncompressed size, ratio); file-size and feature-count caps with clear messages; background import with progress and cancel. Imported data becomes **read-only `IMPORTED` layers** preserving coordinates, source-file reference, attributes and structure (names, descriptions, folders); **Convert to MapX objects** is explicit and undoable. Accuracy: imported coordinates match reference points within 1 m; latitude/longitude are never swapped.

KML items that MapX ignores, with a warning in the report: NetworkLink (no network), ScreenOverlay/PhotoOverlay, 3D models and tours, time spans/animation, altitude.

### 9.6 Image and PDF export
| ID | Requirement | Pri |
|---|---|---|
| FR-IMX-01 | **PNG export** of the current view, a chosen scene, or all scenes (as a ZIP of PNGs). Size: screen size or high resolution up to a memory-safe limit (recommended ≤ 8192 px on the long side, checked against available memory with a clear message). Rendered offline through the engine's snapshot facility so results match the screen. | P1 |
| FR-IMX-02 | Options: include scene graphics or not; scale bar and north indicator; coordinate-grid overlay (P2). **Source attribution is always included when the map source's metadata requires it** and cannot be switched off. | P1 |
| FR-IMX-03 | **PDF export** using the platform PDF API: one page per scene or for the current view; page size A4/A3/Letter/custom; orientation; resolution 150/300 dpi; titles and graphics text as real text (correct Arabic shaping), map as an image; title/date metadata; **hidden layers and editor UI never appear**. | P1 |
| FR-IMX-04 | JPEG and WebP image output. | P2 |
| FR-IMX-05 | Exports run in the background with progress and cancel; never a blocking spinner. | P1 |

### 9.7 Fidelity reports
Every lossy export and every import ends with a **report**: counts exported/imported, items converted with a note on what was lost (for example "3 circles exported as 72-point polygons"), items skipped and why. Nothing is silently dropped [C: honest support].

---

## 10. Security, privacy and permissions [C by D-12, design R]

### 10.1 Login and accounts
**Goal:** require a login before the app or any project is reachable, with **no online account and no cloud**.

| ID | Requirement | Pri |
|---|---|---|
| FR-SEC-01 | A **lock/login screen** is the first screen on every cold start and after every lock. Nothing from projects (names, thumbnails, recents) is visible before login. The screen is excluded from screenshots and the recent-apps preview. | P0 |
| FR-SEC-02 | **First run:** the user creates the first account (username + password). There is no default password. The first account is the **Admin**. | P0 |
| FR-SEC-03 | **Local accounts** (Admin and Members). Each account has its own project and map-source libraries (FR-PRJ-12). The Admin can add or remove accounts and reset a Member's password. Accounts exist only on that device. | P0 |
| FR-SEC-04 | **Password storage:** PBKDF2-HMAC-SHA256 (≥ 600,000 iterations, calibrated on device), random per-account salt, additionally bound to a **non-exportable AndroidKeyStore key** (keyed hash) so a copied database cannot be attacked offline. Constant-time comparison. The password is never stored or logged in plain form. | P0 |
| FR-SEC-05 | **Brute-force protection:** after 5 failed attempts, a delay of 30 s that doubles up to 15 min; the counter survives restarts; no automatic data wipe. | P0 |
| FR-SEC-06 | **Auto-lock** after the app has been in the background or idle for a chosen time (default 5 min; options include 1, 5, 15, 30 min and Never with a warning), plus **Lock now** in the More menu. Locking ends companion sessions. **Auto-lock never fires during Presenter Mode or a live external presentation**; it applies when the presentation ends. | P0 |
| FR-SEC-07 | **Recovery:** at account creation a one-time **recovery code** is shown for the Admin. A Member's forgotten password is reset by the Admin. If the Admin password **and** the recovery code are lost, the only way back is **"Erase all MapX data on this device and start over"** (heavily confirmed). The app states this plainly during setup and recommends backups (Section 9.4). | P0 |
| FR-SEC-08 | Change password, rename account, delete account (confirmed; deletes that account's data). Minimum password length 8 with a strength indicator; no composition rules that encourage weak patterns. | P0 |
| FR-SEC-09 | **Biometric unlock** (fingerprint/face) as an optional shortcut after a password login, using the platform biometric prompt with strong biometrics only; password always remains available. | P2 |
| FR-SEC-10 | The phone in Remote mode requires its own login on the phone (FR-REM-09). | P1 |

### 10.2 Data protection at rest
| Layer | What it gives | Requirement |
|---|---|---|
| **1. Android device encryption** [C] | The device's file-based encryption protects app-private storage when the device is locked or off. | App data lives only in app-private storage (no public folders). On first run, if no device screen lock is set, MapX warns that its login cannot protect data from someone who can read the device's storage. |
| **2. App sandbox and hygiene** [R] | No other app can read MapX data. | No world-readable files; `allowBackup=false`; `FileProvider` with temporary grants only; no sensitive data in logs; no crash-report upload; cache cleared. |
| **3. Login gate** [C] | Access control inside the app. | Section 10.1. **Honest statement:** the login screen controls access through MapX; it does not by itself encrypt files. Real cryptographic protection comes from layers 1, 4 and 5. |
| **4. Encrypted exports** [R] | Packages protected with a passphrase. | Section 9.2. |
| **5. App-level encryption of project documents** [R, optional] | Project documents encrypted with a per-account data key wrapped by a key derived from the password and the Keystore. | **P2, requires owner approval (Section 17, DN-2).** Does not cover media and map-source files, which MapLibre must read as plain files; those rely on layer 1. |

Screen protection [R]: the login screen always blocks screenshots; a Settings option "Protect screen" blocks screenshots and recents thumbnails in the editor (default off so briefings can be captured). It is **never** applied to the audience display window, because a protected window turns black on mirrored or captured outputs.

### 10.3 Privacy
- No telemetry, analytics, advertising SDKs, crash-report upload or cloud services; no online account [C].
- No network use in core workflows; the app never downloads or caches provider map data without permission [C]. A debug offline guard enforces it.
- Location is used only for the Locate feature, foreground only, never stored or sent (FR-GPS-*).
- Camera is used only to scan the pairing QR code on the phone.
- Data leaves the device **only** when the user exports, shares or backs up, or presents to an external display or paired phone (read-only state).
- Destructive actions are always confirmed; failures never corrupt data [C].

### 10.4 Permissions review [resolves S1-13, S1-20]
| Permission / capability | Why | When | Notes |
|---|---|---|---|
| `INTERNET` | Required by Android for any socket, including the local Wi-Fi socket of the phone remote, and declared by the map engine library | Install-time (normal) | **No outbound internet requests** in core workflows; enforced by the offline guard. If the loopback MBTiles fallback is used, cleartext is allowed for loopback only. |
| `ACCESS_NETWORK_STATE`, `ACCESS_WIFI_STATE` | Show the pairing address and detect Wi-Fi/hotspot | Install-time (normal) | Used only on the pairing screens. |
| `ACCESS_FINE_LOCATION` and `ACCESS_COARSE_LOCATION` | Locate button | Runtime, only after the user taps Locate, with a one-line explanation | Foreground only. No background location permission. Android may give approximate location only if the user chooses it; the UI shows the resulting accuracy. |
| `CAMERA` | Scan the pairing QR code (phone) | Runtime, only on the scan screen | Declared **not required** (`uses-feature required=false`). Manual code entry is the fallback. |
| `ACCESS_LOCAL_NETWORK` (Android 17) | Remote control over the local network | Runtime, when hosting or pairing | **Only needed if the app targets API 37 or higher**; apps targeting lower levels keep implicit access with `INTERNET` [V]. Part of the Nearby Devices group. Must be handled (permission rationale, denied state with a message) when targeting 37+. |
| `USE_BIOMETRIC` | Optional biometric unlock | When enabled by the user | P2. |
| **Not requested** | `READ/WRITE_EXTERNAL_STORAGE`, `MANAGE_EXTERNAL_STORAGE`, `READ_MEDIA_*`, `POST_NOTIFICATIONS`, any `FOREGROUND_SERVICE_*`, `WAKE_LOCK` (keep-screen-on uses a window flag), Bluetooth, microphone, contacts | — | File access uses only the system pickers (`OpenDocument`, `OpenDocumentTree`, `CreateDocument`) and `FileProvider`. |

`uses-feature`: GPS/location, camera and touchscreen are declared **not required** so installation is not blocked on devices without a GNSS receiver or camera. **Reference-device note [R]:** some Wi-Fi-only tablets have no GNSS receiver; confirm the Lenovo Tab P12's hardware before planning GPS tests (Section 17).

### 10.5 Companion security and transport [C, resolves S1-12]
- **Server and transport:** the tablet runs a small **WebSocket server over TLS (wss)** on a random port; the phone is the client. The implementation sits behind a `RemoteTransport` interface so it can be replaced. Recommended implementation: **one small WebSocket library used on both ends** (Java-WebSocket, MIT-licensed, supports TLS) — chosen and version-pinned at the first implementation gate, with a documented fallback of **TLS sockets carrying line-delimited JSON** using only platform classes if the library proves unsuitable. Android has no built-in WebSocket server, so a library or custom protocol code is a **known, accepted dependency** (Section 11).
- **Certificate:** self-signed certificate whose key is generated in the **AndroidKeyStore** (non-exportable). A certificate library is added only if the platform cannot produce the certificate on the pinned API range (decision recorded).
- **Pairing:** the tablet shows a QR code with host, port, certificate **SHA-256 fingerprint** and a **one-time secret** (≥ 128 bits, single use, expires in 2 minutes). The phone scans it (CameraX preview + offline ZXing-core decoding; no ML Kit), **pins the fingerprint** with a custom trust check (no certificate authorities involved), and the tablet shows **Approve this phone** with the phone's name. A manual code entry path exists if scanning fails.
- **Session:** random 256-bit token, **expires after 8 hours**, revocable from the tablet at any time, stored hashed on the tablet; locking the tablet or logging out ends all sessions.
- **Messages:** versioned JSON; each has a nonce and a counter; replayed, out-of-window, oversized, malformed or unknown messages are rejected and logged locally (no sensitive content); commands must be on the `RemoteCommandPolicy` allow-list (FR-REM-02); **rate-limited**; executed only through `PresentationController`. The remote cannot reach `CommandManager`, because it has no editing commands.
- **Exposure:** no network discovery broadcast in v1 (the QR carries the address); the server listens only while **Remote control is switched on** by the presenter (default off) and the app is in the foreground; the server never serves files. A network that isolates clients from each other (guest Wi-Fi) blocks pairing; the app explains this and suggests a phone/tablet hotspot.
- **Bluetooth** transport is **Deferred**; the Wi-Fi/hotspot path is the alternative [C].

---

## 11. Dependencies and integrations

**Rule [C]:** avoid new dependencies; every dependency is justified in `MAPX_DECISIONS.md` (what, why, size, licence) before it is added. Versions are pinned at implementation time from official sources; none are invented here.

| Dependency | Purpose | Licence (verify at pin time) | Status |
|---|---|---|---|
| **MapLibre Native Android, ≥ 11.7.0** | Map engine, PMTiles support, snapshot rendering | BSD-2-Clause | Required [V] |
| AndroidX: Compose, Material 3, Activity, Lifecycle/ViewModel, Room, DataStore | UI, state, persistence | Apache-2.0 | Required |
| kotlinx.serialization, kotlinx.coroutines | JSON documents, async | Apache-2.0 | Required |
| **WebSocket library for `RemoteTransport`** (recommended: Java-WebSocket) | Server on tablet, client on phone | MIT | Required for Remote [R]; final choice at the first implementation gate (DN-3) |
| **CameraX + ZXing-core** | Offline QR scanning on the phone | Apache-2.0 | Required for Remote [R] (no ML Kit, no Play Services) |
| `androidx.biometric` | Optional biometric unlock | Apache-2.0 | P2 |
| Cairo font; generated glyph files | Typography and map glyphs (Latin + Arabic blocks) | SIL OFL 1.1 (keep licence file) | Required |
| Natural Earth data (or equivalent) | Bundled basemap | Public domain / stated licence | Required; attribution recorded |
| LeakCanary | Leak detection | Apache-2.0 | Debug builds only |
| JUnit, coroutines-test, Compose UI test, AndroidX test | Testing | Apache-2.0/EPL | Test only |
| *Certificate library* (e.g. BouncyCastle) | Only if AndroidKeyStore cannot create the TLS certificate on the pinned API range | MIT-style | Conditional |
| *GeoTIFF/TIFF decoding* | In-app reader for simple GeoTIFF | Own code preferred; any library needs approval | Conditional (DN-4) |

**Not used:** Google Play Services, ML Kit, SQLCipher (unless DN-2 is approved), any analytics/crash-reporting SDK, any ad SDK, NDK code written by the project.

**Integrations:** Android Storage Access Framework, `FileProvider`/share sheet, `DisplayManager`/`Presentation`/MediaRouter, platform `LocationManager`, AndroidKeyStore, platform PDF and crypto APIs.

---

## 12. UI/UX requirements, screens and navigation

This section states **requirements only**. Sizes, wireframes, region structure and the twelve layout laws are defined in **`MapX_Layout_Blueprint_v1.pdf`**, which remains the authority for screen structure as amended by 12.4.

### 12.1 Screens
| ID | Screen | Purpose | Blueprint status |
|---|---|---|---|
| S0 | **Lock / Login** | Login before anything else; first-run account creation; lockout feedback | **New** (BA-02) |
| S1 | **Home** | New Project, Open Project, Recent Projects, Settings, account/lock | Existing + BA-11 |
| S2 | **New Project** (2 steps) | Name/description; choose or import map source | Existing |
| S3 | **Editor** (four modes) | Map workspace, rail/dock, side panel/bottom sheet, context bar, top bar | Existing + BA-01, 05, 06, 07, 08 |
| S4 | **Presenter Mode** | Clean presentation on the tablet | Existing + BA-13, 14 |
| S5 | **Audience screen** | Clean output on an external display, or in-app Audience Preview | Existing + BA-04 |
| S6 | **Phone remote controller** | Presentation-only control | Existing, **changed** (BA-03) |
| S7 | **Settings** | Language, coordinate format, digits, security, storage, backup, about | **New definition** (BA-12) |
| S8 | **Georeference** | Place control points on an image and the map; see residuals | **New** (BA-09) |
| S9 | **Export / Import wizards and reports** | Single-dialog flows with progress, options, report | **New** (BA-10) |
| S10 | **Accounts** | Add/remove accounts, change password, recovery code | **New** (BA-02, BA-12) |
| S11 | **Pairing flows** | Pair a phone (QR), approve, scan (phone) | Existing + BA-17 |

### 12.2 Layout modes and structure (summary of the Blueprint)
- **Four modes from one classifier** that reads the current **window** size: smallest side ≥ 600 dp = tablet, else phone; width > height = landscape. Rotation, split-screen, resizable windows and font scale re-classify and re-compose. **Tablet landscape is the primary design target**; the phone UI is not a shrunken tablet. The app is resizable and **never locks orientation**.
- **Layout laws L1–L12 are adopted in full:** one root tree; regions are siblings not layers; exactly one owner per region; only the listed overlays (modal layer, handle layer, map controls, portrait bottom sheet, transient presenter bar); panels take space and never cover the map on tablet/phone landscape; one panel at a time; sheets cover the map only; toolbars scroll or overflow and never wrap; sizes are dp tokens from one `LayoutSpec`; direction-agnostic start/end; classify on the window with insets consumed once at the root; presenter and audience screens have no chrome. **Goal: no overlapping or stacked toolbars, ever.** Fix a collision in the parent layout, never with offsets, padding, z-index or absolute positioning.
- **Layout Debug mode (kept permanently):** shows device mode, screen size and region outlines. **Stress sizes (dp):** 1280×800, 1600×1000, 1920×1200, 800×1280, 1200×1920, 360×640, 390×844, 412×915, 844×390, 915×412 — each in English and Arabic.
- **Visual design** requirements (tokens): dark navy base `#0A1A3A`; tile surface `#5E574D` at ~80%; **interaction blue `#3B6FD6` is the only interaction accent**; **alert red `#E3201B` only for warnings, errors, destructive actions and LIVE status**; marker amber `#F6B800`; tag navy text `#14264F`; white. Square tiles, 2–4 dp radius, 2–4 dp gaps; no cyan/teal; contrast ≥ 4.5:1; Cairo font. Professional, restrained, closer to a broadcast console than a consumer map; animation communicates state and respects reduced motion.

### 12.3 Contradictions between documents, and the resolutions
| Topic | Resolution |
|---|---|
| Rail item height 44 dp (Blueprint table) vs touch targets ≥ 48 dp (law L9) | **48 dp** in both directions; 4 dp gaps; the rail scrolls. |
| Top-bar heights | 48 (tablet landscape), 48 (tablet portrait), 40 (phone landscape), 56 (phone portrait), as in the Blueprint. |
| Scenes item on phone landscape rail vs inside More on phone portrait | Intentional. The More popup lists **only items not shown** in the current bar. |
| Phone sheet heights vs tablet sheet heights | As in the Blueprint (tablet peek 80 / half 40% / full; phone peek 72 / half 50% / full). |
| Remote controller content | Per this spec (FR-REM-*), not the earlier Blueprint figure. |
| Source of truth for behaviour | This specification. |

### 12.4 Required amendments to the Layout Blueprint (for the UI/UX owner)
| ID | Amendment |
|---|---|
| BA-01 | Rail items 48 dp high (replace the 44 dp case in the size table and notes). |
| BA-02 | Add **S0 Lock/Login** (centred card on tablets, full-width on phones, no rail/dock/panels/context bar; excluded from screenshots) and account dialogs (first-run create, change password, recovery code, erase-all confirmation). |
| BA-03 | Replace Figure 14 content: remove Undo, Redo and Tool; add **Start/Exit presentation**, **Reset view**; label the layer toggles "show/hide for this presentation"; keep disabled-not-hidden rule; keep single scrolling column and landscape two-column variant. |
| BA-04 | In Figure 13 and its notes replace "comments" with "editor-only UI state". |
| BA-05 | Top bar **More** menu gains a Project group: Export…, Import…, Backup…, Project properties, Lock now. The coordinate/zoom/scale readout is **tappable** and opens the coordinate-format switcher popup (DD, DDM, DMS, UTM, MGRS). On phones these entries live in More (readout in the map corner). |
| BA-06 | Map controls: define the **Locate** control states (idle, searching, located, follow, denied/off) and its position in the control stack (compass, zoom in/out, locate); controls still ride above sheet edges. |
| BA-07 | Layers panel: the fixed 48 dp footer stays "+ New layer / Delete layer"; add per-row overflow (Rename, Export layer, Duplicate) and a header overflow "Import layer…". |
| BA-08 | Maps panel: keep tabs "Map Sources \| GIS Import"; add the **import format chooser** with the plain-language hints (6.4), conversion progress rows, and details actions (Rename, Delete, Export source, Georeference). |
| BA-09 | Add the **Georeference screen**: two synchronised views (image / map) and a control-point table with residuals and RMSE, accept/adjust/reject. Must follow the one-owner-per-region laws. |
| BA-10 | Add **Export wizard**, **Import preview/report**, **passphrase**, **Relink map source** as single ModalLayer dialogs (one at a time, steps inside one dialog), with in-dialog progress and a result report; snackbars "Export finished [Share]". |
| BA-11 | Home: account chip with **Lock**; "Open Project" overflow adds "Import project package…". |
| BA-12 | Define **Settings** sections per FR-SET-02 (phone: single column; tablet: list + detail). |
| BA-13 | Presenter/scene settings: **Show my location** toggle (default off). |
| BA-14 | Scenes panel / Present controls: **Remote control** on/off with the pairing QR dialog entry point. |
| BA-15 | Add the Arabic/RTL rules for new screens (S0, S7, S8, S9) and verify with the existing RTL checklist. |
| BA-16 | Add context-bar situations: Georeference (Add point, Delete point, Accept), GPS follow (Stop following). |
| BA-17 | Pairing dialogs: "Approve this phone" shows the device name; add the manual-code entry variant and the "network blocks pairing" help message. |

### 12.5 Navigation structure
```
Cold start / lock
 └─ S0 Lock/Login (first run: create Admin account)
     └─ S1 Home
         ├─ New Project → S2 (name → map source) → S3 Editor
         ├─ Open Project / Recent → S3 Editor
         ├─ Import project package → S9 import preview → S3 / library
         ├─ Settings → S7 (→ S10 Accounts, Backup/Restore)
         └─ Lock → S0
S3 Editor
 ├─ Rail/Dock tools → Select, Pan, Label, Marker, Draw (popup), Image
 ├─ Rail/Dock panels (one at a time) → Symbols, Layers, Scenes, Maps (Map Sources | GIS Import), Properties, Scene graphics
 ├─ Top bar → Back (autosave then Home), Undo, Redo, Present, More (Project: Export/Import/Backup/Properties/Lock), Settings
 ├─ Map controls → Compass, Zoom, Locate
 ├─ Maps panel → Georeference → S8 → back to S3
 ├─ Export / Import wizards → S9 (ModalLayer)
 └─ Present → S4 Presenter Mode (+ S5 audience on external display, + phone remote)
Phone Remote: Lock → Home (phone) → Remote → Scan QR / manual code → S6 Controller
```
**Back behaviour:** Back dismisses a dialog/popup first, then closes the panel or sheet, then cancels the active tool or clears selection, then leaves the editor (after autosave). In Presenter Mode Back asks for confirmation. Home → Back leaves the app; resuming after leaving shows S0 if the auto-lock time has passed.

---

## 13. Offline functionality and performance requirements

### 13.1 Offline [C]
Everything in the core workflow works in airplane mode: login, projects, maps (bundled basemap and imported sources), drawing, layers, images, symbols, scenes, presenting, exports, imports, backups, georeferencing, GPS location (satellite only), and the phone remote over a local hotspot. Online-only items: none. A debug offline guard must report **zero outbound requests** during the full sample briefing and a full export/import round trip.

### 13.2 Performance budgets (measured and reported on the reference device)
| Area | Budget |
|---|---|
| Cold start to the login screen | < 3 s |
| Login (after password entry) | < 1 s (password hashing calibrated to ~0.3–0.5 s) |
| Pan/zoom with 1,000 objects visible | ~60 fps, including **300 map-native labels** |
| Open a project with 5,000 objects | < 3 s |
| First map tile after opening a project | ~2 s |
| Autosave | Never blocks the UI |
| Presenter Mode | Stable for 60 minutes; external display stable for 30 minutes |
| PNG export, 4096 px view | ≤ 10 s; memory stays within budget |
| PDF export, 10 scenes at 150 dpi | ≤ 60 s, cancellable |
| `.mapx` export/import of a 500 MB package | Streams; peak heap does not grow with file size |
| Remote command to visible effect | < 300 ms on local Wi-Fi |
| Label-bitmap cache | ≤ 48 MB; decoded-image cache ≤ 128 MB |
| Animation | ≤ 6 concurrent animated objects by default |
| Memory/lifecycle | No leaks (LeakCanary in debug); no StrictMode violations; process-death restore works |

### 13.3 Polish
Consistent spacing, hierarchy and touch targets; loading, error and empty states everywhere ("No layers yet — New layer", "No map sources — Import map source"); never a white screen; errors are understandable and never silently damage projects.

---

## 14. Compatibility requirements

| Area | Requirement |
|---|---|
| Android versions | **Android 9 (API 28) and newer** [C]. Reference device: Lenovo Tab P12, Android 15. |
| Target SDK | Current stable; the choice decides whether `ACCESS_LOCAL_NETWORK` is mandatory (10.4). Android 15+ edge-to-edge is handled by consuming insets once at the root. |
| Devices | Tablets (primary), phones (compact modes and Remote), foldables/resizable windows through window-size classification. Hardware that lacks GNSS or a camera can still install and run. |
| CPU architectures | Those shipped by the pinned MapLibre artefact (arm64-v8a required; others as available). **To verify at pin time:** the native libraries must be compatible with devices that use 16 KB memory pages (relevant to Android 15+ hardware). |
| Languages | English LTR and Arabic RTL; pseudo-locale checks en-XA and ar-XB; 40% text expansion; mixed bidi text. |
| Display | Font scale to 200%, maximum display size, display cutouts, split-screen across the 600 dp boundary, the ten stress sizes. |
| Files | Import/export via system pickers on internal storage, SD card, USB; map files of several GB are handled by streaming. |
| Interoperability | Google Earth (KML/KMZ), AlpineQuest (formats in 6.4), QGIS/MOBAC (MBTiles/PMTiles/GeoTIFF), GPS devices (GPX), spreadsheets (CSV). |
| Packaging | Private APK/AAB with a signing key kept and backed up by the owner (a lost key prevents updates over an installed copy). |

---

## 15. Feature priorities

| Priority | Content |
|---|---|
| **P0 — core** | Login/accounts; projects, autosave, library, last-known-good; layout system and Layout Debug; map view and bundled basemap; map sources (MBTiles, PMTiles, ordinary images `IMAGE_LOCAL`); coordinate formats and metric units; objects, commands, selection, HandleLayer; all 11 drawing tools; layers; static images; English/Arabic localization; offline guard. |
| **P1 — finished product** | GPS location; scenes; Presenter Mode and broadcast graphics; symbols; animated images; GIS import (GeoJSON, KML/KMZ, GPX, CSV) and conversion; **export/import**: `.mapx`, `.mapxlayer`, `.mapxbackup`, map-source export, Transfer Bundle, KML/KMZ/GeoJSON/GPX/CSV export, PNG, PDF; world-file and GroundOverlay images; manual georeferencing; external display; phone remote; share/open-with; accessibility basics. |
| **P2 — finished product, after P0/P1** | Shapefile and GeoPackage vector; GeoTIFF (simple, Partial); GeoPackage/SQLiteDB/XYZ conversions and calibrated-image `.map`; stacked map sources; tile-pyramid generation for large georeferenced images; cropped MBTiles export; JPEG/WebP; coordinate-grid overlay; biometric unlock; Arabic-Indic digits option; TalkBack list view; layer copy between projects; direct nearby device-to-device transfer; backup reminders; optional app-level project encryption (DN-2). |
| **Deferred (documented, with alternatives)** | AlpineQuest `.AQM/.PGD`; Mapsforge; OZF2/OZF3 and QCT; DEM/terrain; polar UPS coordinates; Bluetooth remote; DXF and SVG export; GeoPackage export; video/GIF export; PMTiles cropping; Google imagery tiles; background location and track recording; turn-by-turn navigation (out of scope). |

---

## 16. Acceptance criteria

A requirement is **met only when it was built and tested**; anything not testable on the available hardware is reported as **Not tested**, never as passing [C]. Severity: **BLOCKER** = crash, project cannot open, data loss, objects drifting, save/reload or undo/redo corrupting state, unusable or overlapping UI, imported maps not displaying, false format support, **login bypass, plaintext password storage, presenting or remote control changing project data, an export/import that loses data**. **MAJOR** = fix unless documented. **MINOR** = document and schedule.

### 16.1 Criteria by area
| ID | Criterion |
|---|---|
| AC-GEO-1 | Every geographic object type stays at the same real-world location after pan, zoom out/in, pan+zoom, rotation, move, save/reload; antimeridian behaviour works or is documented; imported coordinates match reference points within 1 m. |
| AC-CRD-1 | DD, DDM, DMS, UTM and MGRS round-trip against published reference vectors (including zone exceptions and 80°S/84°N limits); switching format updates every coordinate display; invalid input gives a clear message. |
| AC-GPS-1 | Tapping Locate asks permission once with a rationale; shows dot and accuracy; works in airplane mode with GNSS; denied/off/no-hardware states are clear; location is never stored or shown on the audience screen by default. *(Needs a GNSS-capable device.)* |
| AC-PRJ-1 | Create, open, rename, duplicate (independent, all ids new), delete (confirmed); autosave; kill-process restore; corrupt fixture offers last-known-good; old-version fixtures migrate. |
| AC-DRW-1 | Each of the 11 tools works; one gesture = one undo step; handles edit; style persists; save/reload keeps shape. |
| AC-LYR-1 | Visibility, lock, opacity, order, move between layers; hidden layers not hit-testable; deleting a populated layer asks and is undoable. |
| AC-IMG-1 | Transparent PNG, 12 MP photo, many images, missing media placeholder; GIF/animated WebP controls, off-screen stop, cap respected, reduced motion honoured. |
| AC-SRC-1 | Each format is classified Supported/Partial/Deferred **with a real sample imported**; progress and cancel leave no partial files; invalid, duplicate, low-storage and in-use deletion cases handled; ordinary images get no invented coordinates. MBTiles and PMTiles each display offline from a real sample on the pinned MapLibre version. |
| AC-SRC-2 | Manual georeferencing with ≥ 4 points reports residuals and RMSE; converting `IMAGE_LOCAL` objects is explicit and undoable. |
| AC-PRS-1 | Scene restore is exact; no editor UI in Presenter Mode; accidental exit prevented; screen stays awake; exit restores editor state; **the saved project document is byte-identical before and after a presentation**; all graphics and transitions work in English and Arabic; preview matches audience output. |
| AC-DSP-1 | External display shows only clean output; hidden layers never leak; cable pull and reconnect handled; 30-minute run stable; mirroring-only is reported honestly. |
| AC-REM-1 | Pairing requires approval on the tablet; allow-listed commands work; **every forbidden command (undo, redo, tool select, any edit) is rejected**; project document is unchanged after a remote session; replayed message rejected; expired token rejected; second phone needs takeover; controls disabled (not hidden) when disconnected. |
| AC-SEC-1 | No screen is reachable without login after cold start, process death or lock; first-run creates the Admin; wrong-password delays escalate and persist across restarts; passwords are not stored in plain form (verified by inspecting the stored data); auto-lock works but never interrupts a presentation; Admin reset and erase-all flows work; login screen is excluded from screenshots. |
| AC-EXP-1 | `.mapx` export → import on a second device reproduces the project (objects, layers, scenes, graphics, media, camera) with equal canonical JSON apart from regenerated ids; a package with a tampered file fails verification before anything is committed; missing map source opens in the "missing source" state and relinks by hash. |
| AC-EXP-2 | `.mapxlayer` import into another project is one undoable command; ids regenerated; `IMAGE_LOCAL` layers blocked on a different image with a clear message. |
| AC-EXP-3 | KML, KMZ, GeoJSON, GPX and CSV exports open correctly in Google Earth / a GIS tool / a spreadsheet; the report lists every lossy conversion; re-importing the export yields coordinates within 1 m. |
| AC-EXP-4 | PNG and PDF exports match the on-screen view, contain no hidden layers or editor UI, show required attribution, and shape Arabic text correctly. |
| AC-EXP-5 | An encrypted package cannot be opened with a wrong passphrase and opens with the right one; backup → restore (add and replace) works. |
| AC-I18N-1 | Every screen is correct in English and Arabic at all stress sizes; no hard-coded user-visible strings (a lint check fails on them); mixed bidi text and numbers keep reading order; Arabic Label Tags join and order correctly; the reference Arabic label set renders correctly on the basemap and a vector sample (Section 7.5) or the documented fallback is applied. |
| AC-UI-1 | The `regionsNeverOverlap` Compose test passes for every mode in both languages; exactly one of rail/dock exists; at most one panel or sheet; panels, popups, dialogs and snackbars appear in their regions only; font scale 200% produces no second toolbar row. |
| AC-OFF-1 | Offline guard reports zero outbound requests across the sample briefing and an export/import round trip. |
| AC-PERF-1 | All budgets in 13.2 are measured on the reference device and reported. |
| AC-HON-1 | Every unsupported or lossy case produces a visible message or report; nothing is silently dropped or faked. |

### 16.2 Required automated tests
- **Pure JVM:** `GeoPoint` validation; coordinate conversions (all five formats, reference vectors); geodesic circles; Douglas–Peucker and vertex cap; command apply/revert, history limit, gesture coalescing; serialization round-trip for every object type; layer and scene commands; scale-bar computation at several latitudes; scheduler timing with a fake clock; symbol search including Arabic; magic-byte detection; MBTiles/PMTiles metadata parsing; hash and duplicate logic; GeoJSON/KML/GPX/CSV parsing (valid and malformed); zip-slip, zip-bomb and XXE fixtures; coordinate-order conversion; affine georeferencing and RMSE; package manifest checksum and tamper detection; encryption/decryption round trip and wrong-passphrase detection; password-hash verification and lockout timing; **`RemoteCommandPolicy` rejecting every non-allow-listed command**; companion protocol (parsing, nonce replay, token expiry, rate limit, session state machine); `DisplayController` with a fake `DisplayManager`.
- **Architecture tests:** no persistent model contains screen-space fields (x, y, px, screen); the domain has no Android UI or MapLibre imports; every registered type has serializer, renderer and editor.
- **Room tests (in-memory):** CRUD, duplicate independence, delete, corrupt document handling, last-known-good restore, migration fixtures for every released version, account isolation.
- **Compose UI tests:** region presence and non-overlap in four modes × two languages; panel exclusivity; RTL mirroring; login gate.
- **Instrumented/device:** projection round-trip; anchoring under camera movement; process-death restore; real gestures; package round trip on a device.

### 16.3 Manual verification (summary; to be run by a person on a real device)
Build and stability (clean build, fresh install, restarts ×5, force-close, process death, Lint clean); layout (four modes, rotation, split-screen, font 200%, both languages, all stress sizes); projects; anchoring for every object type; map sources (each format with a real sample, cancel, invalid, duplicate, low storage, airplane mode); drawing; selection/undo/redo; layers; media; symbols (all 15 categories, search in both languages, 30 symbols at world→street zoom); scenes and presentation; GIS import/export; **login, lock, recovery, auto-lock vs presentation**; **GPS**; **two-device transfer**; external display and phone remote (real hardware, otherwise marked **Not tested**); moderate stress (~20 markers, 10 labels, 10 lines, 5 polygons, 5 circles, several routes) with no loss or drift; the end-to-end journalist workflow, then repeated offline.

### 16.4 Definition of a finished MapX [C, extended]
- The map is always visually dominant and geographic objects stay correct while it moves.
- Offline projects open reliably; large map sources do not needlessly consume memory; maps from many sources can be used.
- Drawing feels precise with touch and stylus; layers keep complex projects manageable.
- Images, symbols and animation enrich the explanation; scenes make repeatable briefings easy.
- Presenter Mode looks professional and uncluttered; the external display separates authoring from audience; the phone remote controls without editing.
- Work can be exported, backed up and moved to another device without loss.
- Only logged-in users reach the app and its projects.
- Arabic and English both feel native; tablet landscape is the main professional workstation; phone layouts are usable.
- Errors are understandable and never silently damage projects.

**Product summary:** MapX is a geographic storytelling and briefing workstation. Its fundamental unit is not a slide and not a drawing; it is a geographically meaningful visual state. Its differentiator is the combination of real geographic anchoring, offline map sources from many providers, direct visual annotation, presentation scenes, professional live presentation control, and portable, protected project data.

---

## 17. Open decisions, limitations and missing dependencies

### 17.1 Decisions that still need the owner's approval
Everything below has a recommended default that the specification already assumes. Reply "approved" or give a change.

| ID | Decision | Recommendation | Why it matters |
|---|---|---|---|
| DN-1 | **Account model:** several local accounts (Admin + Members, separate libraries) or one local password for the whole device. | Several local accounts, as written. | You asked for "user accounts"; separate libraries keep team members' work apart. A single password is simpler but shares everything. |
| DN-2 | **App-level encryption of project documents** (layer 5 of 10.2). | **Not in the first release** (P2). Rely on device encryption + login gate + encrypted exports. | Stronger protection, but if the password and recovery code are both lost, the data is unrecoverable; media and map files cannot be covered anyway. |
| DN-3 | **WebSocket library** for the phone remote (Java-WebSocket, Ktor, or TLS sockets with JSON lines). | Java-WebSocket on both ends; fallback to TLS sockets. | Android has no built-in WebSocket server; this is the one unavoidable extra dependency of the remote. |
| DN-4 | **GeoTIFF scope.** | Partial (simple files, P2) with a clear refusal message and the QGIS/MOBAC conversion route for the rest. | Full GeoTIFF support is not realistic without a native GIS library. |
| DN-5 | **Very large map sources in packages.** | Use the Transfer Bundle (package + separate source files) when embedded sources exceed ~2 GB. | Avoids single-file size limits and long zip operations. |
| DN-6 | **Remote capabilities:** the phone may start/exit the presentation and pan/zoom/toggle layers as **unsaved session overrides**. | Yes, as written (FR-REM-02/04). | This is the practical meaning of "presentation remote only". Tell me if the phone should only move between scenes. |
| DN-7 | **`IMAGE_LOCAL` design** (ordinary images never receive invented coordinates; objects on them use image space until georeferenced). | Approve. | The original documents required your approval before building it. |
| DN-8 | **Per-account duplicate storage** of the same map source. | Accept. | Isolation costs disk space when two accounts import the same large file. |
| DN-9 | **GPS hardware:** confirm whether the Lenovo Tab P12 has a GNSS receiver; if not, which device will be used to test GPS. | Confirm before GPS testing. | Some Wi-Fi-only tablets have no GPS chip. |
| DN-10 | **Direct nearby device-to-device transfer** (P2). | Keep as P2; file/share-sheet transfer is P1. | Extra scope on top of the remote's transport. |

### 17.2 Remaining limitations (honest list)
1. **Nothing in this specification has been built or run.** `[V]` means "verified against documentation on 4 November 2026", not "tested in MapX".
2. **MBTiles** direct reading by the pinned MapLibre version is **unconfirmed** (no official page found); the loopback fallback exists. PMTiles is documented support.
3. **Arabic labels on base maps and imported vector tiles** rely on the engine's basic shaping; quality must be verified on the device; the documented fallback applies if it fails. Text authored in MapX is not affected.
4. **Formats that cannot be supported reliably** (AlpineQuest `.AQM/.PGD`, Mapsforge, OZF/QCT, arbitrary GeoTIFF, DEM) are Deferred or Partial with the stated alternatives. **Google Earth/Google imagery tiles** cannot be exported for offline use.
5. **Other apps' private storage is unreachable** on Android; maps from AlpineQuest and similar apps must be copied to a visible folder first.
6. **Large maps need free space equal to the file** (the app cannot read them in place through the file picker).
7. **The login screen controls access through MapX; it is not encryption by itself.** Without device encryption and a device screen lock, someone with file access could read the data. A lost Admin password plus recovery code means starting over.
8. **Remote on some networks:** guest Wi-Fi that isolates clients blocks pairing (use a hotspot). Targeting Android 17 adds a runtime permission. Bluetooth remote is Deferred.
9. **External display and phone remote** need real hardware to be proven; otherwise those tests stay **Not tested** (emulator "secondary display" and a second emulator can cover part).
10. **GPS** may be untestable on a Wi-Fi-only tablet (DN-9). No tracking, no navigation by design.
11. **Lossy formats** (KML, GeoJSON, GPX, CSV, Shapefile) cannot carry every MapX feature; each export reports what changed. Only the `.mapx`, `.mapxlayer` and `.mapxbackup` formats are lossless.
12. **Polar coordinates (UPS)** are Deferred; UTM/MGRS cover 80°S–84°N.
13. PMTiles sources are read in place and have no offline pack/cache feature in MapLibre (not needed for local files).
14. Native libraries must be checked for **16 KB page-size compatibility** at pin time.

### 17.3 Missing files referenced in Master Plan v2 (not assumed to exist)
| File | Referenced for | Needed? | Handling |
|---|---|---|---|
| `MapX_Prompt_Pack.md` | Builder prompts per sub-build (Master Plan v2, Section 0 item 7) | **No** for this specification. Yes for the Roadmap account if it still wants those prompts. | Treated as **missing and non-blocking**; prompts belong to the Roadmap, not to product requirements. |
| `MapX_Manual_Test_Checklist.pdf` ("old checklist") | Manual test procedures | **No**: Section 16 contains the acceptance criteria and manual verification scope; Master Plan v2 already ranks the old checklist lowest. | **Missing and non-blocking.** The Roadmap/test account may rebuild it from Section 16. |
| UI/UX Guide, Development Roadmap | Produced by other accounts | Required before building starts, not before this specification is approved. | Out of scope here (D-13). |

### 17.4 Updates the other documents need so everything agrees
This specification **supersedes the product definitions** in the three source files. I did not edit those files; apply these changes (or ask for revised versions):

| Document | Required changes |
|---|---|
| **Layout Blueprint v1 → v1.1** | Apply BA-01 to BA-17 (Section 12.4). |
| **Master Plan v2 → v3** | Replace the product digest (5.x) and decisions (Section 6) with references to this specification; set minSdk 28 and remove the API-28 degradation steps; add a login/accounts sub-build and an export/import sub-build; update Phase 8 for the reduced remote allow-list, the WebSocket library, `ACCESS_LOCAL_NETWORK` and the loopback MBTiles fallback; add GPS, georeferencing and format-matrix work to the relevant phases; remove references to `MapX_Prompt_Pack.md` and the old checklist or mark them optional. |
| **`MapX_Complete_Spec.md`** | Mark as **superseded** by this document; changes since: minSdk 28; comments removed; remote allow-list; accounts/login; GPS; export/import/backup; broader formats and georeferencing promoted; coordinate formats; dependency list; permissions. |

---

## 18. Engineering rules, project documents and evidence

### 18.1 Non-negotiable engineering rules (the original 13, updated)
1. **Geographic truth** — store latitude/longitude or explicit geographic geometry; never pixels or offsets; handles are transient.
2. **Commands** — every edit is a command; one gesture = one undo step; UI never mutates project state directly.
3. **Layout contract** — four modes, one classifier, one owner per region, no overlap fixes with offsets/z-index/padding, touch targets ≥ 48 dp.
4. **Storage split** — Room for structured data, DataStore for settings, app files for media and map sources; no large binaries in Room.
5. **Honest support** — unsupported formats are reported, never faked; ordinary images never receive invented coordinates; CRS is explicit.
6. **Localization** — no hard-coded user-visible strings; Arabic RTL and English LTR; direction-aware icons.
7. **Dependencies** — avoid new ones; justify each (what, why, size, licence) in `MAPX_DECISIONS.md`.
8. **Tests** — automated tests for all new logic; never delete or weaken a test to make it pass.
9. **Data safety** — failures never corrupt or lose a project; malformed input is rejected safely; destructive actions are confirmed.
10. **Performance hygiene** — no main-thread I/O; bounded event accumulation; stream large files; avoid needless recomposition.
11. **Privacy and licensing** — no telemetry; no network use in core workflows (the `INTERNET` permission exists only for local sockets and the engine, guarded by the offline guard); no downloading or caching provider map data without permission.
12. **Evidence** — never claim something works unless it was built and tested; state exactly what could not be tested.
13. **Preserve and extend** — smallest safe change; fix root causes.
14. **Presentation and remote never change project data** *(new)*.
15. **Security basics** *(new)* — no plaintext passwords or secrets in storage or logs; every incoming remote message is validated against the allow-list; no cleartext network traffic except loopback.

### 18.2 Project documents the builder must create and keep accurate
`ARCHITECTURE.md` (product definition, platform, device modes, layout contract, these rules verbatim, package structure, dependency rule, seven state domains, map abstraction, presentation/display/companion architecture, **Format Support Matrix with evidence**, rules for modifying systems) · `MAPX_DECISIONS.md` (decision log: ID, date, decision, reason, alternatives, consequences; every dependency justified; seeded with this specification's decisions D-01…D-15 and the resolutions in 3.2) · `MAPX_HANDOFF.md` (what MapX is, what is built, known failures, what must NOT change, recovery procedure) · `MAPX_STATUS.md` (each feature Verified / Partial / Not built, ticked only after real verification) · `SYMBOLS_LICENSE.md` (every symbol, author, licence) · **`SECURITY.md`** *(new)* (account and password design, lock behaviour, pairing protocol, permission table).

### 18.3 Final report format (when the builder finishes)
Implemented (by feature area) · Files · Build (real result of a clean build) · Automated tests (passed/failed/skipped, new test names) · Manual tests (what, on which device/emulator, which screen size) · **Not tested** (and why) · Scope deviations · Geographic integrity (how anchoring was verified for every object type) · Regression · Known issues and deferred items · Verdict (COMPLETE or INCOMPLETE with justification).

---

## 19. Consistency verification

Checks performed on this document before delivery:

| Check | Result |
|---|---|
| Every Stage 2 owner decision (D-01…D-15) appears in the requirements | Yes — GPS (5.3), no navigation (1.5, FR-GPS-09), export (9), comments removed (5.13, 12.4), remote (5.14), API 28 (7.1, FR-ANI-01, 14), metric and coordinates (5.4), digits (FR-CRD-09), maps and formats (6), login/security (10), requirements-level scope (0.2). |
| Every Stage 1 finding S1-01…S1-22 has a resolution and a location | Yes (Section 3.2). |
| Remote allow-list is identical everywhere | Yes — FR-REM-02/03, 10.5, AC-REM-1, 12.4 BA-03, 16.2 test list. Undo, redo and tool select appear only as *forbidden*. |
| "Comments"/"notes" removed | Yes — appears only in the decision D-05 and in the amendment that deletes the word. |
| minSdk is 28 everywhere; no API-26 or "below API 28" behaviour remains | Yes (7.1, FR-ANI-01, 14). |
| Every feature that needs a permission lists it, and no unused permission is declared | Yes — location→GPS, camera→QR, local network/INTERNET→remote and engine, biometric→P2 (10.4). |
| Format lists agree between 6.3, 6.4, 9.1 and 15 | Yes; Deferred items match in all four. |
| Priorities in requirement tables agree with Section 15 | Yes. |
| Every new screen or flow has a Blueprint amendment | Yes — S0, S7–S11 map to BA-02, 05, 08–12, 14, 17. |
| Original Complete Spec content carried over (sections 1–23) | Yes: identity and journey (1), engineering rules (18.1), technology (7.1), state (7.3), geometry (7.3), objects/commands (5.5), layout (12.2), visual design (12.2), projects (5.1), map and sources (5.2, 6), drawing (5.6), layers (5.7), images/animation/symbols (5.8–5.10), scenes/presenter/graphics (5.11–5.12), GIS import (9.5), external display (5.13), companion (5.14, 10.5), accessibility/performance/quality (5.16, 13), advanced GIS extensions (6.3, 6.5), tests (16), documents (18.2), final report (18.3), definition of finished (16.4). |
| Original Blueprint content carried over | Yes: laws L1–L12, modes and sizes, regions, panels, context bar, modal rules, presenter zones, external display, remote layout, RTL rules, overlap test, checklist LC-1…LC-11 (retained in the Blueprint; criteria in AC-UI-1). |
| Changes to existing features | Only those the owner approved or that resolve a contradiction: minSdk 28, remote reduced to presentation commands, comments removed. No other feature was removed or simplified. |
| Items marked unverified | Listed in 17.2; nothing here claims a feature works. |

*End of MapX Master Project Specification.*
