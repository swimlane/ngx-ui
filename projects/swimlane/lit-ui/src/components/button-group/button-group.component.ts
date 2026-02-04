import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseStyles } from '../../styles/base';
import { buttonGroupStyles } from './button-group.styles';
import { ButtonGroupOrientation } from './button-group-orientation.enum';
import { ButtonGroupVariant } from './button-group-variant.enum';
import { ButtonGroupStyle } from './button-group-style.enum';

/**
 * SwimButtonGroup - A container for grouping buttons, matching @swimlane/ngx-ui design system.
 * Sets shared colors via CSS variables so slotted swim-button elements use unified styling.
 *
 * @slot - Button content (swim-button or native button elements)
 */
@customElement('swim-button-group')
export class SwimButtonGroup extends LitElement {
  static styles = [baseStyles, buttonGroupStyles];

  /**
   * Layout direction of the group
   */
  @property({ type: String, reflect: true })
  orientation: ButtonGroupOrientation | 'horizontal' | 'vertical' = ButtonGroupOrientation.Horizontal;

  /**
   * Visual variant: contained (solid) or text (link-style)
   */
  @property({ type: String, reflect: true })
  variant: ButtonGroupVariant | 'contained' | 'text' = ButtonGroupVariant.Contained;

  /**
   * Color style for the group (applies to slotted buttons when variant is contained)
   */
  @property({ attribute: 'button-group-style', type: String, reflect: true })
  buttonGroupStyle: ButtonGroupStyle | 'default' | 'primary' = ButtonGroupStyle.Default;

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-button-group': SwimButtonGroup;
  }
}
