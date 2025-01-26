import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

/**
 * Dispatching events
 * All DOM nodes can dispatch events using the dispatchEvent method.
 * First, create an event instance, specifying the event type and options.
 * Then pass it to dispatchEvent as follows:
 * ```ts
 * const event = new Event('my-event', {bubbles: true, composed: true});
 * myElement.dispatchEvent(event);
 * ```
 * The `bubbles` option allows the event to flow up the DOM tree to ancestors of the dispatching element.
 * It's important to set this flag if you want the event to be able to participate in event delegation.
 *
 * The `composed` option is useful to set to allow the event to be dispatched above the shadow DOM tree in which the element exists.
 *
 * Events should be dispatched in response to user interaction or asynchronous changes in the component's state.
 * They should generally not be dispatched in response to state changes made by the owner of the component via its property or attribute APIs.
 * This is generally how native web platform elements work.
 *
 * For example, when a user types a value into an input element a change event is dispatched,
 * but if code sets the input's value property, a change event is not dispatched.
 * Similarly, a menu component should dispatch an event when the user selects a menu item,
 * but it should not dispatch an event if, for example, the menu's selectedItem property is set.
 *
 * This typically means that a component should dispatch an event in response to another event to which it is listening.
 *
 * Events can be dispatched either by constructing an `Event` or a `CustomEvent`. Either is a reasonable approach.
 * When using a `CustomEvent`, any event data is passed in the event's detail property.
 * When using an `Event`, an event subclass can be made and custom API attached to it.
 * ```ts
 * // CustomEvent
 * const event = new CustomEvent('my-event', {
 *   detail: {
 *     message: 'Something important happened'
 *   }
 * });
 * this.dispatchEvent(event);
 *
 * // Standard Event
 * class MyEvent extends Event {
 *   constructor(message: string) {
 *     super();
 *     this.type = 'my-event';
 *     this.message = message;
 *   }
 * }
 * const event = new MyEvent('Something important happened');
 * this.dispatchEvent(event);
 * ```
 */
@customElement("my-dispatcher")
export class MyDispatcher extends LitElement {
  static styles = css`
    .border {
      border: 1px dotted lightblue;
    }
    .color {
      color: lightblue;
    }
  `;

  @query("input", true) _input!: HTMLInputElement;

  protected render() {
    return html`
      <div class="border">
        <p class="color">MyDispatcher</p>
        <p>Name: <input /></p>
        <p><button @click=${this._dispatchLogin}>Login</button></p>
      </div>
    `;
  }

  private _dispatchLogin() {
    console.log("[my-dispatcher] _dispatchLogin");
    const name = this._input.value.trim();
    if (name) {
      const options = {
        detail: { name },
        bubbles: true,
        composed: true,
      };
      this.dispatchEvent(new CustomEvent("mylogin", options));
    }
  }
}

@customElement("my-listener")
export class MyListener extends LitElement {
  static styles = css`
    .border {
      border: 1px dotted gray;
    }
  `;

  @property() name = "";

  protected render() {
    return html`
      <div class="border">
        <p>MyListener</p>
        <p @mylogin=${this._loginListener}><slot></slot></p>
        <p>Login: ${this.name}</p>
      </div>
    `;
  }

  private _loginListener(e: CustomEvent) {
    console.log("[my-listener] loginListener", e);
    this.name = e.detail.name;
  }
}

/**
 * Often, an event should be fired only after an element updates and renders.
 * This might be necessary if an event is intended to communicate a change in
 * rendered state based on user interaction. In this case, the component's
 * `updateComplete` Promise can be awaited after changing state, but before dispatching the event.
 */
@customElement("dispatching-events-after-an-element-updates")
export class DispatchingEventsAfterAnElementUpdates extends LitElement {
  @property({ type: Boolean }) open = true;

  protected render() {
    return html`
      <p>
        <button @click=${this._notify}>${this.open ? "Close" : "Open"}</button>
      </p>
      <p ?hidden=${!this.open}>Content!</p>
    `;
  }

  private async _notify() {
    console.log("[dispatching-events-after-an-element-updates] _notify");
    this.open = !this.open;
    await this.updateComplete;
    const name = this.open ? "opened" : "closed";
    this.dispatchEvent(
      new CustomEvent(name, { bubbles: true, composed: true })
    );
  }
}

@customElement("listener-after-an-element-updates")
export class ListenerAfterAnElementUpdates extends LitElement {
  @property({ type: Number }) height: number | null = null;

  protected render() {
    return html` <p @opened=${this._listener} @closed=${this._listener}>
        <slot></slot>
      </p>
      <p>Height: ${this.height}px</p>`;
  }

  protected updated() {
    console.log("[listener-after-an-element-updates] updated");
    if (this.height === null) {
      requestAnimationFrame(
        () => (this.height = this.getBoundingClientRect().height)
      );
    }
  }

  private _listener() {
    console.log("[listener-after-an-element-updates] _listener");
    this.height = null;
  }
}
