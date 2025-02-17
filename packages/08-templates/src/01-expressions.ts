import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";

/**
 * Expressions
 * An expression can be any JavaScript expression.
 * The expression is evaluated when the template is evaluated,
 * and the result included when the template renders.
 * which is whenever the render method is called.
 *
 * Expressions inside the element tag itself affect the element.
 * Expressions inside the element's content, where child nodes go, render child nodes or text.
 *
 * Expressions inside element tags (affecting the element itself):
 * class="${this.isActive ? 'active' : 'inactive'}" - Sets a dynamic class based on the isActive property
 * data-count="${this.count}" - Sets a data attribute using the count value
 *
 * Expressions inside element content (rendering child nodes/text):
 * ${this.userName} - Renders text directly
 * ${this.count > 40 ? 'High count!' : 'Low count!'} - Renders conditional text
 * The last expression shows how to conditionally render different HTML templates based on isActive
 *
 * Valid values for expressions differ based on where the expression occurs.
 * Generally all expressions accept primitive values like strings and numbers,
 * and some expressions support additional value types. In addition, all expressions can accept directives,
 * which are special functions that customize the way an expression is processed and rendered.
 */
@customElement("child-expressions")
export class ChildExpressions extends LitElement {
  // Add some properties for demonstration
  private isActive = true;
  private userName = "John";
  private count = 42;
  private listItems = ["Item 1", "Item 2", "Item 3"];
  private highlightClass = "inactive";
  private show = true;
  private childNodeExpressions = html`
    <h1>Hello ${this.userName}</h1>
    <ul>
      ${this.listItems.map((item) => html`<li>${item}</li>`)}
    </ul>
  `;

  private attributeExpressions = html`
    <div class=${this.highlightClass}>Attribute Expressions</div>
  `;

  private booleanAttributeExpressions = html`
    <div ?hidden=${!this.show}>Boolean Attribute Expressions</div>
  `;

  private propertyExpressions = html`
    <label>Property Expressions</label>
    <input .value=${this.userName} />
  `;

  private eventListenerExpressions = html`
    <button @click=${this._clickHandler}>Go</button>
  `;

  private inputRef = createRef<HTMLInputElement>();
  private elementDirectiveExpressions = html`<input ${ref(this.inputRef)} />`;

  render() {
    return html`
      <!-- Expression in element tag/attributes -->
      <div
        class="dotted-border ${this.isActive ? "active" : "inactive"}"
        data-count="${this.count}"
      >
        ${this.attributeExpressions} ${this.booleanAttributeExpressions}
        ${this.propertyExpressions} ${this.eventListenerExpressions}
        ${this.elementDirectiveExpressions}
        <!-- Expressions rendering child content -->
        <div class="dotted-blue-border">
          ${this.childNodeExpressions} ${this.childNodes}
          ${this.count > 40 ? "High count!" : "Low count!"}
          ${this.isActive
            ? html`<span>✅ Active</span>`
            : html`<span>❌ Inactive</span>`}
        </div>
      </div>
    `;
  }

  private _clickHandler() {
    console.log("[child-expressions] _clickHandler");
  }

  static styles = css`
    .active {
      background-color: #e0ffe0;
    }
    .inactive {
      background-color: #ffe0e0;
    }
    .dotted-border {
      border: 1px dotted gray;
      padding: 1rem;
    }
    .dotted-blue-border {
      border: 1px dotted lightblue;
    }
    .
  `;
}
