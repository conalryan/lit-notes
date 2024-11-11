import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import './03-reactive-properties.js';

@customElement('app-lit-components')
export class AppLitComponents extends LitElement {
  header = 'Components';

  render() {
    return html`
      <main>
        <h1>${this.header}</h1>
        <reactive-properties name="Reactive Properties"></reactive-properties>
      </main>
    `;
  }
}
