import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { cardAvatarComponentStyles } from './card-avatar.styles';
import { CardStatus } from './card-status.enum';

/**
 * SwimCardAvatar - Avatar or icon in card header. Used inside swim-card-header.
 *
 * @slot - Fallback content when no src (e.g. initials).
 */
const CARD_AVATAR_TAG = 'swim-card-avatar';
export class SwimCardAvatar extends LitElement {
  static styles = cardAvatarComponentStyles;

  /** Image URL for the avatar. */
  @property({ type: String })
  src = '';

  /** Status indicator overlay: success, error, or disabled. */
  @property({ type: String, reflect: true })
  status?: CardStatus | 'success' | 'error' | 'disabled';

  /** When true, image has transparent background instead of white. */
  @property({ type: Boolean, attribute: 'remove-image-background' })
  removeImageBackground = false;

  render() {
    const avatarStatusClass =
      this.status === CardStatus.Success
        ? 'swim-card-avatar__avatar--success'
        : this.status === CardStatus.Error
        ? 'swim-card-avatar__avatar--error'
        : this.status === CardStatus.Disabled
        ? 'swim-card-avatar__avatar--disabled'
        : '';

    return html`
      <div
        class="swim-card-avatar__avatar ${avatarStatusClass}"
        role="${this.status ? 'status' : 'presentation'}"
        aria-label="${this.status || ''}"
      >
        <div class="swim-card-avatar__inner">
          ${this.src
            ? html`
                <img
                  class="swim-card-avatar__img ${this.removeImageBackground ? 'swim-card-avatar__img--no-bg' : ''}"
                  src="${this.src}"
                  alt=""
                  draggable="false"
                  loading="lazy"
                />
              `
            : html`<span class="swim-card-avatar__content"><slot></slot></span>`}
        </div>
      </div>
    `;
  }
}

if (!customElements.get(CARD_AVATAR_TAG)) {
  customElements.define(CARD_AVATAR_TAG, SwimCardAvatar);
}

declare global {
  interface HTMLElementTagNameMap {
    'swim-card-avatar': SwimCardAvatar;
  }
}
