import { LitElement } from "lit";
import { html } from "lit";
import { customElement } from "lit/decorators.js";

/**
 * Customizing the render root
 * Each Lit component has a render root, a DOM node that serves as a container for its internal DOM.
 * By default, LitElement creates an open shadowRoot and renders inside it, producing the following DOM structure:
 * ```
 * <my-element>
 *   #shadow-root
 *     <p>child 1</p>
 *     <p>child 2</p>
 * </my-element>
 * ```
 * There are two ways to customize the render root used by LitElement:
 * - Setting `shadowRootOptions`.
 * - Implementing the `createRenderRoot` method.
 */
@customElement('customize-render-root-open')
export class CustomizeRenderRootOpen extends LitElement {
  /**
   * ShadowRootMode "open"
   * - Shadow root can be accessed from outside the component using `element.shadowRoot`
   * - Shadow DOM is easily inspectable in browser dev tools
   * - Most web components use "open" mode because it's more practical for:
   *   - Testing
   *   - Debugging
   *   - Component composition
   *   - Third-party tooling
   * - Very few use cases actually need "closed" mode (mainly browser internals like <video> controls)
   */
  static shadowRootOptions = {
    mode: "open" as ShadowRootMode,
  };
  render() {
    return html`<slot></slot>`;
  }
}

@customElement("customize-render-root-closed")
export class CustomizeRenderRootClosed extends LitElement {
  /**
   * ShadowRootMode "closed"
   * - Returns null when trying to access `element.shadowRoot` from outside
   * - More difficult to inspect (though modern browsers can still show it)
   * - Very few use cases actually need "closed" mode (mainly browser internals like <video> controls)
   */
  static shadowRootOptions = {
    mode: "closed" as ShadowRootMode,
  };
  render() {
    return html`<slot></slot>`;
  }
}

class DelegatesFocus extends LitElement {
  /**
   * Setting `shadowRootOptions`
   * The simplest way to customize the render root is to set the shadowRootOptions static property.
   * The default implementation of `createRenderRoot` passes `shadowRootOptions` as the options argument to attachShadow when creating the component's shadow root.
   * It can be set to customize any options allowed in the ShadowRootInit dictionary, for example mode and delegatesFocus.
   * 
   * WARN:
   * Rendering into children. Rendering into children and not shadow DOM is generally not recommended. 
   * Your element will not have access to DOM or style scoping, and it will not be able to compose elements into its internal DOM.
   */
  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
}

@customElement('light-dom')
export class LightDom extends LitElement {
  protected render() {
    return html`
      <p>Custom rendering without shadow DOM (note, styling leaks in).</p>
    `;
  }
  /**
   * The default implementation of createRenderRoot creates an open shadow root and 
   * adds to it any styles set in the static styles class field.
   * To customize a component's render root, implement createRenderRoot and return the node you want the template to render into.
   * For example, to render the template into the main DOM tree as your element's children, implement createRenderRoot and return this.
   */
  protected createRenderRoot() {
    return this;
  }
}