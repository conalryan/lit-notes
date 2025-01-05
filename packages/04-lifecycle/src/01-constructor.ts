import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("constructor-element")
export class ConstructorElement extends LitElement {
  msg: string;

  /**
   * Called when an element is created. Also, it’s invoked  when an existing element is upgraded, 
   * which happens when the definition for a custom element is loaded after the element is already in the DOM.
   * 
   * Lit behavior:
   * Requests an asynchronous update using the `requestUpdate()` method
   * Ensures properties values set before upgrade are maintained and correctly override defaults set by the component.
   * 
   * Use cases:
   * Perform one time initialization tasks that must be done before the first update.
   */
  constructor() {
    super();
    console.log("ConstructorElement::constructor");
    this.msg = "message initialized in the constructor";
  }

  render() {
    return html`<div>${this.msg}</div>`;
  }
}
