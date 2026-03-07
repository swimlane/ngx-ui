import { describe, it, expect } from 'vitest';
import {
  coerceBooleanProperty,
  coerceNumberProperty,
  booleanAttributeConverter
} from '../../../swim-ui/src/utils/coerce.js';

describe('coerce', () => {
  describe('coerceBooleanProperty', () => {
    it('returns false for null', () => {
      expect(coerceBooleanProperty(null)).toBe(false);
    });

    it('returns false for undefined', () => {
      expect(coerceBooleanProperty(undefined)).toBe(false);
    });

    it('returns true for empty string (implementation: any string except "false" is true)', () => {
      expect(coerceBooleanProperty('')).toBe(true);
    });

    it('returns false for string "false"', () => {
      expect(coerceBooleanProperty('false')).toBe(false);
    });

    it('returns true for string "true"', () => {
      expect(coerceBooleanProperty('true')).toBe(true);
    });

    it('returns true for any other non-empty string', () => {
      expect(coerceBooleanProperty('yes')).toBe(true);
      expect(coerceBooleanProperty('0')).toBe(true);
      expect(coerceBooleanProperty('1')).toBe(true);
    });

    it('returns true for number 1', () => {
      expect(coerceBooleanProperty(1)).toBe(true);
    });

    it('returns true for number 0 (treated as truthy per Angular CDK behavior)', () => {
      expect(coerceBooleanProperty(0)).toBe(true);
    });
  });

  describe('coerceNumberProperty', () => {
    it('returns fallback for undefined when fallback provided', () => {
      expect(coerceNumberProperty(undefined, 42)).toBe(42);
    });

    it('returns null for undefined when no fallback', () => {
      expect(coerceNumberProperty(undefined)).toBe(null);
    });

    it('returns fallback for NaN string', () => {
      expect(coerceNumberProperty('not a number', 0)).toBe(0);
    });

    it('parses numeric string', () => {
      expect(coerceNumberProperty('123')).toBe(123);
      expect(coerceNumberProperty('3.14')).toBe(3.14);
    });

    it('returns number as-is when valid', () => {
      expect(coerceNumberProperty(42)).toBe(42);
    });

    it('returns fallback for empty string when provided', () => {
      expect(coerceNumberProperty('', 10)).toBe(10);
    });
  });

  describe('booleanAttributeConverter', () => {
    it('fromAttribute: converts "false" to false', () => {
      expect(booleanAttributeConverter.fromAttribute('false')).toBe(false);
    });

    it('fromAttribute: converts null to false', () => {
      expect(booleanAttributeConverter.fromAttribute(null)).toBe(false);
    });

    it('fromAttribute: converts "" to true (same as coerceBooleanProperty)', () => {
      expect(booleanAttributeConverter.fromAttribute('')).toBe(true);
    });

    it('fromAttribute: converts "true" or any other string to true', () => {
      expect(booleanAttributeConverter.fromAttribute('true')).toBe(true);
      expect(booleanAttributeConverter.fromAttribute('yes')).toBe(true);
    });

    it('toAttribute: converts true to empty string', () => {
      expect(booleanAttributeConverter.toAttribute(true)).toBe('');
    });

    it('toAttribute: converts false to "false"', () => {
      expect(booleanAttributeConverter.toAttribute(false)).toBe('false');
    });
  });
});
