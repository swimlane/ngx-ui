// we should be able to type this once this gets in https://github.com/microsoft/TypeScript/pull/47254
export const listFormatter = new (Intl as any).ListFormat('en', { style: 'long', type: 'conjunction' });
