import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('theming-element')
export class ThemingElement extends LitElement {
  static styles = css`
    :host {
      color: var(--theming-element-text-color, black);
      background: var(--theming-element-background-color, white);
      font-family: var(--theming-element-font-family, Inter);
      display: block;
      padding: 8px;
      margin: 8px;
    }
  `;
  protected render() {
    return html`<div>Hello World</div>`;
  }
}
