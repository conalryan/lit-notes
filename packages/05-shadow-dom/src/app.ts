import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./01-accessing-nodes";
import "./02-children-with-slots";
import "./03-accessing-slotted-children";
import "./04-customize-render-root";

@customElement("app-element")
export class AppElement extends LitElement {
  static shadowRootOptions = {
    mode: "open" as ShadowRootMode,
  };

  render() {
    return html`
      <main>
        <h1>AppElement</h1>

        <h3>Accessing Nodes</h3>
        <accessing-nodes-element></accessing-nodes-element>

        <h3>Children with slots</h3>
        <children-with-slots>
          <p>This is a child</p>
          <p slot="two">This is a child with a slot attribute</p>
          <p>This is another child</p>
        </children-with-slots>
        <!-- Output is:
          This is a child
          This is another child
          This is a child with a slot attribute
        -->

        <h3>Accessing slotted children</h3>
        <accessing-slotted-children>
          <p>P1 slotted</p>
          <p>P2 slotted</p>
        </accessing-slotted-children>

        <h3>Customizing the render root open</h3>
        <customize-render-root-open>
          <p>This is a child open</p>
        </customize-render-root-open>

        <h3>Customizing the render root closed</h3>
        <customize-render-root-closed>
          <p>This is a child closed</p>
        </customize-render-root-closed>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-element": AppElement;
  }
}
