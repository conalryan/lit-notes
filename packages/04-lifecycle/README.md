# Lifecycle

## Standard custom element lifecycle

Lit components are standard custom elements and inherit the custom element lifecycle methods. 
In addition Lit introduces a reactive update cycle that renders changes to DOM when reactive properties change.
For information about the custom element lifecycle, see [Using the lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks) on MDN.

Custom element lifecycle callbacks include:
- `connectedCallback()`: called each time the element is added to the document. The specification recommends that, as far as possible, developers should implement custom element setup in this callback rather than the constructor.
- `disconnectedCallback()`: called each time the element is removed from the document.
- `adoptedCallback()`: called each time the element is moved to a new document.
- `attributeChangedCallback()`: called when attributes are changed, added, removed, or replaced. See [Responding to attribute changes](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements#responding_to_attribute_changes) for more details about this callback.

```js
// Create a class for the element
class MyCustomElement extends HTMLElement {
  static observedAttributes = ["color", "size"];

  constructor() {
    // Always call super first in constructor
    super();
  }

  connectedCallback() {
    console.log("Custom element added to page.");
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`Attribute ${name} has changed.`);
  }
}

customElements.define("my-custom-element", MyCustomElement);
```

If you need to customize any of the standard custom element lifecycle methods, make sure to call the `super` implementation (such as `super.connectedCallback()`) so the standard Lit functionality is maintained.

## Reactive update cycle
In addition to the standard custom element lifecycle, Lit components also implement a reactive update cycle.

The reactive update cycle is triggered when a reactive property changes or when the `requestUpdate()` method is explicitly called. Lit performs updates asynchronously so property changes are batched

Updates happen at microtask timing, which means they occur before the browser paints the next frame to the screen. See [Jake Archibald's article](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) on microtasks for more information about browser timing.

At a high level, the reactive update cycle is:
1. An update is scheduled when one or more properties change or when `requestUpdate()` is called.
2. The update is performed prior to the next frame being painted.
    1. Reflecting attributes are set.
    2. The component’s render method is called to update its internal DOM.
3. The update is completed and the `updateComplete` promise is resolved.
