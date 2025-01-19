import { html, LitElement, PropertyValues } from "lit";
import { customElement, state } from "lit/decorators.js";

/**
 * After `update()` is called to render changes to the component's DOM,
 * you can perform actions on the component's DOM using these methods.
 *
 * `updateComplete`: Promise that resolves when the element has finished updating.
 * Use `updateComplete` to wait for an update.
 * The resolved value is a boolean indicating if there are no pending updates.
 * The `updateComplete` promise rejects if there's an unhandled error during the update cycle. 
 *
 * By default, the `updateComplete` promise resolves when the element's update has completed,
 * but does not wait for any children to have completed their updates.
 * This behavior may be customized by overriding `getUpdateComplete()`.
 *
 * There are several use cases for needing to know when an element's update has completed:
 * 1. **Tests**: When writing tests you can await the `updateComplete` promise before making assertions about a component’s DOM.
 * If the assertions depend on updates completing for the component's entire descendant tree,
 * awaiting `requestAnimationFrame` is often a better choice, since Lit's default scheduling uses the browser's microtask queue,
 * which is emptied prior to animation frames. This ensures all pending Lit updates on the page have completed before the `requestAnimationFrame` callback.
 *
 * 2. **Measurement**: Some components may need to measure DOM in order to implement certain layouts.
 * While it is always better to implement layouts using pure CSS rather than JavaScript-based measurement,
 * sometimes CSS limitations make this unavoidable. In very simple cases, and if you're measuring Lit or ReactiveElement components,
 * it may be sufficient to await `updateComplete` after state changes and before measuring.
 * However, because `updateComplete` does not await the update of all descendants,
 * we recommend using `ResizeObserver` as a more robust way to trigger measurement code when layouts change.
 *
 * 3. **Events**: It is a good practice to dispatch events from components after rendering has completed,
 * so that the event's listeners see the fully rendered state of the component.
 * To do so, you can await the `updateComplete` promise before firing the event.
 * 
 * Handling Errors
 * If you have an uncaught exception in a lifecycle method like `render()` or `update()`, it causes the `updateComplete` promise to reject. 
 * If you have code in a lifecycle method that can throw an exception, it's good practice to put it inside a `try/catch` statement.
 * You may also want to use a `try/catch` if you're awaiting the `updateComplete` promise:
 * ```ts
 * try {
 *   await this.updateComplete;
 * } catch (e) {
 *   // handle error
 * }
 * ```
 * 
 * In some cases, code may throw in unexpected places. As a fallback, you can add a handler for `window.onunhandledrejection` to catch these issues. 
 * e.g. you could use this report errors back to a backend service to help diagnose issues that are hard to reproduce.
 * ```ts
 * window.onunhandledrejection = function(e) {
 *   // handle error
 * }
 * ```
 */
@customElement("completing-update-element")
export class CompletingUpdateElement extends LitElement {
  @state()
  loggedIn = false;
  /**
   * `firstUpdated()`
   * Called after the component's DOM has been updated the first time, immediately before `updated()` is called.
   *
   * Arguments: `changedProperties`: Map with keys that are the names of changed properties
   * and values that are the corresponding previous values.
   *
   * Updates?  Yes. Property changes inside this method schedule a new update cycle.
   *
   * Call super? Not necessary.
   *
   * Called on server? No.
   *
   * Implement `firstUpdated()` to perform one-time work after the component's DOM has been created.
   * e.g. focusing a particular rendered element or adding a `ResizeObserver` or `IntersectionObserver` to an element.
   */
  override firstUpdated(_changedProperties: PropertyValues): void {
    console.log("[CompletingUpdateElement] firstUpdated", _changedProperties);
    const input = this.shadowRoot?.getElementById("complete-update");
    if (input) {
      input.focus();
    }
  }

  /**
   * `updated()`
   * Called whenever the component’s update finishes and the element's DOM has been updated and rendered.
   *
   * Arguments: `changedProperties`: Map with keys that are the names of changed properties
   * and values that are the corresponding previous values.
   *
   * Updates? Yes. Property changes inside this method trigger an element update.
   *
   * Call super? Not necessary.
   *
   * Called on server? No.
   *
   * Implement updated() to perform tasks that use element DOM after an update.
   * e.g. code that performs animation may need to measure the element DOM.
   */
  override updated(_changedProperties: PropertyValues): void {
    console.log("[CompletingUpdateElement] updated", _changedProperties);
    if (_changedProperties.has("collapsed")) {
      // this._measureDOM();
    }
  }

  async _loginClickHandler() {
    this.loggedIn = true;
    // Wait for `loggedIn` state to be rendered to the DOM
    await this.updateComplete;
    this.dispatchEvent(new Event("login"));
  }

  override render() {
    return html`
      <div>CompletingUpdateElement</div>
      <input type="text" id="complete-update" />
      <button @click=${this._loginClickHandler}>Login</button>
      <p>Logged in: ${this.loggedIn}</p>
    `;
  }
}
