# \<lit-open-wc-web-component-test>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

```bash
npm i lit-open-wc-web-component-test
```

## Usage

```html
<script type="module">
  import 'lit-open-wc-web-component-test/lit-open-wc-web-component-test.js';
</script>

<lit-open-wc-web-component-test></lit-open-wc-web-component-test>
```

## Testing with Web Test Runner

To execute a single test run:

```bash
npm run test
```

To run the tests in interactive watch mode run:

```bash
npm run test:watch
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `web-dev-server`

```bash
npm start
```

To run a local development server that serves the basic demo located in `demo/index.html`
