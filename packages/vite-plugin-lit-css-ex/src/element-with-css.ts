import { CSSResultGroup, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./element.css";

@customElement("element-with-css")
export class ElementWithCss extends LitElement {
  static styles: CSSResultGroup = [styles];

  render() {
    return html` <div class="black-box">Hello World</div> `;
  }
}
``