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
 * Coerces a data-bound value (typically a string) to a number.
 */
export function coerceNumberProperty(value: any): number;
export function coerceNumberProperty<D>(value: any, fallback: D): number | D;
export function coerceNumberProperty(value: any, fallbackValue: number | null = null): number | null {
  return isNaN(parseFloat(value as any)) || isNaN(Number(value)) ? fallbackValue : Number(value);
}
