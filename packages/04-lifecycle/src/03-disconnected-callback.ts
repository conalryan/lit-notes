import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("disconnected-callback-element")
export class DisconnectedCallbackElement extends LitElement {
  _handleKeydown = (e: KeyboardEvent) => {
    console.log("Key pressed:", e.key);
  };

  /**
   * connectedCallback()
   * setup tasks that should only occur when the element is connected to the document.
   * The most common of these is adding event listeners to nodes external to the element,
   * like a keydown event handler added to the window.
   * Typically, anything done in connectedCallback() should be undone when the element is disconnected
   * for example, removing event listeners on window to prevent memory leaks.
   */
  connectedCallback() {
    super.connectedCallback();
    console.log("DisconnectedCallbackElement::connectedCallback");
    // WARN: The listener is added to the window object, so it will be triggered for all key presses in the browser.
    window.addEventListener("keydown", this._handleKeydown);
  }

  /**
   * disconnectedCallback()
   * nvoked when a component is removed from the document's DOM.
   * Lit behavior
   * Pauses the reactive update cycle. It is resumed when the element is connected.
   *
   * Use cases
   * This callback is the main signal to the element that it may no longer be used;
   * as such, disconnectedCallback() should ensure that nothing is holding a reference to the element
   * (such as event listeners added to nodes external to the element), so that it is free to be garbage collected.
   *
   * No need to remove internal event listeners.
   * You don't need to remove event listeners added on the component's own DOM—including those added declaratively in your template.
   * Unlike external event listeners, these won't prevent the component from being garbage collected.
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    console.log("DisconnectedCallbackElement::disconnectedCallback");
    window.removeEventListener("keydown", this._handleKeydown);
  }

  render() {
    return html`<div>DisconnectedCallbackElement</div>`;
  }
}
