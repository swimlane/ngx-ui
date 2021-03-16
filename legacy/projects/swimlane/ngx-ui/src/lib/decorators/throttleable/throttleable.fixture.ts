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
