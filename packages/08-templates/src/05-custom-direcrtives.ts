import { ChildPart, LitElement } from "lit";
import { html } from "lit";
import { AsyncDirective } from "lit/async-directive.js";
import { customElement } from "lit/decorators.js";
import { Directive, directive, PartInfo } from "lit/directive.js";

/**
 * Custom Directives
 * Directives are functions that can extend Lit by customizing how a template expression renders.
 * Directives are useful and powerful because they can be stateful,
 * access the DOM, be notified when templates are disconnected and reconnected,
 * and independently update expressions outside of a render call.
 *
 * Using a directive in your template is as simple as calling a function in a template expression:
 * ```
 * html`<div>
 *    ${fancyDirective('some text')}
 * </div>`
 * ```
 *
 * There are two kinds of directives:
 * - Simple functions
 * - Class-based directives
 *
 * A class-based directive lets you do things that a simple function can't. Use a class based directive to:
 * - Access the rendered DOM directly (for example, add, remove, or reorder rendered DOM nodes).
 * - Persist state between renders.
 * - Update the DOM asynchronously, outside of a render call.
 * - Clean up resources when the directive is disconnected from the DOM
 *
 * Some directives need to update the DOM asynchronously, outside of the normal update cycle.
 * To create an async directive, extend the AsyncDirective base class instead of Directive
 *
 * The directive class has a few built-in lifecycle methods:
 * - The class constructor, for one-time initialization.
 * - render(), for declarative rendering.
 * - update(), for imperative DOM access.
 *
 * You must implement the render() callback for all directives. Implementing update() is optional.
 * The default implementation of update() calls and returns the value from render().
 *
 * Async directives, which can update the DOM outside of the normal update cycle, use some additional lifecycle callbacks.
 * You must implement the render() callback for all directives. Implementing update() is optional.
 * The default implementation of update() calls and returns the value from render().
 *
 * Async directives, which can update the DOM outside of the normal update cycle, use some additional lifecycle callbacks.
 */
class HelloDirective extends Directive {
  render() {
    return html`<div>Hello</div>`;
  }
}

// Create the directive function
export const hello = directive(HelloDirective);

@customElement("using-hello-directive")
export class UsingHelloDirective extends LitElement {
  render() {
    return html`<div>${hello()}</div>`;
  }
}

/**
 * A simple function returns a value to render. It can take any number of arguments, or no arguments at all.
 */
export const noVowels = (str: string) => str.replaceAll(/[aeiou]/gi, "x");

class MyDirective extends Directive {
  // Class fields will be initialized once and can be used to persist
  // state between renders
  value = 0;

  /**
   * The constructor receives a single PartInfo object, which provides metadata about the expression the directive was used in.
   * This can be useful for providing error checking in the cases where a directive is designed to be used only in specific types of expressions
   *
   * Constructor is only run the first time a given directive is used in an expression
   */
  constructor(partInfo: PartInfo) {
    super(partInfo);
    console.log("MyDirective created: ", partInfo);
  }
}

/**
 * In addition to referring to state on the directive instance,
 * the render() method can also accept arbitrary arguments passed in to the directive function
 */
class MaxDirective extends Directive {
  maxValue = Number.MIN_VALUE;
  // Define a render method, which may accept arguments:
  render(value: number, minValue = Number.MIN_VALUE) {
    this.maxValue = Math.max(value, this.maxValue, minValue);
    return this.maxValue;
  }
}

export const max = directive(MaxDirective);
// Call the directive with `value` and `minValue` arguments defined for `render()`:
// const template = html`<div>${max(someNumber, 0)}</div>`;

// Renders attribute names of parent element to textContent
class AttributeLogger extends Directive {
  attributeNames = "";

  /**
   * Imperative DOM access
   * In more advanced use cases, your directive may need to access the underlying DOM
   * and imperatively read from or mutate it. You can achieve this by overriding the update() callback.
   *
   * The update() callback receives two arguments:
   * - A Part object with an API for directly managing the DOM associated with the expression.
   * - An array containing the render() arguments.
   *
   * Your update() method should return something Lit can render, or the special value `noChange`
   * if no re-rendering is required. The update() callback is quite flexible, but typical uses include:
   * - Reading data from the DOM, and using it to generate a value to render.
   *  - Imperatively updating the DOM using the element or parentNode reference on the Part object.
   *
   * Parts
   * Each expression position has its own specific Part object:
   * - ChildPart for expressions in HTML child position.
   * - AttributePart for expressions in HTML attribute value position.
   * - BooleanAttributePart for expressions in a boolean attribute value (name prefixed with ?).
   * - EventPart for expressions in an event listener position (name prefixed with @).
   * - PropertyPart for expressions in property value position (name prefixed with .).
   * - ElementPart for expressions on the element tag.
   *
   *  In addition to the part-specific metadata contained in PartInfo,
   *  all Part types provide access to the DOM element associated with the expression (or parentNode, in the case of ChildPart
   *
   * To be compatible with SSR, directives should return values from render() and only use update() for logic that requires access to the DOM.
   */
  update(part: ChildPart) {
    this.attributeNames = (part.parentNode as Element)
      .getAttributeNames?.()
      .join(" ");
    // The default implementation of update() simply calls and returns the value from render().
    // If you override update() and still want to call render() to generate a value, you need to call render() explicitly.
    return this.render();
  }

  render() {
    return this.attributeNames;
  }
}

export const attributeLogger = directive(AttributeLogger);

export const attributeLoggerTemplate = html`<div a b>
  ${attributeLogger()}
</div>`;
// Renders: `<div a b>a b</div>`

/**
 * Async directives
 * To update a directive's result asynchronously, a directive needs to extend the AsyncDirective base class,
 * which provides a setValue() API. setValue() allows a directive to "push" a new value into its template expression,
 * outside of the template's normal update/render cycle.
 *
 * Async directives often need to subscribe to external resources.
 * To prevent memory leaks, async directives should unsubscribe or dispose of resources when the directive instance is no longer in use.
 * For this purpose, AsyncDirective provides the following extra lifecycle callbacks and API:
 *
 * - disconnected(): Called when a directive is no longer in use. Directive instances are disconnected in three cases:
 *   - When the DOM tree the directive is contained in is removed from the DOM
 *   - When the directive's host element is disconnected
 *   - When the expression that produced the directive no longer resolves to the same directive.
 * After a directive receives a disconnected callback, it should release all resources it may have subscribed to during update or render to prevent memory leaks.
 *
 * - reconnected(): Called when a previously disconnected directive is being returned to use.
 * Because DOM subtrees can be temporarily disconnected and then reconnected again later,
 * a disconnected directive may need to react to being reconnected. Examples of this include
 * when DOM is removed and cached for later use, or when a host element is moved causing
 * a disconnection and reconnection. The reconnected() callback should always be implemented alongside disconnected(),
 * in order to restore a disconnected directive back to its working state.
 *
 * - isConnected: Reflects the current connection state of the directive.
 *
 * Note that it is possible for an AsyncDirective to continue receiving updates while it is disconnected if its containing tree is re-rendered.
 * Because of this, update and/or render should always check the this.isConnected flag before subscribing to any long-held resources to prevent memory leaks.
 */
class ResolvePromise extends AsyncDirective {
  render(promise: Promise<unknown>) {
    Promise.resolve(promise).then((resolvedValue) => {
      // Rendered asynchronously:
      this.setValue(resolvedValue);
    });

    // Rendered synchronously:
    return `Waiting for promise to resolve`;
  }
}

export const resolvePromise = directive(ResolvePromise);
