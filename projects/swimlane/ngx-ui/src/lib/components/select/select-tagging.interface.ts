export type SelectTaggingValidator<T = unknown> = (value: T, selected: readonly T[]) => string | null;
