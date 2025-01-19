import { LitElement, ReactiveElement, html } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * External Lifecycle Hooks: controllers and decorators
 * In addition to component classes implementing lifecycle callbacks, external code,
 * such as decorators may need to hook into a component's lifecycle.
 *
 * Lit offers two concepts for external code to integrate with the reactive update lifecycle:
 * - static `addInitializer()`
 * - static `addController()`
 *
 * `static addInitializer()`
 * `addInitializer()` allows code that has access to a Lit class definition to run code when instances of the class are constructed.
 * Useful when writing custom decorators.
 * Decorators are run at class definition time, and can do things like replace field and method definitions.
 * If they also need to do work when an instance is created, they must call `addInitializer()`.
 * It will be common to use this to add a reactive controller so decorators can hook into the component lifecycle:
 * ```ts
 * const myDecorator = (proto: ReactiveElement, key: string) => {
 *   const ctor = proto.constructor as typeof ReactiveElement;
 *
 *   ctor.addInitializer((instance: ReactiveElement) => {
 *     // This is run during construction of the element
 *     new MyController(instance);
 *   });
 * };
 * ```
 *
 * ```ts
 * class MyElement extends LitElement {
 *   @myDecorator foo;
 * }
 * ```
 *
 * Initializers are stored per-constructor. Adding an initializer to a subclass does not add it to a superclass.
 * Since initializers are run in constructors, initializers will run in order of the class hierarchy,
 * starting with superclasses and progressing to the instance's class.
 *
 * `addController()`
 * `addController()` adds a reactive controller to a Lit component so that the component invokes the controller's lifecycle callbacks.
 * See the Reactive Controller docs for more information.
 *
 * `removeController()`
 * `removeController()` removes a reactive controller so it no longer receives lifecycle callbacks from this component.
 */
@customElement("external-lifecycle-hooks")
export class ExternalLifecycleHooks extends LitElement {
  render() {
    return html`<div>ExternalLifecycleHooks</div>`;
  }
}
