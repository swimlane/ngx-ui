# CHANGELOG

## HEAD (unreleased)

- Feature (`swim-select`): Filter field now shows a default `search` icon (overridable via `filter-icon`, empty string hides it) and a clear button when the query is non-empty.
- Feature (`swim-select`): Custom empty-state markup via `slot="empty"` (overrides `empty-placeholder` / `filter-empty-placeholder`; skipped while `loading`).
