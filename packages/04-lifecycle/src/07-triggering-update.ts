import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * An update is triggered when a reactive property changes or the `requestUpdate()` method is called.
 * Since updates are performed asynchronously, any and all changes that occur before the update
 * is performed result in only a single update.
 *
 * `hasChanged()` Called when a reactive property is set.
 * By default `hasChanged()` does a strict equality check and if it returns true,
 * an update is scheduled. See configuring `hasChanged()` for more information.
 *
 * `requestUpdate()` Call `requestUpdate()` to schedule an explicit update.
 * This can be useful if you need the element to update and render when something not related to a property changes.
 * Optionally, you can pass a property name and a previous value when calling `requestUpdate()`,
 * which will be stored in the changedProperties map.
 * This can be useful if you implement a custom getter and setter for a property.
 *
 * ```ts
 * this.requestUpdate('state', this._previousState);
 * ```
 */
@customElement("triggering-update-element")
export class TriggeringUpdateElement extends LitElement {
  private _timerInterval: number | undefined;

  override connectedCallback() {
    super.connectedCallback();
    // Call `requestUpdate()` to schedule an explicit update.
    this._timerInterval = setInterval(() => {
      console.log("[TriggeringUpdateElement]::requestUpdate()");
      this.requestUpdate();
    }, 1000);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    clearInterval(this._timerInterval);
  }

  override render() {
    return html`<div>TriggeringUpdateElement</div>`;
  }
}
