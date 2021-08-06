/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { throttleable } from './throttleable.decorator';

export class ThrottleableFixture {
  @throttleable(10)
  fn() {
    this.doSomething();
  }

  doSomething() {
    // do something here
  }
}
