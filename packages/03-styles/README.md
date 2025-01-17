# Styles

Your component's template is rendered to its shadow root. The styles you add to your component are automatically _scoped_ to the shadow root and only affect elements in the component's shadow root.

You define scoped styles in the static `styles` class field using the tagged template literal `css` function. 
Defining styles this way results in the most optimal performance:
**cr. why is this the most optimal performance?**

```typescript
import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    p {
      color: green;
    }
  `;
  protected render() {
    return html`<p>I am green!</p>`;
  }
}
```

Using themes and nesting
```typescript
const mainColor = css`red`;
...
static styles = css`
  div { color: ${mainColor} }
`;
```

This restriction exists to protect applications from security vulnerabilities whereby malicious styles, or even malicious code, can be injected from untrusted sources such as URL parameters or database values.

If you must use an expression in a `css` literal that is not itself a `css` literal, **and** you are confident that the expression is from a fully trusted source such as a constant defined in your own code, then you can wrap the expression with the `unsafeCSS` function:

```js
const mainColor = 'red';
...
static styles = css`
  div { color: ${unsafeCSS(mainColor)} }
`;
```

**Only use the `unsafeCSS` tag with trusted input.** Injecting unsanitized CSS is a security risk. For example, malicious CSS can "phone home" by adding an image URL that points to a third-party server.

You can also use `super.styles` to reference the superclass's styles property in JavaScript. If you're using TypeScript, we recommend avoiding `super.styles` since the compiler doesn't always convert it correctly. Explicitly referencing the superclass, as shown in the example, avoids this issue.

When writing components intended to be subclassed in TypeScript, the `static styles` field should be explicitly typed as `CSSResultGroup` to allow flexibility for users to override `styles` with an array:

```typescript
// Prevent typescript from narrowing the type of `styles` to `CSSResult`
// so that subclassers can assign e.g. `[SuperElement.styles, css`...`]`;
static styles: CSSResultGroup = css`...`;
```
### Sharing styles
  
You can share styles between components by creating a module that exports tagged styles:

```typescript
export const buttonStyles = css`
  .blue-button {
    color: white;
    background-color: blue;
  }
  .blue-button:disabled {
    background-color: grey;
  }`;
```

```typescript
import { LitElement, css, html } from 'lit';
import { buttonStyles } from './styles.js';
import { customElement } from 'lit/decorators.js';

@customElement('sharing-styles')
export class SharingStyles extends LitElement {
  static styles = [
    buttonStyles,
    // Note that the host element can be affected by styles from outside the shadow tree, as well, 
    // so you should consider the styles you set in :host and :host() rules 
    // as default styles that can be overridden by the user.
    // WARN: Do not put comments inside the css template literal, it will break the CSS silently!
    css`
      :host { 
        display: block;
        border: 1px solid black;
      }`
  ];

  render() {
    return html`<button class="blue-button">Click me</button>`;
  }
}
```

Styles scoped to an element's shadow tree don't affect the main document or other shadow trees. Similarly, with the exception of [inherited CSS properties](https://lit.dev/docs/components/styles/#inheritance), document-level styles don't affect the contents of a shadow tree.
### Scoped styles
We recommend using the [static `styles` class field](https://lit.dev/docs/components/styles/#add-styles) for optimal performance. However, sometimes you may want to define styles in the Lit template. There are two ways to add scoped styles in the template:
- Add styles using a [`<style>` element](https://lit.dev/docs/components/styles/#style-element).
- Add styles using an [external style sheet](https://lit.dev/docs/components/styles/#external-stylesheet) (not recommended).

Typically, styles are placed in the [static `styles` class field](https://lit.dev/docs/components/styles/#add-styles); however, the element's static `styles` are evaluated **once per class**. Sometimes, you might need to customize styles **per instance**. For this, we recommend using CSS properties to create [themable elements](https://lit.dev/docs/components/styles/#theming). Alternatively, you can also include `<style>` elements in a Lit template. These are updated per instance.

```js
render() {
  return html`
    <style>
      /* updated per instance */
    </style>
    <div>template content</div>
  `;
}
```
  
Using expressions inside style elements has some important limitations and performance issues.

```js
render() {
  return html`
    <style>
      :host {
        /* Warning: this approach has limitations & performance issues! */
        color: ${myColor}
      }
    </style>
    <div>template content</div>
  `;
}
```

**Limitations in the ShadyCSS polyfill around expressions.** Expressions in `<style>` elements won't update per instance in ShadyCSS, due to limitations of the ShadyCSS polyfill. In addition, `<style>` nodes may not be passed as expression values when using the ShadyCSS polyfill. See the [ShadyCSS limitations](https://github.com/webcomponents/polyfills/tree/master/packages/shadycss#limitations) for more information.

Evaluating an expression inside a `<style>` element is extremely inefficient. When any text inside a `<style>` element changes, the browser must re-parse the whole `<style>` element, resulting in unnecessary work.

To mitigate this cost, separate styles that require per-instance evaluation from those that don't.

```js
  static styles = css`/* ... */`;
  render() {
    const redStyle = html`<style> :host { color: red; } </style>`;
    return html`${this.red ? redStyle : ''}`
```
### Import an external stylesheet
While you can include an external style sheet in your template with a `<link>`, we do not recommend this approach. Instead, styles should be placed in the [static `styles` class field](https://lit.dev/docs/components/styles/#add-styles).
- The [ShadyCSS polyfill](https://github.com/webcomponents/polyfills/tree/master/packages/shadycss#limitations) doesn't support external style sheets.
- External styles can cause a flash-of-unstyled-content (FOUC) while they load.
- The URL in the `href` attribute is relative to the **main document**. This is okay if you're building an app and your asset URLs are well-known, but avoid using external style sheets when building a reusable element.
### Dynamic classes and styles
Lit offers two directives, `classMap` and `styleMap`, to conveniently apply classes and styles in HTML templates.

```ts
import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit/directives/style-map.js';

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    .someclass { border: 1px solid red; padding: 4px; }
    .anotherclass { background-color: navy; }
  `;
  
  @property() classes = { someclass: true, anotherclass: true };
  @property() styles = { color: 'lightgreen', fontFamily: 'Roboto' };
  
  protected render() {
    return html`
      <div class=${classMap(this.classes)}
	       style=${styleMap(this.styles)}
	  >	
        Some content
      </div>
    `;
  }
}
```
### Themeing
By using [CSS inheritance](https://lit.dev/docs/components/styles/#inheritance) and [CSS variables and custom properties](https://lit.dev/docs/components/styles/#customprops) together, it's easy to create themable elements. By applying css selectors to customize CSS custom properties, tree-based and per-instance theming is straightforward to apply. Here's an example:
```ts
import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    :host {
      color: var(--my-element-text-color, black);
      background: var(--my-element-background-color, white);
      font-family: var(--my-element-font-family, Roboto);
      display: block;
      padding: 8px;
      margin: 8px;
    }
  `;
  protected render() {
    return html`<div>Hello World</div>`;
  }
}
```
