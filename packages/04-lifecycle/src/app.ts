import {LitElement, css, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import './01-constructor';

@customElement('app-element')
export class AppElement extends LitElement {

  render() {
    return html`
      <main>
        <h1>04 - Lifecycle</h1>

        <h3>01 - Constructor</h3>
        <constructor-element></constructor-element>
      </main>
    `
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'app-element': AppElement
  }
}
