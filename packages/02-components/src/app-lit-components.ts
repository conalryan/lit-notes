import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('app-lit-components')
export class AppLitComponents extends LitElement {
  header = 'Components';

  render() {
    return html`
      <main>
        <h1>${this.header}</h1>
      </main>
    `;
  }
}
