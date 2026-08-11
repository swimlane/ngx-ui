import { Extension } from '@codemirror/state';
import { EditorView, ViewPlugin } from '@codemirror/view';

/**
 * Keep the editor DOM sized to the ngx-codemirror host so tall documents scroll
 * inside `.cm-scroller` instead of expanding the widget. Percentage heights are
 * unreliable under nested flex layouts.
 */
export function fillHostHeight(): Extension {
  return [
    EditorView.theme({
      '&': {
        height: '100%',
        maxHeight: '100%',
        minHeight: '0',
        boxSizing: 'border-box'
      },
      '.cm-scroller': {
        overflowX: 'auto',
        overflowY: 'auto',
        minHeight: '0',
        scrollbarGutter: 'stable'
      },
      '.cm-gutters': {
        minHeight: '100%'
      }
    }),
    ViewPlugin.fromClass(
      class {
        private readonly resizeObserver: ResizeObserver | null;
        private readonly sizeTarget: HTMLElement | null;

        constructor(private readonly view: EditorView) {
          this.sizeTarget =
            (view.dom.closest('.ngx-codemirror') as HTMLElement | null) || view.dom.parentElement;

          if (!this.sizeTarget || typeof ResizeObserver === 'undefined') {
            this.resizeObserver = null;
            this.applyHeight();
            return;
          }

          this.resizeObserver = new ResizeObserver(() => this.applyHeight());
          this.resizeObserver.observe(this.sizeTarget);
          this.applyHeight();
        }

        destroy(): void {
          this.resizeObserver?.disconnect();
        }

        private applyHeight(): void {
          const target = this.sizeTarget;
          if (!target) {
            return;
          }

          const height = target.clientHeight;
          if (height <= 0) {
            return;
          }

          const px = `${height}px`;
          const { dom, scrollDOM } = this.view;
          if (dom.style.height !== px) {
            dom.style.height = px;
            dom.style.maxHeight = px;
          }
          if (scrollDOM.style.maxHeight !== px) {
            scrollDOM.style.maxHeight = px;
          }
          scrollDOM.style.overflowY = 'auto';
          this.view.requestMeasure();
        }
      }
    )
  ];
}
