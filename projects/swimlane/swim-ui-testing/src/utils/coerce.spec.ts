import { describe, it, expect } from 'vitest';
import {
  coerceBooleanProperty,
  coerceNumberProperty,
  litBooleanAttrDefaultTrue,
  litBooleanAttrDefaultFalse
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

  describe('litBooleanAttrDefaultTrue', () => {
    it('fromAttribute: only "false" is false', () => {
      expect(litBooleanAttrDefaultTrue.fromAttribute('false')).toBe(false);
      expect(litBooleanAttrDefaultTrue.fromAttribute(null)).toBe(true);
      expect(litBooleanAttrDefaultTrue.fromAttribute('')).toBe(true);
    });

    it('toAttribute: true omits attr; false serializes as "false"', () => {
      expect(litBooleanAttrDefaultTrue.toAttribute(true)).toBe(null);
      expect(litBooleanAttrDefaultTrue.toAttribute(false)).toBe('false');
    });
  });

  describe('litBooleanAttrDefaultFalse', () => {
    it('fromAttribute: null, "false", and "0" are false', () => {
      expect(litBooleanAttrDefaultFalse.fromAttribute(null)).toBe(false);
      expect(litBooleanAttrDefaultFalse.fromAttribute('false')).toBe(false);
      expect(litBooleanAttrDefaultFalse.fromAttribute('0')).toBe(false);
      expect(litBooleanAttrDefaultFalse.fromAttribute('')).toBe(true);
      expect(litBooleanAttrDefaultFalse.fromAttribute('true')).toBe(true);
    });

    it('toAttribute: true uses empty string; false removes attr', () => {
      expect(litBooleanAttrDefaultFalse.toAttribute(true)).toBe('');
      expect(litBooleanAttrDefaultFalse.toAttribute(false)).toBe(null);
    });
  });
});
