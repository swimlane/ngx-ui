import { debounceable } from './debounceable.util';

export class DebounceableFixture {
  @debounceable(10)
  fn() {
    this.doSomething();
  }

  doSomething() {
    // do something here
  }
}
