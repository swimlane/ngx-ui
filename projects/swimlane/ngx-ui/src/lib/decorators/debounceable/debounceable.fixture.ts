/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { debounceable } from './debounceable.decorator';

export class DebounceableFixture {
  @debounceable(10)
  fn() {
    this.doSomething();
  }

  doSomething() {
    // do something here
  }
}
