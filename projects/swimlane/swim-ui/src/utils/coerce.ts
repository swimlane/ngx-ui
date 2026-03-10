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
