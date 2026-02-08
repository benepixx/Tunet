# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [1.0.0-beta.4] — 2026-02-08

### Added
- **Header Editor Redesign**: Side-drawer modal with live dashboard preview (matches Layout tab pattern)
- **Font Customization**: Font weight (Thin/Light/Normal/Medium/Bold) selector
- **Letter Spacing Control**: Four-level letter spacing selector (Tight/Normal/Wide/Extra Wide)
- **Font Style Options**: Normal/Italic/UPPERCASE toggle controls
- **Clock Format Control**: 24-hour vs 12-hour (AM/PM) format selector
- **Clock & Date Size Sliders**: Independent size controls (0.5x–2.0x) for clock and date elements
- **Accordion Sections**: Header editor organized into Typography, Style, Clock, and Visibility sections
- **Reset Buttons**: Individual reset buttons for each modified setting

### Changed
- **Header Layout**: Restructured from absolute positioning to flex layout
  - Heading and clock now aligned at same Y coordinate (top)
  - Date positioned below heading, shares same left X coordinate
  - Improved responsive alignment and visual consistency
- **Font Selector**: Replaced ModernDropdown with compact 2-column grid (fits narrow drawer)
- **Drawer Background**: Use solid `--modal-bg` instead of `--card-bg` gradient (card transparency no longer affects drawer)
- **Header Editor**: Full-height side-drawer that slides from right edge

### Fixed
- **Card Transparency Independence**: Header editor drawer no longer affected by card transparency setting
- **i18n Synchronization**: Added missing keys to Norwegian translation file (nn.json)
- **M3Slider Touch**: Refined touch handling for better responsiveness

## [1.0.0-beta.3] — 2026-02-07

### Added
- ESLint v9 flat config (`eslint.config.js`)
- GitHub Actions CI pipeline (`.github/workflows/build.yml`)
- Internationalization (i18n) for all UI strings (English + Nynorsk)
- `.prettierrc` and `.editorconfig` for consistent formatting
- `CONTRIBUTING.md` with contribution guidelines
- `SETUP.md` with detailed project setup instructions
- Basic smoke tests with Vitest
- GitHub issue and PR templates

### Changed
- Renamed Docker container from `hassen-dashboard` to `tunet-dashboard`
- Removed deprecated `version` key from `docker-compose.yml`
- Translated all code comments from Norwegian to English
- Rewrote `SETUP.md` — removed personal paths, updated project structure
- Replaced personal device names in Android TV card with generic detection
- Extracted reusable components (`MissingEntityCard`, `ModalSuspense`, `CarCard`, `VacuumCard`, `LightCard`, `MediaCards`, `PersonStatus`)
- Extracted hooks (`useModals`, `useSmartTheme`, `useTempHistory`)
- Extracted utilities (`cardUtils`, `gridLayout`, `cardActions`, `nordpoolUtils`)
- Extracted `AddCardContent` modal and `dashboard.css`
- Moved constants to `src/constants.js`
- App.jsx reduced from ~3,555 to ~1,920 lines (−46%)

### Fixed
- Duplicate `FaWater` key in icon map
- Self-assignment no-ops in Android TV components
- Missing `resolveCarSettings` function after extraction
- React key warnings in list renderers

## [1.0.0-beta.2] — 2026-01-15

### Added
- Android TV linked media players support (Emby/Jellyfin integration)
- Edit card modal UI cleanup

## [1.0.0-beta.1] — 2026-01-10

### Added
- Initial public release
- React 18 + Vite dashboard for Home Assistant
- Real-time WebSocket entity updates via `window.HAWS`
- Glassmorphism theme system with 10+ themes
- Drag-and-drop card reordering
- Multi-page layout with custom pages
- Climate, light, media, calendar, weather, energy, and sensor cards
- Nordpool electricity price integration
- Car/EV dashboard card
- Status pills with conditional visibility
- Onboarding wizard for first-time setup
- Docker support with multi-stage build
