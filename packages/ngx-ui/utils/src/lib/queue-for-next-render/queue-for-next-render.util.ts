/**
 * Alias for setTimeout()
 * This is to force ChangeDetection to run at the beginning of the next render cycle
 */
export function queueForNextRender(cb: () => void) {
  setTimeout(() => {
    cb();
  });
}
