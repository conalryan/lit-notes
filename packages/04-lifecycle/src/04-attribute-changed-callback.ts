import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("attribute-changed-callback-element")
export class AttributeChangedCallbackElement extends LitElement {
  @property({ type: String })
  msg: string = 'default'

  /**
   * attributeChangedCallback()
   * Invoked when one of the element’s observedAttributes changes.
   * 
   * Lit behavior
   * Lit uses this callback to sync changes in attributes to reactive properties. 
   * Specifically, when an attribute is set, the corresponding property is set. 
   * Lit also automatically sets up the element’s `observedAttributes` array to match 
   * the component’s list of reactive properties.
   * 
   * Use cases
   * You rarely need to implement this callback.
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log("AttributeChangedCallbackElement::attributeChangedCallback");
    console.log("name:", name);
    console.log("oldValue:", oldValue);
    console.log("newValue:", newValue);
    // WARN: if you do not explicity set the property, it will not be updated.
    // However, if you remove the attributeChangedCallback() method, the property will be updated.
    // Comment the line below to see the difference, the console logs will fire but the template will not be updated.
    this.msg = newValue;
    // cr. tried using requestUpdate() without setting the variable `msg` but it did not work.
  }

  render() {
    return html`<div>AttributeChangedCallbackElement: ${this.msg}</div>`;
  }
}
