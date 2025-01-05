import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';

const brand = css`green`;

@customElement('add-styles')
export class AddStyles extends LitElement {
  static styles = css`
    span {
      color: ${brand};
    }
  `;
  protected render() {
    return html`<span>I am green!</span>`;
  }
}
