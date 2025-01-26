import { LitElement, html } from "lit";
import { customElement, eventOptions, property } from "lit/decorators.js";

/**
 * Adding event listeners in the element template
 * You can use @ expressions in your template to add event listeners to elements in your component's template.
 * Declarative event listeners are added when the template is rendered.
 */
@customElement("listeners-in-the-element-template")
export class ListenersInTheElementTemplate extends LitElement {
  @property({ type: Number }) count = 0;
  protected render() {
    return html`
      <p><button @click="${this._increment}">Click Me!</button></p>
      <p>Click count: ${this.count}</p>
    `;
  }
  private _increment(e: Event) {
    console.log("[listeners-in-the-element-template::_increment", e);
    this.count++;
  }
}

/**
 * Events
 * In addition to the standard `addEventListener` API, Lit introduces a declarative way to add event listeners.
 *
 * Customizing event listener options
 * If you need to customize the event options used for a declarative event listener (like passive or capture),
 * you can specify these on the listener using the @eventOptions decorator.
 * The object passed to @eventOptions is passed as the options parameter to addEventListener.
 */
@customElement("customizing-event-listener-options")
export class CustomizingEventListenerOptions extends LitElement {
  /**
   * AddEventListenerOptions:
   * - once?: boolean;
   * - passive?: boolean;
   * - signal?: AbortSignal; -> extends EventTarget
   * - capture?: boolean;
   *
   * passive
   * - true is a performance optimization that tells the browser that the event handler will not call `preventDefault()`.
   * - the browser knows that the event handler won't try to prevent the default behavior of the event (like scrolling for touch events)
   * - This allows the browser to immediately begin processing the event (like scrolling) without waiting for your event handler to complete,
   *    resulting in smoother scrolling and better performance
   * - This is particularly important for touch and wheel events on mobile devices, where scrolling performance is crucial
   * ```ts
   * // Without passive: true, browser must wait to see if preventDefault() is called
   * element.addEventListener('touchstart', handler, { passive: false });
   *
   * // With passive: true, browser knows it can start scrolling immediately
   * element.addEventListener('touchstart', handler, { passive: true });
   * ```
   *
   * You should use passive: false when you need to call preventDefault() in your event handler. This is typically necessary in these scenarios:
   * - Touch events where you want to prevent scrolling
   * - Wheel events where you want to prevent scrolling
   * - Custom drag and drop implementations
   * - Custom scrolling behaviors
   * - Form submission handling where you want to prevent the default form submission
   */
  @eventOptions({ passive: true })
  private _dblclick(e: Event) {
    console.log("customizing-event-listener-options::_dblclick", e);
  }

  @eventOptions({ passive: false })
  private _handleTouchStart(e: TouchEvent) {
    // Prevent scrolling when touching specific elements
    if (/**shouldPreventScroll() */ true) {
      e.preventDefault();
    }
  }

  @eventOptions({ passive: false })
  private _handleWheel(e: WheelEvent) {
    // Implement custom scrolling behavior
    e.preventDefault();
    // Custom scroll logic here
  }

  @property({ type: Number }) count = 0;

  protected render() {
    return html`
      <p>
        <button @dblclick="${this._dblclick}" @click="${this._increment}">
          Click Me!
        </button>
      </p>
      <p>Click count: ${this.count}</p>
      <div
        @touchstart="${this._handleTouchStart}"
        @wheel="${this._handleWheel}"
      >
        Content here...
      </div>
      <!-- 
        If you're not using decorators, you can customize event listener options by passing an object to the event listener expression. 
        The object must have a \`handleEvent()\` method and can include any the options that would normally appear in the \`options\` argument to \`addEventListener()\`.
      -->
      <button
        @click=${{
          handleEvent: (event: Event) => this._increment(event),
          once: true,
        }}
      >
        click
      </button>
    `;
  }

  private _increment(e: Event) {
    this.count++;
    console.log(e.type);
  }
}

@customElement("listeners-on-the-component-or-shadow-dom")
export class ListenersOnTheComponentOrShadowDom extends LitElement {
  @property() hostName = "";
  @property() shadowName = "";
  /**
   * To be notified of an event dispatched from the component's slotted children
   * as well as children rendered into shadow DOM via the component template,
   * you can add a listener to the component itself using the standard `addEventListener` DOM method.
   *
   * The component constructor is a good place to add event listeners on the component.
   *
   * Adding event listeners to the component itself is a form of event delegation
   * and can be done to reduce code or improve performance.
   * Typically, the event's target property is used to take action based on which element fired the event.
   */
  constructor() {
    super();
    this.addEventListener("click", (e: Event) => {
      // However, events fired from the component's shadow DOM are retargeted
      // when heard by an event listener on the component.
      // This means the event target is the component itself.
      this.hostName = (e.target as Element).localName;
      console.log("listeners-on-the-component-or-shadow-dom::constructor", e);
    });
  }
  /**
   * Retargeting can interfere with event delegation, and to avoid it, event listeners
   * can be added to the component's shadow root itself. Since the `shadowRoot` is not
   * available in the constructor, event listeners can be added in the `createRenderRoot`
   * method as follows. Please note that it's important to make sure to return the
   * shadow root from the `createRenderRoot` method.
   */
  protected createRenderRoot() {
    const root = super.createRenderRoot();
    root.addEventListener("click", (e: Event) => {
      this.shadowName = (e.target as Element).localName;
      console.log(
        "listeners-on-the-component-or-shadow-dom::createRenderRoot",
        e
      );
    });
    return root;
  }
  protected render() {
    return html`
      <p><button>Click Me!</button></p>
      <p>Component target: ${this.hostName}</p>
      <p>Shadow target: ${this.shadowName}</p>
    `;
  }
}

