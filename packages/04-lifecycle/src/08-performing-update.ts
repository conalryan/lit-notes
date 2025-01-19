import { LitElement, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { html } from "lit/html.js";

/**
 * Performing an update
 * When an update is performed, the `performUpdate()` method is called. This method calls a number of other lifecycle methods.
 * 
 * Any changes that would normally trigger an update which occur while a component is updating do not schedule a new update. 
 * This is done so that property values can be computed during the update process. Properties changed during the update 
 * are reflected in the `changedProperties` map, so subsequent lifecycle methods can act on the changes.
 * 
 */
@customElement("performing-update-element")
export class PerformingUpdateElement extends LitElement {
  @property({ type: String })
  prop1 = "";

  @property({ type: String })
  prop2 = "never changes";

  @state()
  sha = "";

  /**
   * `shouldUpdate()` Defatuls to true
   * Called to determine whether an update cycle is required.
   * If it returns false, the rest of the update cycle will not be called but the `updateComplete` Promise is still resolved.
   * 
   * Arguments: `changedProperties`: Map with keys that are the names of changed properties 
   * and values that are the corresponding previous values.
   * 
   * Updates: No. Property changes inside this method do not trigger an element update.
   * 
   * Call super? Not necessary.
   * 
   * Called on server? No.
   */
  override shouldUpdate(changedProperties: Map<string, any>) {
    console.log("[PerformingUpdateElement] shouldUpdate()", changedProperties);
    // Only update element if prop1 changed.
    return changedProperties.has("prop1");
  }

  /**
   * `willUpdate()`
   * Called before update() to compute values needed during the update.
   * 
   * Argguments: `changedProperties`: Map with keys that are the names of changed properties 
   * and values that are the corresponding previous values.
   * 
   * Updates? No. Property changes inside this method do not trigger an element update.
   * 
   * Call super? Not necessary.
   * 
   * Called on server? Yes.
   * 
   * Implement willUpdate() to compute property values that depend on other properties 
   * and are used in the rest of the update process.
   */
  override willUpdate(changedProperties: PropertyValues<this>) {
    console.log("[PerformingUpdateElement] willUpdate()", changedProperties);
    // only need to check changed properties for an expensive computation.
    if (changedProperties.has('prop1')) {
      this.sha = `${this.prop1} ${this.prop2}`;
    }
  }

  /**
   * `update()`
   * Called to update the component's DOM.
   * 
   * Arguments: `changedProperties`: Map with keys that are the names of changed properties 
   * and values that are the corresponding previous values.
   * 
   * Updates? No. Property changes inside this method do not trigger an element update.
   * 
   * Call super? Yes. Without a super call, the element’s attributes and template will not update.
   * 
   * Called on server? Yes.
   * 
   * Generally, you should not need to implement this method.
   */
  override update(changedProperties: PropertyValues<this>) {
    console.log("[PerformingUpdateElement] update()", changedProperties);
    super.update(changedProperties);
  }

  /**
   * `render()`
   * Called by update() and should be implemented to return a renderable result (such as a TemplateResult)
   * used to render the component's DOM.
   * 
   * Arguments: None.
   * 
   * Updates? No. Property changes inside this method do not trigger an element update.
   * 
   * Call super? Not necessary.
   * 
   * Called on server? Yes.
   * 
   * The `render()` method has no arguments, but typically it references component properties.
   */
  override render() {
    // prop2 is always a blank string since it is not listed in shouldUpdate().
    return html`<div>PerformingUpdateElement: ${this.prop1}, ${this.prop2}, ${this.sha}</div>`;
  }
}
