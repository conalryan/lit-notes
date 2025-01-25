import { LitElement } from "lit";
import { html } from "lit/html.js";
import { customElement } from "lit/decorators.js";

/**
 * Rendering children with slots
 * Your component may accept children (like a <ul> element can have <li> children).
 * ```ts
 * <my-element>
 *   <p>A child</p>
 * </my-element>
 * ```
 *
 * By default, if an element has a shadow tree, its children don't render at all.
 * To render children, your template needs to include one or more `<slot>` elements,
 * which act as placeholders for child nodes.
 *
 * To render an element's children, create a `<slot>` for them in the element's template.
 * The children aren't moved in the DOM tree, but they're rendered as if they were children of the `<slot>`.
 *
 * Named slots
 * To assign a child to a specific slot, ensure that the child's slot attribute matches the slot's name attribute:
 * - Named slots only accept children with a matching slot attribute.
 *   e.g. `<slot name="one"></slot>` only accepts children with the attribute `slot="one"`.
 * - Children with a `slot` attribute will only be rendered in a `slot` with a matching `name` attribute.
 *   e.g. `<p slot="one">...</p>` will only be placed in `<slot name="one"></slot>`.
 *
 * Fallback content
 * You can specify fallback content for a slot. The fallback content is shown when no child is assigned to the slot.
 * ```ts
 * <slot>I am fallback content</slot>
 * ```
 */
@customElement("children-with-slots")
export class ChildrenWithSlots extends LitElement {
  render() {
    return html`
      <slot>I am fallback content</slot>
      <slot name="two"></slot>
    `;
  }
}
