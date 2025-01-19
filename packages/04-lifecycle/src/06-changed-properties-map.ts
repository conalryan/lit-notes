import { LitElement, PropertyValueMap, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * Many reactive update methods receive a Map of changed properties. 
 * The Map keys are the property names and its values are the previous property values. 
 * You can always find the current property values using `this.property` or `this[property]`.
 */
@customElement("changed-properties-map-element")
export class ChangedPropertiesMapElement extends LitElement {
  @property({ type: String })
  msg = "Hello World";

  /**
   * shouldUpdate
   * 1. Called automatically by Lit before the component updates
   * 2. It receives a PropertyValueMap containing the properties that have changed
   * 3. By default (in the parent LitElement class), it returns true to allow all updates
   * 4. You can override it (as shown below) to add custom logic for controlling when updates should occur
   */
  override shouldUpdate(
    /**
     * PropertyValueMap<this>
     * - A map of the properties that have changed
     * - The key is the property name, and the value is the old value
     * - The type is inferred from the class definition
     * 
     * Note that PropertyValues<this> doesn't recognize protected or private properties. 
     * If you're checking any protected or private properties, you'll need to use a less restrictive type.
     * 
     * Changing a property during the update (up to and including the render() method) 
     * updates the changedProperties map, but doesn't trigger a new update. 
     * Changing a property after render() (for example, in the updated() method) triggers a new update cycle,
     *  and the changed property is added to a new changedProperties map to be used for the next cycle.
     */
    changedProperties: PropertyValueMap<this>
  ): boolean {
    console.log(
      `ChangedPropertiesMapElement::shouldUpdate`, changedProperties
    );
    return true;
  }

  override render() {
    return html`<div>msg: ${this.msg}</div>`;
  }
}
