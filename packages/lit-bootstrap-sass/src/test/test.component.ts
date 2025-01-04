import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { StyledElement } from "../shared/styled.element";

import style from "./test.component.scss?inline";

@customElement("test-component")
export class TestComponent extends StyledElement(style) {
  @property()
  name?: string = "World";

  render() {
    return html`
      <p>
        Hello,
        <b>${this.name}</b>
        !
      </p>
      <button class="bg-blue-200 text-yellow-200 p-2 rounded-full text-2xl">
        Hello world!
      </button>
    `;
  }
}
