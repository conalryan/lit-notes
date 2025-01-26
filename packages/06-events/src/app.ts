import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import "./01-listening-to-events.ts";
import "./02-dispatching-events.ts";
import "./03-working-with-events-in-shadow-dom.ts";
import "./04-communicating-between-dispatcher-listener.ts";

@customElement("app-element")
export class AppElement extends LitElement {
  render() {
    return html`
      <h1>AppElement</h1>
      <hr />
      <h3>Listeners in the template</h3>
      <listeners-in-the-element-template></listeners-in-the-element-template>

      <h3>Customizing event listener options</h3>
      <customizing-event-listener-options></customizing-event-listener-options>

      <h3>Listeners on the component or shadow DOM</h3>
      <listeners-on-the-component-or-shadow-dom></listeners-on-the-component-or-shadow-dom>

      <h3>Event delegation</h3>
      <event-delegation></event-delegation>

      <h3>Asynchronously adding event listeners</h3>
      <asynchronously-adding-event-listeners></asynchronously-adding-event-listeners>

      <h3>Understanding this in event handlers</h3>
      <understanding-this-in-event-handlers></understanding-this-in-event-handlers>

      <h3>Listening to events fired from repeated templates</h3>
      <listening-to-events-fired-from-repeated-templates></listening-to-events-fired-from-repeated-templates>

      <hr />

      <h3>Dispatching events</h3>
      <my-listener>
        <my-dispatcher></my-dispatcher>
      </my-listener>

      <h3>Dispatching events after an element updates</h3>
      <dispatching-events-after-an-element-updates></dispatching-events-after-an-element-updates>

      <h3>Listener after an element updates</h3>
      <listener-after-an-element-updates>
        <dispatching-events-after-an-element-updates></dispatching-events-after-an-element-updates>
      </listener-after-an-element-updates>

      <hr />

      <h3>Working with events in shadow DOM</h3>
      <div
        @myBubbleEvent=${this._bubbleListener}
        @myBubbleComposedEvent=${this._bubbleComposedListener}
        @myComposedEvent=${this._composedListener}
      ></div>
      <understanding-composed-event-dispatching>
        <bubble-event-listener>
          <bubble-event-dispatcher></bubble-event-dispatcher>
        </bubble-event-listener>

        <bubble-composed-event-listener>
          <bubble-composed-event-dispatcher></bubble-composed-event-dispatcher>
        </bubble-composed-event-listener>

        <composed-event-listener>
          <composed-event-dispatcher></composed-event-dispatcher>
        </composed-event-listener>
      </understanding-composed-event-dispatching>

      <hr />

      <h3>Communicating between dispatcher and listener</h3>
      <communicating-between-dispatcher-listener-listener>
        <communicating-between-dispatcher-listener-dispatcher></communicating-between-dispatcher-listener-dispatcher>
      </communicating-between-dispatcher-listener-listener>
    `;
  }

  private _bubbleListener(e: CustomEvent) {
    console.log("app-element bubbleListener", e);
  }
  private _bubbleComposedListener(e: CustomEvent) {
    console.log("app-element bubbleComposedListener", e);
  }
  private _composedListener(e: CustomEvent) {
    console.log("app-element composedListener", e);
  }
}
