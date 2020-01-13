import { throttleable } from './throttleable.util';

export class ThrottleableFixture {
  @throttleable(10)
  fn() {
    this.doSomething();
  }

  doSomething() {
    // do something here
  }
}
