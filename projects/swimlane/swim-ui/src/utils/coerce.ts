/**
 * Utility functions for coercing property values
 * Matching behavior from @angular/cdk/coercion
 */

/**
 * Coerces a data-bound value (typically a string) to a boolean.
 */
export function coerceBooleanProperty(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

/**
 * Lit attribute converter so boolean attributes respect "false" in HTML.
 * Use with @property({ converter: booleanAttributeConverter }) for any boolean
 * that has an attribute (e.g. close-button="false"). Lit's default Boolean
 * converter treats any present attribute as true.
 */
export const booleanAttributeConverter = {
  fromAttribute: (value: string | null): boolean => coerceBooleanProperty(value),
  toAttribute: (value: boolean): string => (value ? '' : 'false')
};

/**
 * Coerces a data-bound value (typically a string) to a number.
 */
export function coerceNumberProperty(value: any): number;
export function coerceNumberProperty<D>(value: any, fallback: D): number | D;
export function coerceNumberProperty(value: any, fallbackValue: number | null = null): number | null {
  return isNaN(parseFloat(value as any)) || isNaN(Number(value)) ? fallbackValue : Number(value);
}

/**
 * Lit `type: Boolean` uses `fromAttribute: (v) => v != null`, so `prop="false"` becomes true.
 * Use these converters on `@property({ type: Boolean, converter: … })` so string `"false"` is honored.
 */
export const litBooleanAttrDefaultTrue = {
  fromAttribute: (value: string | null): boolean => value !== 'false',
  /** Omit attribute when true (default); set explicit `="false"` only when off. */
  toAttribute: (value: boolean): string | null => (value ? null : 'false')
};

export const litBooleanAttrDefaultFalse = {
  fromAttribute: (value: string | null): boolean => value !== null && value !== 'false' && value !== '0',
  /**
   * Use empty string when true so the boolean attribute is present; remove when false.
   * Serializing false as `attr="false"` leaves the attribute in the DOM, so selectors like
   * `[disabled]` / `[loading]` (common in resets and lazy-load styles) still match the host.
   */
  toAttribute: (value: boolean): string | null => (value ? '' : null)
};
