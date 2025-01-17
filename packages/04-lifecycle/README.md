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

### The changedProperties map

Many reactive update methods receive a Map of changed properties. The Map keys are the property names and its values are the previous property values. You can always find the current property values using `this.property` or `this[property]`.

If you're less concerned with strong typing—or you're only checking the property names, not the previous values—you could use a less restrictive type like `Map<string, any>`.

```ts
import {LitElement, html, PropertyValues} from 'lit';
...
  shouldUpdate(changedProperties: PropertyValues<this>) {
    ...
  }
```

Note that `PropertyValues<this>` doesn't recognize protected or private properties. If you're checking any protected or private properties, you'll need to use a less restrictive type.

Changed properties during an update
Changing a property during the update (up to and including the render() method) updates the changedProperties map, but doesn't trigger a new update. Changing a property after render() (for example, in the updated() method) triggers a new update cycle, and the changed property is added to a new changedProperties map to be used for the next cycle.

### Triggering an update
An update is triggered when a reactive property changes or the requestUpdate() method is called. Since updates are performed asynchronously, any and all changes that occur before the update is performed result in only a single update.

`hasChanged()`
Called when a reactive property is set. By default `hasChanged()` does a strict equality check and if it returns true, an update is scheduled. See configuring `hasChanged()` for more information.

`requestUpdate()`
Call `requestUpdate()` to schedule an explicit update. This can be useful if you need the element to update and render when something not related to a property changes. For example, a timer component might call `requestUpdate()` every second.

```ts
connectedCallback() {
  super.connectedCallback();
  this._timerInterval = setInterval(() => this.requestUpdate(), 1000);
}

disconnectedCallback() {
  super.disconnectedCallback();
  clearInterval(this._timerInterval);
}
```

Optionally, you can pass a property name and a previous value when calling `requestUpdate()`, which will be stored in the changedProperties map. This can be useful if you implement a custom getter and setter for a property. See Reactive properties for more information about implementing custom getters and setters.

```ts
this.requestUpdate('state', this._previousState);
```

### Performing an update

