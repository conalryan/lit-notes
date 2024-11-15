import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { LitOpenWcWebComponentTest } from '../src/LitOpenWcWebComponentTest.js';
import '../src/lit-open-wc-web-component-test.js';

describe('LitOpenWcWebComponentTest', () => {
  it('has a default header "Hey there" and counter 5', async () => {
    const el = await fixture<LitOpenWcWebComponentTest>(html`<lit-open-wc-web-component-test></lit-open-wc-web-component-test>`);

    expect(el.header).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<LitOpenWcWebComponentTest>(html`<lit-open-wc-web-component-test></lit-open-wc-web-component-test>`);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the header via attribute', async () => {
    const el = await fixture<LitOpenWcWebComponentTest>(html`<lit-open-wc-web-component-test header="attribute header"></lit-open-wc-web-component-test>`);

    expect(el.header).to.equal('attribute header');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<LitOpenWcWebComponentTest>(html`<lit-open-wc-web-component-test></lit-open-wc-web-component-test>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
