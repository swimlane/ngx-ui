import type { SelectOption } from './select-option.interface';

const KNOWN_KEYS = new Set(['name', 'value', 'title', 'label', 'description', 'disabled', 'group', 'category']);

function containsInString(value: string, keyword: string, caseSensitive: boolean): boolean {
  if (!keyword) {
    return true;
  }
  return caseSensitive ? value.includes(keyword) : value.toLowerCase().includes(keyword.toLowerCase());
}

function scanValue(value: unknown, keyword: string, caseSensitive: boolean, depth: number): boolean {
  if (value === undefined || value === null || depth > 2) {
    return false;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return containsInString(String(value), keyword, caseSensitive);
  }
  if (typeof value === 'string') {
    return containsInString(value, keyword, caseSensitive);
  }
  if (typeof value === 'object' && !Array.isArray(value)) {
    const keys = Object.getOwnPropertyNames(value as object);
    for (const k of keys) {
      if (scanValue((value as Record<string, unknown>)[k], keyword, caseSensitive, depth + 1)) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Client-side filter: matches name, title, label, description, stringified value,
 * and shallow nested fields on the option object (depth-capped).
 */
export function optionMatchesFilter(
  option: SelectOption,
  keyword: string,
  options: { filterCaseSensitive: boolean }
): boolean {
  const trimmed = keyword.trim();
  if (!trimmed) {
    return true;
  }
  const q = options.filterCaseSensitive ? trimmed : trimmed.toLowerCase();
  const directFields = [
    option.name,
    option.title,
    option.label,
    option.description,
    option.value,
    option.group,
    option.category
  ]
    .filter(v => v !== undefined && v !== null)
    .map(v => (typeof v === 'string' ? v : String(v)));

  for (const f of directFields) {
    if (containsInString(f, q, options.filterCaseSensitive)) {
      return true;
    }
  }

  for (const key of Object.keys(option)) {
    if (KNOWN_KEYS.has(key)) {
      continue;
    }
    if (scanValue(option[key], q, options.filterCaseSensitive, 0)) {
      return true;
    }
  }

  return false;
}
