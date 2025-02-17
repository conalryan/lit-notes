import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./01-add-styles.ts";
import "./02-inheriting-styles.ts";
import "./03-sharing-styles.ts";
import "./04-styling-children.ts";
import "./05-dynamic-styles.ts";
import "./06-theming.ts";
import "./07-import-styles.ts";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("app-element")
export class AppElement extends LitElement {
  static styles = css`
    .container {
      padding: 2rem;  
    }
  `;

  render() {
    return html`
      <main class="container">
        <h3>01 - Add Styles</h3>
        <add-styles></add-styles>
        <br />
        <small>*Verify: the text above is green</small>
        <hr />

        <h3>02 - Inheriting Styles</h3>
        <inheriting-styles></inheriting-styles>
        <br />
        <small>*Verify: border and padding from super class and color from base class</small>
        <hr />

        <h3>03 - Sharing Styles</h3>
        <sharing-styles></sharing-styles>
        <br />
        <small>*Verify: display and border are :host; color and background-color are "shared" (constructed stylesheet)</small>
        <hr />
 
        <h3>04 - Styling Children</h3>
        <styling-children>
          <p>Styled paragraph (blue)</p>
          <span slot="indiv">Styled div (red)</span>
          <span slot="hi">Styled slot (purple)</span>
        </styling-children>
        <br />
        <small>*Verify: Styled paragraph is blue and Styled div is red and Styled slot is purple</small>
        <hr />
        <styling-children>
          <div>Stylable with ::slotted()</div>
        </styling-children>
        <br />
        <small>*Verify: Stylable with ::slotted() is green</small>
        <hr />
        <!-- Note that only direct slotted children can be styled with ::slotted(). -->
        <!-- cr. This is styled green, not sure what the docs are referring to. -->
        <styling-children>
          <div><p>Not stylable with ::slotted()</p></div>
        </styling-children>
        <br />
        <small>*Verify: styles are not applied to the paragraph
          FAILED: cr. This is styled green, not sure what the docs are referring to.
        </small>
        <hr />

        <h3>05 - Dynamic Styles</h3>
        <dynamic-styles></dynamic-styles>
        <br />
        <small>*Verify: red border with padding, navy background, lightgreen text</small>
        <hr />
      </main>

      <h3>06 - Theming</h3>
      <theming-element></theming-element>
      <br />
      <small>*Verify: green text, lightblue background, Roboto font</small>
      <hr />

      <h3>07 - Import Styles</h3>
      <import-styles></import-styles>
      <br />
      <small>*Verify: blue lightblue button with black text</small>
      <hr />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "app-element": AppElement;
  }
}
