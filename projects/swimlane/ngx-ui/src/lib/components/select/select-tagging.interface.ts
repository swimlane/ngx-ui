/** Optional per-tag validator. Return an error message to reject the tag, or null to accept. */
export type SelectTaggingValidator = (value: any, selected: readonly any[]) => string | null;
