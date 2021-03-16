import { throttle } from '@swimlane/ngx-ui/utils/throttle';

export function Throttleable(timeframe: number): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      throttle(original?.apply(this, args), timeframe);
    };

    return descriptor;
  };
}
