import { LitElement, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("conditional-nothing")
export class ConditionalNothing extends LitElement {
  @property({ type: String }) userName = "John";
  @property({ type: String }) ariaLabel: string = '';

  render() {
    return html`
      <div>
        <h3>Conditional Nothing</h3>
        <span>${this.userName ?? nothing}</span>

        <button aria-label="${this.ariaLabel || nothing}">Button</button>
      </div>
    `;
  }
}
