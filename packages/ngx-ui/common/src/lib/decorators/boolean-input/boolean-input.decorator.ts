import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { queueForNextRender } from '@swimlane/ngx-ui/utils';

export type BooleanInput = string | boolean | null | undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function NgxBooleanInput<TComponent = any>(
  setter?: (setterProps: {
    component: TComponent;
    coercedValue: boolean;
    previousValue: boolean;
    setFn: () => void;
  }) => void
): PropertyDecorator {
  return (target, propertyKey) => {
    // double underscore used as to not pollute the single underscore private 'namespace'
    const coercedBooleanKey = `__${String(propertyKey)}`;

    Object.defineProperty(target, propertyKey, {
      get(): boolean {
        return this[coercedBooleanKey];
      },
      set(v: unknown) {
        const coercedValue = coerceBooleanProperty(v);

        const internalSetter = (newValue: boolean) => {
          return () => {
            this[coercedBooleanKey] = newValue;
          };
        };

        if (setter) {
          queueForNextRender(() => {
            setter({
              component: this,
              coercedValue,
              previousValue: this[coercedBooleanKey],
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
