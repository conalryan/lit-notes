import { html, TemplateResult } from 'lit';
import '../src/open-wc-web-component-starter.js';

export default {
  title: 'OpenWcWebComponentStarter',
  component: 'open-wc-web-component-starter',
  argTypes: {
    header: { control: 'text' },
    counter: { control: 'number' },
    textColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  header?: string;
  counter?: number;
  textColor?: string;
  slot?: TemplateResult;
}

const Template: Story<ArgTypes> = ({
  header = 'Hello world',
  counter = 5,
  textColor,
  slot,
}: ArgTypes) => html`
  <open-wc-web-component-starter
    style="--open-wc-web-component-starter-text-color: ${textColor || 'black'}"
    .header=${header}
    .counter=${counter}
  >
    ${slot}
  </open-wc-web-component-starter>
`;

export const Regular = Template.bind({});

export const CustomHeader = Template.bind({});
CustomHeader.args = {
  header: 'My header',
};

export const CustomCounter = Template.bind({});
CustomCounter.args = {
  counter: 123456,
};

export const SlottedContent = Template.bind({});
SlottedContent.args = {
  slot: html`<p>Slotted content</p>`,
};
SlottedContent.argTypes = {
  slot: { table: { disable: true } },
};
