import { css, LitElement } from "lit";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * By default, an event dispatched inside a shadow root will not be visible outside that shadow root.
 * To make an event pass through shadow DOM boundaries, you must set the `composed` property to true.
 * It's common to pair `composed` with `bubbles` so that all nodes in the DOM tree can see the event
 *
 * If an event is composed and does bubble, it can be received by all ancestors of the element that dispatches
 * the event—including ancestors in outer shadow roots. If an event is composed but does not bubble,
 * it can only be received on the element that dispatches the event and on the host element containing the shadow root.
 *
 * Note that most standard user interface events, including all mouse, touch, and keyboard events,
 * are both bubbling and composed.
 *
 * Understanding event retargeting
 * Composed events dispatched from within a shadow root are retargeted, meaning that to any listener on
 * an element hosting a shadow root or any of its ancestors, they appear to come from the hosting element.
 * Since Lit components render into shadow roots, all composed events dispatched from inside a Lit component
 * appear to be dispatched by the Lit component itself. The event's target property is the Lit component.
 *
 * In advanced cases where it is required to determine the origin of an event, use the event.composedPath() API.
 * This method returns an array of all the nodes traversed by the event dispatch, including those within shadow roots.
 * Because this breaks encapsulation, care should be taken to avoid relying on implementation details that may be exposed.
 * Common use cases include determining if the element clicked was an anchor tag, for purposes of client-side routing.
 * ```ts
 * handleMyEvent(event) {
 *   console.log('Origin: ', event.composedPath()[0]);
 * }
 * ```
 */
@customElement("understanding-composed-event-dispatching")
export class UnderstandingComposedEventDispatching extends LitElement {
  protected render() {
    return html`
      <div
        @myBubbleEvent=${this._bubbleListener}
        @myBubbleComposedEvent=${this._bubbleComposedListener}
        @myComposedEvent=${this._composedListener}
      >
        <slot></slot>
      </div>
    `;
  }

  private _bubbleListener(e: CustomEvent) {
    console.log("understanding-composed-event-dispatching myBubbleEvent", e);
  }

  private _bubbleComposedListener(e: CustomEvent) {
    console.log(
      "understanding-composed-event-dispatching myBubbleComposedEvent",
      e
    );
  }

  private _composedListener(e: CustomEvent) {
    console.log("understanding-composed-event-dispatching myComposedEvent", e);
  }
}

@customElement("bubble-event-dispatcher")
export class BubbleEventDispatcher extends LitElement {
  protected render() {
    return html`<button @click=${this._dispatchBubble}>
      Click me (Bubbles)
    </button>`;
  }

  private _dispatchBubble() {
    console.log("bubble-event-dispatcher myBubbleEvent");
    // // To make an event pass through shadow DOM boundaries, you must set the `composed` property to true.
    // const myBubbleEvent = new CustomEvent("myBubbleEvent", {
    //   detail: { message: "myBubbleEvent happened." },
    //   bubbles: true,
    //   composed: false,
    // });
    // this.dispatchEvent(myBubbleEvent);

    // The event will be dispatched from within a nested shadow root. Now you'll see that the event with composed:
    // false won't be visible to the outer components because it can't cross the shadow DOM boundary.
    // Only events with composed: true will be able to cross shadow DOM boundaries.
    console.log("bubble-event-dispatcher myBubbleEvent");
    const myBubbleEvent = new CustomEvent("myBubbleEvent", {
      detail: { message: "myBubbleEvent happened." },
      bubbles: true,
      composed: false,
    });
    // Create a new shadow root to dispatch the event from
    const div = document.createElement("div");
    const shadow = div.attachShadow({ mode: "open" });
    shadow.innerHTML = "<span>Event Source</span>";
    this.shadowRoot?.appendChild(div);
    // Dispatch from within the new shadow root
    shadow.querySelector("span")?.dispatchEvent(myBubbleEvent);
  }
}

