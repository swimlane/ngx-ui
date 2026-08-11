import { TestBed } from '@angular/core/testing';

import { SchemaValidatorService, jsonPointerToDataPath } from './schema-validator.service';

describe('SchemaValidatorService', () => {
  let service: SchemaValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchemaValidatorService);
  });

  describe('jsonPointerToDataPath', () => {
    it('maps root to empty path', () => {
      expect(jsonPointerToDataPath('#')).toBe('');
      expect(jsonPointerToDataPath('#/')).toBe('');
    });

    it('maps object and array segments like ngx-json-editor paths', () => {
      expect(jsonPointerToDataPath('#/name')).toBe('.name');
      expect(jsonPointerToDataPath('#/items/0')).toBe('.items[0]');
      expect(jsonPointerToDataPath('#/a/b/2')).toBe('.a.b[2]');
    });

    it('quotes unusual property names', () => {
      expect(jsonPointerToDataPath('#/odd.key')).toBe("['odd.key']");
    });
  });

  describe('validate', () => {
    it('returns no errors for a valid model', () => {
      const errors = service.validate(
        {
          type: 'object',
          required: ['name'],
          properties: { name: { type: 'string' } }
        },
        { name: 'ok' }
      );
      expect(errors).toEqual([]);
    });

    it('returns dataPath/message errors compatible with the json editor', () => {
      const errors = service.validate(
        {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
            count: { type: 'number' }
          }
        },
        { name: 1, count: 'x' }
      );

      expect(errors.length).toBeGreaterThan(0);
      expect(errors.every(e => typeof e.dataPath === 'string' && typeof e.message === 'string')).toBe(true);
      expect(errors.some(e => e.dataPath === '.name')).toBe(true);
      expect(errors.some(e => e.dataPath === '.count')).toBe(true);
    });

    it('treats custom formats password/code/binary as valid (former Ajv addFormat .* )', () => {
      for (const format of ['password', 'code', 'binary']) {
        const errors = service.validate({ type: 'string', format }, 'any-value');
        expect(errors).toEqual([]);
      }
    });
  });
});
