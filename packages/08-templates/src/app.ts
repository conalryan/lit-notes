import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./01-expressions.ts";
import "./02-caching-template-results.ts";
import "./03-conditional-nothing.ts";
import "./04-list.ts";
import "./05-custom-direcrtives.ts";
import {
  attributeLogger,
  max,
  resolvePromise,
} from "./05-custom-direcrtives.ts";

const NINE = 9;
const TEN = 10;

/**
 * In most cases, JavaScript conditionals are all you need for conditional templates.
 * However, if you're switching between large, complicated templates,
 * you might want to save the cost of recreating DOM on each switch.
 * In this case, you can use the cache directive.
 * The cache directive caches DOM for templates that aren't being rendered currently.
 */
@customElement("app-element")
export class AppElement extends LitElement {
  someNumber = NINE;

  render() {
    return html`
      <main>
        <h1>Template Expressions</h1>

        <h3>Child Expressions</h3>
        <child-expressions></child-expressions>

        <h3>Caching Template Results</h3>
        <caching-template-results></caching-template-results>

        <h3>Conditional Nothing</h3>
        <conditional-nothing aria-label="Click me"></conditional-nothing>

        <h3>List</h3>
        <list-elements></list-elements>

        <h3>Custom Directives</h3>
        <using-hello-directive></using-hello-directive>

        <h3>Max Directive</h3>
        <div>${max(this.someNumber, TEN)}</div>

        <h3>Attribute Logger</h3>
        <div class="attribute-logger" a b>${attributeLogger()}</div>

        <h3>Async Directive</h3>
        <div>
          ${resolvePromise(
            new Promise((resolve) => setTimeout(() => resolve("Hello"), 1000))
          )}
        </div>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-element": AppElement;
  }
}