@customElement("bubble-event-listener")
export class BubbleEventListener extends LitElement {
  static styles = css`
    .border {
      border: 1px dotted gray;
    }
  `;

  @property() msg = "";
  
  protected render() {
    return html`
      <div class="border">
        <div @myBubbleEvent=${this._bubbleListener}>
          <slot></slot>
        </div>
        <p>Event msg: ${this.msg}</p>
      </div>
    `;
  }
  
  private _bubbleListener(e: CustomEvent) {
    console.log("bubble-event-listener myBubbleEvent", e);
    this.msg = e.detail.message;
  }
}

@customElement("bubble-composed-event-dispatcher")
export class BubbleComposedEventDispatcher extends LitElement {
  protected render() {
    return html`<button @click=${this._dispatchBubbleComposed}>
      Click me (Bubbles & Composed)
    </button>`;
  }
  
  private _dispatchBubbleComposed() {
    console.log("bubble-composed-event-dispatcher myBubbleComposedEvent");
    // const myBubbleComposedEvent = new CustomEvent("myBubbleComposedEvent", {
    //   detail: { message: "myBubbleComposedEvent happened." },
    //   bubbles: true,
    //   composed: true,
    // });
    // this.dispatchEvent(myBubbleComposedEvent);
    const myBubbleComposedEvent = new CustomEvent("myBubbleComposedEvent", {
      detail: { message: "myBubbleComposedEvent happened." },
      bubbles: true,
      composed: true,
    });
    // Create a new shadow root to dispatch the event from
    const div = document.createElement("div");
    const shadow = div.attachShadow({ mode: "open" });
    shadow.innerHTML = "<span>Event Source</span>";
    this.shadowRoot?.appendChild(div);
    // Dispatch from within the new shadow root
    shadow.querySelector("span")?.dispatchEvent(myBubbleComposedEvent);
  }
}

@customElement("bubble-composed-event-listener")
export class BubbleComposedEventListener extends LitElement {
  static styles = css`
    .border {
      border: 1px dotted gray;
    }
  `;

@property() msg = "";

  protected render() {
    return html`
      <div class="border">
        <div @myBubbleComposedEvent=${this._bubbleComposedListener}>
          <slot></slot>
        </div>
        <p>Event msg: ${this.msg}</p>
      </div>
    `;
  }

  private _bubbleComposedListener(e: CustomEvent) {
    console.log("bubble-composed-event-listener myBubbleComposedEvent", e);
    this.msg = e.detail.message;
  }
}

@customElement("composed-event-dispatcher")
export class ComposedEventDispatcher extends LitElement {
  protected render() {
    return html`<button @click=${this._dispatchComposed}>
      Click me (Composed)
    </button>`;
  }

  private _dispatchComposed() {
    console.log("composed-event-dispatcher myComposedEvent");
    // const myComposedEvent = new CustomEvent("myComposedEvent", {
    //   detail: { message: "myComposedEventt happened." },
    //   bubbles: false,
    //   composed: true,
    // });
    // this.dispatchEvent(myComposedEvent);
    const myComposedEvent = new CustomEvent("myComposedEvent", {
      detail: { message: "myComposedEvent happened." },
      bubbles: false,
      composed: true,
    });
    // Create a new shadow root to dispatch the event from
    const div = document.createElement("div");
    const shadow = div.attachShadow({ mode: "open" });
    shadow.innerHTML = "<span>Event Source</span>";
    this.shadowRoot?.appendChild(div);
    // Dispatch from within the new shadow root
    shadow.querySelector("span")?.dispatchEvent(myComposedEvent);
  }
}

@customElement("composed-event-listener")
export class ComposedEventListener extends LitElement {
  @property() msg = "";

  protected render() {
    return html`<div @myComposedEvent=${this._composedListener}>
      <slot></slot>
    </div>`;
  }

  private _composedListener(e: CustomEvent) {
    console.log("composed-event-listener myComposedEvent", e);
    this.msg = e.detail.message;
  }
}
