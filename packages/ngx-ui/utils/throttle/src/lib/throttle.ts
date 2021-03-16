export function throttle(func: () => void, timeFrame: number) {
  let lastTime = 0;
  return function () {
    const now = Date.now();
    if (now - lastTime >= timeFrame) {
      func();
      lastTime = now;
    }
  };
}
