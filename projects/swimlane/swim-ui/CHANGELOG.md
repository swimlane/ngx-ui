# CHANGELOG

## HEAD (unreleased)

- Feature (`swim-icon`): Added optional `src` to show an image in the icon box. If the image fails to load, `font-icon` or the slot is shown.

## 1.0.0 (2026-11-05)

- Feature (`swim-select`): Filter field now shows a default `search` icon (overridable via `filter-icon`, empty string hides it) and a clear button when the query is non-empty.
- Feature (`swim-select`): Custom empty-state markup via `slot="empty"` (overrides `empty-placeholder` / `filter-empty-placeholder`; skipped while `loading`).
