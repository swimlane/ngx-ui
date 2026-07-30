/**
 * DrawerController - Imperative API for opening drawers.
 * Mirrors Angular DrawerService.create() / destroy().
 *
 * Use for opening drawers programmatically without declaring swim-drawer in template.
 * Ensure swim-drawer is imported/registered before calling openDrawer.
 */

import './drawer.component';
import type { SwimDrawer } from './drawer.component';
import type { DrawerOptions } from './drawer-options.interface';
import { DrawerDirection } from './drawer-direction.enum';

/**
 * Open a drawer and return a handle to close it.
 *
 * @param options - Drawer configuration (direction, size, content, etc.)
 * @returns Object with close() method and reference to the drawer element
 */
export function openDrawer(options: DrawerOptions): {
  close: () => void;
  drawer: SwimDrawer;
} {
  const {
    direction = DrawerDirection.Left,
    size = 80,
    zIndex = 998,
    closeOnOutsideClick = true,
    isRoot = true,
    parentContainer,
    content,
    cssClass = ''
  } = options;

  const drawer = document.createElement('swim-drawer') as SwimDrawer;

  drawer.direction = direction;
  drawer.size = size;
  drawer.zIndex = zIndex;
  drawer.closeOnOutsideClick = closeOnOutsideClick;
  drawer.isRoot = isRoot;
  drawer.cssClass = cssClass;

  if (content) {
    if (typeof content === 'string') {
      const wrap = document.createElement('div');
      wrap.innerHTML = content;
      while (wrap.firstChild) {
        drawer.appendChild(wrap.firstChild);
      }
    } else if (content instanceof DocumentFragment) {
      while (content.firstChild) {
        drawer.appendChild(content.firstChild);
      }
    } else {
      drawer.appendChild(content);
    }
  }

  const container = isRoot ? document.body : parentContainer ?? document.body;
  container.appendChild(drawer);

  const close = (): void => {
    drawer.hide();
  };

  drawer.addEventListener(
    'close',
    () => {
      if (drawer.parentNode) {
        drawer.parentNode.removeChild(drawer);
      }
    },
    { once: true }
  );

  drawer.show();

  return { close, drawer };
}
