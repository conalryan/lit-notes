import { LitElement } from "lit";
import { customElement, queryAssignedElements, queryAssignedNodes, state } from "lit/decorators.js";
import { html } from "lit/html.js";

/**
 * Accessing slotted children
 * To access children assigned to slots in your shadow root:
 * - `slot.assignedNodes` -> Node[]
 * - `slot.assignedElements` -> Element[]
 * Use these methods with the getter pattern or with the `slotchange` event.
 * 
 * @queryAssignedElements and @queryAssignedNodes convert a class property into a getter 
 * that returns the result of calling `slot.assignedElements` or `slot.assignedNodes` respectively 
 * on a given slot in the component's shadow tree.
 * 
 * Use these to query the elements or nodes assigned to a given slot.
 * 
 * Properties
 * - flatten: Boolean specifying whether to flatten the assigned nodes by replacing any child `<slot>` elements with their assigned nodes.
 * - slot: Slot name specifying the slot to query. Leave undefined to select the default slot.
 * - selector (queryAssignedElements only): If specified, only return assigned elements that match this CSS selector.
 * 
 * Deciding which decorator to use depends on whether you want to query for text nodes assigned to the slot, or only element nodes.
 */ 
@customElement("accessing-slotted-children")
export class AccessingSlottedChildren extends LitElement {
  @state()
  slots?: Element[];

  get _slottedChildren() {
    const slot = this.shadowRoot?.querySelector("slot");
    return slot?.assignedElements({ flatten: true });
  }

  /**
   * `@slotchange` event
   * You can also use the slotchange event to take action when the assigned nodes change.
   * The following example extracts the text content of all of the slotted children.
   * `<slot @slotchange=${this.handleSlotchange}></slot>
   */
  handleSlotchange(e: Event) {
    const childNodes = (e.target as HTMLSlotElement).assignedNodes({
      flatten: true,
    });
    // ... do something with childNodes ...
    const allText = childNodes
      .map((node) => {
        return node.textContent ? node.textContent : "";
      })
      .join("");
    console.log("[AccessingSlottedChildren]::handleSlotchange", allText);
  }

  firstUpdated() {
    this.slots = this._slottedChildren;
    console.log("[AccessingSlottedChildren]::firstUpdated", this.slots);
  }

  /**
   * The query is equivalent to the getter pattern:
   * ```ts
   * get _listItems() {
   *   const slot = this.shadowRoot.querySelector('slot[name=list]');
   *   return slot.assignedElements().filter((node) => node.matches('.item'));
   * }
   * ```
   */
  @queryAssignedElements({ slot: "list", selector: ".item" })
  _listItems!: Array<HTMLElement>;

  /**
   * The query is equivalent to the getter pattern:
   * ```ts
   * get _headerNodes() {
   *   const slot = this.shadowRoot.querySelector('slot[name=header]');
   *   return slot.assignedNodes({flatten: true});
   * }
   * ```
   */
  @queryAssignedNodes({ slot: "header", flatten: true })
  _headerNodes!: Array<Node>;

  render() {
    return html`
      <slot></slot>
      <slot @slotchange=${this.handleSlotchange}></slot>
      <p>Slotted children: ${this.slots?.length}</p>
    `;
  }
}
