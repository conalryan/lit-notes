import { LitElement, unsafeCSS } from "lit";

import glogalStyles from "./global.scss";

export const StyledElement = (style) =>
  class extends LitElement {
    static styles = [unsafeCSS(glogalStyles), unsafeCSS(style)];
  };
