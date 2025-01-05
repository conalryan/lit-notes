import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("styling-children")
export class StylingChildren extends LitElement {
  // Also, children can be styled from outside the shadow tree,
  // so you should regard your ::slotted() styles as default styles that can be overridden.
  // WARN: Don't put comments inside the css block
  static styles = css`
    ::slotted(*) {
      color: green;
      font-family: Roboto;
    }
    ::slotted(p) {
      color: blue;
    }
    div ::slotted(*) {
      color: red;
    }
    ::slotted([slot="hi"]) {
      color: purple;
    }
  `;
  protected render() {
    return html`
      <slot></slot>
      <div><slot name="indiv"></slot></div>
      <slot name="hi"></slot>
    `;
  }
}
