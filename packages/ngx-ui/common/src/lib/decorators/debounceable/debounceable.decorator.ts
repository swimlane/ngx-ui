import { debounce } from '@swimlane/ngx-ui/utils';

export function Debounceable(duration: number, immediate?: boolean): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;

    descriptor.value = function(...args: unknown[]) {
      debounce(original?.apply(this, args), duration, immediate);
    };

    return descriptor;
  };
}
