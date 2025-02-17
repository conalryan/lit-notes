import { css } from "lit";

export const buttonStyles = css`
  .blue-button {
    color: white;
    color: var(--button-text-color, white);
    background: var(--button-background-color, blue);
    font-family: var(--button-font-family, Inter);
  }
  .blue-button:disabled {
    background-color: grey;
  }
`;
