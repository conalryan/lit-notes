import { LitElement, css, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./01-constructor";
import "./02-connected-callback";
import "./03-disconnected-callback";
import "./04-attribute-changed-callback";
import "./05-adopted-callback";
import "./06-changed-properties-map";
import "./07-triggering-update";
import "./08-performing-update";
import "./09-completing-update";
import "./10-customize-update";
import "./11-external-lifecycle-hooks";

@customElement("app-element")
export class AppElement extends LitElement {
  private showDisconnected = true;

  @state()
  msg = "message from the parent";

  @state()
  changedPropertiesMapMsg = "changed properties map message from the parent";

  @state()
  prop1 = "value from the parent prop1";

  @state()
  prop2 = "value from the parent prop2";

  render() {
    return html`
      <main>
        <h1>04 - Lifecycle</h1>

        <h3>01 - Constructor</h3>
        <constructor-element></constructor-element>

        <h3>02 - ConnectedCallback</h3>
        <connected-callback-element></connected-callback-element>

        <h3>03 - DisconnectedCallback</h3>
        <button @click=${this._toggleDisconnected}>
          ${this.showDisconnected ? "Remove" : "Add"} Element
        </button>
        ${this.showDisconnected
          ? html`<disconnected-callback-element></disconnected-callback-element>`
          : null}

        <h3>04 - AttributeChangedCallback</h3>
        <input type="text" @input=${this._handleInput} />
        <attribute-changed-callback-element
          msg=${this.msg}
        ></attribute-changed-callback-element>

        <h3>05 - AdoptedCallback</h3>
        <adopted-callback-element></adopted-callback-element>
        <button @click=${this._testAdopted}>Move to new document</button>

        <h3>06 - ChangedPropertiesMap</h3>
        <input type="text" @input=${this._handleChangedPropertiesMapInput} />
        <changed-properties-map-element
          msg=${this.changedPropertiesMapMsg}
        ></changed-properties-map-element>

        <h3>07 - TriggeringUpdate</h3>
        <triggering-update-element></triggering-update-element>

        <h3>08 - PerformingUpdate</h3>
        <performing-update-element prop1=${this.prop1} prop2=${this.prop2}></performing-update-element>
        <label>
          Prop1:
          <input type="text" @input=${this._handleProp1Input} />
        </label>
        <label>
          Prop2:
          <input type="text" @input=${this._handleProp2Input} />
        </label>

        <h3>09 - CompletingUpdate</h3>
        <completing-update-element></completing-update-element>

        <h3>10 - CustomizeUpdate</h3>
        <customize-update-element></customize-update-element>

        <h3>11 - External Lifecycle Hooks</h3>
        <external-lifecycle-hooks></external-lifecycle-hooks>
      </main>
    `;
  }

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.msg = input.value;
  }

  private _handleChangedPropertiesMapInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.changedPropertiesMapMsg = input.value;
  }

  private _handleProp1Input(e: Event) {
    const input = e.target as HTMLInputElement;
    this.prop1 = input.value;
  }

  private _handleProp2Input(e: Event) {
    const input = e.target as HTMLInputElement;
    this.prop2 = input.value;
  }

  private _toggleDisconnected() {
    this.showDisconnected = !this.showDisconnected;
    this.requestUpdate();
  }

  private _testAdopted() {
    const element = this.renderRoot.querySelector('adopted-callback-element');
    if (element) {
      // Create a new document
      const newDoc = new Document();
      // Adopt the node into the new document
      newDoc.adoptNode(element);
    }
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "app-element": AppElement;
  }
}
