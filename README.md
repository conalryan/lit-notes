# [Lit Notes](https://lit.dev/docs)

## Packages

### [01-introduction](https://lit.dev/docs/getting-started/)

Based on simplified setup from `npm init @open-wc`

`pnpm build:01`

`pnpm start:01`

### [02-components](https://lit.dev/docs/components/overview/)

`pnpm build:02`

`pnpm start:02`

Define components

Render components

Reactive properties

### [03-styles](https://lit.dev/docs/components/styles/)

`pnpm create vite packages/03-styles --template lit-ts`

`pnpm build:03`

`pnpm start:03`

Add styles

Inheriting styles

Sharing styles

Styling children

Dynamic styles

Theming

### [04-lifecycle](https://lit.dev/docs/components/lifecycle/)

`pnpm create vite packages/04-lifecycle --template lit-ts`

`pnpm build:04`

`pnpm start:04`

Constructor

Connected callback

Disconnected callback

Attribute changed callback

Adopted callback

Changed properties map

Triggering update

Performing update

Completing update

Customize update

External lifecycle hooks

### [05-shadow-dom](https://lit.dev/docs/components/shadow-dom/)

`pnpm create vite packages/05-shadow-dom --template lit-ts`

`pnpm build:05`

`pnpm start:05`

Accessing nodes

Children with slots

Accessing slotted children

Customizing the render root

### [06-events](https://lit.dev/docs/components/events/)

`pnpm create vite packages/06-events --template lit-ts`

`pnpm build:06`

`pnpm start:06`

Listening to events

Dispatching events

Working with events in shadow DOM

Communicating between dispatcher and listener

### [07-decorators](https://lit.dev/docs/components/decorators/)

`pnpm create vite packages/07-decorators --template lit-ts`

`pnpm build:07`

`pnpm start:07`

### [08-template-expressions](https://lit.dev/docs/components/template-expressions/)

`pnpm create vite packages/08-template-expressions --template lit-ts`

`pnpm build:08`

`pnpm start:08`

Templates Overview
Lit templates are written using JavaScript template literals tagged with the html tag.

Tagged template literals allow the browser to pass the tag function an array of strings 
(the static portions of the template) and an array of expressions (the dynamic portions). 
Lit uses this to build an efficient representation of your template, so it can re-render 
only the parts of template that have changed.

Lit templates are extremely expressive and allow you to render dynamic content in a variety of ways:
- **Expressions**: Templates can include dynamic values called __expressions__ that can be used to render attributes, text, properties, event handlers, and even other templates.
- **Conditionals**: Expressions can render conditional content using standard JavaScript flow control.
- **Lists**: Render lists by transforming data into arrays of templates using standard JavaScript looping and array techniques.
- **Built-in directives**: Directives are functions that can extend Lit's templating functionality. The library includes a set of built-in directives to help with a variety of rendering needs.
- **Custom directives**: You can also write your own directives to customize Lit's rendering as needed.
