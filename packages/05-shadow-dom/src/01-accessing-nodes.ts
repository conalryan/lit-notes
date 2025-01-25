import { LitElement, html } from "lit";
import { customElement, query, queryAll, queryAsync } from "lit/decorators.js";

/**
 * Lit components use shadow DOM to encapsulate their DOM.
 * Shadow DOM provides a way to add a separate isolated and encapsulated DOM tree to an element.
 * DOM encapsulation is the key to unlocking interoperability with any other code—including other web components or Lit components—functioning on the page.
 *
 * Shadow DOM provides three benefits:
 * - DOM scoping. DOM APIs like document.querySelector won't find elements in the component's shadow DOM,
 *  so it's harder for global scripts to accidentally break your component.
 * - Style scoping. You can write encapsulated styles for your shadow DOM that don't affect the rest of the DOM tree.
 * - Composition. The component's shadow root, which contains its internal DOM, is separate from the component's children.
 *  You can choose how children are rendered in your component's internal DOM.
 *
 * Lit renders components to its renderRoot, which is a shadow root by default.
 * To find internal elements, you can use DOM query APIs, such as `this.renderRoot.querySelector()`.
 *
 * The renderRoot should always be either a shadow root or an element, which share APIs like `.querySelectorAll()` and `.children`.
 * You can query internal DOM after component initial render (for example, in firstUpdated), or use a getter pattern:
 *
 * LitElement supplies a set of decorators that provide a shorthand way of defining getters like this.
 * - `@query`
 * - `@queryAll`
 * - `@queryAsync`
 *
 * WARN: Using decorators. Decorators are a proposed JavaScript feature,
 * so you’ll need to use a compiler like Babel or TypeScript to use decorators
 *
 */
@customElement("accessing-nodes-element")
export class AccessingNodesElement extends LitElement {
  private staticNode?: HTMLElement | null;

  /**
   * You can query internal DOM after component initial render (for example, in firstUpdated), or use a getter pattern:
   */
  firstUpdated() {
    this.staticNode = this.renderRoot.querySelector("#static-node");
    console.log("[AccessingNodesElement]::firstUpdated", this.staticNode);
  }

  /**
   * You can query internal DOM after component initial render (for example, in firstUpdated), or use a getter pattern:
   */
  private get _closeButton() {
    return this.renderRoot.querySelector("#close-button") as HTMLButtonElement;
  }

  private _handleCloseButtonClick() {
    const b = this._closeButton;
    console.log("[AccessingNodesElement]::_handleCloseButtonClick", b);
  }

  /**
   * The query is equivalent to the getter pattern:
   * ```ts
   * get _first() {
   *  return this.renderRoot?.querySelector('#first') ?? null;
   * }
   * ```
   */
  @query("#first")
  _first!: HTMLDivElement;

  /**
   * The queryAll is equivalent to the getter pattern:
   * ```ts
   * get _divs() {
   *  return this.renderRoot?.querySelectorAll('div') ?? null;
   * }
   * ```
   */
  @queryAll("div")
  _divs!: NodeListOf<HTMLDivElement>;

  /**
   * Similar to @query, except that instead of returning a node directly, 
   * it returns a Promise that resolves to that node after any pending element render is completed. 
   * Code can use this instead of waiting for the updateComplete promise.
   * This is useful, for example, if the node returned by @queryAsync can change as a result of another property change.
   */
  @queryAsync("#first")
  _firstAsync!: Promise<HTMLDivElement>;

  render() {
    return html`
      <div id="static-node">This is a static node</div>
      <button id="close-button" @click=${this._handleCloseButtonClick}>Close</button>
      <div id="first">
        <p>This example demonstrates two ways to access nodes:</p>
        <ul>
          <li>Using a stored reference (staticNode)</li>
          <li>Using a getter (_closeButton)</li>
        </ul>
      </div>
    `;
  }
}
