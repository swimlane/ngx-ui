import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { queueForNextRender } from '@swimlane/ngx-ui/utils';

export type NumericInput = NumberInput;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function NgxNumericInput<TComponent = any>(
  fallback?: number,
  setter?: (setterProps: {
    component: TComponent;
    coercedValue: number;
    previousValue: number;
    setFn: () => void;
  }) => void
): PropertyDecorator {
  return (target, propertyKey) => {
    // double underscore used as to not pollute the single underscore private 'namespace'
    const coercedNumericKey = `__${String(propertyKey)}`;

    Object.defineProperty(target, propertyKey, {
      get(): number {
        return this[coercedNumericKey];
      },
      set(v: unknown) {
        const coercedValue = fallback
          ? coerceNumberProperty(v, fallback)
          : coerceNumberProperty(v);

        const internalSetter = (newValue: number) => {
          return () => {
            this[coercedNumericKey] = newValue;
          };
        };

        if (setter) {
          queueForNextRender(() => {
            setter({
              component: this,
              coercedValue,
              previousValue: this[coercedNumericKey],
              setFn: internalSetter(coercedValue),
            });
          });
        } else {
          internalSetter(coercedValue)();
        }
      },
    });
  };
}
