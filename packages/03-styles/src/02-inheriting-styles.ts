import {LitElement, html, css, CSSResultGroup} from 'lit';
import {customElement} from 'lit/decorators.js';

@customElement('super-element')
export class SuperElement extends LitElement {
  // Prevent typescript from narrowing the type of `styles` to `CSSResult`
  // so that subclassers can assign e.g. `[SuperElement.styles, css`...`]`;
  // static styles: CSSResultGroup = css`...`;
  static styles = css`
    div {
      border: 1px solid gray;
      padding: 8px;
    }
  ` as CSSResultGroup;
  protected render() {
    return html`<div>Content</div>`;
  }
}

@customElement('inheriting-styles')
export class InheritingStyles extends SuperElement {
  static styles = [
    // You can also use super.styles to reference the superclass's styles property in JavaScript. 
    // If you're using TypeScript, we recommend avoiding super.styles since the compiler doesn't always convert it correctly. 
    // Explicitly referencing the superclass, as shown, avoids this issue.
    SuperElement.styles,
    css`div {
      color: red;
    }`
  ];
}