import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

/**
 * Decorators
 * Decorators are functions that can be used to declaratively annotate and modify the behavior of classes.
 * 
 * Lit supports two different versions of the JavaScript decorators proposal – an early version supported 
 * by TypeScript that we refer to as experimental decorators and a new and final version we refer to as standard decorators.
 * 
 * There are some small differences in usage between the two proposals (standard decorators often require the accessor keyword). 
 * Our code samples are written for experimental decorators because we recommend them for production at the moment.
 * 
 * Built-in decorators
 * - @customElement	Defines a custom element.
 * - @eventOptions	Adds event listener options
 * - @property	Defines a public property
 * - @state	Defines a private state property
 * - @query	Defines a property that returns an element in the component template
 * - @queryAll	Defines a property that returns a list of elements in the component template
 * - @queryAsync	Defines a property that returns a promise that resolves to an element in the component template
 * - @queryAssignedElements	Defines a property that returns the child elements assigned to a specific slot
 * - @queryAssignedNodes	Defines a property that returns the child nodes assigned to a specific slot.
 * 
 * You can import all of the Lit decorators via the lit/decorators.js module:
 * ```ts
 * import {customElement, property, eventOptions, query} from 'lit/decorators.js';
 * ```
 * To reduce the amount of code needed to run the component, decorators can be imported individually into component code.
 * All decorators are available at `lit/decorators/<decorator-name>.js`. For example,
 * ```ts
 * import {customElement} from 'lit/decorators/custom-element.js';
 * import {eventOptions} from 'lit/decorators/event-options.js';
 * ```
 * 
 * To use decorators, you need to build your code with a compiler such as TypeScript or Babel.
 * In the future when decorators are supported natively in browsers, this will no longer be necessary.
 * 
 * Typescript
 * TypeScript supports both experimental decorators and standard decorators. 
 * We recommend that TypeScript developers use experimental decorators for now for optimal compiler output.
 * If your project requires using standard decorators or setting "useDefineForClassFields": true, skip down to migrating to standard decorators.
 * 
 * To use experimental decorators you must enable the experimentalDecorators compiler option.
 * 
 * You should also ensure that the useDefineForClassFields setting is false. 
 * This is only required when target is set to ES2022 or greater, but it is recommended to explicitly set this to false. 
 * This is needed to avoid issues with class fields when declaring properties.
 * 
 * ```ts
 * // tsconfig.json
 * {
 *   "compilerOptions": {
 *     "experimentalDecorators": true,
 *     "useDefineForClassFields": false,
 *   }
 * }
 * ```
 * Enabling emitDecoratorMetadata is not required and not recommended.
 * 
 * Lit decorators are designed to support standard decorator syntax (using accessor on class field decorators) with TypeScript's experimental decorator mode.
 * This allows incremental migration off of experimental decorators starting with the addition of the accessor keyword to decorated properties without a change of behavior. 
 * Once all decorated class field use the accessor keyword, you can change your compiler options to complete the migration to standard decorators:
 * ```json
 * // tsconfig.json
 * {
 *   "compilerOptions": {
 *     "experimentalDecorators": false, // default for TypeScript 5.0 and up
 *     "useDefineForClassFields": true, // default when "target" is "ES2022" or higher
 *   }
 * }
 * ```
 * Note: The accessor keyword was introduced in TypeScript 4.9 and standard decorators with metadata require TypeScript ≥5.2.
 */
@customElement('app-element')
export class AppElement extends LitElement {

  render() {
    return html`
      <main>
        <h1>Hello World</h1>
      </main>
    `;
  }
}
