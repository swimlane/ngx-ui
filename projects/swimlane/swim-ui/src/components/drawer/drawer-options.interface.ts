import { DrawerDirection } from './drawer-direction.enum';

/**
 * Options for creating a drawer via DrawerController.open().
 */
export interface DrawerOptions {
  /** Extra CSS class on the drawer host */
  cssClass?: string;
  /** Direction: left or bottom */
  direction?: DrawerDirection | string;
  /** Size as percentage (width for left, height for bottom). Default 80. */
  size?: number;
  /** z-index for the drawer. Default 998. */
  zIndex?: number;
  /** Whether clicking outside closes the drawer. Default true. */
  closeOnOutsideClick?: boolean;
  /** When true, drawer uses fixed positioning (viewport). When false, absolute within parentContainer. Default true. */
  isRoot?: boolean;
  /** Parent container element for non-root drawers. When set, drawer is appended here with position absolute. */
  parentContainer?: HTMLElement;
  /** Content to render in the drawer slot. Can be HTMLElement, DocumentFragment, or string (innerHTML). */
  content?: HTMLElement | DocumentFragment | string;
  /** Context object passed to content (for programmatic templates). Optional. */
  context?: unknown;
}
