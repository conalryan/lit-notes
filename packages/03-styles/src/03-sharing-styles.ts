import { LitElement, css, html } from 'lit';
import { buttonStyles } from './styles.js';
import { customElement } from 'lit/decorators.js';

@customElement('sharing-styles')
export class SharingStyles extends LitElement {
  static styles = [
    buttonStyles,
    // Note that the host element can be affected by styles from outside the shadow tree, as well, 
    // so you should consider the styles you set in :host and :host() rules 
    // as default styles that can be overridden by the user.
    // WARN: Do not put comments inside the css template literal, it will break the CSS silently!
    css`
      :host { 
        display: block;
        border: 1px solid black;
      }`
  ];

  render() {
    return html`<button class="blue-button">Click me</button>`;
  }
}
