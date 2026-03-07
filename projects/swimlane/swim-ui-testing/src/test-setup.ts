// Polyfill for form-associated custom elements (happy-dom does not implement attachInternals)
if (typeof HTMLElement !== 'undefined' && !HTMLElement.prototype.attachInternals) {
  HTMLElement.prototype.attachInternals = function (): ElementInternals {
    return {
      form: null,
      setFormValue(_value: string | FormData | File | null) {},
      setValidity(_flags?: ValidityStateFlags, _message?: string, _anchor?: HTMLElement) {},
      states: new Set()
    } as unknown as ElementInternals;
  };
}

// Reset DOM between tests to avoid leakage
afterEach(() => {
  document.body.innerHTML = '';
});
