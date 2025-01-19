import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("child-element")
export class ChildElement extends LitElement {
  render() {
    return html`<div>Child Element</div>`;
  }
}

/**
 * less-common methods for customizing the update cycle.
 *
 * `performUpdate()`
 * Implements the reactive update cycle, calling the other methods, like `shouldUpdate()`, `update()`, and `updated()`  .
 * Call `performUpdate()` to immediately process a pending update.
 * This should generally not be needed, but it can be done in rare cases when you need to update synchronously.
 * (If there is no update pending, you can call `requestUpdate()` followed by `performUpdate()` to force a synchronous update.)
 *
 * `hasUpdated()`
 * The hasUpdated property returns true if the component has updated at least once.
 * You can use hasUpdated in any of the lifecycle methods to perform work only if the component has not yet updated.
 */
@customElement("customize-update-element")
export class CustomizeUpdateElement extends LitElement {
  private _myChild!: ChildElement;

  /**
   * Override `scheduleUpdate()` to customize the timing of the update.
   * `scheduleUpdate()` is called when an update is about to be performed, and by default it calls `performUpdate()` immediately.
   * Override it to defer the update—this technique can be used to unblock the main rendering/event thread.
   *
   * Async function optional.
   * This example shows an async function which _implicitly_ returns a promise.
   * You can also write `scheduleUpdate()` as a function that _explicitly_ returns a Promise.
   * In either case, the next update doesn't start until the promise returned by `scheduleUpdate()` resolves.
   */
  protected override async scheduleUpdate(): Promise<void> {
    console.log("[CustomizeUpdateElement] scheduleUpdate");
    // the following code schedules the update to occur after the next frame paints,
    // which can reduce jank if the update is expensive:
    await new Promise((resolve) => setTimeout(resolve));
    // If you override scheduleUpdate(), it's your responsibility to call super.scheduleUpdate() to perform the pending update.
    super.scheduleUpdate();
  }

  /**
   * `getUpdateComplete()`
   * Used to await additional conditions before fulfilling the updateComplete promise.
   * e.g. to await the update of a child element.
   * First await `super.getUpdateComplete`(), then any subsequent state.
   *
   * It's recommended to override the `getUpdateComplete()` method instead of the `updateComplete` getter
   * to ensure compatibility with users who are using TypeScript's ES5 output (see TypeScript#338).
   */
  async getUpdateComplete() {
    console.log("[CustomizeUpdateElement] getUpdateComplete");
    const result = await super.getUpdateComplete();
    await this._myChild.updateComplete;
    return result;
  }

  protected firstUpdated(): void {
    console.log("[CustomizeUpdateElement] firstUpdated");
    this._myChild = this.shadowRoot!.querySelector("child-element")!;
  }

  render() {
    return html`
      <div>CustomizeUpdateElement</div>
      <child-element></child-element>
    `;
  }
}
