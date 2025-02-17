import { LitElement } from "lit";
import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { cache } from "lit/directives/cache.js";

@customElement("caching-template-results")
export class CachingTemplateResults extends LitElement {
  @property({ type: String }) userName = "John";

  render() {
    return html`${cache(
      this.userName
        ? html`Welcome ${this.userName}`
        : html`Please log in <button>Login</button>`
    )}`;
  }
}
