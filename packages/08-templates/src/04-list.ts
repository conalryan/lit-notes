import { html } from "lit";
import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

/**
 * Repeating Templates with `map`
 * Use map to transform a list of data into a list of templates
 */
@customElement("list-elements")
export class ListElements extends LitElement {
  @property({ type: Array }) colors = ["red", "green", "blue"];

  render() {
    return html`<ul>
      ${this.colors.map(
        (color) => html`<li style="color: ${color}">${color}</li>`
      )}
    </ul>`;
  }
}

/**
 * Repeat Directive
 * In most cases, using loops or map is an efficient way to build repeating templates.
 * However, if you want to reorder a large list, or mutate it by adding
 * and removing individual entries, this approach can involve updating a large number of DOM nodes.
 * The repeat directive can help here.
 *
 * The repeat directive performs efficient updates of lists based on user-supplied keys:
 * `repeat(items, keyFunction, itemTemplate)`
 *
 * Where:
 * - `items` is an array or iterable.
 * - `keyFunction` is a function that takes a single item as an argument and returns a guaranteed unique key for that item.
 * - `itemTemplate` is a template function that takes the item and its current index as arguments, and returns a TemplateResult.
 *
 * If you re-sort the employees array, the repeat directive reorders the existing DOM nodes.
 * To compare this to Lit's default handling for lists, consider reversing a large list of names:
 * - For a list created using map, Lit maintains the DOM nodes for the list items, but reassigns the values.
 * - For a list created using repeat, the repeat directive reorders the existing DOM nodes,
 * so the nodes representing the first list item move to the last position.
 */
@customElement("repeat-elements")
export class RepeatElements extends LitElement {
  private sort = 1;

  @property({ type: Array }) employees = [
    { id: 0, givenName: "Fred", familyName: "Flintstone" },
    { id: 1, givenName: "George", familyName: "Jetson" },
    { id: 2, givenName: "Barney", familyName: "Rubble" },
    { id: 3, givenName: "Cosmo", familyName: "Spacely" },
  ];

  render() {
    return html`
      <ul>
        ${repeat(
          this.employees,
          (employee) => employee.id,
          (employee, index) => html`
            <li>${index}: ${employee.familyName}, ${employee.givenName}</li>
          `
        )}
      </ul>
      <button @click=${this.toggleSort}>Toggle sort</button>
    `;
  }

  private toggleSort() {
    this.sort *= -1;
    this.employees = [
      ...this.employees.sort(
        (a, b) =>
          this.sort *
          (a.familyName.localeCompare(b.familyName) ||
            a.givenName.localeCompare(b.givenName))
      ),
    ];
  }
}

/**
 * When to use repeat vs map
 * Which repeat is more efficient depends on your use case:
 * - If updating the DOM nodes is more expensive than moving them, use the repeat directive.
 * - If the DOM nodes have state that isn't controlled by a template expression, use the repeat directive.
 * 
 * The checkbox has a checked or unchecked state, but it isn't controlled by a template expression.
 * If you reorder the list after the user has checked one or more checkboxes, 
 * Lit would update the names associated with the checkboxes, but not the state of the checkboxes.
 */
@customElement("repeat-or-map")
export class RepeatOrMap extends LitElement {
  @property({ type: Array }) users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Jim" },
  ];

  render() {
    return html`${this.users.map(
      (user) => html` <div><input type="checkbox" /> ${user.name}</div> `
    )}`;
  }
}
