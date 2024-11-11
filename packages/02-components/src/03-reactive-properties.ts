import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('reactive-properties')
export class ReactiveProperties extends LitElement {

  /**
   * - Inputs are stored as JavaScript class fields or properties.
   * - Reactive properties are properties that can trigger the reactive update cycle when changed,
   *   and optionally be read or written to attributes.
   *
   * - Reactive updates: Lit generates a getter/setter pair for each reactive property.
   *   When a reactive property changes, the component schedules an update.
   * - Attribute handling: By default, Lit sets up an observed attribute corresponding to the property,
   *   and updates the property when the attribute changes.
   *   Property values can also, optionally, be reflected back to the attribute.
   * - Superclass properties: Lit automatically applies property options declared by a superclass.
   *   You don't need to redeclare properties unless you want to change options.
   *
   * Public properties are part of the component's public API.
   * - In general, public properties—especially public reactive properties—should be treated as input.
   * - The component shouldn't change its own public properties, except in response to user input
   * - Then the component should dispatch an event to indicate to the component's owner that a property has changed
   */
  @property()
  name?: string;

  /**
   * Internal reactive state
   * - Reactive properties that aren't part of the component's API.
   * - These properties don't have a corresponding attribute, and are typically marked protected or private.
   * - As with public reactive properties, updating internal reactive state triggers an update cycle.
   * - Internal reactive state never has an associated attribute.
   * - Recommend using a convention like a leading underscore (_) to identify private or protected properties for JavaScript users.
   * - The only option you can specify for internal reactive state is the `hasChanged` function.
   */
  @state()
  private _counter = 0;

  /**
   * The argument to the @property decorators is an options object.
   * Omitting the argument is equivalent to specifying the default value for all options.
   *
   * attribute
   * - Whether the property is associated with an attribute, or a custom name for the associated attribute.
   * - Default: true.
   * - If attribute is false, the converter, reflect and type options are ignored.
   */
  @property()
  aPropWithOptions: any;

  /**
   * Class fields have a problematic interaction with reactive properties.
   * Class fields are defined on the element instance whereas reactive properties are defined as accessors on the element prototype.
   * According to the rules of JavaScript, an instance property takes precedence over and effectively hides a prototype property.
   * This means that reactive property accessors do not function when class fields are used such that setting the property won't trigger an element update.
   */
  aClassField = "won't trigger an update";

  /**
   * If the parent property is not reactive, the child component will not update!
   */
  @state()
  private _inputCount = 0;

  private _handleRerender() {
    this._inputCount++;
    console.log('[ReactiveProperties]]::_handleRerender inputCount', this._inputCount);
  }

  render() {
    return html`
      <main>
        <h1>Hello, ${this.name}</h1>
        <public-reactive-properties count=${this._inputCount}></public-reactive-properties>
        <button type="button" @click=${() => this._handleRerender()}>Rerender Public Reactive Properties</button>
      </main>
    `;
  }
}

@customElement('public-reactive-properties')
export class PublicReactiveProperties extends LitElement {
  private _renderCount = 0;

  @property({ type: Number })
  set count(input: number) {
    console.log('[PublicReactiveProperties]::count::setter', input);
    this._inputCount = input;
  };
  get count() { return this._inputCount; }
  private _inputCount = 0;

  render() {
    this._renderCount++;
    return html`
      <main>
        <h3>Public Reactive Properties</h3>
        <p>I've been rendered ${this._renderCount} times</p>
        <p>I've received ${this.count} inputs</p>
      </main>
    `;
  }
}

/**
 * [Property Options](https://lit.dev/docs/components/properties/#property-options)
 * The argument to the @property decorators is an options object.
 * Omitting the argument is equivalent to specifying the default value for all options.
 *
 * attribute
 * - Whether the property is associated with an attribute, or a custom name for the associated attribute.
 * - Default: true.
 * - If attribute is false, the converter, reflect and type options are ignored.
 *
 * converter
 * - A custom converter for converting between properties and attributes.
 * - Default: Uses the default attribute converter.
 *
 * hasChanged
 * - A function called to determine if the property has changed, and should trigger an update.
 * - Default: Strict inequality check (newValue !== oldValue).
 *
 * noAccessor
 * - Set to true to avoid generating the default property accessors.
 * - This option is rarely necessary.
 * - Default: false.
 *
 * reflect
 * - Whether property value is reflected back to the associated attribute.
 * - Default: false.
 *
 * state
 * - Set to true to declare the property as internal reactive state.
 * - Equivalent to using the @state decorator.
 * - Default: false.
 *
 * type
 * - Type that should be used to convert the string-valued attribute into this property,
 * - Default: attribute converter will parse the string into the type given,
 *   and vice-versa when reflecting a property to an attribute.
 * - Default converter: treats it as type: String when unspecified.
 * - If converter is set, this field is passed to the converter.
 * - This field should generally match the TypeScript type declared for the field.
 *   However, the type option is used by the Lit's runtime for string serialization/deserialization,
 *   and should not be confused with a type-checking mechanism.
 */
@customElement('property-options')
export class PropertyOptions extends LitElement {
  render() {
    return html`
      <main>
        <h1>Hello</h1>
      </main>
    `;
  }
}

@customElement('observed-attributes')
export class ReactivePropertiesAttributes extends LitElement {

  /**
   * By default, Lit creates a corresponding observed attribute for all public reactive properties.
   * The name of the observed attribute is the property name, lowercased:
   * observed attribute name is "myvalue"
   *
   * An observed attribute can be used to provide an initial value for a property from markup. For example:
   * ```js
   * <my-element myvalue="99"></my-element>
   * ```
   */
  @property({ type: Number })
  myValue = 0;

  /**
   * To create an observed attribute with a different name, set attribute to a string:
   * Observed attribute will be called my-name
   */
  @property({ attribute: 'my-name' })
  myName = 'Ogden';

  /**
   * To prevent an observed attribute from being created for a property, set attribute to false.
   * The property will not be initialized from attributes in markup, and attribute changes won't affect it.
   * No observed attribute for this property
   */
  @property({ attribute: false })
  myData = {};

  render() {
    return html`
      <main>
        <h1>Hello</h1>
      </main>
    `;
  }
}
