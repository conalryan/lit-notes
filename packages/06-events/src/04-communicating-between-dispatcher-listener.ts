import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * communicating-between-the-event-dispatcher-and-listener
 * Events exist primarily to communicate changes from the event dispatcher to the event listener,
 * but events can also be used to communicate information from the listener back to the dispatcher.
 *
 * One way you can do this is to expose API on events which listeners can use to customize component behavior.
 * For example, a listener can set a property on a custom event's detail property which the dispatching component then uses to customize behavior.
 *
 * Another way to communicate between the dispatcher and listener is via the `preventDefault()` method.
 * It can be called to indicate the event's standard action should not occur. When the listener calls `preventDefault()`,
 * the event's `defaultPrevented` property becomes true. This flag can then be used by the listener to customize behavior.
 */
@customElement("communicating-between-dispatcher-listener-dispatcher")
export class CommunicatingBetweenDispatcherListenerDispatcher extends LitElement {
  defaultMessage = "🙂";

  /** Property that is used in the event message */
  @property() message = this.defaultMessage;

  private _resetMessage?: ReturnType<typeof setTimeout>;

  protected render() {
    return html`
      <label>
        <input type="checkbox" @click=${this._tryChange} />
        Check me!
      </label>
      <div>${this.message}</div>
    `;
  }

  protected updated() {
    clearTimeout(this._resetMessage);
    this._resetMessage = setTimeout(
      () => (this.message = this.defaultMessage),
      1000
    );
  }

  private _tryChange(e: Event) {
    // Used the property in the event message
    const detail = { message: this.message };
    const event = new CustomEvent("checked", {
      detail,
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
    if (event.defaultPrevented) {
      e.preventDefault();
    }
    this.message = detail.message;
  }
}

@customElement("communicating-between-dispatcher-listener-listener")
export class CommunicatingBetweenDispatcherListenerListener extends LitElement {
  @property({ type: Boolean }) canCheck = false;

  protected render() {
    return html`
      <p @checked=${this._checkedHandler}>
        <slot></slot>
      </p>
      <p>${this.canCheck ? "Allowing" : "Preventing"} check</p>
      <p><button @click=${this._clickHandler}>Toggle</button></p>
    `;
  }

  private _checkedHandler(e: CustomEvent) {
    if (!this.canCheck) {
      e.preventDefault();
      e.detail.message = "✅ Prevented!!";
    }
  }

  private _clickHandler() {
    this.canCheck = !this.canCheck;
  }
}
