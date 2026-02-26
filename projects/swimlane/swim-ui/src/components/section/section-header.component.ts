import { LitElement, html } from 'lit';
import { sectionHeaderStyles } from './section-header.styles';

const SECTION_HEADER_TAG = 'swim-section-header';

/**
 * SwimSectionHeader - Custom header content for swim-section.
 * Place content in the default slot; it will appear in the section header bar.
 *
 * @slot - Default slot for header content (e.g. custom title, links, actions)
 */
export class SwimSectionHeader extends LitElement {
  static styles = sectionHeaderStyles;

  render() {
    return html`<slot></slot>`;
  }
}

if (!customElements.get(SECTION_HEADER_TAG)) {
  customElements.define(SECTION_HEADER_TAG, SwimSectionHeader);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-section-header': SwimSectionHeader;
  }
}
