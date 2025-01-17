import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("adopted-callback-element")
export class AdoptedCallbackElement extends LitElement {
  
  /**
   * Invoked when a component is moved to a new document.
   * Be aware that adoptedCallback is not polyfilled.
   * 
   * Lit behavior:
   * Lit has no default behavior for this callback.
   * 
   * Use cases:
   * This callback should only be used for advanced use cases when the element behavior should change when it changes documents.
   * 
   * Note that in practice, adoptedCallback is rarely used to move elements between documents. 
   * Use cases include working with iframes or moving elements between shadow roots.
   */
  adoptedCallback() {   
    console.log("AdoptedCallbackElement::adoptedCallback");
  }

  render() {
    return html`<div>AdoptedCallbackElement</div>`;
  }
}
