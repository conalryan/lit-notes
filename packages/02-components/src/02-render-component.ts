import { LitElement, html, noChange, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('render-component')
export class RenderComponent extends LitElement {
  header = 'Render a component';

  /**
   * Define a render method that will return a lit template.
   * Templates can include expressions, which are placeholders for dynamic content.
   *
   * Write your template in HTML inside a JavaScript tagged template literal using Lit's html tag function.
   *
   * render() method can return anything that Lit can render as the child of an HTML element:
   * - Primitive values like string, number, or boolean.
   * - TemplateResult objects created by the html function.
   * - DOM Nodes.
   * - The sentinel values nothing and noChange.
   * - Arrays or iterables of any of the supported types.
   *
   * Performance considerations:
   * - Avoid changing the component's state.
   * - Avoid producing any side effects.
   * - Use only the component's properties as input.
   * - Return the same result when given the same property values.
   * - Keep the template deterministic.
   *
   * Render cycle
   * - First render when the component is added to the DOM on a page.
   * - Additional render when any change to the component's reactive properties.
   * - Lit batches updates to maximize performance and efficiency (setting multiple properties triggers only one update,
   *   performed asynchronously at microtask timing).
   * - During an update, only the parts of the DOM that change are re-rendered.
   * - Lit parses the template and creates static HTML once,
   *   and then only updates changed values in expressions after that, making updates very efficient.
   *
   * Shadow DOM
   * - Shadow DOM lets an element create its own, isolated DOM tree that's separate from the main document tree.
   * - A core feature of the web components specifications that enables interoperability, style encapsulation, and other benefits.
   * - Lit uses shadow DOM to encapsulate the DOM a component renders.
   */
  render() {
    return html`
      <main>
        <h1>${this.header}</h1>

        <h3>Render can return primitive values</h3>
        <render-primitve></render-primitve>

        <h3>Render can return DOM nodes</h3>
        <render-dom-node></render-dom-node>

        <h3>Render can return noChange</h3>
        <render-no-change></render-no-change>

        <h3>Render can return nothing</h3>
        <render-nothing></render-nothing>

        <h3>Render can return arrays of any of the supported types</h3>
        <render-array></render-array>

        <h3>Composing templates</h3>
        <render-composing-templates></render-composing-templates>
      </main>
    `;
  }
}

@customElement('render-primitve')
export class RenderPrimitve extends LitElement {
  /**
   * Render can return primitive values like string, number, or boolean.
   */
  render() {
    return 22;
  }
}

@customElement('render-dom-node')
export class RenderDOMNode extends LitElement {
  private _el = document.createElement('h1');
  /**
   * Render can return DOM nodes
   */
  render() {
    this._el.innerHTML = 'Render can return DOM nodes';
    return this._el;
  }
}

@customElement('render-no-change')
export class RenderNoChange extends LitElement {
  /**
   * Render can return the sentinel values nothing and noChange.
   * cr. What is the use case of this?
   */
  render() {
    return noChange;
  }
}

@customElement('render-nothing')
export class RenderNothing extends LitElement {
  /**
   * Render can return the sentinel values nothing and noChange.
   * * cr. What is the use case of this?
   */
  render() {
    return nothing;
  }
}

@customElement('render-array')
export class RenderArray extends LitElement {
  /**
   * Render can return arrays of any of the supported types.
   */
  render() {
    return ['hello', 4, true];
  }
}

/**
 * Composing templates
 *
 * You can also compose templates by importing other elements and using them in your template:
 * e.g.
 * ```js
 * import './my-header.js';
 * import './my-article.js';
 * import './my-footer.js';
 * ...
 * render() {
 *   return html`
 *     <my-header></my-header>
 *     <my-article></my-article>
 *     <my-footer></my-footer>
 *   `;
 * }
 * ```
 */
@customElement('render-composing-templates')
class RenderComposingTemplates extends LitElement {

  @property({attribute: false})
  article = {
    title: 'My Nifty Article',
    text: 'Some witty text.',
  };

  headerTemplate() {
    return html`<header>${this.article.title}</header>`;
  }

  articleTemplate() {
    return html`<article>${this.article.text}</article>`;
  }

  footerTemplate() {
    return html`<footer>Your footer here.</footer>`;
  }

  render() {
    return html`
      ${this.headerTemplate()}
      ${this.articleTemplate()}
      ${this.footerTemplate()}
    `;
  }
}