/**
 * If your component adds an event listener to anything except itself or its templated
 * DOM – for example, to `Window`, `Document`, or some element in the main DOM –
 * you should add the listener in `connectedCallback` and remove it in
 * `disconnectedCallback`.
 *
 * Removing the event listener in `disconnectedCallback` ensures that any memory allocated
 * by your component will be cleaned up when your component is destroyed or disconnected
 * from the page.
 *
 * Adding the event listener in `connectedCallback` (instead of, for example, the constructor
 * or `firstUpdated`) ensures that your component will re-create its event listener if it is
 * disconnected and subsequently reconnected to DOM.
 */
@customElement("listeners-on-other-elements")
export class ListenersOnOtherElements extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("resize", this._handleResize);
  }

  disconnectedCallback() {
    window.removeEventListener("resize", this._handleResize);
    super.disconnectedCallback();
  }
  protected render() {
    return html` <p><button>Click Me!</button></p> `;
  }

  private _handleResize(e: Event) {
    console.log("listeners-on-other-elements::_handleResize", e);
  }
}

/**
 * Optimizing Performance
 * Adding event listeners is extremely fast and typically not a performance concern.
 * However, for components that are used in high frequency and need a lot of event listeners,
 * you can optimize first render performance by reducing the number of listeners used via
 * event delegation and adding listeners asynchronously after rendering.
 *
 * Event delegation
 * Using event delegation can reduce the number of event listeners used and therefore improve performance.
 * It is also sometimes convenient to centralize event handling to reduce code.
 * Event delegation can only be use to handle events that bubble.
 *
 * Bubbling events can be heard on any ancestor element in the DOM.
 * You can take advantage of this by adding a single event listener on an ancestor
 * component to be notified of a bubbling event dispatched by any of its descendants
 * in the DOM. Use the event's target property to take specific action based on the
 * element that dispatched the event.
 */
@customElement("event-delegation")
export class EventDelegation extends LitElement {
  @property() clicked = "";

  protected render() {
    return html`
      <div @click="${this._clickHandler}">
        <button>Item 1</button>
        <button>Item 2</button>
        <button>Item 3</button>
      </div>
      <p>Clicked: ${this.clicked}</p>
    `;
  }

  private _clickHandler(e: Event) {
    this.clicked =
      e.target === e.currentTarget
        ? "container"
        : (e.target as HTMLDivElement).textContent!;
  }
}

/**
 * Asynchronously adding event listeners
 * To add an event listener after rendering, use the firstUpdated method.
 * This is a Lit lifecycle callback which runs after the component first updates
 * and renders its templated DOM.
 */
@customElement("asynchronously-adding-event-listeners")
export class AsynchronouslyAddingEventListeners extends LitElement {
  /**
   * The firstUpdated callback fires after the first time your component has been
   * updated and called its render method, but before the browser has had a chance
   * to paint.
   */
  async firstUpdated() {
    // Give the browser a chance to paint
    await new Promise((r) => setTimeout(r, 0));
    this.addEventListener("click", this._handleClick);
  }

  protected render() {
    return html` <p><button>Click Me!</button></p> `;
  }

  private _handleClick(e: Event) {
    console.log("asynchronously-adding-event-listeners::_handleClick", e);
  }
}

/**
 * Understanding this in event handlers
 * Event listeners added using the declarative `@` syntax in the template are automatically bound to the component.
 * Therefore, you can use `this` to refer to your component instance inside any declarative event handler:
 */
@customElement("understanding-this-in-event-handlers")
export class UnderstandingThisInEventHandlers extends LitElement {
  @property() prop = "some value";

  constructor() {
    super();
    window.addEventListener("resize", this._handleResize);
  }

  render() {
    return html`<button @click="${this._handleClick}">click</button>`;
  }

  private _handleClick(e: Event) {
    console.log(
      "understanding-this-in-event-handlers::_handleClick",
      e,
      this.prop
    );
  }

  /**
   * When adding listeners imperatively with addEventListener,
   * you'll want to use an arrow function so that this refers to the component:
   */
  private _handleResize = () => {
    // `this` refers to the component
    console.log(
      "understanding-this-in-event-handlers::_handleResize",
      this.prop
    );
  };
}

/**
 * Listening to events fired from repeated templates
 * When listening to events on repeated items, it's often convenient to use event delegation if the event bubbles.
 * When an event does not bubble, a listener can be added on the repeated elements.
 *
 * Removing event listeners
 * Passing null, undefined or nothing to an @ expression will cause any existing listener to be removed.
 */
@customElement("listening-to-events-fired-from-repeated-templates")
export class ListeningToEventsFiredFromRepeatedTemplates extends LitElement {
  @property() clicked = "";
  
  @property() focused = "";

  data = [1, 2, 3];

  protected render() {
    return html`
      <div key="container" @click=${this._clickHandler}>
        ${this.data.map(
          (i) => html`
            <button key=${i} @focus=${this._focusHandler}>Item ${i}</button>
          `
        )}
      </div>
      <p>Clicked: ${this.clicked}</p>
      <p>Focused: ${this.focused}</p>
    `;
  }

  private _clickHandler(e: Event) {
    this.clicked = (e.target as Element).getAttribute("key")!;
  }

  private _focusHandler(e: Event) {
    this.focused = (e.target as Element).textContent!;
  }
}
