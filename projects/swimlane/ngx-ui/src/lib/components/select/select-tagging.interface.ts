/**
 * Optional per-tag validator for free tagging.
 * Receives the domain tag value (free tags are strings) and the current selection.
 * Return an error message to reject the tag, or null to accept.
 */
export type SelectTaggingValidator<T = unknown> = (value: T, selected: readonly T[]) => string | null;
