import { coerceCssPixelValue } from '@angular/cdk/coercion';

export type CssPixelInput = string | number;

export function NgxCssPixelInput(): PropertyDecorator {
  return (target, propertyKey) => {
    // double underscore used as to not pollute the single underscore private 'namespace'
    const coercedCssPixelKey = `__${String(propertyKey)}`;

    Object.defineProperty(target, propertyKey, {
      get(): string | number {
        return this[coercedCssPixelKey];
      },
      set(v: string | number) {
        this[coercedCssPixelKey] = coerceCssPixelValue(v);
      },
    });
  };
}
