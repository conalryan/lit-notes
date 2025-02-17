import { css, html } from 'lit';
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { buttonStyles } from './07-styles-ts.js';

@customElement('import-styles')
export class ImportStyles extends LitElement {
  static styles = [
    buttonStyles,
    css`
      :host { display: block;
        border: 1px solid black;
      }`
  ];
  protected render() {
    return html`
      <button class="blue-button">Click me</button>
    `;
  }
}